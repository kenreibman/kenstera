# Codebase Concerns

**Analysis Date:** 2026-02-21

## Fragile Areas

**IntakeWizard Fire-and-Forget Lead Capture:**
- Files: `app/pi-intake-audit/components/IntakeWizard.tsx`
- Why fragile: Lead capture happens asynchronously without error state management. The component advances to step 3 before confirming API success. If the capture fails silently, users may book a consultation without their lead being stored.
- Safe modification: Wrap the fetch call in error tracking. Consider adding a state variable to track capture status and warn users if it fails, or implement retry logic before advancing steps.
- Test coverage: No tests exist for IntakeWizard. Client-side form state flow is untested.

**QStash Abandonment Email Scheduling with Silent Failures:**
- Files: `app/api/pi-intake-audit/capture/route.ts` (lines 63-76)
- Why fragile: If QStash fails to schedule an abandonment email, the error is logged but the lead capture succeeds anyway. No alert mechanism notifies if a scheduled job never runs.
- Safe modification: Consider adding a lead flag to track if abandonment email was scheduled. Add monitoring/alerting for QStash failures in production.
- Impact: Abandoned leads may never receive follow-up emails, silently reducing conversion without visibility.

**No Error Boundary for Blog/Case Study Pages:**
- Files: `app/blog/[slug]/page.tsx`, `app/case-studies/[slug]/page.tsx`
- Why fragile: These pages use MDXRemote to render content. If MDX parsing fails, the error boundary in `app/error.tsx` is generic and doesn't provide context-specific recovery.
- Safe modification: Add a dedicated error.tsx at `app/blog/[slug]/error.tsx` and `app/case-studies/[slug]/error.tsx` to handle rendering failures gracefully.
- Test coverage: No tests for MDX content rendering or edge cases.

**Singleton Pattern in API Routes Without Null Safety:**
- Files: `lib/db/leads.ts` (lines 5-14), `lib/email/send.ts` (lines 4-14)
- Why fragile: Environment variable initialization happens inside a getter function that throws. If called before env vars are available, it crashes. No guard in server startup.
- Safe modification: Initialize singletons once during application startup with validation. Use a module-level init function that validates all required env vars before first use.

## Tech Debt

**Test Coverage Gap:**
- Issue: No test files exist in the codebase. Zero test coverage despite critical paths: form submission, API routes, lead capture workflow.
- Files: `app/pi-intake-audit/`, `app/api/pi-intake-audit/`, `lib/db/leads.ts`, `lib/email/send.ts`
- Impact: Lead capture flow, abandonment emails, and newsletter signup have no automated validation. Refactors risk silent regressions.
- Fix approach: Add jest/vitest config and test suite for API routes (status codes, validation, error handling) and client form logic. Minimum: test the IntakeWizard capture flow and each API endpoint.

**Large Components with Multiple Responsibilities:**
- Issue: Components exceed 400+ lines of code with inline icon definitions, state management, and layout.
- Files: `components/sections/DashboardPreview.tsx` (427 lines), `components/sections/Platforms.tsx` (419 lines)
- Impact: Difficult to modify, test, or reuse. Icon components should be extracted. Markup/styling should be modularized.
- Fix approach: Extract icon definitions to a separate `icons.ts` file. Split DashboardPreview into smaller sub-components (StatCard is already extracted, but NavIcon and others should move). Consider using a component library or stricter max-line limits.

**Manual Environment Variable Validation:**
- Issue: Each API route and lib file manually checks for env vars with runtime errors. No centralized validation schema.
- Files: `lib/db/leads.ts`, `lib/email/send.ts`, `app/api/newsletter/route.ts`, `app/api/pi-intake-audit/send-abandonment/route.ts`
- Impact: Missing env vars cause runtime crashes. Easy to miss required vars during deployment.
- Fix approach: Create `lib/env.ts` with a schema that validates all env vars at startup (e.g., using zod). Use it in a `verifyEnv()` call in `app/layout.tsx`.

**Content File Path Traversal Protection Is Manual:**
- Issue: Blog and case study file loaders manually check for `..`, `/`, `\` in slugs. Easy to miss edge cases.
- Files: `lib/blog.ts` (lines 68-75), `lib/case-studies.ts` (lines 102-110)
- Impact: Potential security regression if protection is forgotten in future slug-based loaders.
- Fix approach: Extract slug validation into a reusable utility function with comprehensive path traversal tests.

## Security Considerations

**Email HTML Escaping in Abandonment Email:**
- Risk: User input (fullName, website) is escaped before insertion into HTML, but email is generated in raw HTML string format. If escapeHtml() is forgotten or modified, XSS in email clients becomes possible.
- Files: `lib/email/send.ts` (lines 33-35, 43-82)
- Current mitigation: Manual escapeHtml() function applied to user fields before template insertion.
- Recommendations: Use a templating library (React Email, MJML, Nodemailer with template engine) instead of raw HTML string. This eliminates manual escaping burden and ensures consistency across all emails.

**QSTASH Signing Key Access in GET Request:**
- Risk: QSTASH_CURRENT_SIGNING_KEY and QSTASH_NEXT_SIGNING_KEY are loaded in `send-abandonment` POST handler. If misconfigured, signing key could be exposed in error logs.
- Files: `app/api/pi-intake-audit/send-abandonment/route.ts` (lines 10-17)
- Current mitigation: Keys are never logged, only used for verification. But initialization happens on every request.
- Recommendations: Initialize receiver once at module level and handle errors gracefully. Add monitoring to detect key mismatches.

**Environment Variables Not Validated on Deployment:**
- Risk: If NEXT_PUBLIC_BASE_URL or RESEND_AUDIENCE_ID is missing, app will fail at runtime on first API call, not during build.
- Files: `app/api/pi-intake-audit/capture/route.ts` (lines 57-59), `app/api/newsletter/route.ts` (lines 29-35)
- Current mitigation: Runtime checks with 500 errors returned to client.
- Recommendations: Add env var schema validation to next.config.ts or create a startup script that validates all required vars before app starts.

## Known Bugs

**QStash Abandonment Email May Never Fire if Base URL Unconfigured:**
- Symptoms: Leads complete intake but receive no abandonment email after 15 minutes.
- Files: `app/api/pi-intake-audit/capture/route.ts` (lines 57-59)
- Trigger: NEXT_PUBLIC_BASE_URL not set in environment variables.
- Workaround: Manually check logs for "[Intake Audit] Missing NEXT_PUBLIC_BASE_URL" error; ensure env var is set and app is redeployed.

**Double Registration in Newsletter If Email Already Exists:**
- Symptoms: User sees "success: true" response even if email already subscribed.
- Files: `app/api/newsletter/route.ts` (lines 46-51)
- Trigger: User submits same email twice, or contacts.create returns "already exists" error.
- Workaround: This is intentional to avoid exposing subscriber status. Current behavior is correct, but frontend should show "thanks for subscribing" regardless.

## Performance Bottlenecks

**Synchronous File System Reads for Blog/Case Studies:**
- Problem: getAllPosts() and getAllCaseStudies() use synchronous fs.readdirSync() and fs.readFileSync() calls on every page generation.
- Files: `lib/blog.ts` (lines 40-61), `lib/case-studies.ts` (lines 70-95)
- Cause: Next.js generates static pages at build time, so sync I/O is acceptable. But if these functions are ever called during request time, they block the thread.
- Improvement path: Keep synchronous I/O for build-time calls (generateStaticParams), but refactor to async versions if used in API routes. Add comments clarifying build-time-only usage.

**Component Re-render on Every Step Change in IntakeWizard:**
- Problem: IntakeWizard has multiple state dependencies (step, direction, formData, leadId) that trigger full component re-renders during transitions.
- Files: `app/pi-intake-audit/components/IntakeWizard.tsx`
- Cause: State updates happen in quick succession (navigate, then capture in background). No memoization.
- Improvement path: Wrap sub-components in React.memo(). Use useCallback for event handlers. Consider extracting step logic into separate state machines (e.g., useReducer).

**Inline SVG Icons Recreated on Every Render:**
- Problem: NavIcon function creates new SVG objects on every render in DashboardPreview.
- Files: `components/sections/DashboardPreview.tsx` (lines 292-340)
- Cause: Icon rendering logic is embedded in NavIcon without memoization.
- Improvement path: Extract icons to a separate icons.ts file. Memoize or use a lookup object for icon elements.

## Scaling Limits

**Redis Expiration for Lead Storage:**
- Current capacity: Upstash Redis default limits (check plan for specifics).
- Limit: Lead data expires after 30 days. If abandonment email is scheduled but Redis evicts the key early (due to memory pressure), getLead() returns null and email is skipped.
- Scaling path: Migrate to a persistent database (PostgreSQL, MongoDB) if lead volume grows beyond Redis memory. Plan for at least 90-day retention for lead follow-up workflows.

**QStash Job Queue Rate Limits:**
- Current capacity: Upstash QStash has rate limits based on plan.
- Limit: If intake form submissions spike, QStash jobs may queue or fail. No backpressure handling in place.
- Scaling path: Monitor QStash dashboard for job failures. Consider batch scheduling if spike detection is needed. Implement exponential backoff in capture API if QStash returns 429.

**Synchronous Newsletter Email Sending:**
- Current capacity: Resend API calls are synchronous and block the request.
- Limit: If subscriber add rate increases, /api/newsletter will timeout or queue if Resend API is slow.
- Scaling path: Implement job queue (QStash or Bull) for email operations. Return 202 Accepted immediately while job processes in background.

## Missing Critical Features

**No Lead Data Persistence Beyond Redis:**
- Problem: All lead data is stored in Upstash Redis with 30-day expiration. If Redis is cleared or migrated, all historical lead data is lost.
- Blocks: Analytics, lead reporting, compliance audits.
- Recommendation: Add persistent storage (PostgreSQL or Airtable webhook) as a backup. Log every lead capture event to a persistent audit log.

**No Monitoring or Alerting:**
- Problem: API routes log to stdout only. No alerts if abandonment emails fail to send, QStash jobs error, or Redis is unavailable.
- Blocks: Production incident detection and response.
- Recommendation: Integrate error tracking (Sentry, LogRocket) and set up alerts for critical paths (failed lead capture, failed email sends, QStash job failures).

**No User-Facing Status Tracking:**
- Problem: Once a lead books a consultation, there's no way for the user to see their booked time or upcoming appointment.
- Blocks: Better user experience, reduced support requests.
- Recommendation: Add a "Your Booking" page or confirmation email that shows Cal.com appointment details.

## Test Coverage Gaps

**IntakeWizard Form State and Lead Capture:**
- What's not tested: Step transitions, form data accumulation, fire-and-forget capture behavior, error handling if capture fails.
- Files: `app/pi-intake-audit/components/IntakeWizard.tsx`
- Risk: Silent lead capture failures go unnoticed. Regressions in step logic break user flow.
- Priority: High

**API Route Validation and Error Responses:**
- What's not tested: Invalid JSON bodies, missing required fields, Zod validation error formatting, database/email service failures.
- Files: `app/api/pi-intake-audit/capture/route.ts`, `app/api/pi-intake-audit/booked/route.ts`, `app/api/newsletter/route.ts`, `app/api/pi-intake-audit/send-abandonment/route.ts`
- Risk: API contract changes are not caught. Error messages may leak internal details.
- Priority: High

**QStash Signature Verification:**
- What's not tested: Valid vs. invalid signatures, missing signature header, replay attacks.
- Files: `app/api/pi-intake-audit/send-abandonment/route.ts`
- Risk: Webhook handler could be spoofed if signature verification has bugs.
- Priority: Medium (webhook security)

**Blog and Case Study Rendering:**
- What's not tested: MDX parsing errors, missing frontmatter fields, slug validation, path traversal attempts.
- Files: `app/blog/[slug]/page.tsx`, `app/case-studies/[slug]/page.tsx`, `lib/blog.ts`, `lib/case-studies.ts`
- Risk: Malformed content or malicious slugs could crash the site or expose information.
- Priority: Medium

**Email Content Generation:**
- What's not tested: HTML escaping correctness, URL parameter encoding, email formatting in different clients.
- Files: `lib/email/send.ts`
- Risk: XSS in emails or broken links if escaping or encoding is incorrect.
- Priority: Medium

---

*Concerns audit: 2026-02-21*
