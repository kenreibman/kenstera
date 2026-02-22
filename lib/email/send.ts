import { Resend } from 'resend'
import type { Lead } from '@/lib/db/leads'
import type { DemoLead } from '@/lib/db/demo-leads'

let resend: Resend | null = null

export function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('Missing RESEND_API_KEY environment variable')
    }
    resend = new Resend(apiKey)
  }
  return resend
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function sendAbandonmentEmail(lead: Lead): Promise<{ success: boolean; error?: string }> {
  const bookingUrl = new URL('https://cal.com/kenstera/intake-15-minutes')
  bookingUrl.searchParams.set('name', lead.fullName)
  bookingUrl.searchParams.set('email', lead.email)
  const fromEmail = process.env.FROM_EMAIL || 'notifications@yourdomain.com'
  const fromName = process.env.FROM_NAME || 'Kenstera'

  const safeFirstName = escapeHtml(lead.fullName.split(' ')[0])
  const safeWebsite = escapeHtml(lead.website)
  const safeBookingUrl = escapeHtml(bookingUrl.toString())
  const plainFirstName = lead.fullName.split(' ')[0]

  try {
    const { error } = await getResend().emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: lead.email,
      subject: 'Quick question about your intake process',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e3a5f; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${safeFirstName},</p>

  <p>I noticed you started your free intake audit but didn't get a chance to book a time.</p>

  <p>No worries—your spot is still available.</p>

  <p>I took a quick look at your website and noticed a few things about your intake flow that are worth discussing—like how your contact form routes and what happens to leads that come in after hours.</p>

  <p>On the call, we'll walk through your intake process together and identify the top gaps costing you signed cases. No pitch, just specific findings you can act on this week.</p>

  <p style="margin: 30px 0;">
    <a href="${safeBookingUrl}" style="background-color: #f59e0b; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
      Claim Your Audit Slot
    </a>
  </p>

  <p>If you have any questions, just reply to this email.</p>

  <p>
    Best,<br>
    Ken
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="font-size: 12px; color: #6b7280;">
    You're receiving this because you started an intake audit at ${safeWebsite}.
    If you didn't request this, you can safely ignore this email.
  </p>
</body>
</html>
      `.trim(),
      text: `
Hi ${plainFirstName},

I noticed you started your free intake audit but didn't get a chance to book a time.

No worries—your spot is still available.

I took a quick look at your website and after hours intake, and I noticed a few things about your intake flow that are worth discussing—like how your contact form routes and what happens to leads that come in after hours.

On the call, we'll walk through your intake process together and identify the top gaps costing you signed cases. No pitch, just specific findings you can act on this week.

Claim Your Audit Slot: ${bookingUrl.toString()}

If you have any questions, just reply to this email.

Best,
Ken

---
You're receiving this because you started an intake audit at ${lead.website}. If you didn't request this, you can safely ignore this email.
      `.trim(),
    })

    if (error) {
      console.error('[Email] Failed to send abandonment email:', error)
      return { success: false, error: error.message }
    }

    console.log('[Email] Abandonment email sent to lead:', lead.id)
    return { success: true }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Email] Exception sending abandonment email:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

export async function sendDemoFollowUpEmail(lead: DemoLead): Promise<{ success: boolean; error?: string }> {
  const bookingUrl = new URL('https://cal.com/kenstera/30min')
  bookingUrl.searchParams.set('name', lead.name)
  bookingUrl.searchParams.set('email', lead.email)
  const fromEmail = process.env.FROM_EMAIL || 'notifications@yourdomain.com'
  const fromName = process.env.FROM_NAME || 'Kenstera'

  const safeFirstName = escapeHtml(lead.name.split(/\s+/)[0])
  const safeBookingUrl = escapeHtml(bookingUrl.toString())
  const plainFirstName = lead.name.split(/\s+/)[0]

  try {
    const { error } = await getResend().emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: lead.email,
      subject: `${plainFirstName}, quick thought after your demo call`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e3a5f; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${safeFirstName},</p>

  <p>Thanks for trying the demo. What you just heard was a 2-minute sample&mdash;here's what the full version actually does for firms like yours:</p>

  <p><strong>It picks up every call, 24/7.</strong> Nights, weekends, holidays&mdash;the hours when most high-value leads call and hit voicemail. Every missed call is a potential case walking to the firm down the street. Our system answers instantly, every time.</p>

  <p><strong>It runs your intake, not a generic script.</strong> We build custom qualification logic around your practice areas, case criteria, and intake rules. The agent asks the right questions, screens out cases that don't fit, and flags the ones that do&mdash;so your team only spends time on leads that actually matter.</p>

  <p><strong>It books qualified callers directly onto your calendar.</strong> No sticky notes, no callback lists, no leads slipping through the cracks. By the time your team sees it, the consult is already scheduled.</p>

  <p><strong>It gives your admin staff their time back.</strong> Routine intake calls, basic qualification, appointment scheduling&mdash;that's hours of staff time every week that gets redirected to billable work and client service instead of phone tag.</p>

  <p><strong>It gives you real numbers to track.</strong> You get a full analytics dashboard&mdash;call volume, qualification rates, conversion by source, peak hours, and how your intake performance changes over time. No more guessing whether your intake process is working.</p>

  <p>Most firms we work with don't realize how many qualified leads they're losing until they see the data. The ones that move on this early tend to have a real edge over competitors still relying on voicemail and overworked front desks.</p>

  <p>I'd like to show you exactly how this would look configured for your firm&mdash;your practice areas, your qualification criteria, your scheduling. Takes 30 minutes, no obligation.</p>

  <p style="margin: 30px 0;">
    <a href="${safeBookingUrl}" style="background-color: #f59e0b; color: #1a1a1a; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
      Book a 30-Min Call
    </a>
  </p>

  <p>If you have questions before then, just hit reply.</p>

  <p>
    Best,<br>
    Ken
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="font-size: 12px; color: #6b7280;">
    You're receiving this because you requested a demo call at kenstera.com.
    If you didn't request this, you can safely ignore this email.
  </p>
</body>
</html>
      `.trim(),
      text: `
Hi ${plainFirstName},

Thanks for trying the demo. What you just heard was a 2-minute sample — here's what the full version actually does for firms like yours:

IT PICKS UP EVERY CALL, 24/7.
Nights, weekends, holidays — the hours when most high-value leads call and hit voicemail. Every missed call is a potential case walking to the firm down the street. Our system answers instantly, every time.

IT RUNS YOUR INTAKE, NOT A GENERIC SCRIPT.
We build custom qualification logic around your practice areas, case criteria, and intake rules. The agent asks the right questions, screens out cases that don't fit, and flags the ones that do — so your team only spends time on leads that actually matter.

IT BOOKS QUALIFIED CALLERS DIRECTLY ONTO YOUR CALENDAR.
No sticky notes, no callback lists, no leads slipping through the cracks. By the time your team sees it, the consult is already scheduled.

IT GIVES YOUR ADMIN STAFF THEIR TIME BACK.
Routine intake calls, basic qualification, appointment scheduling — that's hours of staff time every week that gets redirected to billable work and client service instead of phone tag.

IT GIVES YOU REAL NUMBERS TO TRACK.
You get a full analytics dashboard — call volume, qualification rates, conversion by source, peak hours, and how your intake performance changes over time. No more guessing whether your intake process is working.

Most firms we work with don't realize how many qualified leads they're losing until they see the data. The ones that move on this early tend to have a real edge over competitors still relying on voicemail and overworked front desks.

I'd like to show you exactly how this would look configured for your firm — your practice areas, your qualification criteria, your scheduling. Takes 30 minutes, no obligation.

Book a 30-Min Call: ${bookingUrl.toString()}

If you have questions before then, just hit reply.

Best,
Ken

---
You're receiving this because you requested a demo call at kenstera.com. If you didn't request this, you can safely ignore this email.
      `.trim(),
    })

    if (error) {
      console.error('[Email] Failed to send demo follow-up email:', error)
      return { success: false, error: error.message }
    }

    console.log('[Email] Demo follow-up email sent to lead:', lead.id)
    return { success: true }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Email] Exception sending demo follow-up email:', errorMessage)
    return { success: false, error: errorMessage }
  }
}
