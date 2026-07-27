import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend } from '@/lib/email/send'
import { newsletterRatelimit } from '@/lib/rate-limit/public-forms'
import { getClientIp } from '@/lib/request-ip'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
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

    const parsed = newsletterSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const ipResult = await newsletterRatelimit.limit(getClientIp(request))
    if (!ipResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      console.error('[Newsletter] Missing RESEND_AUDIENCE_ID environment variable')
      return NextResponse.json(
        { success: false, error: 'Newsletter signup is not configured' },
        { status: 500 }
      )
    }

    const resend = getResend()

    const { error } = await resend.contacts.create({
      email: parsed.data.email,
      audienceId,
      unsubscribed: false,
    })

    if (error) {
      // Resend returns an error if the contact already exists — treat as success
      if (error.message?.toLowerCase().includes('already exists')) {
        console.log('[Newsletter] Contact already exists')
        return NextResponse.json({ success: true })
      }

      console.error('[Newsletter] Resend error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    console.log('[Newsletter] New subscriber added')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Newsletter] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
