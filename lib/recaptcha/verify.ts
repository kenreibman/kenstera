interface RecaptchaResponse {
  success: boolean
  score: number
  action: string
  challenge_ts: string
  hostname: string
  'error-codes'?: string[]
}

export async function verifyRecaptchaToken(
  token: string,
  remoteip?: string
): Promise<number | null> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) throw new Error('Missing RECAPTCHA_SECRET_KEY')

  const params = new URLSearchParams({ secret, response: token })
  if (remoteip) params.append('remoteip', remoteip)

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const data = (await res.json()) as RecaptchaResponse
  if (!data.success) return null
  return data.score  // 0.0-1.0; higher = more likely human
}
