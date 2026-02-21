# Phase 2: Secure API Route - Research

**Researched:** 2026-02-21
**Domain:** Next.js App Router API route — phone validation, reCAPTCHA v3 server verification, Upstash sliding-window rate limiting, Retell outbound call creation, consent logging
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Rate limiting**
- 10-minute sliding window for both IP-based and phone-number-based limits
- One call per phone number per 10 minutes, one call per IP per 10 minutes
- Unlimited repeat demos after the window expires — no lifetime cap per number
- Implemented via Upstash Redis (per requirements)

**Consent logging**
- Server logs only for v1 (console.log with structured data: timestamp, IP, phone number)
- Reviewable via Vercel function logs
- No durable database storage needed at this stage (CMPL-02 in v2 requirements covers durable audit trail)

### Claude's Discretion

- API response JSON shape (success and error payloads) — design for Phase 4 UI consumption
- reCAPTCHA v3 score threshold (reasonable default for a public demo widget)
- Error message wording for 400/401/429 responses
- Phone number validation library choice
- Route path naming
- Upstash Redis key structure and TTL mechanics

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEC-01 | Retell API key is accessed only server-side via API route (never in client bundle) | `lib/retell/client.ts` already implements server-only singleton with build-time guard; import it directly |
| SEC-02 | Submissions are rate-limited per IP address (sliding window via Upstash Redis) | `@upstash/ratelimit` SlidingWindow(1, "10 m") with IP as identifier; `@upstash/redis` already in `package.json` |
| SEC-03 | Submissions are rate-limited per phone number (sliding window via Upstash Redis) | Same library, separate Ratelimit instance or same instance with phone number as identifier |
| SEC-04 | Call duration is hard-capped at 180 seconds via `max_call_duration_ms` set at per-call API level | Confirmed in `retell-sdk` types: `agent_override.agent.max_call_duration_ms` on `CallCreatePhoneCallParams` |
| SEC-05 | Consent timestamp and IP address are logged server-side when a call is triggered | `console.log` with structured JSON object containing timestamp, IP, phone — visible in Vercel function logs |
</phase_requirements>

---

## Summary

Phase 2 builds a single Next.js App Router route handler (`POST /api/demo-call`) that enforces all security controls in a strict pipeline: parse + validate JSON body, validate phone number as a real US number, verify reCAPTCHA v3 token with Google, check IP rate limit, check phone number rate limit, log consent, and finally call `retell.call.createPhoneCall()` with a 180-second duration cap. No UI exists yet; the route must be testable via curl/Postman.

All five dependencies are either already in `package.json` (`retell-sdk`, `@upstash/redis`, `zod`) or require one new install (`@upstash/ratelimit`, and optionally `libphonenumber-js`). The existing Retell client singleton in `lib/retell/client.ts` and the Upstash Redis pattern from `lib/db/leads.ts` define the project conventions to follow. The reCAPTCHA v3 server-side verification requires no npm package — it is a direct `fetch` POST to `https://www.google.com/recaptcha/api/siteverify`.

The two known risks are: (1) reCAPTCHA environment variables (`RECAPTCHA_SECRET_KEY`) are not yet in `.env.local` and need to be added before the route can run; (2) Upstash Redis credentials (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are also not yet present — they are needed for rate limiting to work and must be provisioned from the Upstash console.

**Primary recommendation:** Build one `app/api/demo-call/route.ts` handler following the existing `capture/route.ts` pattern (Zod parse → validate → side-effects → response). Add `lib/rate-limit/demo-call.ts` for the two Ratelimit instances (IP + phone) to keep the route file lean. Add `lib/recaptcha/verify.ts` for the Google verification helper.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` (App Router route handler) | 16.1.3 (in use) | `POST /api/demo-call` endpoint | Already the project framework |
| `zod` | 4.3.6 (in use) | Request body validation schema | Already in use throughout the project |
| `retell-sdk` | 5.2.0 (in use) | `retell.call.createPhoneCall()` | Already in use; singleton in `lib/retell/client.ts` |
| `@upstash/redis` | 1.36.2 (in use) | Redis client passed to Ratelimit | Already in `package.json`; already used in `lib/db/leads.ts` |
| `@upstash/ratelimit` | 2.0.8 (latest) | Sliding window rate limiting | Official Upstash rate-limit library for serverless |
| `libphonenumber-js` | 1.12.37 (latest) | US phone number validation | Most accurate phone validation; Google-derived rules |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Native `fetch` (Node 18+) | built-in | reCAPTCHA siteverify POST | No npm package needed; Next.js 16 uses Node 18+ |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `libphonenumber-js` | Zod `.regex()` with E.164 pattern | Regex can't detect fake/invalid area codes; `libphonenumber-js` validates actual NANP rules |
| `@upstash/ratelimit` | Manual Redis `INCR` + `EXPIRE` | Hand-rolling sliding window is error-prone; race conditions without Lua scripts |
| Native `fetch` for reCAPTCHA | `axios` or `node-fetch` | No benefit; Node 18 fetch is stable |

**Installation (new dependencies only):**
```bash
npm install @upstash/ratelimit libphonenumber-js
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/api/demo-call/
└── route.ts              # POST handler — thin orchestration layer

lib/rate-limit/
└── demo-call.ts          # Two Ratelimit instances (IP + phone), getRedis() helper

lib/recaptcha/
└── verify.ts             # verifyRecaptchaToken(token, ip?) → score | null

lib/retell/
└── client.ts             # Already exists — server-only singleton
```

### Pattern 1: Pipeline Validation (project convention)

**What:** Every POST handler follows: parse JSON → validate schema → business checks → side effects → response. Established in `newsletter/route.ts` and `pi-intake-audit/capture/route.ts`.

**When to use:** Always — this is the existing project pattern.

**Example (from `app/api/pi-intake-audit/capture/route.ts`):**
```typescript
// Source: C:/Users/DESKTOP/kenstera/app/api/pi-intake-audit/capture/route.ts
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

    const parsed = captureSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed' },
        { status: 400 }
      )
    }
    // ... business logic ...
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Demo Call] Unexpected error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
  }
}
```

### Pattern 2: Upstash Rate Limiting (sliding window)

**What:** Instantiate one `Ratelimit` per identifier type. Call `ratelimit.limit(identifier)` and check `success`. Use `prefix` to namespace keys.

**When to use:** Two separate checks needed — one for IP, one for phone number. Run them sequentially (IP first, phone second) so the error response correctly identifies which limit was hit.

**Example:**
```typescript
// Source: https://github.com/upstash/ratelimit-js (verified)
// lib/rate-limit/demo-call.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) throw new Error('Missing Upstash credentials')
    redis = new Redis({ url, token })
  }
  return redis
}

// 1 call per IP per 10-minute sliding window
export const ipRatelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(1, '10 m'),
  prefix: 'demo-call:ip',
})

// 1 call per phone number per 10-minute sliding window
export const phoneRatelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(1, '10 m'),
  prefix: 'demo-call:phone',
})
```

> NOTE: `Ratelimit` instances are initialized at module load time. The `getRedis()` lazy singleton matches the project's existing `lib/db/leads.ts` pattern.

**In the route handler:**
```typescript
const ipResult = await ipRatelimit.limit(clientIp)
if (!ipResult.success) {
  return NextResponse.json({ success: false, error: 'Too many requests. Try again in 10 minutes.' }, { status: 429 })
}

const phoneResult = await phoneRatelimit.limit(phone)
if (!phoneResult.success) {
  return NextResponse.json({ success: false, error: 'This number was already called recently. Try again in 10 minutes.' }, { status: 429 })
}
```

### Pattern 3: reCAPTCHA v3 Server Verification

**What:** POST to `https://www.google.com/recaptcha/api/siteverify` with `application/x-www-form-urlencoded` body. Check `success` and `score`. Token is single-use (two-minute lifetime).

**When to use:** Before rate limit checks — reject forged tokens cheaply before touching Redis.

**Example:**
```typescript
// Source: https://developers.google.com/recaptcha/docs/verify (official)
// lib/recaptcha/verify.ts

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
  return data.score  // 0.0–1.0; 1.0 = human, 0.0 = bot
}
```

**Score threshold recommendation:** 0.5 is Google's stated default. For a public demo form (low stakes, low volume), 0.3 is a reasonable floor that balances accessibility against bot traffic.

**In the route handler:**
```typescript
const score = await verifyRecaptchaToken(recaptchaToken, clientIp)
if (score === null || score < RECAPTCHA_THRESHOLD) {
  return NextResponse.json({ success: false, error: 'Verification failed.' }, { status: 401 })
}
```

### Pattern 4: Phone Number Validation (US-only)

**What:** Parse with `libphonenumber-js`, check `.isValid()` and `.country === 'US'`. This rejects non-US, fake area codes, and malformed strings that pass a regex check.

**Example:**
```typescript
// Source: https://github.com/catamphetamine/libphonenumber-js (official README)
import { parsePhoneNumberFromString } from 'libphonenumber-js'

function isValidUSPhone(phone: string): boolean {
  const parsed = parsePhoneNumberFromString(phone, 'US')
  return parsed !== undefined && parsed.isValid() && parsed.country === 'US'
}
```

The input from the client should be in E.164 format (`+1XXXXXXXXXX`). The `parsePhoneNumberFromString` function handles both E.164 and national format when a default country is specified.

### Pattern 5: Retell createPhoneCall with per-call duration cap

**What:** `retell.call.createPhoneCall()` accepts `agent_override.agent.max_call_duration_ms`. Per SDK types, the minimum is 60,000 ms (1 min), maximum is 7,200,000 ms (2 hrs). Set to 180,000 ms (3 min).

**Example:**
```typescript
// Source: C:/Users/DESKTOP/kenstera/node_modules/retell-sdk/resources/call.d.ts (verified)
// lib/retell/client.ts already exports `retell`

const call = await retell.call.createPhoneCall({
  from_number: process.env.RETELL_PHONE_NUMBER!,
  to_number: phone,  // validated US E.164
  agent_override: {
    agent: {
      max_call_duration_ms: 180_000,
    },
  },
})
// call.call_id is the result
```

### Pattern 6: Client IP Extraction in Next.js App Router

**What:** In App Router route handlers, `request.ip` is available on Vercel. For local dev or other hosts, fall back to `X-Forwarded-For`.

**When to use:** Extract IP at the top of the handler before any other logic.

```typescript
// Source: Verified via Next.js GitHub discussion #55037 and Vercel platform docs
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}
```

`x-forwarded-for` is a comma-separated list when behind multiple proxies; always take the first element.

### Pattern 7: Consent Logging

**What:** `console.log` with a structured JSON object. Vercel captures all stdout from function logs.

```typescript
// Fired immediately before calling Retell (after all checks pass)
console.log('[Demo Call] Consent logged:', JSON.stringify({
  timestamp: new Date().toISOString(),
  ip: clientIp,
  phone: phone,
  recaptchaScore: score,
}))
```

### Anti-Patterns to Avoid

- **Lazy Ratelimit initialization inside the handler:** Instantiate at module level (outside the `POST` function). The SDK is connectionless HTTP so there is no socket overhead — module-level is fine and avoids repeated object creation.
- **Checking rate limits before reCAPTCHA:** Bots can poison rate-limit counters with forged phone numbers. Verify reCAPTCHA first (cheapest check), then rate limits.
- **Setting `max_call_duration_ms` on the agent object (not per-call):** The STATE.md explicitly records that setting it on the agent causes version mismatch issues. Always use `agent_override.agent.max_call_duration_ms` at the per-call level.
- **Returning the Retell `call_id` to the client:** The call is already ringing. No client-side action depends on it. Returning it leaks infrastructure details; omit it from the success response or return it only for debugging.
- **Using `Redis.fromEnv()` directly in rate-limit module:** The project uses a custom singleton `getRedis()` that reads `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`. Follow that pattern for consistency; `Redis.fromEnv()` reads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` automatically but is equivalent.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sliding-window rate limiting | Custom Redis INCR+EXPIRE or counters | `@upstash/ratelimit` `SlidingWindow` | Race conditions, window boundary bursts, Lua script complexity |
| Phone number format validation | Regex `/^\+1[2-9]\d{9}$/` | `libphonenumber-js` `parsePhoneNumberFromString` | Regex passes numbers with invalid NANP area codes (e.g., +12001234567); libphonenumber validates actual carrier rules |
| reCAPTCHA verification | Custom JWT decode or front-end-only check | Google `siteverify` fetch call | Token must be verified server-side; client-side is bypassable |

**Key insight:** The sliding-window counter must be atomically checked AND incremented in one Redis round trip. Upstash Ratelimit uses Lua scripts internally to achieve this. A hand-rolled INCR + conditional logic is not atomic and creates a race condition at high concurrency.

---

## Common Pitfalls

### Pitfall 1: max_call_duration_ms at agent level vs. per-call level

**What goes wrong:** Setting the duration cap in the Retell agent config (not the `agent_override` per-call param) causes a "version mismatch" error because the agent must be updated to a new version, which may fail if the agent is in use or has draft state issues.

**Why it happens:** Retell agent updates create a new version. The per-call `agent_override` sidesteps this entirely.

**How to avoid:** Always use `agent_override.agent.max_call_duration_ms: 180_000` in `createPhoneCall()`. Never update the agent for this purpose.

**Warning signs:** Retell API returning 422 or version conflict errors on the agent update endpoint.

### Pitfall 2: reCAPTCHA token reuse (timeout-or-duplicate)

**What goes wrong:** If the client sends the same reCAPTCHA token twice (double-click, retry), Google returns `"timeout-or-duplicate"` in `error-codes` and `success: false`. The handler would return 401.

**Why it happens:** Each reCAPTCHA v3 token is valid for 2 minutes and can only be verified once.

**How to avoid:** SEC-04's UX complement (Phase 4: UX-04 — disable submit button after first click) prevents double-submission. At the API level, a 401 on duplicate token is correct behavior.

**Warning signs:** Frontend retrying on 401 without refreshing the token.

### Pitfall 3: Rate limit key collision between different limiters

**What goes wrong:** If two `Ratelimit` instances share the same Redis instance without distinct `prefix` values, their keys can collide when an IP address string happens to equal a phone number string (unlikely but structurally unsafe).

**Why it happens:** Default prefix is `@upstash/ratelimit` for all instances.

**How to avoid:** Use distinct `prefix` values: `demo-call:ip` and `demo-call:phone`.

**Warning signs:** Rate limit triggering with 0 actual requests from an IP or phone.

### Pitfall 4: x-forwarded-for spoofing

**What goes wrong:** A bot can send a forged `X-Forwarded-For` header to bypass IP rate limiting.

**Why it happens:** On Vercel, Vercel itself sets the `X-Forwarded-For` header and the original client cannot override the first entry. Locally (behind no trusted proxy), any value can be injected.

**How to avoid:** On Vercel production, the first IP in `X-Forwarded-For` is set by Vercel's edge network and cannot be spoofed. Accept this limitation for local dev. The phone-number rate limit provides a second independent check that cannot be IP-spoofed.

**Warning signs:** Rate limit bypass in local testing — expected and acceptable.

### Pitfall 5: Missing environment variables at runtime

**What goes wrong:** `RECAPTCHA_SECRET_KEY`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` are not in `.env.local` and will cause runtime throws.

**Why it happens:** Phase 1 only provisioned Retell variables. Phase 2 requires three additional secrets.

**How to avoid:** The plan must include a step to add these variables to `.env.local` before any other step executes.

**Warning signs:** `Error: Missing RECAPTCHA_SECRET_KEY` or `Error: Missing Upstash credentials` thrown at route invocation.

---

## Code Examples

Verified patterns from official sources:

### Complete route handler skeleton

```typescript
// app/api/demo-call/route.ts
// Source: project convention (capture/route.ts) + verified library APIs
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
    // 1. Parse body
    let data: unknown
    try {
      data = await request.json()
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = bodySchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 })
    }

    const { phone, recaptchaToken } = parsed.data
    const clientIp = getClientIp(request)

    // 2. Validate US phone number
    const parsedPhone = parsePhoneNumberFromString(phone, 'US')
    if (!parsedPhone || !parsedPhone.isValid() || parsedPhone.country !== 'US') {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid US phone number.' },
        { status: 400 }
      )
    }
    const e164Phone = parsedPhone.format('E.164')  // normalized form for Redis key

    // 3. Verify reCAPTCHA (before Redis to avoid counter poisoning)
    const score = await verifyRecaptchaToken(recaptchaToken, clientIp)
    if (score === null || score < RECAPTCHA_THRESHOLD) {
      return NextResponse.json({ success: false, error: 'Verification failed.' }, { status: 401 })
    }

    // 4. Rate limit: IP
    const ipResult = await ipRatelimit.limit(clientIp)
    if (!ipResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests from your location. Try again in 10 minutes.' },
        { status: 429 }
      )
    }

    // 5. Rate limit: phone number
    const phoneResult = await phoneRatelimit.limit(e164Phone)
    if (!phoneResult.success) {
      return NextResponse.json(
        { success: false, error: 'This number already received a demo call recently. Try again in 10 minutes.' },
        { status: 429 }
      )
    }

    // 6. Log consent (SEC-05) — before placing the call
    console.log('[Demo Call] Consent logged:', JSON.stringify({
      timestamp: new Date().toISOString(),
      ip: clientIp,
      phone: e164Phone,
      recaptchaScore: score,
    }))

    // 7. Trigger Retell outbound call (SEC-01, SEC-04)
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Demo Call] Unexpected error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
```

### reCAPTCHA verification helper

```typescript
// lib/recaptcha/verify.ts
// Source: https://developers.google.com/recaptcha/docs/verify (official)
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
  return data.score
}
```

### Rate limit module

```typescript
// lib/rate-limit/demo-call.ts
// Source: https://github.com/upstash/ratelimit-js README (verified)
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN')
    redis = new Redis({ url, token })
  }
  return redis
}

export const ipRatelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(1, '10 m'),
  prefix: 'demo-call:ip',
})

export const phoneRatelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(1, '10 m'),
  prefix: 'demo-call:phone',
})
```

### curl test commands for manual verification

```bash
# Valid request (replace TOKEN with real reCAPTCHA token)
curl -X POST http://localhost:3000/api/demo-call \
  -H "Content-Type: application/json" \
  -d '{"phone":"+12125551234","recaptchaToken":"TEST_TOKEN"}'

# Non-US phone → expect 400
curl -X POST http://localhost:3000/api/demo-call \
  -H "Content-Type: application/json" \
  -d '{"phone":"+447911123456","recaptchaToken":"TEST_TOKEN"}'

# Missing token → expect 400
curl -X POST http://localhost:3000/api/demo-call \
  -H "Content-Type: application/json" \
  -d '{"phone":"+12125551234"}'
```

> Note: In local dev without real reCAPTCHA keys, the verifyRecaptchaToken call will throw (missing env var). The plan should include a step to create a `RECAPTCHA_SECRET_KEY=test` stub or skip reCAPTCHA in dev mode.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `max_call_duration_ms` on the agent resource | `agent_override.agent.max_call_duration_ms` per-call | Retell SDK 5.x | Avoids agent version mutation; no agent re-publish needed |
| Pages Router `req.socket.remoteAddress` | App Router `request.headers.get('x-forwarded-for')` | Next.js 13 App Router | Web API request; no Node.js socket access |
| `node-fetch` for external HTTP calls | Native `fetch` (Node 18+) | Node 18 / Next.js 13 | No extra dependency needed |
| `ioredis` for rate limiting | `@upstash/redis` + `@upstash/ratelimit` | Serverless/edge era | HTTP-based; no persistent TCP connection required |

**Deprecated/outdated:**
- `react-google-recaptcha-v3`: STATE.md flags React 19 peer dep compatibility as LOW confidence. This is a Phase 4 concern (the client-side reCAPTCHA widget). Phase 2 only needs the server-side secret-key verification — no client library needed here.

---

## Open Questions

1. **reCAPTCHA secret key environment variable — where to obtain it**
   - What we know: Google reCAPTCHA v3 requires registering a site domain to get a site key (public) and secret key (private). The secret key goes in `.env.local` as `RECAPTCHA_SECRET_KEY`.
   - What's unclear: Whether a test/development key exists that bypasses score checking, or whether we need a real registered domain. Google provides `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` as a test secret key for development (always returns score 1.0 and `success: true`).
   - Recommendation: Use Google's published test secret key for local dev; register the real domain for production. The plan should document both.

2. **Upstash Redis credentials not yet in .env.local**
   - What we know: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are consumed by `lib/db/leads.ts` but are not present in `.env.local` (which only has Retell vars).
   - What's unclear: Whether an Upstash Redis database already exists (from a different context) or needs to be created.
   - Recommendation: Plan step 0 must add these credentials. The Upstash console provides them after creating a free Redis database. Planner should include this as the first verification task.

3. **API response shape for Phase 4 UI**
   - What we know: Phase 4 will add the form UI and needs to handle 400, 401, 429, 500, and 200 from this route.
   - What's unclear: Whether the UI will need `retryAfter` (seconds until rate limit resets) in the 429 response body.
   - Recommendation: Include `retryAfter: 600` (10 minutes in seconds) in 429 response body using `ipResult.reset` or simply a constant `600`. This makes Phase 4's UX-05 (retry countdown) straightforward without needing to re-architect the API. The `reset` field from `Ratelimit.limit()` is a Unix timestamp — `Math.ceil((reset - Date.now()) / 1000)` converts it to seconds remaining.

---

## Sources

### Primary (HIGH confidence)
- `C:/Users/DESKTOP/kenstera/node_modules/retell-sdk/resources/call.d.ts` — `CallCreatePhoneCallParams`, `AgentOverride.Agent.max_call_duration_ms` field, `createPhoneCall` method signature — verified locally from installed SDK
- `C:/Users/DESKTOP/kenstera/lib/retell/client.ts` — existing server-only Retell singleton pattern
- `C:/Users/DESKTOP/kenstera/lib/db/leads.ts` — existing Upstash Redis singleton pattern
- `C:/Users/DESKTOP/kenstera/app/api/pi-intake-audit/capture/route.ts` — existing route handler convention (Zod parse → validate → side effects)
- `https://developers.google.com/recaptcha/docs/verify` — official reCAPTCHA siteverify endpoint, POST params, response schema, error codes
- `https://github.com/upstash/ratelimit-js` README — Ratelimit constructor, slidingWindow, limit() return shape, prefix option
- `https://upstash.com/docs/redis/sdks/ratelimit-ts/algorithms` — sliding window algorithm behavior, time string format

### Secondary (MEDIUM confidence)
- `https://www.npmjs.com/package/@upstash/ratelimit` — version 2.0.8 confirmed current
- `https://www.npmjs.com/package/libphonenumber-js` — version 1.12.37 confirmed current; `parsePhoneNumberFromString` + `.country` validation pattern
- Next.js GitHub discussion #55037 — `x-forwarded-for` IP extraction in App Router

### Tertiary (LOW confidence)
- Google test reCAPTCHA secret key `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` — widely documented in community but not on the official docs page reviewed; verify before using in plan.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified locally or via official npm/docs
- Architecture: HIGH — patterns derived from existing project code + official library APIs
- Pitfalls: HIGH — SDK type inspection + official Retell docs note on agent versioning (recorded in STATE.md)
- reCAPTCHA verification: HIGH — official Google docs reviewed
- Rate limiting: HIGH — official Upstash docs + library README reviewed

**Research date:** 2026-02-21
**Valid until:** 2026-03-23 (30 days — stable libraries; reCAPTCHA and Retell API stable)
