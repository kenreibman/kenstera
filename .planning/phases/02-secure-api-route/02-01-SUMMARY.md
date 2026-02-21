---
phase: 02-secure-api-route
plan: "01"
subsystem: api
tags: [nextjs, upstash, ratelimit, recaptcha, libphonenumber-js, retell, zod]

# Dependency graph
requires:
  - phase: 01-provisioning
    provides: "Retell agent, LLM, phone number, and lib/retell/client.ts server-only singleton"
provides:
  - "POST /api/demo-call route enforcing full security pipeline (SEC-01 through SEC-05)"
  - "lib/rate-limit/demo-call.ts with ipRatelimit and phoneRatelimit (10-min sliding windows)"
  - "lib/recaptcha/verify.ts with verifyRecaptchaToken returning score or null"
affects: [03-agent-prompt, 04-demo-ui]

# Tech tracking
tech-stack:
  added:
    - "@upstash/ratelimit@2.0.8 — sliding window rate limiting via Upstash Redis"
    - "libphonenumber-js@1.12.37 — US phone number validation with NANP rules"
  patterns:
    - "Pipeline validation: parse JSON -> Zod validate -> phone validate -> reCAPTCHA -> rate limits -> side effects -> response"
    - "getRedis() lazy singleton matches lib/db/leads.ts pattern"
    - "Verify reCAPTCHA before rate limits to prevent counter poisoning by bots"
    - "agent_override.agent.max_call_duration_ms at per-call level (not agent-level) to avoid version mismatch"

key-files:
  created:
    - lib/rate-limit/demo-call.ts
    - lib/recaptcha/verify.ts
    - app/api/demo-call/route.ts
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "reCAPTCHA score threshold set to 0.3 (below Google's default 0.5) to reduce false rejections for mobile users on a low-stakes demo form"
  - "retryAfter field included in 429 responses (seconds until reset via Ratelimit.reset timestamp) for Phase 4 UX-05 retry countdown compatibility"
  - "MAX_CALL_DURATION_MS constant used instead of inline 180_000 for readability; placed in agent_override (not agent-level per Phase 1 decision)"
  - "verifyRecaptchaToken returns null on failure and score (0.0-1.0) on success — caller decides threshold for reusability"
  - "Pre-existing lint errors (unescaped entities, setState in effect) in unrelated components are out-of-scope; our new files pass lint cleanly"

patterns-established:
  - "Rate limit module pattern: two Ratelimit instances with distinct prefix values (demo-call:ip, demo-call:phone) to prevent key collision"
  - "IP extraction pattern: x-forwarded-for first entry -> x-real-ip -> 127.0.0.1 fallback"
  - "Consent logging before Retell call: structured JSON to stdout visible in Vercel function logs"

requirements-completed: [SEC-01, SEC-02, SEC-03, SEC-04, SEC-05]

# Metrics
duration: 2min
completed: 2026-02-21
---

# Phase 2 Plan 01: Secure API Route Summary

**POST /api/demo-call with five-layer security pipeline: US phone validation (libphonenumber-js), reCAPTCHA v3 server verification, dual Upstash sliding-window rate limits (IP + phone), TCPA consent logging, and Retell outbound call with 180-second per-call duration cap**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-21T21:16:28Z
- **Completed:** 2026-02-21T21:18:33Z
- **Tasks:** 2
- **Files modified:** 5 (3 created, 2 modified)

## Accomplishments

- Installed `@upstash/ratelimit@2.0.8` and `libphonenumber-js@1.12.37`; both new dependencies confirmed with `npm ls`
- Created `lib/rate-limit/demo-call.ts` with `ipRatelimit` and `phoneRatelimit` (10-minute sliding windows, distinct Redis key prefixes to prevent collision)
- Created `lib/recaptcha/verify.ts` with `verifyRecaptchaToken` using native fetch to Google siteverify — returns score or null
- Created `app/api/demo-call/route.ts` implementing all five SEC requirements in strict pipeline order with correct error codes (400/401/429/500) and `retryAfter` field on 429 responses

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies and create helper modules** - `e884cb3` (feat)
2. **Task 2: Create POST /api/demo-call route handler** - `d60b2f5` (feat)

**Plan metadata:** (docs commit — this summary)

## Files Created/Modified

- `lib/rate-limit/demo-call.ts` — Two Ratelimit instances for IP and phone, following getRedis() lazy singleton pattern from lib/db/leads.ts
- `lib/recaptcha/verify.ts` — Server-side reCAPTCHA v3 token verification via Google siteverify; returns score (0.0–1.0) or null on failure
- `app/api/demo-call/route.ts` — POST handler orchestrating full validation pipeline; exports POST; imports from all three helpers
- `package.json` — Added @upstash/ratelimit and libphonenumber-js dependencies
- `package-lock.json` — Updated lockfile

## Decisions Made

- reCAPTCHA score threshold set to 0.3 (below Google's default 0.5) to minimize false rejections for legitimate mobile users on a low-stakes public demo form
- `retryAfter` field included in 429 responses using `Math.ceil((result.reset - Date.now()) / 1000)` for Phase 4 UX-05 retry countdown without API redesign
- `MAX_CALL_DURATION_MS = 180_000` constant used at `agent_override.agent.max_call_duration_ms` (per-call level, not agent-level — per Phase 1 STATE.md decision)
- `verifyRecaptchaToken` returns score on success and null on failure; caller decides threshold — keeps helper reusable across future routes

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

Pre-existing `scripts/setup-retell.ts` has a TypeScript error (`llm_name` not in `LlmCreateParams`) and several lint errors exist in unrelated components (unescaped entities, setState in effect). These predate this plan and are out of scope. Our new files (lib/rate-limit/demo-call.ts, lib/recaptcha/verify.ts, app/api/demo-call/route.ts) pass both `tsc --noEmit` and `eslint` with zero errors.

## User Setup Required

**External services require manual configuration before this route can operate:**

Three environment variables must be added to `.env.local`:

| Variable | Source | Notes |
|----------|--------|-------|
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA Admin Console -> Register site -> Copy Secret Key | Use `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` for local dev (Google test key — always returns score 1.0) |
| `UPSTASH_REDIS_REST_URL` | Upstash Console -> Create Redis Database -> REST API section | Free tier sufficient |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Console -> Create Redis Database -> REST API section | Free tier sufficient |

The route compiles and builds cleanly without these variables. They are only needed at runtime when the route is invoked.

## Next Phase Readiness

- `POST /api/demo-call` is complete and testable via curl/Postman once env vars are in place
- All five SEC requirements have corresponding code in the route handler
- Response shapes (200/400/401/429/500) are consistent and designed for Phase 4 UI consumption
- Phase 3 (Agent Prompt) can proceed — it does not depend on runtime testing of this route
- Phase 4 (Demo UI) will need `RECAPTCHA_SITE_KEY` (public) for `react-google-recaptcha-v3` or `next-recaptcha-v3` widget; validate React 19 peer dep compatibility at Phase 4 start (flagged as LOW confidence in STATE.md)

---
*Phase: 02-secure-api-route*
*Completed: 2026-02-21*

## Self-Check: PASSED

- FOUND: lib/rate-limit/demo-call.ts
- FOUND: lib/recaptcha/verify.ts
- FOUND: app/api/demo-call/route.ts
- FOUND: .planning/phases/02-secure-api-route/02-01-SUMMARY.md
- FOUND commit: e884cb3 (feat(02-01): install rate-limit + reCAPTCHA helper modules)
- FOUND commit: d60b2f5 (feat(02-01): create POST /api/demo-call route handler)
