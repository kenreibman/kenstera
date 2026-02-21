# Pitfalls Research

**Domain:** Retell AI outbound phone demo integration on SaaS homepage
**Researched:** 2026-02-21
**Confidence:** MEDIUM-HIGH (Retell-specific findings from official docs + community; legal findings from multiple authoritative sources)

---

## Critical Pitfalls

### Pitfall 1: max_call_duration_ms Does Not Self-Enforce After Agent Updates

**What goes wrong:**
When you update `max_call_duration_ms` on an agent and publish the new version, calls continue using the prior agent version unless the phone number or call configuration is explicitly re-bound to the updated version. Calls have been observed running 60–130 minutes despite a configured 5–10 minute limit — until the billing alarm fires.

**Why it happens:**
Retell versions agents independently from phone number bindings. Publishing a new agent version does not automatically update which version a phone number uses. The phone number silently keeps calling the old version. This is documented in the community as a known configuration mismatch, not a platform bug per se.

**How to avoid:**
- After updating the agent, explicitly confirm the phone number is assigned to the correct agent version via the API or dashboard.
- Set `max_call_duration_ms` at the `create-phone-call` API call level (as an override parameter) rather than only at the agent level — this fires regardless of agent version binding.
- Set the minimum viable cap: 180,000 ms (3 minutes) for this demo. Never rely on the 3,600,000 ms (1 hour) default.
- Add a secondary hard cap in your Next.js backend: if a call ID is created, schedule a webhook or timeout check to verify it ended within the expected window.

**Warning signs:**
- Retell dashboard shows calls with durations far exceeding 3 minutes.
- Costs spike unexpectedly after a code deploy.
- Agent version shown on a call's details does not match your current published version.

**Phase to address:** Agent provisioning phase (setup script). Verify version binding immediately after any agent update.

---

### Pitfall 2: IRSF Toll Fraud via Form Submission (International Revenue Sharing Fraud)

**What goes wrong:**
Attackers automate form submissions (or bypass reCAPTCHA with bot farms) and trigger your outbound call API to dial premium international numbers they control. Carriers pay kickbacks to the fraud operator per minute of traffic. You receive a bill for hundreds or thousands of dollars within hours. Victims typically discover the attack only after substantial financial damage.

**Why it happens:**
The form → API route → `create-phone-call` pipeline is a direct cost amplifier. Without backend controls, each form submission is a free call that Kenstera pays for. A single automated script submitting 200 requests at $0.05–0.15/minute for 1 hour each creates a $600–$1,800 surprise bill. Retell-purchased numbers can only call US destinations, which limits exposure — but only if number validation is enforced server-side, not just client-side.

**How to avoid:**
- Enforce E.164 format server-side and validate the destination country code is `+1` (US) before passing to Retell. Reject anything else with a 400 error — do not even attempt the call.
- Implement rate limiting in the Next.js API route using Upstash Redis with both IP-based and phone-number-based buckets. Recommended: 1 call per phone number per 24 hours, 3 calls per IP per hour.
- Validate reCAPTCHA v3 score server-side before triggering the call — reject tokens scoring below 0.5. Do not trust client-side score assertions.
- Set outbound geo-restriction on the Retell agent/phone number to US-only destinations.
- Monitor Retell billing daily during the first two weeks post-launch. Set a billing alert at $20/day.

**Warning signs:**
- Spike in form submissions that don't correspond to organic traffic.
- Calls showing non-US destination numbers in Retell dashboard.
- Redis rate limit counters being hit within minutes of launch.
- Retell account costs exceeding expected baseline within an hour.

**Phase to address:** API route implementation phase. Rate limiting and server-side phone validation must be built before the route is exposed publicly.

---

### Pitfall 3: Retell API Key Exposed Client-Side

**What goes wrong:**
The Retell API key is accidentally included in frontend code, Next.js environment variables prefixed with `NEXT_PUBLIC_`, or returned in API responses. Any visitor can then make unlimited outbound calls billed to your account, or scrape your agent configuration.

**Why it happens:**
Developers familiar with simple integrations sometimes reach for client-side fetch to call Retell directly for speed. Next.js's `NEXT_PUBLIC_` prefix convention is easy to misuse. The key grants full account access — there is no read-only tier.

**How to avoid:**
- The Retell API key must live only in `RETELL_API_KEY` (no `NEXT_PUBLIC_` prefix) and only be accessed in Next.js API routes (`/api/`) or server-side functions.
- Never pass the API key or any Retell internal IDs (agent ID, phone number ID) to the client response. Return only the call status.
- Audit `.env.local` and confirm no Retell keys appear in client bundle using `next build` output or a tool like `grep -r "RETELL" .next/static/`.
- If the key is ever exposed: rotate it immediately in the Retell dashboard. Keys have no expiry on their own.

**Warning signs:**
- `NEXT_PUBLIC_RETELL_*` variables in your codebase.
- Unexpected calls in the Retell dashboard you didn't trigger.
- Network tab in DevTools shows Retell API key in request headers from the browser.

**Phase to address:** API route implementation phase. Establish environment variable conventions in the first commit that touches Retell.

---

### Pitfall 4: FCC/TCPA Compliance — Missing Written Consent Language on the Form

**What goes wrong:**
Making an AI-generated outbound phone call to a user without their explicit prior express written consent violates the TCPA (as amended January 27, 2025). The FCC has explicitly ruled AI-generated voices are "artificial voices" under the TCPA. Fines run $500–$1,500 per call, with class-action exposure averaging $12.4M in settlements. A demo form with no consent checkbox is non-compliant.

**Why it happens:**
Developers treat a user entering their phone number as implied consent. It is not — not under 2025 FCC rules. The user explicitly requesting a call is necessary but not legally sufficient without written, documented consent to receive AI-generated calls from the named seller.

**How to avoid:**
- Add a non-pre-checked consent checkbox to the demo form with this exact pattern: "By checking this box, I agree to receive a call from Kenstera, which may use AI-generated voice technology, at the phone number I provided. Consent is not a condition of any purchase."
- Log the consent timestamp, IP address, and form submission data server-side at call creation time.
- Display the company name, purpose of the call, and opt-out method ("you can hang up at any time") in either the form copy or the agent's opening line.
- Restrict calls to US numbers only (Retell-purchased numbers enforce this at the telephony layer, but validate server-side regardless).

**Warning signs:**
- Form submits phone number with no disclosure or checkbox.
- No server-side logging of consent at call creation time.
- Agent greeting does not identify the company by name.

**Phase to address:** Form component implementation phase. The consent checkbox and logging must be part of the initial form spec, not retrofitted.

---

### Pitfall 5: Prompt-Only Duration Control Is Unreliable

**What goes wrong:**
Teams add instructions like "wrap up the call after 2 minutes" to the agent prompt and assume the LLM will honor them. In practice, the model frequently ignores timing instructions, continues past the limit, or ends calls prematurely and unpredictably. The `{{session_duration}}` dynamic variable in prompts has reported recognition failures in the Retell community.

**Why it happens:**
LLMs don't have a reliable internal clock. Timing instructions compete with conversation flow instructions, and the model prioritizes being helpful in the moment over following abstract time-based constraints. Retell's own community documentation confirms this is "not entirely reliable" and "does not seem to be working at all" for some users.

**How to avoid:**
- Use `max_call_duration_ms` as the hard ceiling — always. Set it to 180,000 ms (3 min) in the `create-phone-call` call parameters, not just the agent config.
- Add a prompt-level nudge as a soft guide (e.g., "Keep your responses concise, aiming to complete the conversation within 2–3 minutes"), but treat this as user experience guidance only, not cost protection.
- Do not mention specific minute counts in the prompt — agents often interpret them literally and end the call mid-sentence. Instead, prompt for conversation completion signals: "Once you've answered the caller's question and invited them to book, offer a warm farewell and end the call."

**Warning signs:**
- Call durations vary wildly (some 30 seconds, some 8 minutes) with no `max_call_duration_ms` set.
- Transcripts show agent ending mid-sentence or abruptly at odd moments.
- Costs per call inconsistent — no floor or ceiling on duration.

**Phase to address:** Agent provisioning and prompt design phase. Lock `max_call_duration_ms` in setup script before any other testing.

---

### Pitfall 6: Single-Prompt Agent Fails to Handle Two-Path Demo Reliably

**What goes wrong:**
The planned agent has two paths: "simulated PI intake" and "Kenstera Q&A." When stuffed into a single large prompt, the agent frequently chooses the wrong path, switches mid-call, blends the two, or goes off-script into neither. Retell's own documentation warns against single-prompt agents with more than 3–4 conditional paths.

**Why it happens:**
The LLM tries to satisfy all instructions simultaneously. When the conversation gets ambiguous (caller doesn't respond clearly to the branching question), the model interpolates between paths rather than following a deterministic branch. Callers who don't know they're supposed to choose get confused and hang up.

**How to avoid:**
- Keep the branching question simple and in the `begin_message` greeting: ask callers to say "demo" for the intake simulation or "info" for questions about Kenstera. Name the paths explicitly.
- If inconsistency persists in testing, switch to Retell's Conversation Flow (node-based) architecture — it offers deterministic tool calling and predictable path transitions.
- Limit total prompt length for the single-prompt approach to under 3,500 tokens (prompts over this threshold incur extra charges and degrade coherence).
- Include explicit "exclusion" instructions: "Do not discuss topics outside these two paths. If the caller asks about anything else, politely redirect them."

**Warning signs:**
- Test calls result in the agent starting one path and switching partway through.
- Agent answers questions from the wrong demo context (e.g., gives PI legal advice during the Kenstera Q&A path).
- Prompt length approaching 3,500 tokens — every instruction beyond this is less reliable.

**Phase to address:** Prompt engineering phase. Test both paths with 10+ simulated calls before considering the agent ready.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skipping server-side phone number validation (relying on client-side only) | Faster form implementation | IRSF fraud exposure; non-US calls trigger 400 errors from Retell silently | Never — validate E.164 and `+1` country code server-side always |
| Hardcoding Retell agent ID / phone number ID in source | No env var setup needed | IDs become stale after reprovisioning; committed secrets in git history | Never — always use environment variables |
| Relying on reCAPTCHA v3 client-side score only (not verifying token server-side) | Simpler backend | Token can be replayed or forged client-side; abuse protection is theater | Never — always verify token with Google's verify endpoint server-side |
| Setting `max_call_duration_ms` only at agent level, not per-call | One config to manage | Agent version mismatch bypasses the limit entirely | Never — set at call creation level as well |
| Skipping TCPA consent checkbox for "speed" | Faster form to launch | Legal exposure $500–$1,500/call; class action risk | Never — non-negotiable before any public launch |
| Using a single Redis key for rate limiting instead of sliding window | Simpler implementation | Fixed window can be gamed (burst at window boundary); 2x normal rate briefly allowed | Acceptable for v1 if burst risk is low, but upgrade to sliding window before significant traffic |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Retell API — `create-phone-call` | Passing `to_number` without E.164 format (`+1` prefix) — causes 400 error | Normalize phone number to E.164 server-side before sending; strip spaces, dashes, parentheses |
| Retell API — agent versions | Assuming publishing a new agent version auto-updates the phone number binding | After every agent update, explicitly re-bind the phone number to the updated version via API or dashboard |
| Retell API — `max_call_duration_ms` | Setting it only on the agent, not on the `create-phone-call` request | Pass `max_call_duration_ms: 180000` explicitly in every `create-phone-call` API call body |
| reCAPTCHA v3 | Only checking score client-side or skipping verification entirely | Always POST the reCAPTCHA token to your Next.js API route and verify against Google's `siteverify` endpoint; reject scores below 0.5 |
| Upstash Redis rate limiting | Using a fixed window (resets hard at boundary) — attackers burst at the reset | Use `Ratelimit.slidingWindow()` from `@upstash/ratelimit` for smoother enforcement |
| Upstash Redis on Vercel | Ephemeral cache causes rate limit checks to fail silently on every request | Disable ephemeral cache for Upstash Redis client or use the `@upstash/ratelimit` adapter correctly in Edge runtime |
| Retell API — `retell_llm_dynamic_variables` | Passing non-string values (numbers, booleans) | All dynamic variable values must be strings — convert before passing |
| Retell phone numbers | Expecting to call non-US numbers with Retell-purchased numbers | Retell-purchased numbers are US-destination-only; validate `+1` country code server-side before attempting the call |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No rate limiting on the demo form API route | Legitimate traffic spike (e.g., Product Hunt launch) triggers hundreds of calls; Retell 429 errors cascade | Implement rate limiting before launch; set concurrency expectations against Retell's 20 concurrent call default limit | At ~20+ simultaneous form submissions |
| Retell concurrency limit (20 concurrent calls on Pay-As-You-Go) | Form submissions succeed (200 response) but calls silently queue or fail; users get no call | Monitor Retell dashboard for rejected calls; upgrade plan if expecting launch spikes | At exactly 20 simultaneous calls — burst mode adds $0.10/min surcharge |
| Long agent prompt degrading response latency | First agent response takes 3–5 seconds, users hang up thinking the call is broken | Keep prompt under 2,500 tokens; use knowledge base for FAQs rather than stuffing facts into the prompt | Any prompt over ~3,000 tokens — noticeable latency increase |
| No call-end webhook logging | No visibility into why calls ended, duration, or whether the agent behaved correctly | Register a `call_ended` webhook endpoint in your Retell agent config pointing to a Next.js route that logs to console/Upstash | On day 1 — you'll have no debugging data without it |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Returning Retell `call_id` or `agent_id` in the form submission API response | Enables targeted abuse of specific calls; exposes internal IDs | Return only `{ success: true }` — never expose Retell IDs client-side |
| No server-side reCAPTCHA validation | reCAPTCHA is decoration only; bots can POST directly to your API route and bypass it entirely | Verify token against `https://www.google.com/recaptcha/api/siteverify` before processing any form submission |
| Rate limiting by IP only (not by phone number) | Attacker rotates IPs (VPN/proxy) while targeting the same set of premium fraud numbers | Rate limit by both IP AND destination phone number; a number receiving more than 1 call per 24h is blocked |
| No billing alert configured | IRSF attack runs undetected for hours before manual check | Set a Retell billing threshold alert — $20/day is reasonable for a demo that costs ~$0.10/call at 3 min |
| Logging full phone numbers in plaintext in server logs | PII exposure; CCPA risk | Hash or truncate phone numbers in logs: log last 4 digits only for debugging |
| Missing TCPA consent checkbox | Legal liability per call | Non-pre-checked checkbox with explicit AI call consent language is required before public launch |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No feedback after form submit — user doesn't know what to expect | Users think the form broke; they refresh and submit again (double call, double cost) | Show a clear post-submit state: "Your call is on the way — check your phone in the next 30 seconds." Disable the submit button after one click. |
| Call goes to voicemail — agent leaves a confused message or loops | Caller hears an awkward voicemail that damages brand trust | Add voicemail detection handling in the agent prompt: "If greeted by voicemail, say 'Hi, this is Kenstera's AI demo calling back. Visit kenstera.com to schedule a live call.' then end the call immediately." |
| Agent greeting is too long before the caller gets to act | Callers hang up during the greeting — Retell shows completed call, but no engagement | Keep `begin_message` under 2 sentences. Front-load the value proposition and choice prompt. |
| Form requires exact phone format — users enter "(555) 555-5555" and it fails | Form error with no explanation; abandonment | Use a phone input component that auto-formats to E.164 client-side (e.g., `libphonenumber-js`); normalize server-side as a second pass |
| No "what to expect" copy near the form | Users don't enter their number — fear of spam | Add 1–2 lines of copy: "You'll receive a call from a US number within 30 seconds. The demo lasts about 2 minutes." |
| Agent offers both paths equally with no default nudge | Callers who don't know which to choose say nothing; awkward silence; call stalls | Make one path the default ("Most visitors choose the intake demo — say 'demo' to start, or 'info' if you'd like to ask about Kenstera") |

---

## "Looks Done But Isn't" Checklist

- [ ] **max_call_duration_ms:** Set at both the agent level AND in every `create-phone-call` API call — verify with a test call that it actually terminates at 3 minutes, not at the 1-hour default.
- [ ] **reCAPTCHA validation:** Token is verified server-side via Google's `siteverify` endpoint (not just parsed client-side) — check with a forged token to confirm rejection.
- [ ] **Phone number validation:** `+1` country code is enforced server-side before the Retell API is called — test with a UK number format to confirm 400 is returned before any call is placed.
- [ ] **Rate limiting:** Both IP-based AND phone-number-based buckets are active — verify by submitting the form twice with the same phone number and confirming the second is rejected.
- [ ] **TCPA consent:** Non-pre-checked checkbox is present, consent is logged with timestamp and IP at call creation, and the agent greeting includes company identification.
- [ ] **API key isolation:** `RETELL_API_KEY` is not prefixed `NEXT_PUBLIC_` — run `grep -r "NEXT_PUBLIC_RETELL" .` in the project root to confirm.
- [ ] **Agent version binding:** After any agent update, confirm the phone number references the new version — place a test call and check the version shown in the Retell call detail.
- [ ] **Voicemail handling:** Test by calling a number that goes to voicemail — confirm the agent doesn't loop or leave a confusing message.
- [ ] **Post-submit UI state:** Submit button disables after click and shows a clear "call incoming" state — prevents double submission.
- [ ] **Billing alert configured:** Retell account has a daily spend alert set — do not rely on end-of-month billing to detect abuse.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| IRSF toll fraud attack discovered | HIGH | 1. Disable the API route immediately (return 503). 2. Rotate Retell API key. 3. Contact Retell support to dispute fraudulent calls — document all evidence. 4. Review Redis logs to establish attack timeline. 5. Re-enable with all validation layers confirmed. |
| API key exposed in client bundle | HIGH | 1. Rotate key in Retell dashboard immediately. 2. Audit Retell dashboard for unauthorized calls since exposure. 3. Remove key from client code. 4. Force redeploy. 5. Add `grep` to CI to fail on `NEXT_PUBLIC_RETELL`. |
| Agent calls running over duration (version mismatch) | MEDIUM | 1. Identify which agent version the phone number is bound to. 2. Re-bind to correct version. 3. Add `max_call_duration_ms` to `create-phone-call` level (bypasses version mismatch permanently). 4. Terminate any active runaway calls via Retell dashboard. |
| TCPA compliance gap found after launch | HIGH | 1. Pause public access to the form. 2. Add consent checkbox and server-side logging immediately. 3. Do not re-enable until legal review confirms compliance. |
| Upstash Redis rate limiting failing silently | MEDIUM | 1. Add logging to every rate limit check to confirm it's executing. 2. Verify Redis connection string and region match. 3. Check for ephemeral cache conflict on Vercel. 4. Test rate limit bypass manually (submit form 5× rapidly). |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| max_call_duration_ms version mismatch | Agent provisioning setup script | Place a test call and let it run — confirm it terminates at 3 minutes, not 60 |
| IRSF toll fraud via form | API route implementation | Submit form with a non-US number (+44...) — confirm 400 returned, no call placed |
| Retell API key exposure | API route implementation (first commit) | `grep -r "NEXT_PUBLIC_RETELL" .next/static/` returns empty |
| FCC/TCPA consent missing | Form component implementation | Checkbox is present, non-pre-checked, and submission is rejected without it |
| Prompt-only duration control | Prompt engineering / agent config | Remove max_call_duration_ms temporarily in test, confirm prompt alone doesn't enforce time |
| Single-prompt two-path agent inconsistency | Prompt engineering + QA | Run 15 test calls across both paths; confirm correct path is chosen each time |
| IRSF — rate limiting | API route implementation | Submit same phone number twice in 60 seconds — confirm second is 429'd |
| Voicemail UX failure | QA / testing phase | Call a number that goes to voicemail; check transcript for graceful handling |
| Double form submission | Frontend form component | Rapidly double-click submit; confirm only one call is created |
| No call-end observability | API route implementation | Verify `call_ended` webhook fires and logs to server after every test call |

---

## Sources

- Retell AI — Prevent Abuse documentation: https://docs.retellai.com/reliability/prevent-abuse
- Retell AI — Outbound Call API reference: https://docs.retellai.com/deploy/outbound-call
- Retell AI — Create Phone Call API: https://docs.retellai.com/api-references/create-phone-call
- Retell AI — Concurrency & Limits: https://docs.retellai.com/deploy/concurrency
- Retell AI — Prompt Engineering Guide: https://docs.retellai.com/build/prompt-engineering-guide
- Retell AI Community — max_call_duration_ms bug thread: https://community.retellai.com/t/bug-max-call-duration-ms-not-being-enforced/391
- Retell AI Community — call duration cost control discussion: https://community.retellai.com/t/how-to-get-a-desired-call-duration-to-control-costs/293
- Retell AI — Toll Fraud Prevention blog: https://www.retellai.com/blog/prevent-toll-fraud-on-your-ai-voice-agents-with-retell-ai
- Retell AI — Troubleshooting Voice Agent Issues: https://www.retellai.com/blog/troubleshooting-common-issues-in-voice-agent-development
- Retell AI — Hallucination Guide: https://www.retellai.com/blog/the-ultimate-guide-to-ai-hallucinations-in-voice-agents-and-how-to-mitigate-them
- Retell AI — Prompt-Based vs Conversation Flow: https://www.retellai.com/blog/prompt-based-vs-conversational-pathways-choosing-the-right-approach
- OptimizeSmart — Toll Fraud in Retell AI: https://optimizesmart.com/blog/how-to-prevent-toll-fraud-in-retell-ai/
- FCC/TCPA 2025 consent requirements: https://www.ringly.io/blog/is-your-ai-phone-agent-breaking-the-law-5-rules-you-need-to-know-2025
- FCC AI robocall rules summary: https://www.kixie.com/sales-blog/ai-powered-robocalls-in-2025-a-guide-to-the-new-rules/
- TCPA compliant consent form patterns: https://activeprospect.com/blog/tcpa-consent/
- Upstash rate limiting for Next.js: https://upstash.com/blog/nextjs-ratelimiting
- AI Voice Agent common mistakes: https://callrounded.com/blog/mistakes-to-avoid-ai-voice-agent

---
*Pitfalls research for: Retell AI phone demo integration on Kenstera homepage*
*Researched: 2026-02-21*
