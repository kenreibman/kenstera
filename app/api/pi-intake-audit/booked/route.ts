import { NextRequest, NextResponse } from 'next/server'
import { getLead, updateLeadStatus } from '@/lib/db/leads'

export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json()

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'leadId is required' },
        { status: 400 }
      )
    }

    const lead = await getLead(leadId)

    if (!lead) {
      console.log('[Intake Audit] Lead not found for booking:', leadId)
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    if (lead.status === 'booked') {
      console.log('[Intake Audit] Lead already booked:', leadId)
      return NextResponse.json({ success: true, alreadyBooked: true })
    }

    await updateLeadStatus(leadId, 'booked')
    console.log('[Intake Audit] Lead marked as booked:', leadId, lead.email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Intake Audit] Error marking lead as booked:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update lead status' },
      { status: 500 }
    )
  }
}
