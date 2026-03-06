---
phase: 02-secure-api-route
plan: "02"
subsystem: api
tags: [nextjs, upstash, ratelimit, recaptcha, libphonenumber-js, retell, curl, security-testing]

# Dependency graph
requires:
  - phase: 02-secure-api-route
    plan: "01"
    provides: "POST /api/demo-call route with full security pipeline (SEC-01 through SEC-05)"
provides:
  - "Human-verified confirmation that all five SEC requirements are enforced at runtime"
  - "Build-time correctness: tsconfig excludes scripts/, lazy Proxy prevents Ratelimit module-init throw"
affects: [03-agent-prompt, 04-demo-ui]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Lazy Proxy pattern for Ratelimit instances: defer getRedis() call until first .limit() invocation to prevent build-time throw when env vars are absent"
    - "Google reCAPTCHA test key (6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI) for local dev — always returns score 1.0"

key-files:
  created: []
  modified:
    - lib/rate-limit/demo-call.ts
    - tsconfig.json

key-decisions:
  - "tsconfig.json excludes scripts/ to suppress pre-existing llm_name type error in setup-retell.ts without touching out-of-scope script"
  - "Lazy Proxy pattern applied to Ratelimit instances so getRedis() is deferred to first .limit() call, preventing build-time throw when UPSTASH env vars are absent"

patterns-established:
  - "Lazy Proxy for Redis-dependent modules: export Proxy objects that call getRedis() on first method access rather than at module init time"

requirements-completed: [SEC-01, SEC-02, SEC-03, SEC-04, SEC-05]

# Metrics
duration: ~15min
completed: 2026-02-21
---

# Phase 2 Plan 02: Security Verification Summary

**All five SEC requirements confirmed through direct curl testing — US phone validation, reCAPTCHA server verification, IP rate limiting (429 on repeat), consent logging, and API key bundle exclusion all pass against the live dev server and Upstash Redis**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-02-21T21:16:28Z
- **Completed:** 2026-02-21T21:34:16Z
- **Tasks:** 2 (1 auto + 1 human-verify)
- **Files modified:** 2 (auto-fixed during Task 1)

## Accomplishments

- Fixed two build-blocking issues discovered during Task 1 (tsconfig scripts/ exclusion, lazy Proxy for Ratelimit) so `npm run build` exits 0 cleanly
- Confirmed all 7 curl tests pass: non-US 400, missing token 400, forged reCAPTCHA 401, valid pipeline reaches Retell, IP rate limit 429, consent log to stdout, API key absent from .next/static/
- Verified the full Retell pipeline is correctly wired — the "from and to number cannot be the same" Retell 400 on the test call confirms the request reached Retell and that env config is correct

## Task Commits

Each task was committed atomically:

1. **Task 1: Verify build and prepare test commands** - `4f2030d` (fix)
2. **Task 2: Verify all security controls via curl** - human-verified checkpoint (no code commit)

**Plan metadata:** (docs commit — this summary)

## Files Created/Modified

- `lib/rate-limit/demo-call.ts` — Refactored to Lazy Proxy pattern; `ipRatelimit` and `phoneRatelimit` now defer `getRedis()` to first `.limit()` call, preventing build-time failure when UPSTASH env vars are absent
- `tsconfig.json` — Added `"scripts"` to `exclude` array to suppress pre-existing `llm_name` type error in `setup-retell.ts` (documented as out-of-scope in 02-01-SUMMARY)

## Decisions Made

- Applied Lazy Proxy pattern to `lib/rate-limit/demo-call.ts` rather than wrapping in a factory function — keeps the module's export shape identical (no import changes needed in route.ts) while deferring Redis initialization to runtime
- Excluded `scripts/` from `tsconfig.json` rather than fixing the pre-existing `llm_name` type error in `setup-retell.ts` — that script is out of scope for Phase 2 and has its own `tsconfig.scripts.json`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] scripts/setup-retell.ts type error prevented build**
- **Found during:** Task 1 (Verify build and prepare test commands)
- **Issue:** Pre-existing TypeScript error in `scripts/setup-retell.ts` (`llm_name` not in `LlmCreateParams`) caused `npm run build` to fail, blocking Task 1 verification
- **Fix:** Added `"scripts"` to the `exclude` array in `tsconfig.json`. The script has its own `tsconfig.scripts.json` for `tsx` execution and should not be included in the app build
- **Files modified:** `tsconfig.json`
- **Verification:** `npm run build` exits 0; 34 pages compiled without TypeScript errors
- **Committed in:** `4f2030d` (Task 1 commit)

**2. [Rule 1 - Bug] Ratelimit eagerly called getRedis() at module init time**
- **Found during:** Task 1 (Verify build and prepare test commands)
- **Issue:** `lib/rate-limit/demo-call.ts` called `getRedis()` at module load time (top-level `new Ratelimit(...)` expressions). This threw during `npm run build` when `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` were absent from the build environment
- **Fix:** Replaced the eager Ratelimit instances with `new Proxy(...)` objects that call `getRedis()` only when `.limit()` is first invoked at request time — matching the lazy singleton intent already established by the `getRedis()` helper
- **Files modified:** `lib/rate-limit/demo-call.ts`
- **Verification:** `npm run build` exits 0; rate limiting still applies correctly (IP rate limit 429 confirmed by Test 4)
- **Committed in:** `4f2030d` (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for build correctness. No scope creep — the Proxy change preserves the exact export interface; the tsconfig change uses the exclusion already established by `tsconfig.scripts.json`.

## Issues Encountered

The valid pipeline test (Test 3) used the Retell phone number as both `from` and `to` during curl testing. Retell returned HTTP 400 "from and to number cannot be the same." This is expected behavior — it confirms the full pipeline (consent log → Retell API call) executed correctly and that Retell received and validated the request. The test is marked PASS.

## User Setup Required

None — all environment variables were confirmed present in `.env.local` during Task 1. External service configuration was covered in 02-01-SUMMARY.md.

## Next Phase Readiness

- All five SEC requirements are runtime-verified, not just code-verified
- Phase 3 (Agent Prompt) can proceed immediately — it writes the Retell LLM system prompt and does not depend on this route
- Phase 4 (Demo UI) will connect to this route via `POST /api/demo-call`; reCAPTCHA site key (public) still needed for the frontend widget — React 19 peer dep compatibility flagged LOW confidence, validate at Phase 4 start
- Phase 2 is fully complete

---
*Phase: 02-secure-api-route*
*Completed: 2026-02-21*

## Self-Check: PASSED

- FOUND: lib/rate-limit/demo-call.ts (modified)
- FOUND: tsconfig.json (modified)
- FOUND commit: 4f2030d (fix(02-02): fix build-time failures blocking Task 1 verification)
- FOUND: .planning/phases/02-secure-api-route/02-02-SUMMARY.md
