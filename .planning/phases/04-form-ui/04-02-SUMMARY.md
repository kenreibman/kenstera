---
phase: 04-form-ui
plan: "02"
subsystem: ui
tags: [next.js, react, framer-motion, animation, css-keyframes, form, design]

# Dependency graph
requires:
  - phase: 04-form-ui/04-01
    provides: DemoForm.tsx client component built and ready for homepage placement

provides:
  - DemoForm inserted on homepage between CRMIntegrations and CaseStudies
  - Redesigned DemoForm: dark navy section, animated multi-color orb card, underline-style inputs
  - reCAPTCHA fully removed from form, layout, and API route
  - User-approved final visual design verified in browser

affects:
  - 05-verification (form is live on homepage and ready for end-to-end call testing)

# Tech tracking
tech-stack:
  added: []
  removed:
    - next-recaptcha-v3 — uninstalled (reCAPTCHA removed by user decision during verification)
  patterns:
    - CSS @keyframes inline via <style> tag inside React component for orb blob animations
    - Animated orb: 5 layered blobs (purple, cyan, rose, amber, white) with independent spin/drift/pulse keyframes
    - Hidden desktop-only card pattern via hidden lg:flex (orb card) with mobile fallback header in form card
    - Underline-only input style: border-b border-gray-300 bg-transparent (no box border)
    - Dark pill button: rounded-full bg-[#00122e] navy — matches site nav dark CTA style

key-files:
  created: []
  modified:
    - app/page.tsx
    - components/sections/DemoForm.tsx
    - app/layout.tsx
    - app/api/demo-call/route.ts
    - package.json
    - package-lock.json

key-decisions:
  - "reCAPTCHA removed entirely — user decided complexity not worth friction for a demo lead form (no NEXT_PUBLIC_RECAPTCHA_SITE_KEY needed)"
  - "Two-card layout: orb animation on left, form fields on right — orb hidden on mobile, replaced by heading inside form card"
  - "Underline-style inputs chosen over boxed inputs — cleaner look on white card background"
  - "industry dropdown removed — fewer fields lowers friction; name, phone, email sufficient for outbound demo call"

patterns-established:
  - "Orb animation pattern: multiple blurs + keyframe spin/drift at different speeds creates organic motion without JS"
  - "Mobile-adaptive card: hidden lg:flex for desktop-only decorative card; mobile shows heading inside functional card"

requirements-completed: [INFR-03, UX-01, UX-02, UX-03, UX-04]

# Metrics
duration: ~30min (including iterative design verification)
completed: 2026-02-21
---

# Phase 4 Plan 02: Form UI - Homepage Integration Summary

**DemoForm placed on homepage and restyled with animated multi-color orb card, underline inputs, and reCAPTCHA removed — user-verified and approved**

## Performance

- **Duration:** ~30 min (including iterative visual design during human verification)
- **Started:** 2026-02-21
- **Completed:** 2026-02-21
- **Tasks:** 2 (Task 1 auto, Task 2 checkpoint:human-verify with design iteration)
- **Files modified:** 7

## Accomplishments

- Inserted DemoForm into homepage between CRMIntegrations and CaseStudies sections (Task 1)
- Iteratively redesigned DemoForm during user verification: dark navy section, two white cards, animated multi-color swirling orb on desktop left card, underline inputs on right form card
- Removed reCAPTCHA entirely from DemoForm.tsx, layout.tsx, API route, and package.json — uninstalled next-recaptcha-v3
- User reviewed and approved final visual design in browser

## Task Commits

Each task was committed atomically:

1. **Task 1: Insert DemoForm into homepage** - `33294c4` (feat)
2. **Task 2: Restyle DemoForm — orb, underline inputs, remove reCAPTCHA** - `5fd3c69` (feat)

## Files Created/Modified

- `app/page.tsx` - DemoForm imported and rendered between CRMIntegrations and CaseStudies
- `components/sections/DemoForm.tsx` - Full redesign: two-card layout, animated orb (5 CSS blob layers with independent keyframes), underline inputs, mobile-responsive header, dark navy pill submit button
- `app/layout.tsx` - Removed ReCaptchaProvider import and wrapping (reCAPTCHA uninstalled)
- `app/api/demo-call/route.ts` - Removed recaptchaToken from Zod schema and reCAPTCHA verification step; accepts name + phone only
- `package.json` - Removed next-recaptcha-v3 dependency
- `package-lock.json` - Updated lock file

## Decisions Made

- reCAPTCHA removed entirely at user direction — demo lead form friction was not worth the protection complexity
- Two-card split: orb animation card (desktop only, hidden lg:flex) + form card; mobile shows "Enter your information" heading inside form card instead
- Underline-only inputs (border-b only, no box) for cleaner appearance on white card backgrounds
- Industry dropdown and "Back to Agent" link removed — fewer fields, simpler UX

## Deviations from Plan

### Changes Made During Human Verification (User-Directed)

The human verification checkpoint resulted in substantial iterative redesign changes directed by the user. These are not rule-based auto-fixes but user-approved design decisions made during the verification gate:

**1. [User-Directed] Removed reCAPTCHA entirely**
- **Found during:** Task 2 verification
- **Issue:** User decided reCAPTCHA added unnecessary complexity and friction for a demo lead form
- **Fix:** Uninstalled next-recaptcha-v3, removed ReCaptchaProvider from layout.tsx, removed recaptchaToken field from API route schema and verification logic, removed executeRecaptcha hook usage from DemoForm.tsx
- **Files modified:** components/sections/DemoForm.tsx, app/layout.tsx, app/api/demo-call/route.ts, package.json, package-lock.json
- **Committed in:** 5fd3c69

**2. [User-Directed] Full visual redesign of DemoForm**
- **Found during:** Task 2 verification
- **Issue:** Original two-column headline+form layout did not match user's desired design reference
- **Fix:** Redesigned to two white cards on dark navy: left card has animated multi-color orb (5 blur blobs, CSS keyframes), right card has underline-style form inputs and dark pill submit button. Orb card hidden on mobile.
- **Files modified:** components/sections/DemoForm.tsx
- **Committed in:** 5fd3c69

---

**Total deviations:** 2 user-directed (design iteration during checkpoint verification)
**Impact on plan:** Both changes expand on the original spec per user preference. reCAPTCHA removal simplifies the stack (no env var needed). Visual redesign is more polished than original plan spec.

## Issues Encountered

None — all changes were intentional user-directed design decisions made during the verification gate.

## User Setup Required

None — reCAPTCHA has been removed. The form submits directly to /api/demo-call with no additional env vars required beyond what Phase 2 set up (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, RETELL_API_KEY, RETELL_PHONE_NUMBER).

## Next Phase Readiness

- DemoForm is live on the homepage, user-approved, fully functional
- Phase 5 (verification) can run end-to-end demo call tests
- No blockers — build passes, no reCAPTCHA env var dependency

---
*Phase: 04-form-ui*
*Completed: 2026-02-21*
