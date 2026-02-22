# Phase 5: Verification - Research

**Researched:** 2026-02-21
**Domain:** Manual end-to-end verification of security controls, rate limiting, phone validation, call duration cap, and API key isolation — run against a production build on localhost
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- All tests use real Retell calls — actually dial a phone to prove the full chain works
- Manual checklist walkthrough, not automated scripts — step-by-step guide followed in browser and terminal
- Rate limit and UX error tests run from the actual browser form (not curl) to verify both the API response and the displayed error message
- Production build key-leak check is a manual grep after `next build` — one-time check, no build pipeline script
- Output is a VERIFICATION.md markdown checklist in `.planning/phases/05-verification/`
- Each test is a checkbox row with pass/fail and brief text notes (no screenshots)
- Each test row includes exact timestamp and environment (e.g., "localhost:3000 at 2026-02-22 14:30")
- All verification runs against localhost (`next build && next start`) — no deployed preview needed
- Every test failure is a blocker — fix the issue and retest. Phase isn't done until all tests pass
- Fixes to earlier-phase code (API route, form component) are made directly within Phase 5 — no kicking back
- Only record final pass/fail result per test — no retest history tracking
- Maximum 3 fix-and-retest attempts per test — if a test fails 3 times, flag it as needing architectural review

### Claude's Discretion

- Exact ordering of tests in the checklist
- How to structure the manual steps for each test (level of detail)
- Whether to run `next build` or `next start` for specific tests

### Deferred Ideas (OUT OF SCOPE)

- $20/day Retell billing alert — handle outside verification flow, not blocked on launch
</user_constraints>

---

<phase_requirements>
## Phase Requirements

This phase is cross-cutting — it validates that all prior-phase requirements are enforced in production, not merely present in code. The specific success criteria map to requirements as follows:

| Success Criterion | Requirement(s) Validated | Research Support |
|---|---|---|
| Test call terminates at or before 3 minutes (not 60) | SEC-04 | `MAX_CALL_DURATION_MS = 120_000` set via `agent_override.agent` in route.ts — per-call enforcement confirmed in code |
| Rapid double-submit returns 429 and no second call | SEC-02, SEC-03, UX-04 | IP + phone sliding window (1 per 10 min) via Upstash; `isSubmitting` ref guards client-side; button disabled during `submitting` state |
| Non-US phone returns validation error, no Retell call | FORM-02 | `libphonenumber-js` with `parsedPhone.country !== 'US'` guard — returns 400 before Retell API is reached |
| `RETELL_API_KEY` string absent from `.next/static/` | SEC-01 | `retell/client.ts` imports only in API route (server component); guard throws if `process.env.RETELL_API_KEY` is missing at load time |
| (Billing alert — deferred per CONTEXT.md) | — | Out of scope |
</phase_requirements>

---

## Summary

Phase 5 is a manual verification pass against a production Next.js build (`next build && next start`) running on localhost. Every test is executed through the real browser form and verified by observing actual outcomes: a phone rings, a 429 appears in the UI, an error message renders, or a grep finds no key leak. There are no automated test scripts — the output is a VERIFICATION.md checklist.

The implementation across phases 1–4 is already complete. The research task is therefore not about choosing libraries or patterns — it is about understanding exactly what each test needs to prove, what the expected observable outcome is, and what failure modes could trip up the verification procedure itself.

The most important insight for planning: **test ordering matters**. Rate limit tests consume real rate limit tokens against production Redis. If the "call duration" test fires first and the rate limit test fires second from the same IP, the rate limit test will get a legitimate 429 from the prior call rather than from submitting twice. The test sequence must account for this by either: (a) using a fresh IP/phone for each test, or (b) ordering tests so rate-limit consumption is intentional and not a side effect.

**Primary recommendation:** Order tests to avoid unintentional rate-limit contamination. Run the key-leak check first (no Redis state), then the call duration test (real call, consumes one token), then the rate limit test (intentional second submit from same phone), then the phone validation test (no real call, no Redis write since it fails before rate limiting). Each test section in the plan must document its exact prerequisites.

---

## Standard Stack

### Core (already installed — no new installs needed for verification)

| Tool | Version | Purpose | Role in Verification |
|------|---------|---------|----------------------|
| Next.js | 16.1.3 | App framework | `next build && next start` produces the production server under test |
| `@upstash/ratelimit` | 2.0.8 | Rate limiting | Already wired in `lib/rate-limit/demo-call.ts` — test validates it fires correctly |
| `libphonenumber-js` | 1.12.37 | Phone validation | Already wired in `app/api/demo-call/route.ts` — test validates US-only guard |
| `retell-sdk` | 5.2.0 | Outbound call | Real call placed in test 1 (duration) and test 2 (rate limit) |
| `grep` / `findstr` | shell built-in | Key leak check | Search `.next/static/` for the string `RETELL_API_KEY` after production build |

### No New Dependencies

This phase adds no npm packages. It uses shell commands (`grep`, browser DevTools, `next build`, `next start`) and the already-running localhost server.

---

## Architecture Patterns

### Test Execution Environment

```
next build                        # Produces .next/ directory
next start                        # Serves production build on localhost:3000
```

All form interactions happen at `http://localhost:3000` in a real browser. The API route at `/api/demo-call` is server-side and has access to `.env.local` environment variables.

**Key detail:** `next build` with `.env.local` present will NOT embed `RETELL_API_KEY` into the client bundle because:
1. It is not prefixed `NEXT_PUBLIC_`
2. It is only imported in `lib/retell/client.ts`, which is only imported in `app/api/demo-call/route.ts` (a server-only API route)

The grep check verifies this empirically after build.

### The Five Tests

#### Test 1: Call Duration Cap (SEC-04)

**What to prove:** A real outbound call terminates at or before 120 seconds (2 minutes), not the Retell default of ~60 minutes.

**How:** Submit the form with a real US phone number. Answer the call. Wait without speaking. Observe that the call ends within 120 seconds of connection.

**Implementation detail:** `MAX_CALL_DURATION_MS = 120_000` is passed as `agent_override.agent.max_call_duration_ms` in the Retell API call. This is the per-call override pattern chosen in Phase 1 to avoid agent version mismatch. The timer starts from call connection, not from the API call.

**Expected outcome:** Call drops automatically at or before 2 minutes (120 seconds). If call drops at exactly 2 minutes ± 5 seconds, that is a pass.

**Prerequisite:** Fresh phone number and IP not yet rate-limited. Run this test first.

**Timing note:** This test takes real time — tester must remain available for ~3 minutes to observe call termination.

#### Test 2: Rate Limit (SEC-02, SEC-03, UX-03)

**What to prove:** Submitting the form twice rapidly with the same phone number results in a 429 response on the second submit, with no second Retell call being placed.

**How:** After Test 1, immediately submit the form again from the same browser (same IP, same phone number). The second submit should fail with a 429 and display "You have already requested a demo call recently. Please try again in 10 minutes."

**Implementation details:**
- Upstash sliding window: `1 request per IP per 10 minutes` (`demo-call:ip` prefix)
- Upstash sliding window: `1 request per phone per 10 minutes` (`demo-call:phone` prefix)
- The `isSubmitting` ref guard prevents double-click at the JS level (client-side guard)
- The `disabled` button state fires on `formState === 'submitting'` — re-enables on error

**Rate limit state:** After Test 1, the IP and phone number are already rate-limited. The second submit in Test 2 will hit the already-exhausted window — this is intentional sequencing.

**Expected outcome:** Form shows rate-limit error message. No phone rings. Retell dashboard shows only one call from the test session.

**Note on `isSubmitting` ref:** The ref guard (`if (isSubmitting.current) return`) fires before any state update — it's synchronous. The second browser submit (from page, not double-click) bypasses this guard since it's a fresh form render. This is expected: the rate limit is the true server-side protection.

#### Test 3: Non-US Phone Validation (FORM-02)

**What to prove:** Entering a non-US phone number and submitting returns a validation error and no Retell API call is made.

**How:** Enter a Canadian number (e.g., `+1 416 555 0100` — Toronto area code, not callable by random dial) and submit. Also test a UK number: enter `+44 20 7946 0958` (UK format, type digits `447946...` to see if form accepts it). Observe the error message.

**Implementation detail:** The form sends `phoneDisplay` (formatted display string) to the API. The API uses `parsePhoneNumberFromString(phone, 'US')` — this accepts E.164 or national-format input. The guard `parsedPhone.country !== 'US'` rejects non-US numbers.

**Canadian number subtlety:** Canadian numbers share the +1 country code with US. A number like `(416) 555-0100` parsed with `parsePhoneNumberFromString` and default region `'US'` may return `country: 'CA'` since 416 is a Canadian NPA. The `libphonenumber-js` library correctly distinguishes US vs CA NPAs. This must be explicitly verified.

**Expected outcome:** Form shows "Please enter a valid US phone number." field error. No call is placed. Retell dashboard shows no new call.

**Prerequisite:** This test does NOT consume a rate limit token (the 400 is returned before rate limit check). Can run on a rate-limited IP/phone without issue.

#### Test 4: API Key Leak Check (SEC-01)

**What to prove:** The string `RETELL_API_KEY` does not appear anywhere under `.next/static/` after a production build.

**How:**
```bash
# After next build completes:
grep -r "RETELL_API_KEY" .next/static/
# Should return: no output (no matches)

# Also check for the actual key value (first 8 chars for safety):
grep -r "key_ba8f" .next/static/
# Should return: no output
```

**Why this works:** `.next/static/` contains all client-side JavaScript bundles. Server-side code (API routes, server components) is compiled separately and never lands in `static/`. The `lib/retell/client.ts` module throws at load time if `RETELL_API_KEY` is absent — this guard also ensures no accidental client-side import can silently succeed.

**Expected outcome:** Both grep commands return no output (exit code 1). If the key or its name appears in any file under `.next/static/`, that is a critical failure.

**Run order:** This test can run first, before `next start`. It only requires `next build`.

**Windows note:** The project is on Windows. Use `grep -r` in bash (Git Bash / WSL), or use the Windows `findstr` equivalent. The bash environment is confirmed available per the project shell setting.

#### Test 5: Form UX States (UX-01, UX-02, UX-03, UX-04)

**What to prove:** All four form states render correctly in the browser: loading spinner, success state, error message (rate limit), and button disablement.

**How:**
- **Loading state (UX-01):** Watch the form during submission (Test 1 or 2). The submit button should show a spinner and "Calling..." text while the API call is in flight.
- **Success state (UX-02):** After Test 1 succeeds, the form should transition to the success card: "Your call is on its way" with a "Book a sales call" CTA.
- **Rate-limit error (UX-03 / 429 path):** After Test 2 returns 429, the form should show "You have already requested a demo call recently. Please try again in 10 minutes." as a global error.
- **Button disabled (UX-04):** During submission, `disabled` prop is set on the button (`formState === 'submitting'`). Verify button is not clickable during the ~1-2 second API call window.

**Implementation detail:** The `isSubmitting` ref is a guard against async double-fire. The `formState === 'submitting'` check drives the button disabled state and spinner render. Both are in `DemoForm.tsx`.

**Note:** These UX state checks are observable as side effects of Tests 1 and 2. They do not require separate submissions if the tester is observant. However, they should be explicitly called out as separate checklist rows to ensure each state is confirmed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rate limit state reset between tests | Custom Redis flush script | Wait 10 minutes or use a fresh phone number per test | Resetting production Redis between tests risks contaminating other rate limit data; waiting or using a new number is cleaner |
| Automated test runner | Playwright / Cypress test | Manual browser walkthrough | Locked decision in CONTEXT.md — manual only |
| Key leak detection | Custom bundle parser | `grep -r "RETELL_API_KEY" .next/static/` | Grep is sufficient; the string must not appear literally |

---

## Common Pitfalls

### Pitfall 1: Rate Limit Token Contamination Across Tests

**What goes wrong:** Running Test 1 (call duration) consumes the rate limit for that IP and phone. If Test 3 (non-US phone validation) is run from the same IP expecting a "valid" path test afterward, the 400 from non-US validation is returned before rate limiting — so this specific case is safe. But running Test 1 again (to re-test call duration) from the same IP will immediately hit 429 instead.

**Why it happens:** Upstash sliding window persists for 10 minutes. Tests that call the API route consume tokens. Token consumption is not scoped to "test sessions."

**How to avoid:** Use the following sequencing:
1. Key-leak check (no Redis, no Retell)
2. UX state observation setup
3. Call duration test (first real submission — consumes token)
4. Rate limit test (second submission — intentionally hits exhausted window)
5. Non-US phone test (fails before rate limit — does not consume additional token)
6. Confirm all UX states were observed in steps 3–5

If a test needs to be repeated and the window is exhausted, the tester must either wait 10 minutes or use a different phone number (and accept that the IP rate limit is still active — the phone rate limit will be fresh on the new number).

### Pitfall 2: `next start` Must Be Run After `next build` Completes

**What goes wrong:** Running tests against `next dev` (Turbopack) instead of the production build. The key-leak check only applies to the production bundle under `.next/static/`.

**Why it happens:** `npm run dev` uses `next dev --turbopack` (confirmed in package.json scripts). This does NOT produce a `.next/static/` directory in the same way as a production build.

**How to avoid:** Always run `next build && next start` for all verification tests. Document this as the required environment in VERIFICATION.md.

### Pitfall 3: Canadian Numbers Share +1 Country Code

**What goes wrong:** Testing with a Canadian number (e.g., 416 area code) and assuming it will pass the US validation — or conversely, testing with a Canadian number and not verifying that the library correctly rejects it as `country: 'CA'`.

**Why it happens:** +1 is shared between US and Canada. `libphonenumber-js` distinguishes by NPA (area code). 416, 647, 437 are Canadian. 800, 888, 877 are toll-free US numbers that may or may not trigger the right behavior.

**How to avoid:** Use Toronto area code 416 explicitly for the non-US test. Document in the checklist that 416 is expected to return `country: 'CA'` and be rejected.

### Pitfall 4: Grep Against `.next/static/` on Windows

**What goes wrong:** Using Windows `findstr` syntax instead of POSIX `grep -r`. Or running grep against the wrong directory (`.next/` instead of `.next/static/`).

**Why it happens:** The project runs on Windows (confirmed in ENV). Shell is bash (Git Bash), but the tester may inadvertently use a Windows terminal.

**How to avoid:** The VERIFICATION.md plan must specify to run all commands in Git Bash. The grep command should target `.next/static/` specifically (not all of `.next/` which includes server-side bundles that legitimately reference the env var name).

**Important nuance:** The string `RETELL_API_KEY` may appear in server-side bundles under `.next/server/` — that is acceptable. The check is ONLY for `.next/static/`. Do not flag `.next/server/` findings as failures.

### Pitfall 5: Call Duration Timer Starts at Connection, Not API Call

**What goes wrong:** Starting a stopwatch when the form is submitted instead of when the call connects. If the outbound call takes 5–15 seconds to connect, the tester may think the call ended early.

**Why it happens:** Retell's `max_call_duration_ms` counts from call connection, not from the API call initiation. There is a ring/connect latency.

**How to avoid:** Start the stopwatch when the phone begins ringing (call has connected). Document this in the test procedure.

---

## Code Examples

### Key-Leak Grep Commands

```bash
# Run from project root after next build:
grep -r "RETELL_API_KEY" .next/static/
# Expected: no output (exit 1)

# Also check actual key value (safe partial match):
grep -r "key_ba8f" .next/static/
# Expected: no output (exit 1)

# Confirm server bundles are NOT checked (this is fine to have):
grep -r "RETELL_API_KEY" .next/server/
# May have output — this is expected and acceptable
```

### Production Build and Start Commands

```bash
# From project root:
npm run build
# (wait for build to complete)
npm start
# Server runs at http://localhost:3000
```

### Verify Rate Limit Is Active (Optional Debug)

If a 429 does not appear when expected, check Redis directly or confirm the sliding window is running:

```bash
# The rate limit key pattern in Redis:
# demo-call:ip:{ip_address}
# demo-call:phone:{e164_phone}
# These can be inspected via Upstash console if needed
```

### Route Confirmation: Duration Cap Value

From `app/api/demo-call/route.ts`:
```typescript
const MAX_CALL_DURATION_MS = 120_000  // 2 minutes = 120 seconds

// Applied per-call:
agent_override: {
  agent: {
    max_call_duration_ms: MAX_CALL_DURATION_MS,
  },
},
```

The success criterion "terminates at or before 3 minutes" is satisfied by the 2-minute cap. The phrasing "not 60" refers to the Retell default of 60 minutes.

---

## Recommended Test Order

The following order minimizes rate-limit contamination and aligns with the CONTEXT.md discretion grant:

1. **Key-leak check** (before `next start`, no Redis state, no real call)
2. **Call duration test** (first form submission — consumes one rate-limit token per IP + phone)
3. **UX state observation** (loading spinner, success card — observed as side effect of call duration test; no separate submission needed)
4. **Rate limit test** (second form submission from same browser — intentionally hits exhausted window; observe 429 error message in UI)
5. **Non-US phone validation** (submit with Canadian phone — fails at validation layer before rate limit; does not consume additional token)

This sequence uses exactly two real Retell calls maximum (only Test 2: call duration) and intentionally leverages the rate-limited state for Test 4.

---

## State of the Art

| Item | Current State | Notes |
|------|--------------|-------|
| Rate limit implementation | Upstash sliding window, 1 per 10 min | Correct for production |
| Duration cap | 120s via `agent_override.agent.max_call_duration_ms` | Per-call override — avoids agent version mismatch pitfall |
| Key isolation | `retell/client.ts` server-only, throws if no env var | No `NEXT_PUBLIC_` prefix, no client import path |
| Phone validation | `libphonenumber-js` with `country !== 'US'` guard | Correctly rejects Canadian +1 numbers by NPA |

---

## Open Questions

1. **Rate limit window reset for repeated test runs**
   - What we know: The sliding window is 10 minutes. A failed test run means re-running requires either a 10-minute wait or switching to a different phone number.
   - What's unclear: Whether the planner should document an explicit "how to reset for re-run" procedure.
   - Recommendation: The VERIFICATION.md should note "use a new test phone number if retesting within the same 10-minute window." Do not provide a Redis flush procedure — too risky in production.

2. **Retell call dashboard confirmation for rate limit test**
   - What we know: The CONTEXT.md says "No Retell dashboard checks included."
   - What's unclear: The phase success criterion says "no second call is placed" — how do we verify no second call without the dashboard?
   - Recommendation: The behavioral proof is sufficient: if the UI shows 429 and no second phone ring occurs, that is the observable confirmation. The plan should make this explicit.

---

## Sources

### Primary (HIGH confidence)

- Source code read directly: `app/api/demo-call/route.ts` — confirms MAX_CALL_DURATION_MS = 120_000, rate limit integration, phone validation guard
- Source code read directly: `lib/rate-limit/demo-call.ts` — confirms sliding window (1 per 10 min), lazy proxy pattern, IP and phone prefixes
- Source code read directly: `lib/retell/client.ts` — confirms server-only enforcement via throw at module load
- Source code read directly: `components/sections/DemoForm.tsx` — confirms UX states (idle/submitting/success/error), button disabled logic, error message rendering
- Source code read directly: `package.json` — confirms `next build` / `next start` scripts, all dependency versions
- Source code read directly: `.env.local` — confirms RETELL_API_KEY is present and NOT prefixed NEXT_PUBLIC_

### Secondary (MEDIUM confidence)

- Next.js documentation knowledge: `.next/static/` contains only client-side bundles; server API routes compile to `.next/server/`. This is standard Next.js build output behavior.
- `libphonenumber-js` behavior: Canadian numbers with +1 prefix and a Canadian NPA (e.g., 416) parse as `country: 'CA'`, not `'US'`. This is well-established library behavior verified by code inspection.

### Tertiary (LOW confidence)

- None — all claims are grounded in direct code inspection.

---

## Metadata

**Confidence breakdown:**
- Test procedures: HIGH — derived directly from reading the actual implementation code
- Rate limit sequencing: HIGH — based on code-confirmed 10-minute sliding window behavior
- Key-leak grep approach: HIGH — based on standard Next.js build output structure
- Call duration timing: MEDIUM — Retell's timer start behavior (connection vs API call) is inferred from general telephony knowledge; confirm empirically during verification

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (stable — no fast-moving dependencies; implementation is already locked)
