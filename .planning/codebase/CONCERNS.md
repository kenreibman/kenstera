# Codebase Concerns

**Analysis Date:** 2026-03-05

## Tech Debt

**Duplicated `ProgressIndicator` component (3 copies):**
- Issue: The same `ProgressIndicator` component is defined independently in three files with slight style variations (one uses `bg-blue-950`, another `bg-black`).
- Files: `app/pi-intake-audit/components/IntakeWizard.tsx` (line 44), `app/pi-intake-audit/components/ContactForm.tsx` (line 21), `app/pi-intake-audit/components/CalendarEmbed.tsx` (line 16)
- Impact: Style inconsistency across the wizard steps; changes must be made in three places.
- Fix approach: Extract a single `ProgressIndicator` into `app/pi-intake-audit/components/ProgressIndicator.tsx` and import it in all three files. Standardize the active-step color.

**Duplicated `PricingCards` component (2 versions):**
- Issue: Two separate `PricingCards` components exist with different interfaces and implementations. One is in the shared `components/` directory, the other in `app/pricing/components/`.
- Files: `components/PricingCards.tsx`, `app/pricing/components/PricingCards.tsx`
- Impact: Confusion about which to use; risk of diverging pricing data. `components/PricingCards.tsx` is used by `components/sections/Pricing.tsx` (homepage), while `app/pricing/components/PricingCards.tsx` is used by `app/pricing/page.tsx`.
- Fix approach: Consolidate into one configurable component in `components/PricingCards.tsx` that supports both the homepage summary and the full pricing page layout.

**Three separate Redis singleton instances:**
- Issue: Three files each create their own lazy Redis singleton with identical connection logic, leading to up to three separate Redis client instances per server process.
- Files: `lib/db/leads.ts`, `lib/db/demo-leads.ts`, `lib/rate-limit/demo-call.ts`
- Impact: Wasted connections, duplicated boilerplate code, inconsistent patterns if one is updated but others are not.
- Fix approach: Create a shared `lib/db/redis.ts` module exporting a single `getRedis()` function and import it in all three files.

**Unused reCAPTCHA verification module:**
- Issue: `lib/recaptcha/verify.ts` is fully implemented but never imported or called anywhere. The demo call route comment (line 52) mentions "recaptchaToken required" but the actual schema and logic do not include it.
- Files: `lib/recaptcha/verify.ts`, `app/api/demo-call/route.ts`
- Impact: Dead code; misleading comment suggests reCAPTCHA was planned but abandoned. The demo call form has no bot protection beyond rate limiting.
- Fix approach: Either integrate reCAPTCHA v3 into the demo call flow (recommended for bot protection), or delete `lib/recaptcha/verify.ts` and remove the stale comment.

**Inline CSS keyframes in `DemoForm.tsx`:**
- Issue: CSS keyframes for orb animations are injected via a `<style>` tag inside JSX, which bypasses Tailwind and gets re-injected on every render.
- Files: `components/sections/DemoForm.tsx` (lines 204-229)
- Impact: Potential style injection on every re-render; non-standard pattern in a Tailwind codebase.
- Fix approach: Move keyframes to `globals.css` or a CSS module.

**Manual environment variable validation (no centralized schema):**
- Issue: Each API route and lib file manually checks for env vars with runtime errors. No centralized validation schema.
- Files: `lib/db/leads.ts`, `lib/db/demo-leads.ts`, `lib/email/send.ts`, `lib/retell/client.ts`, `lib/rate-limit/demo-call.ts`, `app/api/newsletter/route.ts`
- Impact: Missing env vars cause runtime crashes. Easy to miss required vars during deployment.
- Fix approach: Create `lib/env.ts` with a Zod schema that validates all env vars at startup. Reference the validated object instead of raw `process.env` access.

**Large monolithic components:**
- Issue: Components exceed 400+ lines with inline SVG icons, state management, and layout all in one file.
- Files: `components/sections/DashboardPreview.tsx` (427 lines), `components/sections/Platforms.tsx` (419 lines), `components/MainNavigation.tsx` (347 lines), `components/sections/DemoForm.tsx` (339 lines)
- Impact: Difficult to modify, test, or reuse.
- Fix approach: Extract sub-components (icon sets, card layouts) into separate files. Break up DashboardPreview into smaller composable pieces.

## Known Bugs

**Misleading comment in demo-call route:**
- Symptoms: Line 52 comment says "phone + recaptchaToken required" but `bodySchema` only requires `phone`, `name`, and `email`. No reCAPTCHA token is validated.
- Files: `app/api/demo-call/route.ts` (line 52)
- Trigger: Reading the code; no runtime impact.
- Workaround: Correct the comment.

**Non-atomic lead status update (race condition):**
- Symptoms: `updateLeadStatus` and `updateDemoLeadStatus` both perform GET-then-SET without locking. If two QStash deliveries arrive simultaneously (retry scenario), both could read `status: 'pending'` and both send an email.
- Files: `lib/db/leads.ts` (lines 62-77), `lib/db/demo-leads.ts` (lines 59-74)
- Trigger: QStash retries the webhook while original request is still processing.
- Workaround: The window is small, but duplicate emails could occur. Use Redis `WATCH`/`MULTI` or a Lua script for atomic compare-and-swap.

**QStash abandonment email silently skipped if NEXT_PUBLIC_BASE_URL missing:**
- Symptoms: Leads complete intake but receive no abandonment email after 15 minutes. Error only visible in server logs.
- Files: `app/api/pi-intake-audit/capture/route.ts` (lines 57-59)
- Trigger: `NEXT_PUBLIC_BASE_URL` not set in environment variables.
- Workaround: Ensure env var is set. Consider failing the request if this critical dependency is misconfigured.

## Security Considerations

**Unauthenticated `/api/pi-intake-audit/booked` endpoint:**
- Risk: Anyone can POST a valid-format `leadId` (e.g., `lead_<uuid>`) to mark a lead as booked, preventing abandonment emails from being sent. No auth, no rate limiting, no QStash signature verification.
- Files: `app/api/pi-intake-audit/booked/route.ts`
- Current mitigation: `leadId` values are UUIDs, so guessing is impractical. The endpoint is called from the client-side `CalendarEmbed` component.
- Recommendations: Add a shared secret or HMAC signature verification, or handle the "booked" status update server-side via a Cal.com webhook instead of client-side fetch.

**No rate limiting on newsletter and intake capture endpoints:**
- Risk: `/api/newsletter/route.ts` and `/api/pi-intake-audit/capture/route.ts` have no rate limiting. An attacker could spam these endpoints to exhaust Resend/QStash quotas or flood Redis with lead records.
- Files: `app/api/newsletter/route.ts`, `app/api/pi-intake-audit/capture/route.ts`
- Current mitigation: Zod validation prevents malformed data, but does not limit volume.
- Recommendations: Add IP-based rate limiting (similar to `lib/rate-limit/demo-call.ts`) to both endpoints.

**No bot protection on public forms:**
- Risk: The demo call form and intake wizard lack CAPTCHA or honeypot fields. Rate limiting (1 per 10 min per IP) helps but sophisticated bots using rotating IPs could still abuse the Retell API to trigger calls (which cost money).
- Files: `components/sections/DemoForm.tsx`, `app/pi-intake-audit/components/IntakeWizard.tsx`
- Current mitigation: Rate limiting on the demo-call endpoint only.
- Recommendations: Integrate the existing `lib/recaptcha/verify.ts` module, or add a honeypot field as a lightweight alternative.

**Non-null assertion on `RETELL_PHONE_NUMBER`:**
- Risk: `process.env.RETELL_PHONE_NUMBER!` uses a TypeScript non-null assertion. If the env var is missing, the Retell API call will fail with an unclear error rather than a descriptive message.
- Files: `app/api/demo-call/route.ts` (line 113)
- Current mitigation: None.
- Recommendations: Add an explicit check like other env vars in the codebase: `if (!process.env.RETELL_PHONE_NUMBER) throw new Error(...)`.

**No Content-Security-Policy header:**
- Risk: The site loads third-party scripts (Facebook Pixel via `dangerouslySetInnerHTML`, Cal.com embed) but has no CSP header. This leaves the site open to XSS via injected scripts.
- Files: `next.config.ts` (headers config), `app/layout.tsx` (Meta Pixel script at line 75)
- Current mitigation: X-Content-Type-Options, X-Frame-Options, and HSTS are set. `poweredByHeader` is disabled.
- Recommendations: Add a CSP header in `next.config.ts` allowing known script sources (connect.facebook.net, cal.com, vercel analytics).

**Facebook Pixel ID hardcoded in layout:**
- Risk: The Meta Pixel ID `1431516435037638` is hardcoded directly in `app/layout.tsx` line 85. Not a secret, but makes the code less portable across environments.
- Files: `app/layout.tsx` (line 85)
- Recommendations: Move to `NEXT_PUBLIC_META_PIXEL_ID` environment variable.

**Email HTML built from string interpolation:**
- Risk: User input (fullName, website) is escaped with a manual `escapeHtml()` function before HTML insertion. If the function is forgotten on a new field or modified incorrectly, XSS in email clients becomes possible.
- Files: `lib/email/send.ts` (lines 18-25 for escapeHtml, lines 44-104 and 132-218 for templates)
- Current mitigation: `escapeHtml()` is applied to all user-facing fields.
- Recommendations: Use a templating library (React Email, MJML) instead of raw HTML string interpolation.

## Performance Bottlenecks

**Cal.com embed always mounted (even when hidden):**
- Problem: `CalendarEmbed` renders the Cal.com `<Cal>` component on page load for all visitors to the intake-audit page, even those who never reach step 3 of the wizard. It is hidden with `fixed -left-[9999px]` rather than conditionally rendered.
- Files: `app/pi-intake-audit/components/IntakeWizard.tsx` (line 119), `app/pi-intake-audit/components/CalendarEmbed.tsx` (line 107)
- Cause: Intentional design to preload the Cal.com iframe and avoid lag when transitioning to step 3.
- Improvement path: Lazy-load the `<Cal>` component on step 2 entry instead of page load, using a ref to keep it mounted once loaded. This reduces initial page weight for visitors who bounce before step 3.

**Synchronous file reads in blog/case-study libs:**
- Problem: `getAllPosts()`, `getPostBySlug()`, `getAllCaseStudies()`, and `getCaseStudyBySlug()` use synchronous `fs.readFileSync` and `fs.readdirSync`.
- Files: `lib/blog.ts`, `lib/case-studies.ts`
- Cause: Simpler API; acceptable for small content libraries at build time.
- Improvement path: Currently low impact since content library is small. Will become a concern if the blog grows past ~50 posts. Consider switching to async `fs.promises` or a build-time content layer.

**Inline SVG icons recreated on every render:**
- Problem: NavIcon function in DashboardPreview creates new SVG objects on every render without memoization.
- Files: `components/sections/DashboardPreview.tsx`
- Cause: Icon rendering logic is embedded inline.
- Improvement path: Extract icons to a separate file or use `React.memo()` on the icon component.

## Fragile Areas

**Intake wizard state management:**
- Files: `app/pi-intake-audit/components/IntakeWizard.tsx`, `app/pi-intake-audit/components/ContactForm.tsx`, `app/pi-intake-audit/components/CalendarEmbed.tsx`
- Why fragile: Multi-step wizard state is managed via `useState` with fire-and-forget API calls. The `leadId` is set asynchronously after step 3 is already showing, creating a window where `markAsBooked` could be called with a null `leadId` if the user books very quickly.
- Safe modification: Ensure `leadId` is available before enabling calendar interaction, or queue the booked call until `leadId` resolves.
- Test coverage: None (zero test files in the codebase).

**Content data files with no schema validation:**
- Files: `content/industries/*.ts`, `content/services/*.ts`
- Why fragile: Industry and service content is stored as TypeScript files with large object literals. There is no runtime schema validation on the content shape. If a required field is omitted from a new content file, the error surfaces at runtime as `undefined` rendering.
- Safe modification: Add Zod schemas for industry/service content objects and validate at import time.
- Test coverage: None.

**QStash abandonment email scheduling with silent failures:**
- Files: `app/api/pi-intake-audit/capture/route.ts` (lines 63-76)
- Why fragile: If QStash fails to schedule an abandonment email, the error is logged but the lead capture succeeds anyway. No alert mechanism notifies if a scheduled job never runs.
- Safe modification: Add a lead flag to track if abandonment email was scheduled. Add monitoring/alerting for QStash failures in production.
- Test coverage: None.

## Scaling Limits

**Redis as primary data store for leads:**
- Current capacity: All leads stored in Redis with 30-day TTL. Adequate for current scale.
- Limit: Redis is not designed for durable business data. Lead history is permanently lost after 30 days. No way to query or export historical leads, run reports, or audit past interactions.
- Scaling path: Migrate lead storage to a proper database (Postgres via Supabase/Neon). Keep Redis for rate limiting and caching only.

**Single Retell phone number:**
- Current capacity: One outbound number (`RETELL_PHONE_NUMBER`) handles all demo calls.
- Limit: Carrier rate limits, potential spam flagging if call volume increases.
- Scaling path: Rotate across multiple outbound numbers; implement a number pool.

**QStash job queue rate limits:**
- Current capacity: Depends on Upstash plan.
- Limit: If intake form submissions spike, QStash jobs may queue or fail. No backpressure handling in place.
- Scaling path: Monitor QStash dashboard for job failures. Implement exponential backoff in capture API if QStash returns 429.

## Dependencies at Risk

**`@paper-design/shaders-react` at v0.0.71:**
- Risk: Pre-1.0 package with unstable API. Breaking changes likely between minor versions.
- Impact: Shader-based hero component on homepage would break.
- Migration plan: Pin the exact version; monitor for stable release or consider replacing with a CSS/canvas alternative.

**`next-mdx-remote` v6:**
- Risk: MDX rendering depends on this package which has historically had breaking changes between major versions.
- Impact: Blog and case study rendering would break.
- Migration plan: Consider Next.js built-in MDX support or `@next/mdx` for tighter integration.

**`zod` v4 (^4.3.6):**
- Risk: Zod v4 is relatively new. The caret range could pull in minor versions with breaking changes (Zod v4 had significant API changes from v3).
- Impact: All API route validation depends on Zod.
- Migration plan: Pin to exact version or narrow the range.

## Missing Critical Features

**No test suite:**
- Problem: Zero test files exist anywhere in the codebase. No test framework is configured (no jest, vitest, or testing library in dependencies).
- Blocks: Confident refactoring, CI/CD quality gates, regression detection.

**No email unsubscribe mechanism in transactional emails:**
- Problem: Abandonment and demo follow-up emails include no unsubscribe link or `List-Unsubscribe` header. The footer says "you can safely ignore this email" but provides no opt-out.
- Files: `lib/email/send.ts` (lines 44-104 and 132-218)
- Blocks: CAN-SPAM compliance (required for US commercial email). Could result in domain reputation damage and deliverability issues.

**No structured logging or error tracking:**
- Problem: All logging uses `console.log`/`console.error`. No structured logging format, no error tracking service (Sentry, etc.), no alerting.
- Blocks: Production debugging, alerting on API failures, understanding error frequency and patterns.

**No CI/CD pipeline:**
- Problem: No GitHub Actions, Vercel build checks, or other CI configuration detected. No linting, type-checking, or build verification runs automatically on commits.
- Blocks: Automated quality enforcement, catching regressions before deployment.

## Test Coverage Gaps

**No tests exist:**
- What's not tested: Everything. API routes, utility functions, React components, content loading.
- Files: All files in `app/api/`, `lib/`, `components/`
- Risk: Any code change could introduce regressions undetected. The lead capture and email sending flows are especially risky since they involve real money (Retell API calls cost per call, Resend emails have quotas).
- Priority: High. Start with:
  1. API route unit tests for `app/api/demo-call/route.ts`, `app/api/pi-intake-audit/capture/route.ts`, `app/api/newsletter/route.ts`
  2. Lead database functions in `lib/db/leads.ts` and `lib/db/demo-leads.ts`
  3. Email HTML generation in `lib/email/send.ts` (verify escaping, URL encoding)
  4. Blog/case-study slug validation in `lib/blog.ts` and `lib/case-studies.ts`

---

*Concerns audit: 2026-03-05*
