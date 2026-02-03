import { Resend } from 'resend'
import type { Lead } from '@/lib/db/leads'

let resend: Resend | null = null

function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function sendAbandonmentEmail(lead: Lead): Promise<{ success: boolean; error?: string }> {
  const bookingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pi-intake-audit?leadId=${lead.id}`
  const fromEmail = process.env.FROM_EMAIL || 'notifications@yourdomain.com'
  const fromName = process.env.FROM_NAME || 'Kenstera'

  try {
    const { error } = await getResend().emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: lead.email,
      subject: 'Your free intake audit is waiting',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e3a5f; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${lead.fullName.split(' ')[0]},</p>

  <p>I noticed you started your free intake audit but didn't get a chance to book a time.</p>

  <p>No worries—your spot is still available.</p>

  <p>On the call, we'll walk through your current intake process and identify quick wins to improve your conversion rate. No pitch, just actionable insights you can implement right away.</p>

  <p style="margin: 30px 0;">
    <a href="${bookingUrl}" style="background-color: #172554; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500;">
      Book Your Free Audit
    </a>
  </p>

  <p>If you have any questions, just reply to this email.</p>

  <p>
    Best,<br>
    Ken
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="font-size: 12px; color: #6b7280;">
    You're receiving this because you started an intake audit at ${lead.website}.
    If you didn't request this, you can safely ignore this email.
  </p>
</body>
</html>
      `.trim(),
      text: `
Hi ${lead.fullName.split(' ')[0]},

I noticed you started your free intake audit but didn't get a chance to book a time.

No worries—your spot is still available.

On the call, we'll walk through your current intake process and identify quick wins to improve your conversion rate. No pitch, just actionable insights you can implement right away.

Book Your Free Audit: ${bookingUrl}

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

    console.log('[Email] Abandonment email sent to:', lead.email)
    return { success: true }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Email] Exception sending abandonment email:', errorMessage)
    return { success: false, error: errorMessage }
  }
}
