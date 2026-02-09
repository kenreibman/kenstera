import { NextRequest, NextResponse } from 'next/server'
import { getLead, updateLeadStatus } from '@/lib/db/leads'
import { z } from 'zod'

const bookedSchema = z.object({
  leadId: z.string().min(1, 'leadId is required').startsWith('lead_'),
})

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

    const parsed = bookedSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { leadId } = parsed.data
    const lead = await getLead(leadId)

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    if (lead.status === 'booked') {
      return NextResponse.json({ success: true, alreadyBooked: true })
    }

    await updateLeadStatus(leadId, 'booked')
    console.log('[Intake Audit] Lead marked as booked:', leadId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Intake Audit] Error marking lead as booked:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update lead status' },
      { status: 500 }
    )
  }
}
