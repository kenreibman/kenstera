import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { ipRatelimit, phoneRatelimit } from '@/lib/rate-limit/demo-call'
import { retell } from '@/lib/retell/client'

const MAX_CALL_DURATION_MS = 120_000

const bodySchema = z.object({
  phone: z.string().min(1),
  name: z.string().min(1).max(100),
})

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse JSON body
    let data: unknown
    try {
      data = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    // 2. Validate schema with Zod (phone + recaptchaToken required)
    const parsed = bodySchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const { phone, name } = parsed.data
    const clientIp = getClientIp(request)

    // 3. Validate phone number as real US number (libphonenumber-js)
    const parsedPhone = parsePhoneNumberFromString(phone, 'US')
    if (!parsedPhone || !parsedPhone.isValid() || parsedPhone.country !== 'US') {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid US phone number.' },
        { status: 400 }
      )
    }
    const e164Phone = parsedPhone.format('E.164')

    // 4. Check IP rate limit (Upstash sliding window, 1 per 10 min)
    const ipResult = await ipRatelimit.limit(clientIp)
    if (!ipResult.success) {
      const retryAfter = Math.ceil((ipResult.reset - Date.now()) / 1000)
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests from your location. Try again in 10 minutes.',
          retryAfter,
        },
        { status: 429 }
      )
    }

    // 5. Check phone number rate limit (Upstash sliding window, 1 per 10 min)
    const phoneResult = await phoneRatelimit.limit(e164Phone)
    if (!phoneResult.success) {
      const retryAfter = Math.ceil((phoneResult.reset - Date.now()) / 1000)
      return NextResponse.json(
        {
          success: false,
          error: 'This number already received a demo call recently. Try again in 10 minutes.',
          retryAfter,
        },
        { status: 429 }
      )
    }

    // 6. Log consent (SEC-05): structured console.log with timestamp, IP, phone
    console.log('[Demo Call] Consent logged:', JSON.stringify({
      timestamp: new Date().toISOString(),
      ip: clientIp,
      phone: e164Phone,
    }))

    // 7. Create Retell outbound call with agent_override.agent.max_call_duration_ms: 120_000 (SEC-04)
    // CRITICAL: Do NOT set max_call_duration_ms on the agent object — always use agent_override at the
    // per-call level to avoid agent version mismatch (per STATE.md decision from Phase 1).
    await retell.call.createPhoneCall({
      from_number: process.env.RETELL_PHONE_NUMBER!,
      to_number: e164Phone,
      retell_llm_dynamic_variables: {
        caller_name: name,
      },
      agent_override: {
        agent: {
          max_call_duration_ms: MAX_CALL_DURATION_MS,
        },
      },
    })

    console.log('[Demo Call] Call triggered:', { ip: clientIp, phone: e164Phone })

    // 8. Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Demo Call] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
