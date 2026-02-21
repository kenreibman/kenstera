# Stack Research

**Domain:** Retell AI outbound call integration into existing Next.js app
**Researched:** 2026-02-21
**Confidence:** MEDIUM-HIGH (Retell SDK confirmed via official docs + npm; reCAPTCHA patterns confirmed via multiple sources; version numbers verified where possible)

---

## Context: What Is Already In Place

The following are already installed and must NOT be re-added:

| Technology | Version (package.json) | Notes |
|------------|------------------------|-------|
| Next.js | 16.1.3 | App Router — use Route Handlers (`app/api/.../route.ts`) |
| React | 19.2.0 | |
| TypeScript | ^5 | |
| Tailwind CSS | ^4 | |
| Framer Motion | ^12.23.25 | |
| `@upstash/redis` | ^1.36.2 | Already in use for lead persistence |
| `@upstash/qstash` | ^2.9.0 | |
| `zod` | ^4.3.6 | |
| `resend` | ^6.9.1 | |
| Radix UI | various | |

---

## Recommended Stack (New Additions Only)

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `retell-sdk` | ^4.66.0 | Server-side Retell AI client — creates LLMs, agents, phone numbers, triggers outbound calls | Official Retell TypeScript SDK. Full type safety, built-in auth, auto-retry on 429/5xx. Required for ALL Retell API operations from Next.js Route Handlers. Node.js 18.10.0+ required (Next.js 16 meets this). |
| `@upstash/ratelimit` | ^2.0.8 | Rate limiting per IP and per phone number | Official Upstash rate limiting library. Works with the existing `@upstash/redis` instance — no new infrastructure. Designed specifically for serverless/edge Next.js. Sliding window algorithm prevents API abuse bursts. |
| `react-google-recaptcha-v3` | ^1.10.x | reCAPTCHA v3 token generation on form submit | Retell docs explicitly recommend reCAPTCHA to block bot-submitted calls. v3 is invisible (no checkbox friction). Compatible with Next.js App Router via `"use client"` directive. Server-side token verification uses Google's `siteverify` endpoint directly — no extra library needed. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `zod` | already installed (^4.3.6) | Validate form body shape in Route Handler before calling Retell | Already in package.json — use it, don't re-install |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Retell AI Dashboard | Agent inspection, call logs, prompt testing | Use for validating provisioned agents; not a code dependency |
| Retell Playground | Interactive test calls without real phone | Use during development before wiring frontend form |

---

## How the Integration Works (API Surface)

The Retell SDK exposes three namespaces needed for this project:

### 1. `client.llm.create()` — Configure the AI brain

```typescript
import Retell from 'retell-sdk';

const client = new Retell({ apiKey: process.env.RETELL_API_KEY! });

const llm = await client.llm.create({
  model: 'gpt-4.1',           // default; confirmed current default as of 2025
  general_prompt: '...',      // system prompt
  begin_message: '...',       // first utterance agent speaks
  start_speaker: 'agent',     // REQUIRED field — agent speaks first
  model_temperature: 0.3,     // lower = more deterministic for intake
});
// returns: { llm_id: 'llm_...' }
```

**Note:** `max_call_duration_ms` is NOT a parameter on LLM creation. It lives on the agent (see below).

### 2. `client.agent.create()` — Configure voice + call behavior

```typescript
const agent = await client.agent.create({
  response_engine: { type: 'retell-llm', llm_id: llm.llm_id },
  voice_id: 'eleven_labs-...',    // ElevenLabs voice
  agent_name: 'Kenstera Demo',
  max_call_duration_ms: 180000,   // 3 minutes — cost cap
});
// returns: { agent_id: 'agent_...' }
```

### 3. `client.phoneNumber.create()` — Purchase a US number

```typescript
const phone = await client.phoneNumber.create({
  outbound_agent_id: agent.agent_id,
  // inbound_agent_id omitted — don't accept inbound calls on demo number
});
// returns: { phone_number: '+1...', phone_number_id: '...' }
```

### 4. `client.call.createPhoneCall()` — Trigger outbound call

```typescript
const call = await client.call.createPhoneCall({
  from_number: process.env.RETELL_FROM_NUMBER!,   // purchased number
  to_number: validatedE164PhoneNumber,             // visitor's phone
  // override_agent_id if you want per-call agent customization
});
// returns: { call_id: '...', ... }
```

### 5. `Retell.verify()` — Webhook signature check (static method)

```typescript
// In a Route Handler — POST /api/retell-webhook/route.ts
import Retell from 'retell-sdk';

const isValid = Retell.verify(
  await req.text(),                             // raw body as string
  process.env.RETELL_API_KEY!,
  req.headers.get('x-retell-signature') ?? ''
);
```

---

## Rate Limiting Pattern (Using Existing @upstash/redis)

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Per IP: max 3 demo calls per hour
const ipLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  prefix: 'demo_ip',
});

// Per phone number: max 2 calls per 24h (prevents same number being spammed)
const phoneLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '24 h'),
  prefix: 'demo_phone',
});
```

---

## Installation

```bash
# New dependencies only — everything else is already installed
npm install retell-sdk @upstash/ratelimit react-google-recaptcha-v3
```

---

## Environment Variables Required

```bash
# Retell AI
RETELL_API_KEY=key_...           # Server-side only — NEVER expose client-side
RETELL_AGENT_ID=agent_...        # Set after running provisioning script
RETELL_FROM_NUMBER=+1...         # Set after running provisioning script

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=... # Client-safe — used by react-google-recaptcha-v3
RECAPTCHA_SECRET_KEY=...           # Server-side only — used in Route Handler to verify tokens

# Upstash (already set for existing Redis usage)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `retell-sdk` (server SDK) | Direct `fetch()` to Retell REST API | Never — SDK provides TypeScript types, auto-retry, and structured errors for free |
| `retell-sdk` (server SDK) | `retell-client-js-sdk` | Only if building browser-based WebRTC calls (web call widget). Do NOT use for server-side outbound phone calls — wrong package entirely |
| `@upstash/ratelimit` | `rate-limiter-flexible` + Redis | If not using Upstash Redis. Since it's already in the stack, `@upstash/ratelimit` is zero-friction |
| `react-google-recaptcha-v3` | `next-recaptcha-v3` | `next-recaptcha-v3` is lighter-weight and Next.js-specific; use it if `react-google-recaptcha-v3` has React 19 peer dep issues |
| reCAPTCHA v3 | reCAPTCHA v2 (checkbox) | v2 if score-based abuse is insufficient; v2 adds user friction |
| `Retell.verify()` for webhooks | Manual HMAC verification | Never — the static method is the documented pattern; rolling your own is error-prone |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `retell-client-js-sdk` | Browser WebRTC SDK for in-browser voice calls. Has nothing to do with server-triggered outbound phone calls. Common confusion point. | `retell-sdk` (the server SDK) |
| Exposing `RETELL_API_KEY` in client components | One leaked key = unlimited API calls billed to your account | Proxy all Retell calls through Next.js Route Handlers |
| Calling Retell API directly from `useEffect` or client components | Same security issue as above | Route Handler at `app/api/demo-call/route.ts` |
| Setting `max_call_duration_ms` on the LLM | It's not a valid LLM parameter — it lives on the agent | Set it in `client.agent.create()` |
| Accepting inbound calls on the demo phone number | Demo number should be outbound-only; avoid surprise call handling | Leave `inbound_agent_id` unset when purchasing the number |
| `@upstash/ratelimit` v1.x | Breaking changes in v2.0 changed the algorithm API | Use v2.0.8+ |

---

## Stack Patterns by Variant

**If the provisioning script runs in CI/deployment:**
- Store `RETELL_AGENT_ID` and `RETELL_FROM_NUMBER` as deployment environment variables
- The script only needs to run once; numbers persist indefinitely after purchase

**If adding per-call agent overrides (e.g., personalizing greeting with visitor's name):**
- Use `override_agent` in `client.call.createPhoneCall()` — available as of 2025 Per-Call Agent Override feature
- Pass `retell_llm_dynamic_variables` to inject `{{name}}` into the prompt dynamically

**If React 19 causes peer dependency issues with `react-google-recaptcha-v3`:**
- Use `next-recaptcha-v3` instead — lighter, no peer dep conflicts reported
- Or implement reCAPTCHA manually via script tag (no library needed, as documented in Next.js 15 guide)

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `retell-sdk@^4.66.0` | Node.js 18.10.0+ | Next.js 16 runs Node 18+; confirmed compatible |
| `retell-sdk@^4.66.0` | Next.js App Router Route Handlers | Server-only import — never import in client components |
| `@upstash/ratelimit@^2.0.8` | `@upstash/redis@^1.36.2` | Confirmed compatible — same Upstash ecosystem |
| `react-google-recaptcha-v3@^1.10.x` | React 19 | Peer dep may warn; use `--legacy-peer-deps` if needed, or swap for `next-recaptcha-v3` |

---

## Confidence Assessment

| Area | Confidence | Basis |
|------|------------|-------|
| `retell-sdk` as correct server package | HIGH | Official Retell docs + npm registry confirm v4.66.0 |
| `client.call.createPhoneCall()` method signature | HIGH | Official Retell API reference docs verified |
| `max_call_duration_ms` on agent (not LLM) | MEDIUM | Community forum + changelog confirm; negative confirmed via LLM API spec |
| `@upstash/ratelimit` v2.0.8 | HIGH | npm registry + Upstash official docs |
| `react-google-recaptcha-v3` React 19 compatibility | LOW | Not explicitly tested against React 19; peer dep warning likely |
| `Retell.verify()` static method signature | HIGH | Official secure-webhook docs + community confirmation |
| `start_speaker` required on LLM create | MEDIUM | Retell API reference + search result note about v2 API requirement |

---

## Sources

- `https://docs.retellai.com/get-started/sdk` — Official SDK installation and usage
- `https://docs.retellai.com/api-references/create-phone-call` — Outbound call parameters (verified: `from_number`, `to_number`, `override_agent_id`)
- `https://docs.retellai.com/api-references/create-retell-llm` — LLM parameters (verified: `general_prompt`, `begin_message`, `start_speaker`, model options)
- `https://docs.retellai.com/deploy/purchase-number` — Phone number purchase API
- `https://docs.retellai.com/features/webhook-overview` — Webhook events and `Retell.verify()` signature
- `https://docs.retellai.com/features/secure-webhook` — Webhook verification pattern
- `https://www.npmjs.com/package/retell-sdk` — Version 4.66.0 confirmed (WebSearch, MEDIUM confidence)
- `https://github.com/RetellAI/retell-typescript-sdk` — SDK source, agent.create() example
- `https://www.npmjs.com/package/@upstash/ratelimit` — Version 2.0.8 confirmed
- `https://upstash.com/docs/redis/sdks/ratelimit-ts/overview` — Sliding window algorithm docs
- `https://community.retellai.com/t/how-to-get-a-desired-call-duration-to-control-costs/293` — `max_call_duration_ms` on agent (MEDIUM confidence)
- `https://www.npmjs.com/package/react-google-recaptcha-v3` — reCAPTCHA v3 React library
- `https://www.npmjs.com/package/next-recaptcha-v3` — Next.js-specific alternative

---

*Stack research for: Retell AI outbound call integration — Kenstera demo intake specialist*
*Researched: 2026-02-21*
