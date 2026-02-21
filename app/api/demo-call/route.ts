import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { verifyRecaptchaToken } from '@/lib/recaptcha/verify'
import { ipRatelimit, phoneRatelimit } from '@/lib/rate-limit/demo-call'
import { retell } from '@/lib/retell/client'

const RECAPTCHA_THRESHOLD = 0.3
const MAX_CALL_DURATION_MS = 180_000

const bodySchema = z.object({
  phone: z.string().min(1),
  recaptchaToken: z.string().min(1),
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

    const { phone, recaptchaToken } = parsed.data
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

    // 4. Verify reCAPTCHA token server-side (before rate limits to avoid counter poisoning by bots)
    const score = await verifyRecaptchaToken(recaptchaToken, clientIp)
    if (score === null || score < RECAPTCHA_THRESHOLD) {
      return NextResponse.json(
        { success: false, error: 'Verification failed.' },
        { status: 401 }
      )
    }

    // 5. Check IP rate limit (Upstash sliding window, 1 per 10 min)
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

    // 6. Check phone number rate limit (Upstash sliding window, 1 per 10 min)
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

    // 7. Log consent (SEC-05): structured console.log with timestamp, IP, phone, reCAPTCHA score
    console.log('[Demo Call] Consent logged:', JSON.stringify({
      timestamp: new Date().toISOString(),
      ip: clientIp,
      phone: e164Phone,
      recaptchaScore: score,
    }))

    // 8. Create Retell outbound call with agent_override.agent.max_call_duration_ms: 180_000 (SEC-04)
    // CRITICAL: Do NOT set max_call_duration_ms on the agent object — always use agent_override at the
    // per-call level to avoid agent version mismatch (per STATE.md decision from Phase 1).
    await retell.call.createPhoneCall({
      from_number: process.env.RETELL_PHONE_NUMBER!,
      to_number: e164Phone,
      agent_override: {
        agent: {
          max_call_duration_ms: MAX_CALL_DURATION_MS,
        },
      },
    })

    console.log('[Demo Call] Call triggered:', { ip: clientIp, phone: e164Phone })

    // 9. Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Demo Call] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
