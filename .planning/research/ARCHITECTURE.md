# Architecture Research

**Domain:** Retell AI outbound call integration in Next.js App Router
**Researched:** 2026-02-21
**Confidence:** HIGH (Retell SDK and API verified via official docs; Next.js patterns verified via official docs + existing codebase conventions)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      BROWSER (Client)                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  DemoCallSection (React component)                       │   │
│  │  - Form: name, phone, email                              │   │
│  │  - reCAPTCHA v3 token generation (invisible)             │   │
│  │  - Form state: idle → submitting → success/error         │   │
│  └────────────────────────┬─────────────────────────────────┘   │
└───────────────────────────┼─────────────────────────────────────┘
                            │  POST /api/demo-call
                            │  { name, phone, email, recaptchaToken }
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   NEXT.JS SERVER (API Layer)                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  /app/api/demo-call/route.ts (POST)                      │   │
│  │                                                          │   │
│  │  1. Validate request body (Zod)                          │   │
│  │  2. Verify reCAPTCHA token (Google API)                  │   │
│  │  3. Rate limit by IP  (Upstash Redis)                    │   │
│  │  4. Rate limit by phone (Upstash Redis)                  │   │
│  │  5. Call retellService.createOutboundCall()              │   │
│  │  6. Return { success, callId }                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  /app/api/retell-webhook/route.ts (POST)                 │   │
│  │                                                          │   │
│  │  1. Read raw body (request.text())                       │   │
│  │  2. Verify x-retell-signature (Retell.verify())          │   │
│  │  3. Handle call_ended / call_analyzed events             │   │
│  │  4. Return 204                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────┬────────────────────────────┬─────────────────────┘
               │                            │
    Outbound   │                   Webhook  │ (call_started,
    call POST  │                   POST     │  call_ended,
               ▼                            │  call_analyzed)
┌──────────────────────────┐                │
│       RETELL AI           │────────────────┘
│                          │
│  - retell-llm (prompt)   │
│  - agent (voice + LLM)   │
│  - phone number          │
│  - max_call_duration_ms  │
│    = 180,000 (3 min)     │
└──────────────────────────┘
               │ places call
               ▼
          User's Phone

┌─────────────────────────────────────────────────────────────────┐
│                 UPSTASH REDIS (Rate State)                      │
│                                                                 │
│  demo-call:ip:{hash}       sliding window 1 call/24h           │
│  demo-call:phone:{e164}    sliding window 1 call/24h           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              SETUP SCRIPT (one-time provisioning)               │
│  scripts/setup-retell.ts                                        │
│                                                                 │
│  1. client.llm.create()        → RETELL_LLM_ID                  │
│  2. client.agent.create()      → RETELL_AGENT_ID                │
│  3. client.phoneNumber.create() → RETELL_PHONE_NUMBER           │
│  Writes IDs to .env.local                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `DemoCallSection` | Collect name/phone/email, fire reCAPTCHA, POST to API, show success/error state | React client component with controlled form, Framer Motion transitions |
| `/api/demo-call/route.ts` | Validate input, verify reCAPTCHA, enforce rate limits, trigger Retell outbound call | Next.js Route Handler (App Router), Zod, `@upstash/ratelimit`, `retell-sdk` |
| `/api/retell-webhook/route.ts` | Receive and verify Retell webhook events (call lifecycle) | Next.js Route Handler, `Retell.verify()` with raw body |
| `lib/retell/client.ts` | Singleton Retell SDK client | `new Retell({ apiKey: process.env.RETELL_API_KEY })` |
| `lib/retell/calls.ts` | Outbound call creation logic | Wraps `client.call.createPhoneCall()` with `from_number` + `to_number` |
| `lib/retell/ratelimit.ts` | Rate limit factory for IP and phone number identifiers | `@upstash/ratelimit` with `Ratelimit.slidingWindow()` |
| `lib/recaptcha.ts` | reCAPTCHA v3 server-side token verification | Calls Google's `siteverify` endpoint |
| `scripts/setup-retell.ts` | One-time provisioning of LLM, agent, and phone number | Node.js script using `retell-sdk`, writes to `.env.local` |
| Retell AI (external) | Conversational AI phone call, voice, max duration enforcement | `retell-llm` + `agent` + purchased phone number |
| Upstash Redis (external) | Rate limit state across serverless function invocations | `@upstash/redis` REST API |

## Recommended Project Structure

```
app/
├── api/
│   ├── demo-call/
│   │   └── route.ts          # POST: validate → reCAPTCHA → rate limit → Retell call
│   └── retell-webhook/
│       └── route.ts          # POST: verify signature → handle events

components/
└── sections/
    └── DemoCall.tsx          # Client component: form UI + submission logic

lib/
├── retell/
│   ├── client.ts             # Singleton Retell SDK instance
│   ├── calls.ts              # createOutboundCall(to: string): Promise<{ callId }>
│   └── ratelimit.ts          # ipLimiter and phoneLimiter factories
├── recaptcha.ts              # verifyRecaptchaToken(token: string): Promise<boolean>
└── db/
    └── leads.ts              # Existing — unchanged

scripts/
└── setup-retell.ts           # npx tsx scripts/setup-retell.ts
```

### Structure Rationale

- `lib/retell/` is a dedicated module so API route handlers stay thin — they orchestrate, not implement. Same pattern as `lib/email/send.ts` and `lib/db/leads.ts` already in the codebase.
- `scripts/setup-retell.ts` lives outside `app/` — it is a one-time CLI tool, not a route. `npx tsx scripts/setup-retell.ts` requires only `RETELL_API_KEY` and outputs the three IDs to `.env.local`.
- The webhook handler is a separate route from the call-trigger route. They have different security models: the call-trigger validates user input and reCAPTCHA; the webhook validates Retell's signature. Mixing them adds complexity with no gain.

## Architectural Patterns

### Pattern 1: Thin Route Handler + Service Layer

**What:** The API route reads from the request, validates input with Zod, then delegates all side-effect work (reCAPTCHA check, rate limiting, Retell API call) to service functions in `lib/`. The route itself contains no business logic.

**When to use:** Every time. This is the existing pattern in the codebase (`app/api/newsletter/route.ts` calls `getResend()` from `lib/email/send.ts`). Keeps route files under ~60 lines.

**Trade-offs:** Slightly more files; pays off in testability and readability.

**Example:**
```typescript
// app/api/demo-call/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyRecaptchaToken } from '@/lib/recaptcha'
import { checkRateLimits } from '@/lib/retell/ratelimit'
import { createOutboundCall } from '@/lib/retell/calls'

const schema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().regex(/^\+1\d{10}$/),  // E.164 US only
  email: z.string().email(),
  recaptchaToken: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const captchaOk = await verifyRecaptchaToken(parsed.data.recaptchaToken)
  if (!captchaOk) return NextResponse.json({ error: 'Bot detected' }, { status: 403 })

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const rateLimitOk = await checkRateLimits(ip, parsed.data.phone)
  if (!rateLimitOk) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })

  const { callId } = await createOutboundCall(parsed.data.phone)
  return NextResponse.json({ success: true, callId })
}
```

### Pattern 2: Dual Identifier Rate Limiting

**What:** Two independent rate limit checks per request — one keyed on hashed IP, one keyed on the E.164 phone number. Both must pass. This prevents a single bad actor from cycling IPs while reusing a phone, and vice versa.

**When to use:** Any public-facing endpoint that triggers a paid external action (Retell call costs money per minute).

**Trade-offs:** Two Redis round-trips per request; negligible latency (Upstash is ~1-3ms from Vercel regions). Worth it for cost control.

**Example:**
```typescript
// lib/retell/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

// 1 call per IP per 24 hours
const ipLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '24 h'),
  prefix: 'demo-call:ip',
})

// 1 call per phone number per 24 hours
const phoneLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '24 h'),
  prefix: 'demo-call:phone',
})

export async function checkRateLimits(ip: string, phone: string): Promise<boolean> {
  const [ipResult, phoneResult] = await Promise.all([
    ipLimiter.limit(ip),
    phoneLimiter.limit(phone),
  ])
  return ipResult.success && phoneResult.success
}
```

### Pattern 3: Raw Body Webhook Verification

**What:** The webhook handler reads the request as raw text (not parsed JSON) before passing the body to `Retell.verify()`. JSON.parse is called only after signature verification succeeds.

**When to use:** Any webhook endpoint that uses HMAC/signature verification. Never call `request.json()` before verifying — whitespace differences in parsing break HMAC comparison.

**Trade-offs:** Slightly more verbose than `request.json()`; required for security.

**Example:**
```typescript
// app/api/retell-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Retell } from 'retell-sdk'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-retell-signature') ?? ''

  const isValid = Retell.verify(
    rawBody,
    process.env.RETELL_API_KEY!,
    signature,
  )
  if (!isValid) return new NextResponse(null, { status: 401 })

  const { event, call } = JSON.parse(rawBody)

  switch (event) {
    case 'call_ended':
      // log call outcome, call.disconnection_reason
      break
    case 'call_analyzed':
      // access call.call_analysis for structured post-call data
      break
  }

  return new NextResponse(null, { status: 204 })
}
```

### Pattern 4: Idempotent Provisioning Script

**What:** A standalone Node.js/TypeScript script (`scripts/setup-retell.ts`) that provisions the entire Retell stack in sequence: create LLM → create agent → purchase phone number. The script checks for existing env vars before creating new resources, so re-running it is safe.

**When to use:** New environment setup, CI provisioning, onboarding a new developer.

**Trade-offs:** Requires `RETELL_API_KEY` to already be set; only works for US phone numbers via Retell's default Twilio provider.

**Example:**
```typescript
// scripts/setup-retell.ts
import Retell from 'retell-sdk'
import * as fs from 'fs'

const client = new Retell({ apiKey: process.env.RETELL_API_KEY! })

async function main() {
  // Step 1: Create LLM
  const llm = await client.llm.create({
    general_prompt: AGENT_PROMPT,
    model: 'gpt-4.1-mini',
    start_speaker: 'agent',
  })

  // Step 2: Create agent bound to LLM
  const agent = await client.agent.create({
    response_engine: { type: 'retell-llm', llm_id: llm.llm_id },
    voice_id: '11labs-Adrian',
    max_call_duration_ms: 180_000, // 3 minutes
    begin_message: 'Hi! Thanks for trying the Kenstera demo...',
  })

  // Step 3: Purchase phone number
  const phoneNumber = await client.phoneNumber.create({
    area_code: 415,
    outbound_agent_id: agent.agent_id,
  })

  // Write IDs to .env.local
  const envLines = [
    `RETELL_LLM_ID=${llm.llm_id}`,
    `RETELL_AGENT_ID=${agent.agent_id}`,
    `RETELL_PHONE_NUMBER=${phoneNumber.phone_number}`,
  ]
  fs.appendFileSync('.env.local', envLines.join('\n') + '\n')
  console.log('Retell stack provisioned:', envLines)
}

main().catch(console.error)
```

## Data Flow

### Primary Flow: Form Submit → Outbound Call

```
User fills form (name, phone, email)
    │
    │  reCAPTCHA v3 token generated (client-side, Google script)
    │
    ▼
POST /api/demo-call
    │
    ├─ 1. Zod schema validation
    │       invalid → 400
    │
    ├─ 2. reCAPTCHA token verification (Google siteverify)
    │       score < 0.5 → 403
    │
    ├─ 3. IP rate limit check (Upstash Redis sliding window)
    │       exceeded → 429
    │
    ├─ 4. Phone rate limit check (Upstash Redis sliding window)
    │       exceeded → 429
    │
    ├─ 5. client.call.createPhoneCall({ from_number, to_number })
    │       Retell API error → 502
    │
    └─ 6. Return { success: true, callId }  → 200
               │
               ▼
         User's phone rings within ~5 seconds
         Retell AI agent answers as Kenstera demo
         max_call_duration_ms = 180,000 (3 min hard cap)
```

### Secondary Flow: Retell Webhook → Server Handler

```
Retell AI (post-call)
    │
    │  POST /api/retell-webhook
    │  Header: x-retell-signature: <HMAC>
    │
    ▼
Signature verification (Retell.verify on raw body text)
    │
    ├─ invalid → 401, drop request
    │
    └─ valid → parse JSON body
               │
               ├─ event = "call_started"  (optional: log)
               ├─ event = "call_ended"    (log disconnection_reason)
               └─ event = "call_analyzed" (log call_analysis summary)
                                │
                                └─ Return 204
```

Retell retries webhook delivery up to 3 times with a 10-second timeout per attempt if no 2xx is returned. The webhook handler must respond fast — do not await slow downstream work synchronously. Log and return 204 immediately; offload any async work via `waitUntil` (Vercel) or a queue.

### Key Data Flows Summary

1. **Form → API → Retell:** User-supplied data flows one-way to Retell's outbound call API. No user data is stored server-side for this MVP — the form fields are used only to trigger the call.
2. **Retell → Webhook → Logs:** Post-call events flow from Retell to the webhook handler. For MVP, these are logged only. Future: persist call metadata to Redis for analytics.
3. **Script → Retell → .env.local:** Provisioning is a one-time write path. IDs are stable after setup and read via env vars at runtime.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100 demo calls/day | Current design handles this comfortably. Retell's default rate limits are generous. |
| 100-1k calls/day | Rate limits may need tuning. Consider adding a global daily cap (e.g., Redis counter for total calls today) to bound cost. |
| 1k+ calls/day | Retell charges per minute; cost becomes significant. Add call budget monitoring. Consider Retell's batch-call and analytics APIs. |

### Scaling Priorities

1. **First bottleneck — cost, not performance:** Retell calls cost real money. The rate limiter (1 call/IP/24h, 1 call/phone/24h) is the primary guard. The global daily cap is the safety net.
2. **Second bottleneck — Upstash Redis ROPS:** At very high call volume, Redis reads-per-second become relevant. Upstash free tier is 10k ROPS/day; the paid tier removes that concern.

## Anti-Patterns

### Anti-Pattern 1: Calling Retell from the Client

**What people do:** Generate the Retell outbound call directly from client-side JavaScript to avoid writing a server route.

**Why it's wrong:** The Retell API key is secret. Exposing it client-side lets anyone enumerate your key, bypass rate limits entirely, and call arbitrary phone numbers at your cost.

**Do this instead:** Always proxy through a Next.js Route Handler. The Route Handler is the only place the `RETELL_API_KEY` env var is accessible.

### Anti-Pattern 2: Parsing JSON Before Webhook Signature Verification

**What people do:** Call `request.json()` at the top of the webhook handler, then pass `JSON.stringify(body)` to `Retell.verify()`.

**Why it's wrong:** JSON serialization is not guaranteed to be byte-for-byte identical to the raw request body. HMAC verification operates on the exact bytes Retell sent. Any whitespace difference causes a verification failure — or worse, a forgery that passes a naive check on a re-serialized body.

**Do this instead:** Always use `request.text()` first, run verification, then call `JSON.parse(rawBody)`.

### Anti-Pattern 3: Blocking Webhook Response on Slow Work

**What people do:** Perform database writes, send emails, or call external APIs synchronously inside the webhook handler before returning a response.

**Why it's wrong:** Retell has a 10-second webhook timeout. If your downstream work takes longer, Retell marks the webhook as failed and retries — you handle the same event multiple times. Vercel serverless functions are killed after the response is sent anyway.

**Do this instead:** Return 204 immediately after validation. Use Vercel's `waitUntil(promise)` from `@vercel/functions` (or `@upstash/qstash`, which is already in the stack) to fire-and-forget slow work.

### Anti-Pattern 4: Storing Provisioning IDs in Code

**What people do:** Hardcode the Retell LLM ID, agent ID, or phone number directly in source files after running the setup script.

**Why it's wrong:** IDs are environment-specific. Hardcoded IDs break when the agent needs to be reprovisioned or when staging/production use different agents.

**Do this instead:** Always read from env vars (`process.env.RETELL_AGENT_ID`, etc.). The setup script writes to `.env.local`. CI/CD injects them as secrets.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Retell AI API | REST via `retell-sdk` npm package | `RETELL_API_KEY` server-only env var. SDK handles auth header. Current SDK version on npm: verify before install — `npm info retell-sdk version`. |
| Retell AI Webhooks | POST to `/api/retell-webhook` | Verified with `Retell.verify(rawBody, apiKey, signature)`. Must be public HTTPS URL registered in Retell dashboard. |
| Google reCAPTCHA v3 | Client: load script, execute action. Server: POST to `https://www.google.com/recaptcha/api/siteverify` | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public) + `RECAPTCHA_SECRET_KEY` (server-only). Score threshold: 0.5. |
| Upstash Redis | `@upstash/ratelimit` + `@upstash/redis` (already in stack) | `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`. Use distinct key prefixes (`demo-call:ip:*`, `demo-call:phone:*`) to avoid collisions with existing lead keys. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `DemoCallSection` → `/api/demo-call` | HTTP POST (fetch) | Request includes reCAPTCHA token; response is `{ success, callId }` or `{ error }`. |
| `/api/demo-call` → `lib/retell/calls.ts` | Direct function call (same process) | `createOutboundCall(phone)` abstracts the SDK call; returns `callId`. |
| `/api/demo-call` → `lib/retell/ratelimit.ts` | Direct function call | `checkRateLimits(ip, phone)` runs two Redis checks in parallel. |
| `/api/demo-call` → `lib/recaptcha.ts` | Direct function call | `verifyRecaptchaToken(token)` calls Google siteverify. |
| `/api/retell-webhook` → `lib/retell/client.ts` | Direct import for `Retell.verify()` static method | Webhook handler uses same SDK for verification. |
| `scripts/setup-retell.ts` → Retell API | Sequential SDK calls | LLM → agent → phone number (order matters: agent requires llm_id). |

## Build Order Implications

Dependencies between components determine which must be built first:

```
1. lib/retell/client.ts           (no deps — foundation for everything)
   │
2. scripts/setup-retell.ts        (depends on client.ts; must run before
   │  → produces env vars         any route can fire a real call)
   │
3. lib/retell/calls.ts            (depends on client.ts + env vars from script)
   lib/retell/ratelimit.ts        (depends on Upstash — already configured)
   lib/recaptcha.ts               (independent — just a fetch wrapper)
   │
4. app/api/demo-call/route.ts     (depends on steps 2 + 3)
   app/api/retell-webhook/route.ts (depends on client.ts)
   │
5. components/sections/DemoCall.tsx  (depends on API route existing)
```

Build the service layer (step 3) before the route handlers (step 4) before the UI (step 5). Run the provisioning script (step 2) as part of environment setup before integration testing.

## Sources

- Retell AI API reference (verified via official docs): https://docs.retellai.com/llms.txt
- Retell AI webhook events and signature verification: https://docs.retellai.com/features/webhook-overview
- Retell AI secure webhook: https://docs.retellai.com/features/secure-webhook
- Retell TypeScript SDK README: https://github.com/RetellAI/retell-typescript-sdk/blob/main/README.md
- Retell agent creation (max_call_duration_ms): https://docs.retellai.com/api-references/create-agent
- Retell LLM creation (model options, general_prompt): https://docs.retellai.com/api-references/create-retell-llm
- Retell outbound call creation (from_number, to_number, response shape): https://docs.retellai.com/api-references/create-phone-call
- Upstash ratelimit-js (slidingWindow, multiple identifiers): https://github.com/upstash/ratelimit-js
- Next.js App Router route handlers (raw body, webhook patterns): https://nextjs.org/blog/building-apis-with-nextjs
- Next.js reCAPTCHA v3 integration (App Router): https://www.buildwithmatija.com/blog/recaptcha-v3-nextjs-guide
- Existing codebase patterns (leads.ts, newsletter/route.ts): verified by direct read

---
*Architecture research for: Retell AI outbound call integration in Next.js*
*Researched: 2026-02-21*
