import type { NextRequest } from 'next/server'

// On Vercel, x-forwarded-for is set by the platform and cannot be spoofed by
// the client. If this app ever moves off Vercel (or behind another proxy),
// re-verify that the leftmost value here is trustworthy before relying on it
// for rate limiting.
export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}
