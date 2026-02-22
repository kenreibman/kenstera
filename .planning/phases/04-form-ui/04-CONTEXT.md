# Phase 4: Form UI - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Client-side demo form component integrated into the homepage between CRM Integrations and Case Studies sections. Visitors enter name, phone, and email, pass invisible reCAPTCHA, and trigger a real AI phone call. The form provides clear feedback at every step: idle, loading, success, and each error state. The API route and agent already exist from prior phases.

</domain>

<decisions>
## Implementation Decisions

### Section Framing & Copy
- "Hear it yourself" framing — experience-first, let the product speak
- Brief explainer line alongside the form: "Receive a live call from our agent and discover how it transforms your firm's intake."
- Submit button text: "Get a call"
- Inline consent disclosure below the button (small text, e.g., "By submitting, you agree to receive an AI-powered phone call")

### Form Layout & Field Design
- Single column, stacked fields (name, phone, email)
- Two-column section layout on desktop: copy/headline on the left, form fields on the right — stacks on mobile
- Phone field uses auto-format input mask: (XXX) XXX-XXXX
- No card container around the form — fields sit directly on the section background
- reCAPTCHA v3 is invisible (no visual element)

### State Feedback
- **Loading:** Spinner/loading message while call is being triggered (button disabled)
- **Success:** Calm confirmation — simple checkmark + "Your call is on its way" message. Form is replaced entirely by the success state (fields disappear). Includes a "Book a sales call" CTA linking to /contact-sales
- **Validation errors:** Inline under each field — error text appears directly below the offending field
- **Rate limit (429):** Distinct message telling visitor to try again later
- **Submit button:** Disabled after first click to prevent double submission

### Visual Treatment
- Full-width edge-to-edge dark section — strong visual break from neighboring light sections
- Background color: `#00122e` (deep navy)
- White/light input fields on the dark background — high contrast, clear where to type
- Light text (white/near-white) for headings and body copy on the dark background

### Claude's Discretion
- Exact typography scale and spacing within the section
- Loading spinner design/animation
- Subtle gradient or texture on the dark background (if it enhances depth)
- Error message copy for rate limit and API failure states
- Input field border radius, padding, focus states
- Transition/animation between form states (idle → loading → success)

</decisions>

<specifics>
## Specific Ideas

- Background color `#00122e` was specifically chosen by the user — deep navy, not generic dark gray
- "Get a call" as the CTA — short, direct, action-oriented
- Success state should feel professional and understated, not celebratory
- The explainer line "Receive a live call from our agent and discover how it transforms your firm's intake." was provided verbatim by the user

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-form-ui*
*Context gathered: 2026-02-21*
