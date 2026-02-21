# Project Research Summary

**Project:** Kenstera — Retell AI outbound call demo widget
**Domain:** AI voice demo integration on SaaS homepage (Next.js App Router)
**Researched:** 2026-02-21
**Confidence:** MEDIUM-HIGH

## Executive Summary

This project adds a "Try the AI demo" widget to the Kenstera homepage. Visitors enter their name, phone, and email; the widget triggers an outbound AI phone call via Retell AI that rings their actual phone within seconds. The AI agent plays a dual-path role: either a PI intake specialist simulating a real client call, or a Kenstera Q&A assistant. The stack integration is straightforward — three new npm packages layered onto an existing Next.js App Router codebase — but execution requires careful attention to security, cost control, and legal compliance.

The recommended implementation follows a thin-route-handler + service-layer pattern that already exists in the codebase. A one-time provisioning script creates the Retell LLM, agent, and phone number; runtime call triggering happens through a single Next.js API route guarded by reCAPTCHA v3, dual-identifier rate limiting (IP + phone number), and Zod input validation. The dual-path agent prompt is the core product differentiator and requires dedicated prompt engineering and QA across 10+ test calls before launch.

The top risks are financial (IRSF toll fraud can generate four-figure Retell bills within hours of launch) and legal (TCPA 2025 requires explicit written consent before any AI-generated outbound call, with fines of $500–$1,500 per violation). Both risks are fully mitigable with controls that are low-complexity to implement — they must simply be built in from the start, not retrofitted. The `max_call_duration_ms` hard cap must be set at the per-call API level (not just the agent config) because agent version mismatches can silently bypass agent-level limits, leading to runaway call durations.

---

## Key Findings

### Recommended Stack

The existing codebase already provides the foundation: Next.js 16 App Router, TypeScript, Zod, `@upstash/redis`, and Framer Motion. Only three new packages are needed. The `retell-sdk` (v4.66.0) is the official server-side TypeScript SDK and is the unambiguous choice for all Retell API operations — the alternative `retell-client-js-sdk` is for WebRTC browser calls and is categorically wrong for this use case. Rate limiting reuses the existing Upstash Redis instance via `@upstash/ratelimit` (v2.0.8, note: v1.x has breaking API differences). reCAPTCHA v3 is implemented via `react-google-recaptcha-v3`, with a fallback to `next-recaptcha-v3` if React 19 peer dependency warnings are blocking.

**Core technologies:**
- `retell-sdk@^4.66.0`: Server-side Retell client — creates LLM/agent/phone number, triggers outbound calls — the only correct package for server-triggered phone calls
- `@upstash/ratelimit@^2.0.8`: Sliding window rate limiting keyed on IP and phone number — reuses existing Redis instance, zero new infrastructure
- `react-google-recaptcha-v3@^1.10.x`: Invisible reCAPTCHA v3 token generation — Retell's own docs explicitly recommend this for bot prevention

### Expected Features

**Must have (table stakes):**
- Name + phone + email form — three fields is the industry convention; more fields increase abandonment
- reCAPTCHA v3 bot verification — without this, automated abuse begins immediately at launch
- Server-side Retell API route — API key must never appear in client code; non-negotiable
- Dual-identifier rate limiting (IP + phone) — prevents both phone-cycling and IP-cycling abuse vectors
- `max_call_duration_ms` = 180,000 ms hard cap set at the per-call level — cost control backstop
- TCPA consent checkbox with explicit AI call disclosure — FCC-mandated since January 27, 2025; $500–$1,500/violation
- Loading state + "Your call is on its way" success state — without this, users assume the form broke and resubmit
- Error states for rate limit hit, invalid phone, and API failure — each needs a distinct user-facing message
- Dual-path `begin_message` offering intake simulation or Kenstera Q&A — the core product differentiator
- Prompt-level abuse detection and termination — one paragraph in the system prompt; low cost, real protection

**Should have (competitive):**
- Retry countdown timer in 429 rate-limit responses — reduces support contacts; add when rate-limit UX complaints appear
- Prompt-level graceful call wrap-up before `max_call_duration_ms` fires — best-effort only; validate with real call transcripts before investing
- Resend follow-up email after successful demo call trigger — once the demo-to-sales conversion funnel is confirmed working

**Defer (v2+):**
- Webhook-driven post-call state change on the frontend — meaningful UX improvement but requires real-time frontend update (polling or WebSocket), non-trivial
- Multi-language support — only if non-English leads appear at meaningful volume in analytics
- Custom demo analytics dashboard — Retell's built-in dashboard is sufficient for v1

**Anti-features (confirmed out of scope):**
- Live call transcript on the website — Retell does not expose a real-time transcript stream for outbound phone calls
- In-call Cal.com booking — makes the demo call too long; the existing Cal.com widget handles this after the call
- SMS follow-up — requires separate TCPA consent for SMS, adds a third compliance surface
- WebRTC/browser microphone call — the outbound-phone-rings-in-your-hand is the "whoa" moment; WebRTC is a fundamentally different integration path

### Architecture Approach

The integration uses a service-layer pattern that mirrors the existing codebase conventions (`lib/email/send.ts`, `lib/db/leads.ts`). A `lib/retell/` module contains three files: the Retell SDK singleton (`client.ts`), outbound call logic (`calls.ts`), and rate limiter factories (`ratelimit.ts`). Two API routes handle the runtime path: `/api/demo-call/route.ts` (user-facing call trigger) and `/api/retell-webhook/route.ts` (post-call event handler). A `scripts/setup-retell.ts` one-time provisioning script creates the LLM, agent, and phone number, writing the resulting IDs to `.env.local`. A single client component (`components/sections/DemoCall.tsx`) handles the form UI and state machine.

**Major components:**
1. `DemoCall.tsx` — Client component; form UI, reCAPTCHA token generation, POST to API route, state machine (idle → submitting → success/error)
2. `/api/demo-call/route.ts` — Thin route handler; Zod validation → reCAPTCHA check → rate limit check → call trigger; ~60 lines
3. `lib/retell/` — Service layer; Retell SDK singleton, `createOutboundCall()`, dual `checkRateLimits()` with parallel Redis calls
4. `lib/recaptcha.ts` — Google `siteverify` token verification wrapper
5. `/api/retell-webhook/route.ts` — Signature-verified webhook handler; reads raw body with `request.text()` before any JSON parsing
6. `scripts/setup-retell.ts` — One-time CLI provisioning; LLM → agent → phone number in sequence (order matters)

**Build order:** `lib/retell/client.ts` → provisioning script (produces env vars) → service layer → API routes → client component

### Critical Pitfalls

1. **`max_call_duration_ms` agent version mismatch** — Agent updates don't automatically rebind the phone number to the new version; calls silently use the old config and can run for 60+ minutes. Prevention: set `max_call_duration_ms: 180000` explicitly in every `createPhoneCall()` call body, not only at the agent level. Verify after every agent update.

2. **IRSF toll fraud via form submission** — Attackers automate form submissions to trigger calls to premium international numbers they control; bills of hundreds to thousands of dollars within hours. Prevention: enforce E.164 + `+1` country code server-side (reject with 400 before calling Retell), dual sliding-window rate limiting on both IP and phone, server-side reCAPTCHA validation, $20/day billing alert.

3. **Retell API key client-side exposure** — Key in `NEXT_PUBLIC_*` variable or client bundle grants full account access. Prevention: `RETELL_API_KEY` (no `NEXT_PUBLIC_` prefix), accessed only in Route Handlers; run `grep -r "NEXT_PUBLIC_RETELL" .next/static/` post-build to confirm.

4. **TCPA consent missing** — AI-generated outbound calls without explicit prior written consent violate FCC rules (effective January 27, 2025); $500–$1,500 per call. Prevention: non-pre-checked checkbox with explicit AI call disclosure, consent timestamp + IP logged server-side at call creation time, company identification in agent greeting.

5. **Single-prompt two-path agent inconsistency** — The LLM blends or ignores the intake/Q&A branching, especially when callers give ambiguous responses. Prevention: explicit path names in `begin_message`, keep prompt under 3,500 tokens, add exclusion instructions, test with 15+ calls per path before launch. If inconsistency persists, escalate to Retell Conversation Flow (node-based) architecture.

---

## Implications for Roadmap

Based on the dependency chain established in the architecture research, the build order is deterministic. Security controls must precede public exposure. The provisioning script must run before any route can fire a real call. The agent prompt must be tested before the form is shown to real visitors.

### Phase 1: Infrastructure and Provisioning

**Rationale:** The agent LLM, voice, and phone number must exist before any code can be tested end-to-end. Environment variables produced by the setup script are required inputs for all subsequent phases. This is a prerequisite with no parallelism possible.

**Delivers:** Working Retell stack (LLM ID, agent ID, from-phone-number) in `.env.local`; `lib/retell/client.ts` singleton; provisioning script committed and documented.

**Addresses:** Stack requirement for `retell-sdk` installation; architecture requirement for idempotent provisioning script.

**Avoids:** Hardcoding Retell IDs in source (anti-pattern 4 from ARCHITECTURE.md); agent version mismatch pitfall (set `max_call_duration_ms` in the script and document that it must also be set at the call level).

### Phase 2: Secure API Route

**Rationale:** The API route is the critical security boundary. Rate limiting, reCAPTCHA verification, phone number validation, and TCPA consent logging must all be present before the form is exposed. Building these controls second (before the UI) prevents the security-retrofit antipattern. The route can be tested directly with curl/Postman without a UI.

**Delivers:** `/api/demo-call/route.ts` with Zod validation, reCAPTCHA server-side verification, dual-identifier sliding-window rate limiting, E.164 + `+1` country code enforcement, TCPA consent timestamp logging, and Retell `createPhoneCall()` integration. `/api/retell-webhook/route.ts` with raw-body signature verification and `call_ended` logging.

**Uses:** `retell-sdk`, `@upstash/ratelimit`, `react-google-recaptcha-v3` (server-side token verification), `zod` (already installed).

**Avoids:** IRSF fraud exposure (phone validation + rate limiting built before public access); API key exposure (established env var conventions in first commit touching Retell); webhook HMAC bypass (raw-body pattern enforced from the start).

### Phase 3: Agent Prompt Engineering and QA

**Rationale:** The dual-path prompt is the core product differentiator and the highest-risk prompt design in this integration (two branching paths in a single prompt). It requires dedicated iteration and test calls before the form is shown to real visitors. This phase is separate from provisioning because the prompt will be updated multiple times before launch — each update requires re-provisioning the LLM and re-binding.

**Delivers:** A validated dual-path agent prompt with: PI intake specialist persona, Kenstera Q&A path, clear `begin_message` branching question, voicemail handling instruction, abuse detection/termination instruction, and prompt-level graceful wrap-up nudge. Minimum 15 test calls logged and reviewed.

**Addresses:** Dual-path agent differentiator (FEATURES.md); single-prompt reliability pitfall (PITFALLS.md Pitfall 6); graceful call wrap-up feature.

**Avoids:** Prompt-only duration control reliance (always confirm `max_call_duration_ms` is set at the call level after any LLM update); agent version mismatch after LLM updates (re-bind phone number after every LLM change).

### Phase 4: Form Component and UI

**Rationale:** The client component is built last because it depends on a working API route (Phase 2) and a tested agent (Phase 3). Frontend state machine (idle → submitting → success/error) is straightforward once the backend contracts are established. The TCPA consent checkbox is part of this phase's spec.

**Delivers:** `DemoCall.tsx` client component with: name/phone/email form, phone input with E.164 normalization, TCPA consent checkbox (non-pre-checked), reCAPTCHA v3 token generation, loading state, success state with "book a real call" CTA, distinct error states for rate limit / invalid phone / API failure, disabled submit button after first click.

**Addresses:** All P1 UX features from FEATURES.md (form fields, loading state, success CTA, error states, TCPA checkbox); UX pitfalls (double submission, unclear expectations, no call-expectation copy).

**Avoids:** Double form submission (disabled after click); voicemail UX failure (handled in agent prompt phase); missing consent checkbox (designed in from spec).

### Phase 5: Integration Testing and Launch Readiness

**Rationale:** A dedicated verification phase prevents the "looks done but isn't" pattern documented in PITFALLS.md. Each control must be verified to actually function, not just to exist in code. This phase covers the full "looks done but isn't" checklist from PITFALLS.md.

**Delivers:** Verified launch-ready state confirmed by: test call terminating at 3 minutes (not 60), forged reCAPTCHA token rejected, non-US number returning 400 before any call is placed, second submission on same phone returning 429, consent logged server-side, API key not in `.next/static/` bundle, billing alert configured at $20/day.

**Avoids:** All six critical pitfalls from PITFALLS.md; every item on the "Looks Done But Isn't" checklist.

### Phase Ordering Rationale

- Phases 1 → 2 → 3 → 4 → 5 is a strict dependency chain: provisioning produces env vars required by the route; the route must exist before the component can POST to it; the agent must be validated before real visitors interact with it.
- Security controls (Phase 2) are built before the UI (Phase 4) by design, preventing the security-retrofit antipattern.
- Prompt engineering (Phase 3) is a separate phase because it requires iteration cycles (update LLM → re-bind → test call → review transcript → repeat); conflating it with provisioning would create repeated re-provisioning churn.
- Phase 5 is non-optional: the pitfall research documents that IRSF fraud, TCPA violations, and API key exposure are all HIGH recovery-cost incidents. A structured verification step is cheaper than recovery.

### Research Flags

Phases needing deeper research during planning:
- **Phase 3 (Prompt Engineering):** Agent prompting for dual-path call flow is a narrow domain. The research confirms `{{session_duration}}` is unreliable and that prompts over 3,500 tokens degrade. Recommend a brief `/gsd:research-phase` focused on Retell Conversation Flow architecture as a fallback option, and best-practice prompt token budgeting.
- **Phase 2 (API Route) — reCAPTCHA React 19 compat:** The research rates `react-google-recaptcha-v3` compatibility with React 19 as LOW confidence. Validate peer dependency behavior early in Phase 2; if blocked, swap to `next-recaptcha-v3`.

Phases with standard, well-documented patterns (skip research-phase):
- **Phase 1 (Provisioning):** Retell SDK provisioning sequence is fully documented in official docs. Code samples in ARCHITECTURE.md are verified.
- **Phase 4 (Form Component):** Standard Next.js client component with controlled form. Framer Motion is already in the stack. No novel patterns.
- **Phase 5 (Testing):** Verification steps are enumerated in PITFALLS.md. No research needed — execute the checklist.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | `retell-sdk` v4.66.0, `@upstash/ratelimit` v2.0.8 verified via official npm + docs. One LOW-confidence item: `react-google-recaptcha-v3` React 19 peer dep compatibility — monitor during Phase 2. |
| Features | MEDIUM-HIGH | Table stakes verified against Retell, Bland, and Synthflow homepage inspection. TCPA requirements verified against multiple FCC/legal sources. Anti-features rationale is well-argued. |
| Architecture | HIGH | Thin-route-handler + service-layer pattern verified against existing codebase conventions. API method signatures verified via official Retell API reference. Build order validated against component dependency graph. |
| Pitfalls | MEDIUM-HIGH | IRSF fraud and TCPA compliance verified via multiple authoritative sources. `max_call_duration_ms` version mismatch verified via community + official docs. Single-prompt two-path reliability is MEDIUM (community reports; not a guarantee of failure). |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **reCAPTCHA v3 + React 19 compatibility:** Rated LOW confidence. Address at start of Phase 2: install the package, check for peer dep warnings, swap to `next-recaptcha-v3` if needed. Do not defer this discovery.
- **Retell concurrent call limit (20 on Pay-As-You-Go):** The research notes that 20+ simultaneous submissions cause silent call queuing or failure. If the widget is placed on a high-traffic page or a launch campaign is planned, verify the Retell plan tier before Phase 5.
- **`begin_message` path choice UX:** The research identifies that callers who don't know which path to choose cause awkward silences and stalls. The correct phrasing of the branching question needs real-call validation, not just design-time intuition. Flag for Phase 3 QA review.
- **TCPA consent log retention:** The research specifies that consent timestamp + IP must be logged, but does not specify the storage target (Redis vs. the existing leads persistence layer). Resolve during Phase 2 planning: prefer the existing leads persistence layer so consent records are durable and queryable.

---

## Sources

### Primary (HIGH confidence)
- `https://docs.retellai.com/get-started/sdk` — SDK installation, Retell client usage
- `https://docs.retellai.com/api-references/create-phone-call` — `createPhoneCall()` method signature, parameters
- `https://docs.retellai.com/api-references/create-retell-llm` — LLM creation parameters, `start_speaker`, model options
- `https://docs.retellai.com/api-references/create-agent` — Agent creation, `max_call_duration_ms` placement
- `https://docs.retellai.com/features/secure-webhook` — `Retell.verify()` raw body pattern
- `https://www.npmjs.com/package/retell-sdk` — Version 4.66.0 confirmed
- `https://www.npmjs.com/package/@upstash/ratelimit` — Version 2.0.8 confirmed
- `https://upstash.com/docs/redis/sdks/ratelimit-ts/overview` — Sliding window algorithm docs
- `https://docs.retellai.com/reliability/prevent-abuse` — Official IRSF prevention guidance
- Existing codebase patterns (`lib/email/send.ts`, `app/api/newsletter/route.ts`) — verified by direct read

### Secondary (MEDIUM confidence)
- `https://community.retellai.com/t/bug-max-call-duration-ms-not-being-enforced/391` — Agent version mismatch causing duration enforcement failure
- `https://community.retellai.com/t/how-to-get-a-desired-call-duration-to-control-costs/293` — `max_call_duration_ms` placement on agent vs. LLM
- `https://www.retellai.com/blog/prompt-based-vs-conversational-pathways-choosing-the-right-approach` — Single-prompt vs Conversation Flow tradeoffs
- Retell, Bland AI, Synthflow homepage direct inspection — competitor feature comparison
- `https://www.kixie.com/sales-blog/ai-powered-robocalls-in-2025-a-guide-to-the-new-rules/` — FCC AI voice ruling 2025
- `https://secureprivacy.ai/blog/telephone-consumer-protection-act-compliance-tcpa-2025-full-guide` — TCPA prior express written consent requirements

### Tertiary (LOW confidence)
- `react-google-recaptcha-v3` React 19 compatibility — not explicitly tested; peer dep warning expected; validate early in Phase 2
- `start_speaker` field required on LLM create — referenced in Retell API spec + community note; treat as required until confirmed otherwise

---
*Research completed: 2026-02-21*
*Ready for roadmap: yes*
