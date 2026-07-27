import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { Client } from '@upstash/qstash'
import { ipRatelimit, phoneRatelimit } from '@/lib/rate-limit/demo-call'
import { getClientIp } from '@/lib/request-ip'
import { verifyRecaptchaToken } from '@/lib/recaptcha/verify'
import { retell } from '@/lib/retell/client'
import { createDemoLead } from '@/lib/db/demo-leads'

const MAX_CALL_DURATION_MS = 120_000
const FOLLOWUP_DELAY_SECONDS = 15 * 60 // 15 minutes

const bodySchema = z.object({
  phone: z.string().min(1),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  recaptchaToken: z.string().optional(),
})

const RECAPTCHA_MIN_SCORE = 0.5

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

    // 2. Validate schema with Zod
    const parsed = bodySchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const { phone, name, email, recaptchaToken } = parsed.data
    const clientIp = getClientIp(request)

    // Fail fast on misconfiguration — before consuming the visitor's
    // once-per-10-minutes rate-limit token on a call that cannot be placed.
    const fromNumber = process.env.RETELL_PHONE_NUMBER
    if (!fromNumber) {
      console.error('[Demo Call] Missing RETELL_PHONE_NUMBER environment variable')
      return NextResponse.json(
        { success: false, error: 'Demo calls are temporarily unavailable.' },
        { status: 503 }
      )
    }

    // 3. Validate phone number as real US number (libphonenumber-js)
    const parsedPhone = parsePhoneNumberFromString(phone, 'US')
    if (!parsedPhone || !parsedPhone.isValid() || parsedPhone.country !== 'US') {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid US phone number.' },
        { status: 400 }
      )
    }
    const e164Phone = parsedPhone.format('E.164')

    // 3b. Verify reCAPTCHA v3 when configured (SEC-03). Runs before the rate
    // limits so a rejected bot doesn't burn a legitimate visitor's IP quota.
    // Skips gracefully until RECAPTCHA_SECRET_KEY is set in the environment.
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const score = recaptchaToken
        ? await verifyRecaptchaToken(recaptchaToken, clientIp, 'demo_call')
        : null
      if (score === null || score < RECAPTCHA_MIN_SCORE) {
        console.warn('[Demo Call] reCAPTCHA rejected:', { ip: clientIp, score })
        return NextResponse.json(
          { success: false, error: 'Verification failed. Please refresh the page and try again.' },
          { status: 400 }
        )
      }
    } else {
      console.warn('[Demo Call] RECAPTCHA_SECRET_KEY not set — skipping bot verification')
    }

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
      from_number: fromNumber,
      to_number: e164Phone,
      retell_llm_dynamic_variables: {
        caller_name: name.split(/\s+/)[0],
      },
      agent_override: {
        agent: {
          max_call_duration_ms: MAX_CALL_DURATION_MS,
        },
      },
    })

    console.log('[Demo Call] Call triggered:', { ip: clientIp, phone: e164Phone })

    // 8. Store demo lead and schedule follow-up email
    try {
      const lead = await createDemoLead({ name: name.trim(), email: email.trim() })

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      if (baseUrl) {
        await getQStash().publishJSON({
          url: `${baseUrl}/api/demo-call/send-followup`,
          body: { leadId: lead.id },
          delay: FOLLOWUP_DELAY_SECONDS,
        })

        console.log('[Demo Call] Scheduled follow-up email:', {
          leadId: lead.id,
          delayMinutes: FOLLOWUP_DELAY_SECONDS / 60,
        })
      } else {
        console.error('[Demo Call] Missing NEXT_PUBLIC_BASE_URL, cannot schedule follow-up email')
      }
    } catch (emailError) {
      // Don't fail the call if email scheduling fails
      console.error('[Demo Call] Failed to schedule follow-up email:', emailError)
    }

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
