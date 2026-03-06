# Phase 4: Form UI - Research

**Researched:** 2026-02-21
**Domain:** Next.js client component — reCAPTCHA v3 client integration, phone input masking, multi-state form UX, framer-motion state transitions
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Section Framing & Copy**
- "Hear it yourself" framing — experience-first, let the product speak
- Brief explainer line alongside the form: "Receive a live call from our agent and discover how it transforms your firm's intake."
- Submit button text: "Get a call"
- Inline consent disclosure below the button (small text, e.g., "By submitting, you agree to receive an AI-powered phone call")

**Form Layout & Field Design**
- Single column, stacked fields (name, phone, email)
- Two-column section layout on desktop: copy/headline on the left, form fields on the right — stacks on mobile
- Phone field uses auto-format input mask: (XXX) XXX-XXXX
- No card container around the form — fields sit directly on the section background
- reCAPTCHA v3 is invisible (no visual element)

**State Feedback**
- **Loading:** Spinner/loading message while call is being triggered (button disabled)
- **Success:** Calm confirmation — simple checkmark + "Your call is on its way" message. Form is replaced entirely by the success state (fields disappear). Includes a "Book a sales call" CTA linking to /contact-sales
- **Validation errors:** Inline under each field — error text appears directly below the offending field
- **Rate limit (429):** Distinct message telling visitor to try again later
- **Submit button:** Disabled after first click to prevent double submission

**Visual Treatment**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FORM-01 | User can enter name, phone number, and email in a demo form on the homepage | Client `'use client'` component with controlled inputs; useState for field values |
| FORM-02 | Phone number is validated as US E.164 format (`+1` prefix) before submission | Validation done server-side in route.ts already (libphonenumber-js). Client-side: display format (XXX) XXX-XXXX via AsYouType formatter, send raw digits to server or pre-format; server normalizes to E.164 |
| FORM-03 | Form is protected by reCAPTCHA v3 invisible verification | `next-recaptcha-v3` — supports React 19 + Next.js 16; `ReCaptchaProvider` in layout, `useReCaptcha` hook with `executeRecaptcha("demo_call")` in form submit handler |
| UX-01 | Form displays a loading state (spinner/message) while the outbound call is being triggered | `formState` enum `idle \| submitting \| success \| error`; spinner during `submitting` state; button disabled |
| UX-02 | Form transitions to a success state ("Your call is on its way") with a CTA linking to the sales booking page | Replace form content with success panel via `AnimatePresence`; checkmark icon + message + Link to /contact-sales |
| UX-03 | Distinct, user-friendly error messages display for rate limit hit (429), invalid phone number, and API failure | Derive message from HTTP status: 429 → rate limit copy; 400 → field-level validation; 500 → generic retry |
| UX-04 | Submit button is disabled after first click to prevent double submission | `disabled` attribute driven by `formState !== 'idle'`; cleared only on error recovery |
| INFR-03 | Demo form section rendered on homepage between CRM Integrations and Case Studies sections | Import `DemoForm` section in `app/page.tsx` between `<CRMIntegrations />` and `<CaseStudies />`; create `components/sections/DemoForm.tsx` |
</phase_requirements>

---

## Summary

Phase 4 is a focused client-side component build. The API route (`/api/demo-call`) already exists and is fully tested. The work is entirely in the UI layer: one new section component (`DemoForm.tsx`), one new env var (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`), a reCAPTCHA provider wrapper, phone input formatting, and animated form state transitions.

The critical dependency flagged in STATE.md — reCAPTCHA v3 React 19 peer compatibility — is now resolved. `next-recaptcha-v3` explicitly declares `"react": "^18 || ^19"` and `"next": "^13 || ^14 || ^15 || ^16"` as peer dependencies (confirmed from GitHub package.json). This is the correct library to install; `react-google-recaptcha-v3` has an open React 19 issue and should not be used.

The phone display format `(XXX) XXX-XXXX` can be achieved without any additional library using `libphonenumber-js`'s `AsYouType` formatter, which is already installed. This avoids adding a masking dependency. The input accepts user keystrokes, formats on every change, and the submit handler sends the raw value to the API which normalizes to E.164.

Framer Motion (v12.23.25) is already installed and used in multiple sections. `AnimatePresence` + `motion.div` with `key` swapping is the correct pattern for replacing the form with a success panel.

**Primary recommendation:** Install `next-recaptcha-v3`, add `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` to `.env.local`, wrap `layout.tsx` body in `ReCaptchaProvider`, build `DemoForm.tsx` as a `'use client'` component with four form states, and insert it in `page.tsx`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next-recaptcha-v3` | 2.0.0-beta.2 | reCAPTCHA v3 client-side token generation | Only maintained reCAPTCHA v3 library with explicit React 19 + Next.js 16 peer dep support; uses Next.js `Script` internally |
| `framer-motion` | 12.23.25 (installed) | Form state transition animations | Already in project; used by IntakeCall.tsx with identical AnimatePresence pattern |
| `libphonenumber-js` | 1.12.37 (installed) | Phone display formatting via `AsYouType` | Already installed; `AsYouType('US').input(value)` returns `(XXX) XXX-XXXX` format as user types |
| `lucide-react` | installed | Spinner icon, checkmark icon | Already used project-wide (e.g., ArrowRight in CRMIntegrations) |
| `next/link` | (built-in) | Success CTA to /contact-sales | Standard Next.js pattern |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React `useState` + `useCallback` | (built-in) | Form state management, field values, error state | No external state library needed — this is a single isolated component |
| CSS Tailwind inline styles | (built-in) | `#00122e` background color (not in Tailwind palette) | Inline `style={{ backgroundColor: '#00122e' }}` for the user-specified hex |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `next-recaptcha-v3` | `react-google-recaptcha-v3` | react-google-recaptcha-v3 has open React 19 context error (issue #208); not safe to use |
| `next-recaptcha-v3` | `@google-recaptcha/react` v2.4.0 | Newer Google-maintained package, also supports React 19; either would work but next-recaptcha-v3 has more Next.js-specific optimization and is already the package flagged in STATE.md |
| `next-recaptcha-v3` | Vanilla `<Script>` + `window.grecaptcha` | Works but requires manual TypeScript global declarations and loading state management; next-recaptcha-v3 handles this cleanly |
| `libphonenumber-js AsYouType` | `react-input-mask` or `@react-input/mask` | Would require adding a new dependency; AsYouType is already available in the project |

**Installation:**
```bash
npm install next-recaptcha-v3
```

---

## Architecture Patterns

### Recommended Project Structure
```
components/
└── sections/
    └── DemoForm.tsx        # New — 'use client' section component

app/
└── page.tsx                # Add <DemoForm /> between CRMIntegrations and CaseStudies

app/
└── layout.tsx              # Wrap body content in <ReCaptchaProvider>
```

### Pattern 1: Form State Machine
**What:** A single `formState` discriminated union drives all UI states. No boolean flags.
**When to use:** Whenever a form has mutually exclusive states (idle, loading, success, error).
**Example:**
```typescript
// 'use client'
type FormState = 'idle' | 'submitting' | 'success' | 'error'

const [formState, setFormState] = useState<FormState>('idle')
const [errorMessage, setErrorMessage] = useState<string | null>(null)
const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

// Button disable logic: disabled when not idle
<button disabled={formState !== 'idle'} ...>
  {formState === 'submitting' ? <Spinner /> : 'Get a call'}
</button>
```

### Pattern 2: reCAPTCHA v3 with next-recaptcha-v3
**What:** Provider in layout wraps entire app; hook called in submit handler just before fetch.
**When to use:** Any form that requires bot protection without user-visible challenge.

**Step 1 — Provider in layout.tsx (server component, wrap client boundary):**
```typescript
// app/layout.tsx
import { ReCaptchaProvider } from 'next-recaptcha-v3'

// Inside body, wrap children:
<ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
  <LayoutWrapper>{children}</LayoutWrapper>
</ReCaptchaProvider>
```

**Step 2 — Hook in form component:**
```typescript
// components/sections/DemoForm.tsx
'use client'
import { useReCaptcha } from 'next-recaptcha-v3'

const { executeRecaptcha } = useReCaptcha()

const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault()
  setFormState('submitting')
  const recaptchaToken = await executeRecaptcha('demo_call')
  // Include recaptchaToken in POST body to /api/demo-call
}, [executeRecaptcha, ...])
```

**Env var required:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in `.env.local` (the public/site key, not the secret).

### Pattern 3: Phone Input Auto-Format with AsYouType
**What:** Format display value on every keystroke; send raw digits (or formatted string) to server. The API route already normalizes via `parsePhoneNumberFromString`.
**When to use:** When libphonenumber-js is already in the project.

```typescript
import { AsYouType } from 'libphonenumber-js'

const [phoneDisplay, setPhoneDisplay] = useState('')
const [phoneRaw, setPhoneRaw] = useState('')

function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
  const raw = e.target.value.replace(/\D/g, '') // strip non-digits
  const formatted = new AsYouType('US').input(raw)
  setPhoneDisplay(formatted)        // shown in input: (310) 555-1234
  setPhoneRaw(raw)                  // passed to API; server handles E.164
}
```

Note: The API route's `bodySchema` accepts `phone: z.string().min(1)` and then calls `parsePhoneNumberFromString(phone, 'US')`. Sending either the formatted display value or raw digits both work — the server normalizes either way.

### Pattern 4: AnimatePresence Form ↔ Success Swap
**What:** Replace the entire form content with a success panel using `AnimatePresence` + `key` change.
**When to use:** When the success state should replace the form (not appear alongside it).
**Example (from existing IntakeCall.tsx pattern):**
```typescript
import { motion, AnimatePresence } from 'framer-motion'

<AnimatePresence mode="wait">
  {formState !== 'success' ? (
    <motion.div
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* form fields */}
    </motion.div>
  ) : (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* success checkmark + message + CTA */}
    </motion.div>
  )}
</AnimatePresence>
```

### Pattern 5: API Error Handling (status-code driven)
**What:** Map HTTP status codes to distinct UX messages.
**When to use:** When the API returns typed status codes (which it does — 400, 401, 429, 500).

```typescript
const res = await fetch('/api/demo-call', { method: 'POST', body: ... })
const data = await res.json()

if (!res.ok) {
  if (res.status === 429) {
    setErrorMessage('You've already requested a demo call. Please try again in 10 minutes.')
    // retryAfter is available in data.retryAfter (seconds) — v2 UX-05 timer hook
  } else if (res.status === 400) {
    setFieldErrors({ phone: data.error }) // field-level inline
  } else {
    setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
  }
  setFormState('error') // re-enables submit button
  return
}
setFormState('success')
```

Note: The API returns `{ success: false, error: string, retryAfter?: number }` on failure. The `retryAfter` field is present on 429 responses (wired in Phase 2 specifically for v2 UX-05 countdown; not needed in v1 but available).

### Pattern 6: Homepage Section Insertion (INFR-03)
**What:** Add `<DemoForm />` between `<CRMIntegrations />` and `<CaseStudies />` in page.tsx.
**When to use:** Straightforward import — page.tsx is a server component.

```typescript
// app/page.tsx
import { DemoForm } from '@/components/sections/DemoForm'

// In JSX, after CRMIntegrations and before CaseStudies:
<CRMIntegrations />
<DemoForm />
<CaseStudies />
```

### Anti-Patterns to Avoid
- **Calling `executeRecaptcha` on mount instead of submit:** reCAPTCHA tokens expire after 2 minutes. Call `executeRecaptcha` inside the submit handler, not in `useEffect`. Execute as close to the actual network request as possible.
- **Using boolean `isLoading` + `isSuccess` flags:** Two booleans can produce impossible states (both true). Use a single `formState` enum.
- **Client-side E.164 validation as gatekeeper:** The server already validates with libphonenumber-js. The client's job is display formatting and basic presence check, not full validation. Don't duplicate server logic that would drift.
- **`react-google-recaptcha-v3`:** Known broken with React 19 (createContext error). Do not use.
- **Putting `ReCaptchaProvider` inside DemoForm.tsx:** The provider must be higher in the tree (layout.tsx) to avoid mounting/unmounting the reCAPTCHA script with the component.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| reCAPTCHA v3 script loading + token generation | Custom Script + window.grecaptcha + global TS declarations | `next-recaptcha-v3` | Loading state, error handling, SSR safety, TypeScript types already handled |
| Phone number display formatting | Custom regex char insertion | `AsYouType` from `libphonenumber-js` (already installed) | Handles edge cases (backspace, paste, country prefix) correctly |
| Form state transitions | CSS display:none toggle | `framer-motion` `AnimatePresence` (already installed) | Provides exit animations so success panel doesn't snap in |
| Spinner animation | Custom SVG animation | Tailwind `animate-spin` on a border-based spinner or lucide-react `Loader2` icon | Zero additional dependencies |

**Key insight:** Every tool needed (framer-motion, libphonenumber-js, lucide-react, tailwind) is already installed. The only new dependency is `next-recaptcha-v3`.

---

## Common Pitfalls

### Pitfall 1: reCAPTCHA Provider Placement
**What goes wrong:** `ReCaptchaProvider` placed inside `DemoForm.tsx` or a client component that mounts/unmounts causes the reCAPTCHA script to reload on every render cycle.
**Why it happens:** The script is tied to provider mount/unmount lifecycle.
**How to avoid:** Place `ReCaptchaProvider` in `app/layout.tsx`, wrapping the full app. This matches the `next-recaptcha-v3` README guidance.
**Warning signs:** reCAPTCHA badge flickers or `executeRecaptcha` occasionally returns null/undefined.

### Pitfall 2: Token Called Too Early
**What goes wrong:** `executeRecaptcha` called in a `useEffect` on mount generates a token that expires before the user submits (2-minute TTL).
**Why it happens:** Token was generated proactively rather than on-demand.
**How to avoid:** Call `executeRecaptcha("demo_call")` inside the `handleSubmit` callback, immediately before the `fetch` call.
**Warning signs:** Server returns 401 (score null) even for human users.

### Pitfall 3: Double Submission via Race Condition
**What goes wrong:** User clicks submit twice in quick succession before `formState` updates to `'submitting'`.
**Why it happens:** `setState` is async; the second click fires before React re-renders the disabled button.
**How to avoid:** Add a `useRef` submission guard in addition to the disabled state: `const isSubmitting = useRef(false)`. Check and set at the top of `handleSubmit` before any async work.
**Warning signs:** Two calls triggered, both rate limit slots consumed.

### Pitfall 4: AsYouType Cursor Position Regression
**What goes wrong:** When a user edits the middle of a phone number (e.g., deletes a digit), the cursor jumps to the end of the formatted string.
**Why it happens:** Setting `input.value` programmatically resets cursor position.
**How to avoid:** For this use case (simple US phone, append-mostly), this is acceptable behavior — most users type left-to-right. The field is short enough that it's not a meaningful UX problem. Do not attempt to manually restore cursor position (complex and fragile).
**Warning signs:** User complaints about editing mid-number; not a blocker for v1.

### Pitfall 5: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` Missing at Build
**What goes wrong:** `ReCaptchaProvider` receives `undefined` as its key; reCAPTCHA script loads without a site key, and `executeRecaptcha` returns a token that fails server verification.
**Why it happens:** `NEXT_PUBLIC_*` vars must be present at build time for Next.js static rendering.
**How to avoid:** Verify `.env.local` contains `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` before running `npm run dev`. Add a guard: log a warning if the key is missing. Use Google's test site key (`6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`) for local dev — it always returns score 1.0 (paired with secret key `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`).
**Warning signs:** reCAPTCHA badge doesn't appear (invisible v3 has a small badge); server returns 401.

### Pitfall 6: Email Field in API Route
**What goes wrong:** The form collects email but the API route's `bodySchema` only validates `phone`, `name`, and `recaptchaToken`. Email is not currently used server-side.
**Why it happens:** Phase 2 API was built before the form; email was added in CONTEXT.md discussions.
**How to avoid:** Two options: (a) include email in the POST body; the server ignores unknown fields due to Zod's default `.safeParse` behavior — this is fine; (b) or leave email out of the POST entirely if it serves no server-side purpose yet. Decision: include email in POST body (for future use) even if the current schema strips it — Zod `.safeParse` only validates declared fields and ignores extras. No schema change needed.
**Warning signs:** None — Zod silently ignores the `email` field. This is safe behavior.

---

## Code Examples

Verified patterns from official sources and project codebase:

### ReCaptchaProvider in layout.tsx
```typescript
// app/layout.tsx
// Source: github.com/snelsi/next-recaptcha-v3 README
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ReCaptchaProvider>
        <Analytics />
        <SpeedInsights />
        <Script id="meta-pixel" ... />
      </body>
    </html>
  )
}
```

### Complete DemoForm.tsx Structure (Skeleton)
```typescript
// components/sections/DemoForm.tsx
// Source: project patterns from IntakeCall.tsx + next-recaptcha-v3 README
'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReCaptcha } from 'next-recaptcha-v3'
import { AsYouType } from 'libphonenumber-js'
import Link from 'next/link'
import { Loader2, CheckCircle } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function DemoForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')        // display formatted
  const [email, setEmail] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const isSubmitting = useRef(false)
  const { executeRecaptcha } = useReCaptcha()

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '')
    const formatted = new AsYouType('US').input(digits)
    setPhone(formatted)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting.current || formState !== 'idle') return
    isSubmitting.current = true
    setFormState('submitting')
    setFieldErrors({})
    setGlobalError(null)

    try {
      const recaptchaToken = await executeRecaptcha('demo_call')
      const res = await fetch('/api/demo-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, recaptchaToken }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setGlobalError('You've already requested a demo call recently. Please try again in 10 minutes.')
        } else if (res.status === 400) {
          setFieldErrors({ phone: data.error })
        } else {
          setGlobalError(data.error ?? 'Something went wrong. Please try again.')
        }
        setFormState('error')
        isSubmitting.current = false
        return
      }

      setFormState('success')
    } catch {
      setGlobalError('Network error. Please check your connection and try again.')
      setFormState('error')
      isSubmitting.current = false
    }
  }, [executeRecaptcha, formState, name, phone, email])

  return (
    <section style={{ backgroundColor: '#00122e' }} className="py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: headline + explainer */}
          <div>
            <h2 className="text-white ...">Hear it yourself</h2>
            <p className="text-white/70 ...">
              Receive a live call from our agent and discover how it transforms your firm's intake.
            </p>
          </div>

          {/* Right: form or success */}
          <AnimatePresence mode="wait">
            {formState !== 'success' ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <form onSubmit={handleSubmit}>
                  {/* name, phone, email inputs */}
                  {/* field-level error display */}
                  {/* global error display */}
                  <button type="submit" disabled={formState !== 'idle'}>
                    {formState === 'submitting' ? <Loader2 className="animate-spin" /> : 'Get a call'}
                  </button>
                  <p className="text-white/40 text-xs mt-3">
                    By submitting, you agree to receive an AI-powered phone call
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <CheckCircle className="text-white" />
                <p className="text-white">Your call is on its way</p>
                <Link href="/contact-sales">Book a sales call</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
```

### Phone Format with AsYouType
```typescript
// Source: libphonenumber-js documentation (catamphetamine/libphonenumber-js)
import { AsYouType } from 'libphonenumber-js'

// Input: user typing "3105551234"
// Output: "(310) 555-1234"
const formatted = new AsYouType('US').input('3105551234')
// → "(310) 555-1234"

// AsYouType handles partial input gracefully:
new AsYouType('US').input('310')      // → "(310)"
new AsYouType('US').input('3105')     // → "(310) 5"
new AsYouType('US').input('310555')   // → "(310) 555"
```

### Spinner Pattern (no new dependency)
```typescript
// Using lucide-react Loader2 (already installed) + Tailwind animate-spin
import { Loader2 } from 'lucide-react'

<Loader2 className="w-5 h-5 animate-spin text-white" aria-label="Loading" />
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `react-google-recaptcha-v3` | `next-recaptcha-v3` (or `@google-recaptcha/react`) | React 19 release, late 2024 | react-google-recaptcha-v3 broken on React 19; must use alternative |
| Multiple boolean flags (`isLoading`, `isSuccess`, `isError`) | Single `formState` discriminated union | React community best practice, 2022+ | Eliminates impossible states |
| CSS class toggle for state transitions | `AnimatePresence` + `motion.div` | framer-motion v5+, now at v12 | Smooth exit animations; already used in project |

**Deprecated/outdated:**
- `react-google-recaptcha-v3 v1.11.0`: Last published 9+ months ago, open React 19 incompatibility issue #208. Do not use.

---

## Open Questions

1. **Should `ReCaptchaProvider` force layout.tsx to become a client component?**
   - What we know: `ReCaptchaProvider` is a client component. In Next.js App Router, a server component can import and render a client component as a leaf — this does not convert the parent to a client component.
   - What's confirmed: `app/layout.tsx` is currently a server component importing `Script` (fine). Adding `ReCaptchaProvider` (a client component) is valid — it renders client-side; the layout remains a server component. No `'use client'` directive needed in layout.tsx.
   - Recommendation: No action needed; proceed as described.

2. **Email field: include in API POST or not?**
   - What we know: The API route's Zod schema only declares `phone`, `name`, `recaptchaToken`. Zod `safeParse` strips unknown fields silently.
   - What's unclear: Whether email will be used in a future phase (FLLW-01 in v2 would need it for follow-up email).
   - Recommendation: Include email in POST body. Server ignores it safely. When FLLW-01 is built, the route can add email to its schema without any client change.

3. **reCAPTCHA badge visibility**
   - What we know: reCAPTCHA v3 renders a small badge in the corner. Many sites hide it with CSS (allowed by Google's terms if attribution text is shown in the page).
   - What's unclear: Whether the user wants the badge visible or hidden.
   - Recommendation: Leave the badge visible by default (no CSS to hide it). The consent disclosure text below the button satisfies user transparency.

---

## Sources

### Primary (HIGH confidence)
- `github.com/snelsi/next-recaptcha-v3` — package.json peer deps (`"react": "^18 || ^19"`, `"next": "^13 || ^14 || ^15 || ^16"`), README usage patterns
- `github.com/catamphetamine/libphonenumber-js` — AsYouType formatter API and US formatting behavior
- Project codebase: `app/api/demo-call/route.ts` — confirmed API request/response shape
- Project codebase: `components/sections/IntakeCall.tsx` — confirmed `AnimatePresence` pattern already in use
- Project codebase: `package.json` — confirmed installed versions (framer-motion 12.23.25, libphonenumber-js 1.12.37, lucide-react, Next.js 16.1.3, React 19.2.0)
- Project codebase: `app/layout.tsx` — confirmed current layout structure for ReCaptchaProvider insertion point

### Secondary (MEDIUM confidence)
- WebSearch: `react-google-recaptcha-v3` GitHub issue #208 — React 19 incompatibility (createContext error); consistent across multiple sources
- WebSearch: `@google-recaptcha/react` v2.4.0 — Google-maintained alternative with React 19 support; confirmed as viable but next-recaptcha-v3 preferred for Next.js specificity
- `next-recaptcha-v3` README via GitHub — ReCaptchaProvider + useReCaptcha usage pattern

### Tertiary (LOW confidence)
- None — all key claims verified against primary or secondary sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — next-recaptcha-v3 peer deps confirmed from GitHub package.json; all other libraries confirmed installed in project
- Architecture: HIGH — patterns derived from existing project components (IntakeCall.tsx) and official library READMEs
- Pitfalls: HIGH — reCAPTCHA timing, double-submit guard, and provider placement are well-documented and verified against library behavior

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (stable libraries; next-recaptcha-v3 is in 2.0.0-beta — check for stable release before install)
