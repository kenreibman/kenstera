import { NextRequest, NextResponse } from 'next/server'
import { Receiver } from '@upstash/qstash'
import { getLead, updateLeadStatus } from '@/lib/db/leads'
import { sendAbandonmentEmail } from '@/lib/email/send'

let receiver: Receiver | null = null

function getReceiver(): Receiver {
  if (!receiver) {
    receiver = new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    })
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

    const { leadId } = JSON.parse(body)

    if (!leadId) {
      console.error('[Abandonment] No leadId provided')
      return NextResponse.json(
        { success: false, error: 'leadId is required' },
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
      console.error('[Abandonment] Failed to send email:', emailResult.error)
      return NextResponse.json(
        { success: false, error: emailResult.error },
        { status: 500 }
      )
    }

    // Update status to prevent duplicate emails
    await updateLeadStatus(leadId, 'email_sent')

    console.log('[Abandonment] Email sent successfully:', {
      leadId,
      email: lead.email,
    })

    return NextResponse.json({ success: true, emailSent: true })
  } catch (error) {
    console.error('[Abandonment] Error processing abandonment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process abandonment' },
      { status: 500 }
    )
  }
}
