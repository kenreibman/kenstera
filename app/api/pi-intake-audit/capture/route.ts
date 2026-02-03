import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@upstash/qstash'
import { createLead } from '@/lib/db/leads'

let qstash: Client | null = null

function getQStash(): Client {
  if (!qstash) {
    qstash = new Client({
      token: process.env.QSTASH_TOKEN!,
    })
  }
  return qstash
}

const ABANDONMENT_DELAY_SECONDS = 15 * 60 // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Create lead in database
    const lead = await createLead({
      email: data.email,
      fullName: data.fullName,
      website: data.website,
      role: data.role,
      inboundLeads: data.inboundLeads,
    })

    console.log('[Intake Audit] Lead captured:', {
      timestamp: new Date().toISOString(),
      leadId: lead.id,
      email: lead.email,
      website: lead.website,
    })

    // Schedule abandonment email via QStash
    const abandonmentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pi-intake-audit/send-abandonment`

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
      // Log but don't fail the request if QStash scheduling fails
      console.error('[Intake Audit] Failed to schedule abandonment email:', qstashError)
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
