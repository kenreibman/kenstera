# Feature Research

**Domain:** AI voice demo widget — outbound phone call triggered from SaaS homepage
**Researched:** 2026-02-21
**Confidence:** MEDIUM-HIGH (competitor UX verified via direct page inspection; Retell API params from official docs; abuse prevention informed by community threads and legal sources)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that visitors assume exist. Missing any of these = the demo feels broken or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Name + phone + email form | Every competitor (Retell, Bland, Synthflow) collects these three fields. Visitors expect a minimal form before a call. | LOW | Three fields is the established convention. Adding more fields (company, role) increases abandonment. |
| CAPTCHA / bot verification | Retell, Bland (Turnstile), and Synthflow all gate submission behind bot checks. Without this, automated abuse is immediate. | LOW | Retell's own docs explicitly recommend reCAPTCHA. Turnstile is a viable frictionless alternative with better free tier (1M/month vs reCAPTCHA's 10K). |
| Immediate call initiation | Visitors expect the call within seconds of form submission — not a queued email or callback. Retell's own demo does this. | MEDIUM | Retell's `create-phone-call` API is synchronous. Latency is primarily network round-trip to Retell servers. |
| Loading / "calling you now" state | Users need visual confirmation after submit. Without it, they assume the form is broken and resubmit or leave. | LOW | A spinner plus "Expect a call in a few seconds" is enough. Retell's own demo uses this exact pattern. |
| Call duration limit | Unlimited calls would be immediately exploited for free PSTN access. Every platform enforces this. | LOW | Retell supports `max_call_duration_ms` (range: 60,000ms–7,200,000ms). Abrupt hangup at limit is the current behavior — no graceful wrap. |
| Rate limiting per phone number | Prevents a single user from triggering dozens of calls to their own number or burning Retell credits. | MEDIUM | Upstash Redis `@upstash/ratelimit` is already in the stack. Sliding window on `phoneNumber` key is the right algorithm. |
| Rate limiting per IP | Prevents bot networks cycling different phone numbers from a single IP. | MEDIUM | Secondary identifier alongside phone number. Combine as `${ip}:phoneNumber` or run two independent limiters. |
| Success state / next-step CTA | After the call prompt is sent, users need something to read/do while they wait. An empty screen destroys conversion. | LOW | Show "Check your phone — the AI will call you in a few seconds" plus a CTA to book a real sales call. |
| TCPA consent disclosure | As of January 27, 2025, FCC requires prior express written consent for AI-generated outbound calls, even in a demo/B2B context. Consent must be explicit and specific. | LOW | A checkbox with clear language: "By submitting, I consent to receive an AI-generated demo call at the number provided." Retell's homepage does not include this (risk they accept); Synthflow does include ToS/PP checkbox. Kenstera should include it — law firm audience = higher scrutiny. |
| Error state handling | Network failures, invalid numbers, Retell API errors, rate limit hits — users need a clear, non-technical error message for each. | LOW | Distinct error messages for: rate limit hit, invalid phone format, API failure. Do not expose Retell error strings to the user. |
| Server-side API key protection | Retell API key must never be in client-side code. The form must POST to a Next.js API route that calls Retell on the server. | LOW | Already standard Next.js pattern. Non-negotiable for security. |

### Differentiators (Competitive Advantage)

Features that are not expected but create a meaningfully better demo experience.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Dual-path agent (intake sim OR Q&A) | Every competitor demos one generic scenario. Kenstera's hybrid — "play a PI client" OR "ask about Kenstera" — demonstrates the product's actual use case while letting skeptics opt out of role-play. This is the core differentiator. | MEDIUM | Implemented at prompt level with a `begin_message` that presents both options. No conversation-flow branching needed at the Retell API level. |
| Law-firm-specific intake persona | Generic "receptionist" demos are everywhere. A PI intake specialist that actually qualifies a caller (accident date, injury type, liability) shows domain depth that generic platforms cannot match. Kenstera's target audience will immediately recognize authentic intake behavior. | MEDIUM | Requires a well-crafted system prompt. The persona needs to sound like an experienced intake coordinator, not a generic IVR. |
| Graceful wrap-up before hard cutoff | Competitors' demos end abruptly when `max_call_duration_ms` fires. A prompt that detects session duration nearing limit and transitions naturally ("I want to make sure you have our website — it's kenstera.com...") is a better UX. | MEDIUM | Community warns that `{{session_duration}}` variable is unreliable for graceful endings (LLM doesn't always honor it). Use it as a soft signal with `max_call_duration_ms` as the hard backstop. GPT-4o with temperature 0.1 improves consistency. |
| Post-call CTA section (website state change) | After the call is triggered, flip the demo section from "submit form" to "Your call is on its way — book a real call while you wait." This keeps the visitor engaged during the ~5-10 second ring delay. | LOW | State machine: idle → submitting → call_initiated → (call_completed is not detectable from frontend without webhook). |
| Immediate 429 / rate-limit messaging with retry timer | Most demos just show a generic "too many requests" error. Showing "You've already requested a demo. Try again in X minutes" with a countdown is transparently respectful of the user and reduces support contacts. | LOW | Store the rate limit window expiry time in Redis alongside the counter. Return it in the 429 response body. |
| Prompt-level abuse termination | If a caller becomes abusive, off-topic, or attempts jailbreaking, the agent ends the call gracefully rather than continuing indefinitely. Protects brand and Retell costs. | MEDIUM | Implemented in the agent system prompt. Requires clear instructions: "If the caller is abusive, using profanity, or asking you to act outside your role, say 'This call cannot continue. Thank you for your time.' and end the call." |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem valuable but create more problems than they solve at this stage.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Live call transcript on the website | "Show visitors what the AI is saying in real time" | Retell does not expose a WebSocket transcript stream to the caller-side client in real time via the outbound call API. Implementing this requires either webhooks polling or a WebRTC call (different flow entirely). Scope creep risk: high. | Link to the Retell dashboard transcript after the call via the sales follow-up email. This is already in the out-of-scope list. |
| In-call booking (Cal.com transfer) | "Let the AI book a call on the spot" | Requiring a name, email, and calendar availability from within a 2-minute demo call makes the call longer and increases abort rate. The demo's job is to impress, not to close. | The agent's wrap-up says "Visit kenstera.com and book a call there." Cal.com widget is already on the site. |
| SMS follow-up after demo call | "Stay top-of-mind with a text" | Requires separate TCPA consent for SMS (distinct from voice call consent). Adds a third compliance surface. Retell doesn't do this natively — needs a separate SMS provider. | Capture email in the form and send a follow-up via Resend (already in stack). Less compliance overhead. |
| Multi-language demo | "Reach more visitors" | English-only for v1 is the right constraint. Translating the intake specialist persona correctly for Spanish/Portuguese intake requires domain expertise beyond a prompt change. Gets expensive fast. | English-only. Revisit at v2 if non-English firm inquiries appear in analytics. |
| Web-browser microphone / WebRTC call | "No phone needed" | WebRTC calls from a browser work but require a fundamentally different Retell integration path (web call vs outbound phone call), browser permission prompts, and significant UX complexity. The value of this demo is that it rings your actual phone — that's the visceral "whoa" moment. | Keep the outbound phone call. The phone-rings-in-your-hand experience is the demo's core magic. |
| Call recording playback on the website | "Let visitors replay the call" | Requires storing call audio, GDPR/CCPA consent for recording, a media player component, and storage costs. Retell's dashboard already provides recordings to the Kenstera team. | Access call recordings through Retell's built-in dashboard. No frontend playback needed. |
| Email gating (work email only) | "Qualify leads better" | Synthflow does this (rejects Gmail/Yahoo). But Kenstera's buyers are law firm partners — many use Gmail or personal accounts for early research. Blocking common email providers will kill top-of-funnel conversions from exactly the right people. | Collect any valid email. Use the form data plus the conversation content to qualify in the CRM follow-up. |
| Infinite retry attempts | "Make it easy to try again" | No rate limiting = Retell cost exposure is unbounded. A determined abuser can trigger thousands of dollars in calls. | 3 calls per phone number per 24 hours, 5 calls per IP per hour. Firm limits with clear messaging. |

---

## Feature Dependencies

```
[CAPTCHA verification]
    └──required before──> [Form submission → API route]
                              └──required before──> [Retell outbound call creation]
                                                        └──required before──> [Call initiated state]

[Rate limiting — per phone]
    └──required alongside──> [Rate limiting — per IP]
                                  (run both checks before triggering call)

[TCPA consent checkbox]
    └──required before──> [Form submission]
    └──store timestamp for──> [Compliance audit trail in Redis/lead record]

[Loading state / "calling you now"]
    └──depends on──> [API route returns 200 with call_id]

[Post-submit CTA state]
    └──depends on──> [Loading state resolves successfully]

[Graceful call wrap-up (prompt-level)]
    └──enhances──> [max_call_duration_ms hard limit]
    (soft signal attempts graceful end; hard limit is the guaranteed backstop)

[Dual-path agent prompt]
    └──requires──> [Retell LLM agent configured with begin_message offering two paths]

[Error state — rate limit hit]
    └──requires──> [Rate limit response includes retry-after time]
    └──displayed in──> [Form error state]
```

### Dependency Notes

- **CAPTCHA required before API route call:** Without this gate, the Next.js API route is publicly triggerable by any HTTP client. CAPTCHA verification must happen server-side (verify the token with Google/Cloudflare's API inside the route, not just client-side).
- **Both rate limiters must pass:** Run IP check AND phone number check. Failing either blocks the call. Don't short-circuit on first pass.
- **TCPA consent timestamp must be stored:** Not just shown on the frontend. The consent timestamp, phone number, and source URL must be persisted (Redis or lead record) for compliance audit trail.
- **Graceful wrap-up conflicts with reliable session_duration:** Community reports that `{{session_duration}}` is not reliably consumed by the LLM mid-call. Treat prompt-based graceful ending as best-effort; always set `max_call_duration_ms` as the authoritative hard limit.
- **WebRTC conflicts with outbound phone call approach:** These are mutually exclusive Retell integration modes. Do not attempt to combine them.

---

## MVP Definition

### Launch With (v1)

Minimum viable feature set to validate the demo concept and control costs.

- [x] **Name + phone + email form** — No demo without it. Three fields only.
- [x] **CAPTCHA (reCAPTCHA v3 — already in PROJECT.md, or Cloudflare Turnstile as upgrade)** — Required to prevent bot abuse before any call is triggered.
- [x] **Server-side Retell API call (Next.js API route)** — Security non-negotiable. API key never client-side.
- [x] **Rate limiting: 3 calls/phone/24h + 5 calls/IP/1h** — Cost control. Upstash Redis sliding window on two identifiers.
- [x] **`max_call_duration_ms` = 120,000–180,000ms (2-3 min)** — Hard cap. Accept abrupt hangup as a known UX tradeoff for v1.
- [x] **TCPA consent checkbox with explicit disclosure text** — Legal requirement since Jan 27, 2025. Store timestamp.
- [x] **Loading → success state transition** — "Your call is on its way" with CTA to book. Without this, users think the form is broken.
- [x] **Error states: rate limit hit, invalid phone, API failure** — All three are predictable. Each needs its own message.
- [x] **Dual-path begin_message** — "I can walk you through a simulated PI intake, or answer questions about Kenstera — which do you prefer?" This is the core differentiator and costs nothing to add.
- [x] **Prompt-level abuse detection** — One paragraph in the system prompt. Low cost, significant protection.

### Add After Validation (v1.x)

Add once the demo is live and converting.

- [ ] **Retry countdown in 429 response** — Add when rate limit UX complaints appear in support or session recordings.
- [ ] **Graceful prompt-based wrap-up** — Refine once we see real call transcripts and know where conversations naturally end. Community warns it is unreliable; validate with real data first.
- [ ] **Resend follow-up email after demo** — Add once we confirm the demo-to-sales-call conversion funnel is working. Trigger from the API route after call creation succeeds.

### Future Consideration (v2+)

Defer until product-market fit is established and demo is proven to convert.

- [ ] **Multi-language support** — Only if non-English leads appear at meaningful volume.
- [ ] **Webhook-driven post-call state** — Shows visitors a "call complete" message. Requires a Retell webhook endpoint and real-time frontend update (polling or WebSocket). Meaningful UX improvement but non-trivial to build safely.
- [ ] **Analytics dashboard for demo metrics** — Use Retell's built-in dashboard for v1. Build custom tracking when Retell's data is insufficient for conversion analysis.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Form (name, phone, email) | HIGH | LOW | P1 |
| CAPTCHA verification | HIGH | LOW | P1 |
| Server-side API route | HIGH | LOW | P1 |
| Rate limiting (phone + IP) | HIGH | LOW | P1 |
| max_call_duration_ms cap | HIGH | LOW | P1 |
| TCPA consent checkbox + storage | HIGH | LOW | P1 |
| Loading / success state | HIGH | LOW | P1 |
| Error state handling | HIGH | LOW | P1 |
| Dual-path agent prompt | HIGH | MEDIUM | P1 |
| Prompt-level abuse detection | MEDIUM | LOW | P1 |
| Retry countdown on 429 | MEDIUM | LOW | P2 |
| Graceful call wrap-up | MEDIUM | MEDIUM | P2 |
| Resend follow-up email | MEDIUM | LOW | P2 |
| Webhook post-call state | LOW | HIGH | P3 |
| Multi-language support | LOW | HIGH | P3 |
| Custom analytics dashboard | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | Retell AI (own homepage) | Bland AI | Synthflow | Kenstera Plan |
|---------|--------------------------|----------|-----------|---------------|
| Form fields | Name, phone, email | Phone only | Job title, phone, email | Name, phone, email |
| Use case selector | Yes (6 options) | Yes (4 personas) | Yes (3 scenarios) | No — one demo persona (PI intake / Q&A) |
| CAPTCHA | reCAPTCHA | Cloudflare Turnstile | Not visible | reCAPTCHA v3 (per PROJECT.md) |
| Consent checkbox | None visible | None visible | ToS/PP checkbox | TCPA-explicit consent checkbox |
| Call type | Outbound phone | Outbound phone | Phone + direct dial numbers | Outbound phone |
| Loading state | Yes | "Make sure DND is off" message | Not visible | Yes, plus next-step CTA |
| Call duration limit | Not disclosed | Not disclosed | Not disclosed | 2-3 min hard cap via max_call_duration_ms |
| Post-call action | Not visible | Not visible | "Try full platform" CTA | "Book a real call" CTA |
| Business email gate | No | No | Yes (blocks Gmail etc.) | No — law firm partners use personal email |
| Domain-specific persona | Generic | Generic | Generic | PI intake specialist (law firm domain) |

---

## Sources

- Retell AI homepage demo inspection (direct fetch): https://www.retellai.com/
- Retell AI outbound call API docs: https://docs.retellai.com/deploy/outbound-call
- Retell AI create-agent API docs: https://docs.retellai.com/api-references/create-agent
- Retell community — call duration control: https://community.retellai.com/t/how-to-get-a-desired-call-duration-to-control-costs/293
- Bland AI homepage demo inspection (direct fetch): https://www.bland.ai/
- Synthflow homepage demo inspection (direct fetch): https://synthflow.ai/
- Upstash ratelimit-ts docs: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
- TCPA 2025 compliance — FCC AI voice ruling: https://www.kixie.com/sales-blog/ai-powered-robocalls-in-2025-a-guide-to-the-new-rules/
- TCPA 2025 — prior express written consent requirements: https://secureprivacy.ai/blog/telephone-consumer-protection-act-compliance-tcpa-2025-full-guide
- Cloudflare Turnstile vs reCAPTCHA 2025: https://formshield.dev/blog/turnstile-vs-recaptcha
- reCAPTCHA free tier change (10K/month): https://blog.rcaptcha.app/articles/cloudflare-turnstile-vs-recaptcha

---

*Feature research for: AI voice demo widget — Kenstera homepage*
*Researched: 2026-02-21*
