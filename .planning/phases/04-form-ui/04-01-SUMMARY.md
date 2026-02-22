---
phase: 04-form-ui
plan: "01"
subsystem: ui
tags: [next.js, react, recaptcha, framer-motion, libphonenumber-js, form]

# Dependency graph
requires:
  - phase: 02-secure-api-route
    provides: /api/demo-call POST endpoint that accepts name, phone, email, recaptchaToken

provides:
  - DemoForm.tsx client component with all four form states
  - ReCaptchaProvider integration in root layout
  - Phone auto-formatting (XXX) XXX-XXXX via libphonenumber-js AsYouType
  - reCAPTCHA v3 invisible token generation at submit time

affects:
  - 04-form-ui (homepage integration in plan 02 will import DemoForm)

# Tech tracking
tech-stack:
  added:
    - next-recaptcha-v3@1.5.3 — reCAPTCHA v3 React provider and hook
  patterns:
    - AnimatePresence mode="wait" for form-to-success state swap with framer-motion
    - useRef isSubmitting guard paired with disabled button for double-submit prevention
    - reCAPTCHA token generated at submit time (not mount) to avoid 2-minute expiry
    - AsYouType('US') from libphonenumber-js for progressive phone formatting
    - Status-code-driven error handling (429 vs 400 vs 500 distinct messages)

key-files:
  created:
    - components/sections/DemoForm.tsx
  modified:
    - app/layout.tsx
    - package.json
    - package-lock.json

key-decisions:
  - "ReCaptchaProvider wraps LayoutWrapper only (not Analytics/SpeedInsights/Meta Pixel) — client component rendered as leaf, valid in Next.js App Router server component"
  - "Phone field sends formatted display value (XXX) XXX-XXXX to API — server's parsePhoneNumberFromString normalizes to E.164"
  - "Button disabled only during formState === 'submitting' — re-enabled on error so user can retry without page refresh"
  - "executeRecaptcha called inside handleSubmit immediately before fetch — not on mount — to prevent token expiry"

patterns-established:
  - "Form state machine: single FormState type drives all UI — button disabled state, spinner, content swap"
  - "Double-submit prevention: isSubmitting useRef guard + disabled button (defense in depth)"
  - "Dark section pattern: #00122e background, white inputs, white/70 text — consistent with CONTEXT.md locked decisions"

requirements-completed: [FORM-01, FORM-02, FORM-03, UX-01, UX-02, UX-03, UX-04]

# Metrics
duration: 3min
completed: 2026-02-22
---

# Phase 4 Plan 01: Form UI - DemoForm Component Summary

**next-recaptcha-v3 installed and DemoForm.tsx built with four form states, phone auto-format via AsYouType, reCAPTCHA v3 at submit time, and status-code-driven 429/400/500 error handling**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-02-22T00:36:41Z
- **Completed:** 2026-02-22T00:39:20Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Installed next-recaptcha-v3@1.5.3 and wrapped LayoutWrapper with ReCaptchaProvider in app/layout.tsx (server component — valid in Next.js App Router)
- Built DemoForm.tsx with complete FormState machine (idle/submitting/success/error), AnimatePresence form-to-success swap, and all accessibility attributes
- Phone auto-formatting via AsYouType('US') limits to 10 digits and formats progressively as (XXX) XXX-XXXX; sends display value to API which normalizes to E.164
- reCAPTCHA v3 token generated inside handleSubmit before fetch call — not on mount — preventing token expiry edge case

## Task Commits

Each task was committed atomically:

1. **Task 1: Install next-recaptcha-v3 and add ReCaptchaProvider to layout** - `cae2bfe` (feat)
2. **Task 2: Build DemoForm.tsx with all four form states** - `8a7d64a` (feat)

## Files Created/Modified

- `components/sections/DemoForm.tsx` - Complete demo form component: four form states, phone auto-format, reCAPTCHA v3 integration, status-code error handling, AnimatePresence transitions
- `app/layout.tsx` - Added ReCaptchaProvider import and wrapping around LayoutWrapper
- `package.json` - Added next-recaptcha-v3 dependency
- `package-lock.json` - Updated lock file

## Decisions Made

- ReCaptchaProvider wraps only LayoutWrapper (Analytics, SpeedInsights, Meta Pixel remain siblings) — client component boundary valid in Next.js App Router
- Button `disabled={formState === 'submitting'}` (not `!== 'idle'`) so user can retry on error without page refresh — per UX-04 spec
- `executeRecaptcha` called inside `handleSubmit` before fetch, not in useEffect on mount, to avoid the 2-minute token expiry window

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**External services require manual configuration before the form works in production:**

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` — Google reCAPTCHA Admin Console -> Register site -> Copy Site Key
  - For local dev, use Google test key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
  - The form renders and the build passes without this variable; the reCAPTCHA call will fail silently at runtime

## Next Phase Readiness

- DemoForm component is ready to import and place on the homepage
- Phase 4 Plan 02 (homepage integration) will insert DemoForm between CRMIntegrations and CaseStudies sections
- No blockers — build passes, type-checks cleanly, all patterns verified

---
*Phase: 04-form-ui*
*Completed: 2026-02-22*
