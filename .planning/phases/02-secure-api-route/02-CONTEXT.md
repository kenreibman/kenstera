# Phase 2: Secure API Route - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Server-side POST endpoint (`/api/demo-call` or similar) that validates input, enforces all security controls (reCAPTCHA, rate limiting, phone validation, consent logging, call duration cap), and triggers a Retell outbound call. No UI exists yet — this route is built and testable via curl/Postman before Phase 4 adds the form.

</domain>

<decisions>
## Implementation Decisions

### Rate limiting
- 10-minute sliding window for both IP-based and phone-number-based limits
- One call per phone number per 10 minutes, one call per IP per 10 minutes
- Unlimited repeat demos after the window expires — no lifetime cap per number
- Implemented via Upstash Redis (per requirements)

### Consent logging
- Server logs only for v1 (console.log with structured data: timestamp, IP, phone number)
- Reviewable via Vercel function logs
- No durable database storage needed at this stage (CMPL-02 in v2 requirements covers durable audit trail)

### Claude's Discretion
- API response JSON shape (success and error payloads) — design for Phase 4 UI consumption
- reCAPTCHA v3 score threshold (reasonable default for a public demo widget)
- Error message wording for 400/401/429 responses
- Phone number validation library choice
- Route path naming
- Upstash Redis key structure and TTL mechanics

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. The requirements (SEC-01 through SEC-05) and success criteria are well-defined and leave little ambiguity on behavior.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-secure-api-route*
*Context gathered: 2026-02-21*
