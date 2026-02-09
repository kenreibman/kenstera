import { NextRequest, NextResponse } from 'next/server'
import { Receiver } from '@upstash/qstash'
import { getLead, updateLeadStatus } from '@/lib/db/leads'
import { sendAbandonmentEmail } from '@/lib/email/send'

let receiver: Receiver | null = null

function getReceiver(): Receiver {
  if (!receiver) {
    const currentSigningKey = process.env.QSTASH_CURRENT_SIGNING_KEY
    const nextSigningKey = process.env.QSTASH_NEXT_SIGNING_KEY
    if (!currentSigningKey || !nextSigningKey) {
      throw new Error('Missing QSTASH_CURRENT_SIGNING_KEY or QSTASH_NEXT_SIGNING_KEY environment variables')
    }
    receiver = new Receiver({ currentSigningKey, nextSigningKey })
  }
  return receiver
}

export async function POST(request: NextRequest) {
  try {
    // Verify QStash signature
    const signature = request.headers.get('upstash-signature')
    if (!signature) {
      console.error('[Abandonment] Missing QStash signature')
      return NextResponse.json(
        { success: false, error: 'Missing signature' },
        { status: 401 }
      )
    }

    const body = await request.text()

    const isValid = await getReceiver().verify({
      signature,
      body,
      url: request.url,
    })

    if (!isValid) {
      console.error('[Abandonment] Invalid QStash signature')
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      )
    }

    let parsed: { leadId?: unknown }
    try {
      parsed = JSON.parse(body)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const { leadId } = parsed
    if (!leadId || typeof leadId !== 'string' || !leadId.startsWith('lead_')) {
      console.error('[Abandonment] Invalid leadId provided')
      return NextResponse.json(
        { success: false, error: 'Valid leadId is required' },
        { status: 400 }
      )
    }

    const lead = await getLead(leadId)

    if (!lead) {
      console.log('[Abandonment] Lead not found:', leadId)
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    // Only send email if lead is still pending (hasn't booked)
    if (lead.status !== 'pending') {
      console.log('[Abandonment] Lead status is not pending, skipping email:', {
        leadId,
        status: lead.status,
      })
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: `Lead status is ${lead.status}`,
      })
    }

    // Send abandonment email
    const emailResult = await sendAbandonmentEmail(lead)

    if (!emailResult.success) {
      console.error('[Abandonment] Failed to send email for lead:', leadId)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Update status to prevent duplicate emails
    await updateLeadStatus(leadId, 'email_sent')

    console.log('[Abandonment] Email sent successfully for lead:', leadId)

    return NextResponse.json({ success: true, emailSent: true })
  } catch (error) {
    console.error('[Abandonment] Error processing abandonment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process abandonment' },
      { status: 500 }
    )
  }
}
