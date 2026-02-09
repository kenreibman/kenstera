import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@upstash/qstash'
import { createLead } from '@/lib/db/leads'
import { z } from 'zod'

const captureSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(1, 'Full name is required').max(200),
  website: z.string().url('Invalid website URL').max(500),
  role: z.string().min(1, 'Role is required').max(200),
  inboundLeads: z.string().min(1, 'Inbound leads is required').max(200),
})

let qstash: Client | null = null

function getQStash(): Client {
  if (!qstash) {
    const token = process.env.QSTASH_TOKEN
    if (!token) {
      throw new Error('Missing QSTASH_TOKEN environment variable')
    }
    qstash = new Client({ token })
  }
  return qstash
}

const ABANDONMENT_DELAY_SECONDS = 15 * 60 // 15 minutes

export async function POST(request: NextRequest) {
  try {
    let data: unknown
    try {
      data = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const parsed = captureSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const lead = await createLead(parsed.data)

    console.log('[Intake Audit] Lead captured:', {
      timestamp: new Date().toISOString(),
      leadId: lead.id,
    })

    // Schedule abandonment email via QStash
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (!baseUrl) {
      console.error('[Intake Audit] Missing NEXT_PUBLIC_BASE_URL, cannot schedule abandonment email')
    } else {
      const abandonmentUrl = `${baseUrl}/api/pi-intake-audit/send-abandonment`

      try {
        await getQStash().publishJSON({
          url: abandonmentUrl,
          body: { leadId: lead.id },
          delay: ABANDONMENT_DELAY_SECONDS,
        })

        console.log('[Intake Audit] Scheduled abandonment check for:', {
          leadId: lead.id,
          delayMinutes: ABANDONMENT_DELAY_SECONDS / 60,
        })
      } catch (qstashError) {
        console.error('[Intake Audit] Failed to schedule abandonment email:', qstashError)
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('[Intake Audit] Error capturing lead:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}
