# External Integrations

**Analysis Date:** 2026-03-05

## APIs & External Services

**AI Voice Calls (Retell AI):**
- Purpose: Outbound AI demo phone calls to prospective clients
- SDK: `retell-sdk` ^5.2.0
- Client singleton: `lib/retell/client.ts` (server-only; throws if imported client-side)
- Auth: `RETELL_API_KEY` env var
- Usage: `app/api/demo-call/route.ts` creates outbound phone calls via `retell.call.createPhoneCall()`
- Resources provisioned via `scripts/setup-retell.ts`:
  - LLM (model: `gpt-4.1`, name: `kenstera-intake-llm`)
  - Voice Agent (voice: `minimax-Cimo`, name: `kenstera-intake-agent`)
  - NYC phone number (area codes tried: 212, 646, 917, 347, 929)
- Agent prompt update script: `scripts/update-agent-prompt.ts`
- Per-call config: `max_call_duration_ms: 120_000` (2 minutes) set via `agent_override` at call level, not on agent definition
- Dynamic variables: `caller_name` passed as first name from form input
- Config vars: `RETELL_API_KEY`, `RETELL_LLM_ID`, `RETELL_AGENT_ID`, `RETELL_PHONE_NUMBER`

**Transactional Email (Resend):**
- Purpose: Abandonment emails, demo follow-up pitch emails, newsletter subscriber management
- SDK: `resend` ^6.9.1
- Client: `lib/email/send.ts` - Lazy singleton via `getResend()`
- Auth: `RESEND_API_KEY` env var
- Functions:
  - `sendAbandonmentEmail(lead)` - Re-engagement email to intake audit leads who didn't book; links to `cal.com/kenstera/intake-15-minutes`
  - `sendDemoFollowUpEmail(lead)` - Pitch email sent 15 min after demo call; links to `cal.com/kenstera/30min`
- Newsletter: `app/api/newsletter/route.ts` uses `resend.contacts.create()` to add subscribers to audience
- Config vars: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `FROM_EMAIL` (optional), `FROM_NAME` (optional)

**Job Scheduling (Upstash QStash):**
- Purpose: Delayed email delivery (15-minute delay for abandonment and follow-up emails)
- SDK: `@upstash/qstash` ^2.9.0
- Publisher: `Client` class used in:
  - `app/api/demo-call/route.ts` - Schedules follow-up email after demo call
  - `app/api/pi-intake-audit/capture/route.ts` - Schedules abandonment email after lead capture
- Receiver: `Receiver` class for signature verification in:
  - `app/api/demo-call/send-followup/route.ts`
  - `app/api/pi-intake-audit/send-abandonment/route.ts`
- Auth: `QSTASH_TOKEN` (publishing), `QSTASH_CURRENT_SIGNING_KEY` + `QSTASH_NEXT_SIGNING_KEY` (verification)
- Pattern: `publishJSON()` with `delay: 900` seconds to internal API routes; receiver verifies `upstash-signature` header before processing

**Scheduling / Calendar (Cal.com):**
- Purpose: Embedded appointment booking for intake audit calls and sales calls
- SDK: `@calcom/embed-react` ^1.5.3
- Client component: `app/pi-intake-audit/components/CalendarEmbed.tsx`
- Cal links used:
  - `kenstera/intake-15-minutes` - Intake audit booking (embedded in wizard)
  - `kenstera/30min` - Sales call booking (linked in follow-up emails)
- Prefills: name, email, notes (website, role, leads/mo from form data)
- UI config: month view layout, event details hidden
- Events: Listens for `bookingSuccessful` to mark lead as booked via `POST /api/pi-intake-audit/booked`
- Preload: `cal('preload', { calLink })` called on mount for performance

**Bot Protection (Google reCAPTCHA v3):**
- Purpose: Score-based bot detection on form submissions
- Implementation: `lib/recaptcha/verify.ts` - Direct HTTP call to `https://www.google.com/recaptcha/api/siteverify`
- Auth: `RECAPTCHA_SECRET_KEY` env var
- Returns: Score 0.0-1.0 (higher = more likely human), or `null` on verification failure
- No SDK dependency; uses native `fetch`

**Advertising (Meta Pixel):**
- Purpose: Facebook/Meta advertising conversion tracking
- Implementation: Inline `<Script>` tag in `app/layout.tsx`
- Pixel ID: `1431516435037638` (hardcoded)
- Strategy: `afterInteractive`

## Data Storage

**Primary Database (Upstash Redis via REST):**
- SDK: `@upstash/redis` ^1.36.2
- Connection: `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
- Client: Lazy singleton pattern in each module (not shared across modules)
- Data models:
  - **Lead** (`lib/db/leads.ts`): Intake audit leads
    - Key pattern: `intake-audit:lead:{id}` (id format: `lead_{uuid}`)
    - Fields: id, email, fullName, website, role, inboundLeads, status, createdAt, updatedAt
    - Statuses: `pending` | `booked` | `email_sent`
    - TTL: 30 days (`ex: 2592000`)
  - **DemoLead** (`lib/db/demo-leads.ts`): Demo call leads
    - Key pattern: `demo-call:lead:{id}` (id format: `demo_{uuid}`)
    - Fields: id, name, email, status, createdAt, updatedAt
    - Statuses: `pending` | `email_sent`
    - TTL: 30 days
- Stored as JSON strings via `JSON.stringify()`/`JSON.parse()`

**Content Storage:**
- MDX files on filesystem: `content/blog/*.mdx`, `content/case-studies/*.mdx`
- TypeScript content modules: `content/industries/*.ts`, `content/services/*.ts`
- Parsed at build/request time via `gray-matter` and `next-mdx-remote`
- Blog utilities: `lib/blog.ts` (getAllPosts, getPostBySlug, getAllSlugs)
- Case study utilities: `lib/case-studies.ts`

**File Storage:**
- Local filesystem / Vercel static assets only
- Images: `public/images/`
- Video: `public/video/`
- Logo: `public/logo-main.svg`
- OG image: `public/og-image.jpg`

**Caching:**
- No dedicated cache layer; Upstash Redis used for data + rate limiting
- Vercel Edge Cache implicit with static/ISR pages

## Rate Limiting

**Demo Call Rate Limiting (`lib/rate-limit/demo-call.ts`):**
- SDK: `@upstash/ratelimit` ^2.0.8 with `@upstash/redis`
- Strategy: Sliding window, 1 request per 10 minutes
- Two independent limiters:
  - `ipRatelimit` - Per IP address (prefix: `demo-call:ip`)
  - `phoneRatelimit` - Per phone number (prefix: `demo-call:phone`)
- Uses lazy Proxy pattern to defer Redis connection until first `.limit()` call (avoids build-time env var requirement)

## Authentication & Identity

**Auth Provider:**
- None - No user authentication system
- API routes are public with rate limiting and reCAPTCHA as protection
- QStash webhook endpoints verified via HMAC signature (`Receiver.verify()`)

## Monitoring & Observability

**Analytics:**
- Vercel Analytics (`@vercel/analytics/next`) - Page views and web vitals (`app/layout.tsx`)
- Vercel Speed Insights (`@vercel/speed-insights/next`) - Performance monitoring (`app/layout.tsx`)
- Meta Pixel - Advertising conversion tracking (`app/layout.tsx`)

**Error Tracking:**
- None detected (no Sentry, Datadog, Bugsnag, etc.)

**Logs:**
- `console.log` / `console.error` with structured prefixes:
  - `[Demo Call]`, `[Demo Follow-up]`, `[Email]`, `[Abandonment]`, `[Newsletter]`, `[Intake Audit]`
- Vercel runtime logs (implicit from deployment platform)

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from Vercel-specific packages and Next.js conventions)
- Domain: `kenstera.com`

**CI Pipeline:**
- No CI configuration files detected (no `.github/workflows/`, no `vercel.json`)
- Likely using Vercel's git-based auto-deploy

## Security Headers

Configured in `next.config.ts` for all routes (`/(.*)`):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-DNS-Prefetch-Control: on`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `poweredByHeader: false` (removes X-Powered-By)

## Environment Configuration

**Required env vars:**
- `RETELL_API_KEY` - Retell AI API key
- `RETELL_PHONE_NUMBER` - Provisioned Retell phone number (E.164)
- `RETELL_LLM_ID` - Retell LLM resource ID
- `RETELL_AGENT_ID` - Retell agent resource ID
- `RESEND_API_KEY` - Resend email API key
- `RESEND_AUDIENCE_ID` - Resend newsletter audience ID
- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST endpoint
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST token
- `QSTASH_TOKEN` - QStash publish token
- `QSTASH_CURRENT_SIGNING_KEY` - QStash signature verification (current)
- `QSTASH_NEXT_SIGNING_KEY` - QStash signature verification (next rotation)
- `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA v3 secret
- `NEXT_PUBLIC_BASE_URL` - Public base URL (used for QStash callback URLs)

**Optional env vars:**
- `FROM_EMAIL` - Sender email (defaults to `notifications@yourdomain.com`)
- `FROM_NAME` - Sender name (defaults to `Kenstera`)

**Secrets location:**
- `.env.local` (local development, git-ignored)
- Vercel environment variables (production)
- No `.env.example` file present

## Webhooks & Callbacks

**Incoming (QStash-triggered, signature-verified):**
- `POST /api/pi-intake-audit/send-abandonment` - Delayed callback to send abandonment email; checks lead status is `pending` before sending
- `POST /api/demo-call/send-followup` - Delayed callback to send demo follow-up pitch email; checks lead status is `pending` before sending

**Incoming (Client-triggered, public):**
- `POST /api/demo-call` - Validates phone (US only), rate-limits by IP + phone, creates Retell outbound call, stores DemoLead, schedules follow-up via QStash
- `POST /api/pi-intake-audit/capture` - Validates lead data with Zod, stores Lead in Redis, schedules abandonment email via QStash
- `POST /api/pi-intake-audit/booked` - Marks lead as `booked` (prevents abandonment email from being sent)
- `POST /api/newsletter` - Validates email, adds contact to Resend audience

**Outgoing:**
- Retell API: Outbound phone calls via `retell.call.createPhoneCall()`
- Resend API: Transactional emails via `resend.emails.send()` and contact creation via `resend.contacts.create()`
- QStash API: Delayed job publishing via `client.publishJSON()`
- Google reCAPTCHA: Token verification via `siteverify` endpoint

## Integration Flow Diagrams

```
Demo Call Flow:
  Client form → POST /api/demo-call
  ├─ Validate phone (libphonenumber-js, US only)
  ├─ Rate limit check (IP + phone, 1/10min each)
  ├─ Create Retell outbound call (2-min max duration)
  ├─ Store DemoLead in Redis (status: pending)
  └─ Schedule follow-up email via QStash (15-min delay)
      └─ QStash → POST /api/demo-call/send-followup
         ├─ Verify QStash signature
         ├─ Check DemoLead status (skip if not pending)
         ├─ Send pitch email via Resend
         └─ Update status to email_sent

Intake Audit Flow:
  Client wizard → POST /api/pi-intake-audit/capture
  ├─ Validate with Zod
  ├─ Store Lead in Redis (status: pending)
  └─ Schedule abandonment email via QStash (15-min delay)
      └─ QStash → POST /api/pi-intake-audit/send-abandonment
         ├─ Verify QStash signature
         ├─ Check Lead status (skip if booked or email_sent)
         ├─ Send abandonment email via Resend
         └─ Update status to email_sent

  Cal.com embed (bookingSuccessful event)
  └─ POST /api/pi-intake-audit/booked
     └─ Update Lead status to booked (prevents abandonment email)

Newsletter Flow:
  Client form → POST /api/newsletter
  ├─ Validate email with Zod
  └─ Add contact to Resend audience
```

---

*Integration audit: 2026-03-05*
