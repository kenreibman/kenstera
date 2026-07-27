// Client-side reCAPTCHA v3 (invisible) token fetch.
// Resolves to null when reCAPTCHA is not configured or unavailable — the
// server decides whether a missing token is acceptable.

declare global {
  interface Window {
    grecaptcha?: {
      ready(cb: () => void): void
      execute(siteKey: string, opts: { action: string }): Promise<string>
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

let loadPromise: Promise<void> | null = null

function loadScript(siteKey: string): Promise<void> {
  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        loadPromise = null
        reject(new Error('Failed to load reCAPTCHA script'))
      }
      document.head.appendChild(script)
    })
  }
  return loadPromise
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!SITE_KEY || typeof window === 'undefined') return null
  try {
    await loadScript(SITE_KEY)
    await new Promise<void>((resolve) => window.grecaptcha!.ready(resolve))
    return await window.grecaptcha!.execute(SITE_KEY, { action })
  } catch (error) {
    console.error('reCAPTCHA unavailable:', error)
    return null
  }
}
