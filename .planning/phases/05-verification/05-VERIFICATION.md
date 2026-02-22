# Phase 5: Verification Results

**Environment:** localhost:3000 (production build via `next build && next start`)
**Date:** 2026-02-22
**Tester:** Human + Claude

## Prerequisites

- [x] Production build completed: `npm run build` — exit code 0
- [x] Production server running: `npm start` — localhost:3000 accessible (started 2026-02-22T04:10:03Z, Next.js 16.1.3, Ready in 490ms)

## Test Results

### Test 1: API Key Leak Check (SEC-01)

| Check | Result | Timestamp | Environment |
|-------|--------|-----------|-------------|
| `grep -r "RETELL_API_KEY" .next/static/` returns no output | PASS | 2026-02-22T04:06:23Z | localhost (post-build) |
| `grep -r "key_ba8f" .next/static/` returns no output | PASS | 2026-02-22T04:06:23Z | localhost (post-build) |
| Server bundle sanity: `grep -r "RETELL_API_KEY" .next/server/` returns matches | PASS | 2026-02-22T04:06:23Z | localhost (post-build) |

**Notes:**
- Build: `npm run build` — Next.js 16.1.3 (Turbopack), exit code 0, 34 pages generated
- Client grep: `grep -r "RETELL_API_KEY" .next/static/` — exit code 1 (no matches)
- Key prefix grep: `grep -r "key_ba8f" .next/static/` — exit code 1 (no matches)
- Server sanity: `grep -r "RETELL_API_KEY" .next/server/` — exit code 0 (matches found in server bundle, expected)
- SEC-01 requirement confirmed: API key is server-only, not exposed in any client bundle

### Test 2: Call Duration Cap (SEC-04)

| Check | Result | Timestamp | Environment |
|-------|--------|-----------|-------------|
| Submit form with real US phone number | PASS | 2026-02-22T04:15:00Z | localhost:3000 |
| Answer call and wait without speaking | PASS | 2026-02-22T04:15:00Z | localhost:3000 |
| Call terminates at or before 120 seconds from connection (±5s tolerance) | PASS | 2026-02-22T04:15:00Z | localhost:3000 |

**Procedure:**
1. Open http://localhost:3000 in browser
2. Scroll to demo form section
3. Enter a real name, US phone number, and email
4. Click submit
5. Start stopwatch when phone begins ringing (not when form is submitted)
6. Answer the call and wait silently
7. Record the time when the call automatically disconnects
8. Pass if call disconnects at or before 125 seconds (120s cap + 5s tolerance)

**Human tester result:** PASS — call auto-disconnected within the 120-second cap

### Test 3: Rate Limit (SEC-02, SEC-03, UX-03)

| Check | Result | Timestamp | Environment |
|-------|--------|-----------|-------------|
| Second submit from same browser (same IP + phone) returns 429 | PASS | 2026-02-22T04:20:00Z | localhost:3000 |
| Form displays rate-limit error message in UI | PASS | 2026-02-22T04:20:00Z | localhost:3000 |
| No second phone rings | PASS | 2026-02-22T04:20:00Z | localhost:3000 |

**Procedure:**
1. After Test 2 completes (call ended), the IP and phone are now rate-limited (10-min window)
2. Fill in the same phone number and submit again
3. Verify: form shows rate-limit error message ("Too many requests from your location. Try again in 10 minutes." or "This number already received a demo call recently. Try again in 10 minutes.")
4. Verify: no second phone call is received
5. Pass if 429 error renders in UI and no phone rings

**Note:** If retesting, use a different phone number (IP rate limit may still be active). Wait 10 minutes for full reset.

**Human tester result:** PASS — 429 rate-limit error displayed in UI, no second call received

### Test 4: Non-US Phone Validation (FORM-02)

| Check | Result | Timestamp | Environment |
|-------|--------|-----------|-------------|
| Canadian number (416 area code) returns validation error | PASS | 2026-02-22T04:25:00Z | localhost:3000 |
| Error message displays in form UI | PASS | 2026-02-22T04:25:00Z | localhost:3000 |
| No call is placed | PASS | 2026-02-22T04:25:00Z | localhost:3000 |

**Procedure:**
1. Enter a Canadian phone number: (416) 555-0100 or similar 416-xxx-xxxx
2. Submit the form
3. Verify: form shows phone validation error ("Please enter a valid US phone number." or similar)
4. Verify: no phone call is received
5. Pass if validation error renders and no call is placed

**Note:** This test does NOT consume a rate-limit token (400 is returned before rate limiting). Can run on an already-rate-limited IP.

**Human tester result:** PASS — validation error displayed for Canadian 416 number, no call placed

### Test 5: Form UX States (UX-01, UX-02, UX-03, UX-04)

| Check | Result | Timestamp | Environment |
|-------|--------|-----------|-------------|
| Loading state: spinner/text shown during API call (observed during Test 2) | PASS | 2026-02-22T04:15:00Z | localhost:3000 |
| Success state: "Your call is on its way" with CTA (observed after Test 2) | PASS | 2026-02-22T04:15:00Z | localhost:3000 |
| Rate-limit error state: distinct message for 429 (observed during Test 3) | PASS | 2026-02-22T04:20:00Z | localhost:3000 |
| Button disabled during submission (observed during Test 2) | PASS | 2026-02-22T04:15:00Z | localhost:3000 |

**Procedure:**
These states are observed as side effects of Tests 2, 3, and 4. No separate submissions needed.
- Loading (UX-01): Watch submit button during Test 2 — should show spinner and "Calling..." text
- Success (UX-02): After Test 2 call triggers — form transitions to success card
- Rate-limit (UX-03): During Test 3 — form shows rate-limit error
- Button disabled (UX-04): During Test 2 submission — button is not clickable

**Human tester result:** PASS — all four UX states observed and functioning correctly

## Summary

| Test | Requirement(s) | Result |
|------|-----------------|--------|
| API Key Leak | SEC-01 | PASS |
| Call Duration Cap | SEC-04 | PASS |
| Rate Limit | SEC-02, SEC-03, UX-03 | PASS |
| Non-US Phone Validation | FORM-02 | PASS |
| Form UX States | UX-01, UX-02, UX-03, UX-04 | PASS |

**Overall: ALL 5 TESTS PASSED — Phase 5 verification complete**

## Failure Log

No failures. All tests passed on first attempt.

---
*Phase: 05-verification*
*Verification date: 2026-02-22*
*Completed: 2026-02-22T04:25:00Z*
