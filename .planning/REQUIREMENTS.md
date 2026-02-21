# Requirements: Kenstera Demo Intake Specialist

**Defined:** 2026-02-21
**Core Value:** Prospective clients feel the AI intake experience on their own phone before buying

## v1 Requirements

### Form

- [ ] **FORM-01**: User can enter name, phone number, and email in a demo form on the homepage
- [ ] **FORM-02**: Phone number is validated as US E.164 format (`+1` prefix) before submission
- [ ] **FORM-03**: Form is protected by reCAPTCHA v3 invisible verification

### Security

- [ ] **SEC-01**: Retell API key is accessed only server-side via API route (never in client bundle)
- [ ] **SEC-02**: Submissions are rate-limited per IP address (sliding window via Upstash Redis)
- [ ] **SEC-03**: Submissions are rate-limited per phone number (sliding window via Upstash Redis)
- [ ] **SEC-04**: Call duration is hard-capped at 180 seconds via `max_call_duration_ms` set at the per-call API level
- [ ] **SEC-05**: Consent timestamp and IP address are logged server-side when a call is triggered

### Agent

- [ ] **AGNT-01**: Agent greets caller with a dual-path begin message offering intake simulation or kenstera Q&A
- [ ] **AGNT-02**: Intake path simulates a personal injury intake specialist — asks about situation, injuries, timeline, and qualifies the lead
- [ ] **AGNT-03**: Q&A path provides a brief pitch on kenstera's AI intake automation (24/7 coverage, booking, CRM integration) and nudges caller to book a sales call via the website
- [ ] **AGNT-04**: Agent detects off-topic, abusive, or exploitative callers and terminates the call promptly
- [ ] **AGNT-05**: Agent gracefully wraps up the conversation before the hard duration cutoff fires

### UX

- [ ] **UX-01**: Form displays a loading state (spinner/message) while the outbound call is being triggered
- [ ] **UX-02**: Form transitions to a success state ("Your call is on its way") with a CTA linking to the sales booking page
- [ ] **UX-03**: Distinct, user-friendly error messages display for rate limit hit (429), invalid phone number, and API failure
- [ ] **UX-04**: Submit button is disabled after first click to prevent double submission

### Infrastructure

- [ ] **INFR-01**: One-time setup script provisions Retell LLM response engine, voice agent, and phone number via API using only the API key
- [ ] **INFR-02**: Provisioned resource IDs (LLM ID, agent ID, phone number) are written to `.env.local` as environment variables
- [ ] **INFR-03**: Demo form section is rendered on the homepage between the CRM Integrations and Case Studies sections

## v2 Requirements

### Enhanced UX

- **UX-05**: Retry countdown timer shown when rate limit is hit (shows when user can try again)
- **UX-06**: Webhook-driven "call ended" state update on the frontend (replaces timeout-based reset)

### Enhanced Agent

- **AGNT-06**: Conversation Flow (node-based) architecture for deterministic dual-path routing
- **AGNT-07**: Multi-language agent support

### Follow-up

- **FLLW-01**: Automated follow-up email sent via Resend after successful demo call
- **FLLW-02**: Demo call analytics dashboard beyond Retell's built-in tools

### Compliance

- **CMPL-01**: TCPA consent checkbox with explicit AI call disclosure on the form
- **CMPL-02**: Durable consent audit trail (separate from Redis TTL-based storage)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Live call transcript on website | Retell does not expose real-time transcript stream for outbound phone calls |
| In-call Cal.com booking | Makes demo call too long; existing Cal.com widget handles post-call booking |
| SMS follow-up after demo | Requires separate TCPA consent for SMS, adds third compliance surface |
| WebRTC browser call option | Outbound phone ring is the "whoa" moment; WebRTC is a different integration path |
| Call recording playback | Adds storage/privacy complexity; Retell dashboard already has this |
| Warm transfer to live agent | Demo is meant to be self-contained; no live agent staffing needed |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FORM-01 | Phase 4 | Pending |
| FORM-02 | Phase 4 | Pending |
| FORM-03 | Phase 4 | Pending |
| SEC-01 | Phase 2 | Pending |
| SEC-02 | Phase 2 | Pending |
| SEC-03 | Phase 2 | Pending |
| SEC-04 | Phase 2 | Pending |
| SEC-05 | Phase 2 | Pending |
| AGNT-01 | Phase 3 | Pending |
| AGNT-02 | Phase 3 | Pending |
| AGNT-03 | Phase 3 | Pending |
| AGNT-04 | Phase 3 | Pending |
| AGNT-05 | Phase 3 | Pending |
| UX-01 | Phase 4 | Pending |
| UX-02 | Phase 4 | Pending |
| UX-03 | Phase 4 | Pending |
| UX-04 | Phase 4 | Pending |
| INFR-01 | Phase 1 | Pending |
| INFR-02 | Phase 1 | Pending |
| INFR-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0

---
*Requirements defined: 2026-02-21*
*Last updated: 2026-02-21 after roadmap creation — all requirements mapped*
