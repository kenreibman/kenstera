import { NextRequest, NextResponse } from 'next/server'
import { Receiver } from '@upstash/qstash'
import { getDemoLead, updateDemoLeadStatus } from '@/lib/db/demo-leads'
import { sendDemoFollowUpEmail } from '@/lib/email/send'

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
      console.error('[Demo Follow-up] Missing QStash signature')
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
      console.error('[Demo Follow-up] Invalid QStash signature')
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
    if (!leadId || typeof leadId !== 'string' || !leadId.startsWith('demo_')) {
      console.error('[Demo Follow-up] Invalid leadId provided')
      return NextResponse.json(
        { success: false, error: 'Valid leadId is required' },
        { status: 400 }
      )
    }

    const lead = await getDemoLead(leadId)

    if (!lead) {
      console.log('[Demo Follow-up] Lead not found:', leadId)
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    // Only send email if lead is still pending (hasn't already been sent)
    if (lead.status !== 'pending') {
      console.log('[Demo Follow-up] Lead status is not pending, skipping email:', {
        leadId,
        status: lead.status,
      })
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: `Lead status is ${lead.status}`,
      })
    }

    // Send follow-up email
    const emailResult = await sendDemoFollowUpEmail(lead)

    if (!emailResult.success) {
      console.error('[Demo Follow-up] Failed to send email for lead:', leadId)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Update status to prevent duplicate emails
    await updateDemoLeadStatus(leadId, 'email_sent')

    console.log('[Demo Follow-up] Email sent successfully for lead:', leadId)

    return NextResponse.json({ success: true, emailSent: true })
  } catch (error) {
    console.error('[Demo Follow-up] Error processing follow-up:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process follow-up' },
      { status: 500 }
    )
  }
}
