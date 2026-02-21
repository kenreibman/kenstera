# External Integrations

**Analysis Date:** 2026-02-21

## APIs & External Services

**Email & Newsletter:**
- Resend - Email delivery service
  - SDK/Client: `resend` 6.9.1
  - Auth: `RESEND_API_KEY` environment variable
  - Endpoints used:
    - `resend.contacts.create()` - Add email to audience (newsletter subscription)
    - `resend.emails.send()` - Send transactional emails (abandonment emails)
  - Implementation: `lib/email/send.ts`
  - Audience/List: `RESEND_AUDIENCE_ID` (required for newsletter signup)
  - Sender config: `FROM_EMAIL`, `FROM_NAME` environment variables

**Calendar & Booking:**
- Cal.com - Appointment scheduling platform
  - SDK/Client: `@calcom/embed-react` 1.5.3
  - Integration type: Embedded iframe calendar
  - Cal link: `kenstera/intake-15-minutes`
  - Implementation: `app/pi-intake-audit/components/CalendarEmbed.tsx`
  - Event handling:
    - `__iframeReady` - Calendar loaded
    - `bookingSuccessful` - Booking confirmed (triggers lead status update)
  - Preload support enabled for performance
  - UI configuration: Month view, event details hidden

**Task Scheduling & Message Queue:**
- Upstash QStash - Serverless task queue
  - SDK/Client: `@upstash/qstash` 2.9.0
  - Auth: `QSTASH_TOKEN` environment variable
  - Signature verification keys:
    - `QSTASH_CURRENT_SIGNING_KEY` - Active signing key
    - `QSTASH_NEXT_SIGNING_KEY` - Key rotation support
  - Use cases:
    - Scheduled email delivery (abandonment emails after 15-minute delay)
    - Delayed task execution for lead nurturing
  - Implementation files:
    - `app/api/pi-intake-audit/capture/route.ts` - Schedule tasks
    - `app/api/pi-intake-audit/send-abandonment/route.ts` - Receive & verify signed tasks
  - Callback URL: `{NEXT_PUBLIC_BASE_URL}/api/pi-intake-audit/send-abandonment`

**Analytics & Monitoring:**
- Vercel Analytics - Web Vitals tracking
  - SDK: `@vercel/analytics` 1.6.1
  - Implementation: `app/layout.tsx`
  - Automatically tracks Core Web Vitals

- Vercel Speed Insights - Performance monitoring
  - SDK: `@vercel/speed-insights` 1.3.1
  - Implementation: `app/layout.tsx`
  - Tracks page load performance

## Data Storage

**Databases:**
- Upstash Redis (REST API via HTTP)
  - Connection: REST HTTP endpoints
  - Client: `@upstash/redis` 1.36.2
  - Auth: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
  - Implementation: `lib/db/leads.ts`
  - Data stored:
    - Lead records (email, name, website, role, inbound leads count, status)
    - Key pattern: `intake-audit:lead:{leadId}`
  - TTL: 30 days (auto-expiration)
  - Lead status values: `'pending'` | `'booked'` | `'email_sent'`

**File Storage:**
- Local filesystem only
  - MDX/Markdown content stored in repo
  - Images and assets in `/public` directory
  - No S3 or cloud storage integration

**Caching:**
- None detected beyond Redis TTL for lead data
- Vercel Edge Cache (implicit with Vercel hosting)

## Authentication & Identity

**Auth Provider:**
- Custom implementation (no third-party auth provider)
- Uses unsigned form submission with validation
- QStash webhook verification via HMAC signatures
  - Signature verification: `Receiver.verify()` with current + next signing keys
  - Implementation: `app/api/pi-intake-audit/send-abandonment/route.ts`

## Monitoring & Observability

**Error Tracking:**
- None detected (would benefit from Sentry/similar)
- Console logging only (`console.error`, `console.log`)
- Contextual prefixes used: `[Newsletter]`, `[Intake Audit]`, `[Abandonment]`, `[Email]`

**Logs:**
- Server-side console logs in Node.js runtime
- Structured log prefixes for filtering by feature area
- Log levels: info (console.log), error (console.error)
- No external log aggregation (Vercel logs available via dashboard)

## CI/CD & Deployment

**Hosting:**
- Vercel - Serverless platform (inferred from config)
  - Native Next.js 16 support
  - Environment variables managed via Vercel dashboard
  - Automatic deployments from Git

**CI Pipeline:**
- GitHub (presumed - standard for Vercel deployments)
- Vercel Builds (automatic via Git integration)
- ESLint runs on local machine before commit (developer responsibility)

## Environment Configuration

**Required env vars for production:**
- `RESEND_API_KEY` - Resend email API key
- `RESEND_AUDIENCE_ID` - Audience ID for newsletter
- `UPSTASH_REDIS_REST_URL` - Redis HTTP endpoint
- `UPSTASH_REDIS_REST_TOKEN` - Redis authentication token
- `QSTASH_TOKEN` - QStash API token
- `QSTASH_CURRENT_SIGNING_KEY` - QStash signature verification (primary)
- `QSTASH_NEXT_SIGNING_KEY` - QStash signature verification (rotation)
- `NEXT_PUBLIC_BASE_URL` - Public application URL (used in callbacks)

**Optional env vars:**
- `FROM_EMAIL` - Email sender address (defaults to `notifications@yourdomain.com`)
- `FROM_NAME` - Email sender name (defaults to `Kenstera`)

**Secrets location:**
- Vercel Environment Variables dashboard (production)
- `.env.local` (development - not committed)
- No example `.env.example` file found

## Webhooks & Callbacks

**Incoming Webhooks:**
- QStash scheduled task callback
  - Endpoint: `POST /api/pi-intake-audit/send-abandonment`
  - Signature header: `upstash-signature`
  - Verification: HMAC with current/next signing keys
  - Payload: `{ leadId: string }`

**Outgoing Webhooks:**
- Cal.com booking confirmation (iframe event)
  - Event: `bookingSuccessful`
  - Action: Updates lead status to `'booked'`
  - API endpoint called: `POST /api/pi-intake-audit/booked`

**Other External Calls:**
- Cal.com embed preload (`cal.preload()`)
- Resend email sending (HTTP POST via SDK)
- QStash task publishing (HTTP POST via SDK)

## Integration Flow Diagram

```
Lead Intake Process:
├─ Form submission → /api/pi-intake-audit/capture
│  ├─ Validate with Zod
│  ├─ Store lead in Upstash Redis
│  └─ Schedule abandonment email via QStash (15 min delay)
│
├─ Calendar booking (Cal.com iframe)
│  ├─ Embed React component mounts calendar
│  ├─ Listen for bookingSuccessful event
│  └─ Call /api/pi-intake-audit/booked to update status
│
├─ Scheduled abandonment email (QStash callback)
│  ├─ Verify QStash HMAC signature
│  ├─ Check lead status (skip if already booked)
│  └─ Send via Resend email API
│
└─ Newsletter signup
   ├─ Form submission → /api/newsletter
   ├─ Validate email
   └─ Add to Resend audience
```

---

*Integration audit: 2026-02-21*
