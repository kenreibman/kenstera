import { NextRequest, NextResponse } from 'next/server'

// This endpoint captures Step 1 form data before the user completes the full flow
// Connect this to your CRM, email service, or webhook later

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Log the captured data (replace with your integration)
    console.log('[Intake Audit] Lead captured:', {
      timestamp: new Date().toISOString(),
      email: data.email,
      website: data.website,
      role: data.role,
      practiceArea: data.practiceArea,
      inboundLeads: data.inboundLeads,
      isQualified: data.isQualified,
    })

    // TODO: Add your integration here. Examples:
    //
    // 1. Send to webhook (Zapier, Make, etc.):
    // await fetch('https://hooks.zapier.com/hooks/catch/...', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    //
    // 2. Send to HubSpot:
    // await fetch('https://api.hubapi.com/contacts/v1/contact/', { ... })
    //
    // 3. Send email notification:
    // await sendEmail({ to: 'you@firm.com', subject: 'New Lead', body: ... })
    //
    // 4. Store in database:
    // await db.leads.create({ data })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Intake Audit] Error capturing lead:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}
