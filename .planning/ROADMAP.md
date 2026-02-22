# Roadmap: Kenstera Demo Intake Specialist

## Overview

Five sequential phases deliver the homepage demo widget from zero to launch-ready. Each phase has a hard dependency on the prior: provisioning produces the environment variables the API route needs; the API route must exist before the form can POST to it; the agent must be validated before real visitors interact with it; and a verification phase confirms every security control actually works before public exposure. There is no parallelism — this is a strict dependency chain, and the ordering is the architecture.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Provisioning** - One-time Retell stack setup that produces the env vars every other phase depends on (completed 2026-02-21)
- [x] **Phase 2: Secure API Route** - Server-side call trigger with all security controls in place before any UI exists (completed 2026-02-21)
- [x] **Phase 3: Agent Prompt** - Dual-path agent prompt engineered and validated through real test calls (completed 2026-02-21)
- [x] **Phase 4: Form UI** - Client-side demo form component integrated into the homepage (completed 2026-02-22)
- [ ] **Phase 5: Verification** - End-to-end confirmation that every security control and UX state works before launch

## Phase Details

### Phase 1: Provisioning
**Goal**: The Retell LLM, voice agent, and phone number exist and their IDs are written to `.env.local` — no manual dashboard steps required
**Depends on**: Nothing (first phase)
**Requirements**: INFR-01, INFR-02
**Success Criteria** (what must be TRUE):
  1. Running `npm run setup:retell` with only `RETELL_API_KEY` set creates the LLM, agent, and phone number and writes their IDs to `.env.local`
  2. The provisioning script is idempotent — running it a second time does not create duplicate resources
  3. The Retell client singleton is importable in any server-side file and uses the env var (never a hardcoded key)
**Plans:** 1/1 plans complete
Plans:
- [x] 01-01-PLAN.md — Install retell-sdk, create client singleton, and build idempotent provisioning script (completed 2026-02-21)

### Phase 2: Secure API Route
**Goal**: Visitors can trigger a real outbound call through a server-side route that enforces all security controls — even before any UI exists
**Depends on**: Phase 1
**Requirements**: SEC-01, SEC-02, SEC-03, SEC-04, SEC-05
**Success Criteria** (what must be TRUE):
  1. A valid POST with correct reCAPTCHA token and a US phone number triggers a real Retell outbound call capped at 180 seconds
  2. A POST with a non-US or invalid phone number returns 400 before any Retell API call is made
  3. A forged or missing reCAPTCHA token returns 401 and no call is placed
  4. A second submission from the same IP or phone number within the rate-limit window returns 429 and no call is placed
  5. The consent timestamp and submitter IP are logged server-side every time a call is successfully triggered
**Plans:** 2/2 plans complete
Plans:
- [ ] 02-01-PLAN.md — Install dependencies, create rate-limit and reCAPTCHA helpers, build POST /api/demo-call route handler
- [ ] 02-02-PLAN.md — Verify all security controls via curl (human checkpoint)

### Phase 3: Agent Prompt
**Goal**: The single-path Kate intake agent greets callers by name, walks through a car accident intake simulation, and completes the call naturally within 2 minutes — validated by real test calls
**Depends on**: Phase 2
**Requirements**: AGNT-01, AGNT-02, AGNT-03, AGNT-04, AGNT-05
**Success Criteria** (what must be TRUE):
  1. A caller is greeted by name, given a car accident scenario, and asked about their situation, injuries, and timeline in a natural conversational sequence
  2. The agent ends the call cleanly after the intake demo without pitching or asking for feedback
  3. A caller who says something off-topic, abusive, or tries to manipulate the agent has the call terminated within 2-3 exchanges
  4. The agent begins wrapping up the conversation before the 120-second hard cut fires (graceful exit, not a mid-sentence drop)
  5. The intake flow completes successfully across at least 5 real test calls with no failures
**Plans:** 2/2 plans complete
Plans:
- [ ] 03-01-PLAN.md — Create Kate persona prompt update script and modify API route for caller name injection + 120s cap
- [ ] 03-02-PLAN.md — Run update script and verify agent behavior via real test calls (human checkpoint)

### Phase 4: Form UI
**Goal**: Visitors on the homepage can fill out the demo form and receive clear feedback at every step — idle, loading, success, and each error state
**Depends on**: Phase 3
**Requirements**: FORM-01, FORM-02, FORM-03, UX-01, UX-02, UX-03, UX-04, INFR-03
**Success Criteria** (what must be TRUE):
  1. The demo form section appears on the homepage between the CRM Integrations and Case Studies sections and matches the site's visual aesthetic
  2. A visitor who submits valid fields sees a spinner/loading message while the call is triggered, then a "Your call is on its way" success state with a link to book a sales call
  3. A visitor who hits the rate limit sees a distinct message telling them to try again later (not a generic error)
  4. A visitor who enters an invalid phone number sees a distinct validation error before submission is attempted
  5. The submit button is disabled after the first click and cannot trigger a double submission
**Plans:** 2/2 plans complete
Plans:
- [ ] 04-01-PLAN.md — Install next-recaptcha-v3, add ReCaptchaProvider to layout, build DemoForm.tsx component with all form states
- [ ] 04-02-PLAN.md — Insert DemoForm into homepage and visually verify in browser (human checkpoint)

### Phase 5: Verification
**Goal**: Every security control and UX state is confirmed to actually work through direct testing — not assumed to work because the code exists
**Depends on**: Phase 4
**Requirements**: (cross-cutting — validates all prior requirements are enforced in production)
**Success Criteria** (what must be TRUE):
  1. A test call initiated through the form terminates at or before 3 minutes (not 60)
  2. Submitting the form twice rapidly with the same phone number: the second request returns 429 and no second call is placed
  3. Entering a non-US phone number and submitting returns a validation error and no Retell API call is recorded in the dashboard
  4. The string `RETELL_API_KEY` does not appear anywhere under `.next/static/` after a production build
  5. A Retell billing alert is configured at $20/day and confirmed active in the account dashboard
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in strict numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Provisioning | 1/1 | Complete    | 2026-02-21 |
| 2. Secure API Route | 2/2 | Complete   | 2026-02-21 |
| 3. Agent Prompt | 2/2 | Complete    | 2026-02-21 |
| 4. Form UI | 2/2 | Complete   | 2026-02-22 |
| 5. Verification | 0/TBD | Not started | - |
