# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** Prospective clients feel the AI intake experience on their own phone before buying
**Current focus:** Phase 5 — Verification

## Current Position

Phase: 4 of 5 (Form UI) — COMPLETE
Plan: 2 of 2 in phase (complete) — Phase 4 fully done
Status: Phase 4 complete — DemoForm live on homepage, user-approved design. Ready for Phase 5 (Verification).
Last activity: 2026-02-21 — Phase 4 Plan 02: DemoForm on homepage, orb redesign, reCAPTCHA removed, user-approved

Progress: [████████░░] 80%

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: ~23 min
- Total execution time: ~68 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-provisioning | 1 | ~45 min | ~45 min |
| 02-secure-api-route | 2 | ~17 min | ~8 min |
| 03-agent-prompt | 2 | ~55 min | ~27 min |

**Recent Trend:**
- Last 5 plans: 01-01 (~45 min), 02-01 (~2 min), 02-02 (~15 min), 03-01 (~4 min), 03-02 (~50 min)
- Trend: Fast code plans; iterative voice QA plans take longer due to human test loop

| 04-form-ui | 2 | ~33 min | ~16 min |

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Roadmap: 5 phases derived from strict dependency chain — provisioning must precede API route must precede agent must precede UI must precede verification
- Research: Set `max_call_duration_ms: 180000` at the per-call level, not only at the agent level (agent version mismatch pitfall)
- Research: Validate `react-google-recaptcha-v3` React 19 peer dep compatibility at start of Phase 2; swap to `next-recaptcha-v3` if needed
- Research: TCPA consent log should use existing leads persistence layer (durable), not Redis (TTL-based)
- [Phase 01-01]: Use gpt-4.1 model (not gpt-4o which was deprecated on Retell in early 2026)
- [Phase 01-01]: Do NOT set max_call_duration_ms on agent — set per-call in Phase 2 (avoids agent version mismatch)
- [Phase 01-01]: tsconfig.scripts.json with node16 moduleResolution avoids bundler conflict with tsx
- [Phase 01-01]: LLM idempotency via retrieve() by stored ID — llm.list() does not return llm_name field on Retell API
- [Phase 01-01]: Voice changed to 11labs-Marissa (11labs-Matilda not available on Retell)
- [Phase 01-01]: Scripts must manually parse .env.local (tsx does not auto-load env files)
- [Phase 02-01]: reCAPTCHA score threshold 0.3 (below 0.5 default) to reduce false rejections for mobile users on low-stakes demo form
- [Phase 02-01]: retryAfter field in 429 responses (seconds until reset) for Phase 4 UX-05 retry countdown compatibility
- [Phase 02-01]: MAX_CALL_DURATION_MS=180000 at agent_override.agent per-call level — not agent-level — to avoid Retell agent version mismatch
- [Phase 02-02]: Lazy Proxy pattern for Ratelimit instances — defer getRedis() to first .limit() call to prevent build-time throw when UPSTASH env vars are absent
- [Phase 02-02]: tsconfig.json excludes scripts/ to suppress pre-existing llm_name type error in setup-retell.ts (has own tsconfig.scripts.json)
- [Phase 03-agent-prompt]: Single-path intake only — no Q&A/pitch path (per CONTEXT.md decision)
- [Phase 03-agent-prompt]: end_call tool uses static_text execution_message_type for predictable sign-off
- [Phase 03-agent-prompt]: voicemail_option uses action: { type: 'hangup' } (SDK shape confirmed from retell-sdk types)
- [Phase 03-agent-prompt]: Retell agent.retrieve() does not echo enable_voicemail_detection field — presence of voicemail_option in response is the confirmation signal
- [Phase 03-02]: Voice changed to minimax-Cimo (speech-02-turbo) at speed 1.1 with call-center ambient sound at 0.8 — tested better than 11labs-Marissa in live calls
- [Phase 03-02]: Kenstera pronunciation hint in prompt: "Ken-steh-rah" — prevents TTS mispronunciation
- [Phase 03-02]: Em dashes banned from Kate prompt via explicit style rule — TTS engines produce audible artifacts on em dashes
- [Phase 03-02]: Voice agent QA requires real test calls — Retell dashboard simulation does not equal live call audio quality
- [Phase 04-form-ui]: ReCaptchaProvider wraps LayoutWrapper as server component leaf in Next.js App Router — valid pattern, no 'use client' needed on layout.tsx
- [Phase 04-form-ui]: DemoForm button disabled only during formState === 'submitting' — re-enables on error so user can retry without page refresh (UX-04)
- [Phase 04-form-ui]: executeRecaptcha called inside handleSubmit before fetch (not on mount) to prevent 2-minute token expiry
- [Phase 04-02]: reCAPTCHA removed entirely — user decision, demo lead form friction not worth protection complexity
- [Phase 04-02]: Two-card layout: orb animation card (desktop only) + form card — orb hidden on mobile, heading moves into form card
- [Phase 04-02]: Underline-only inputs (border-b, no box) chosen over boxed inputs for cleaner white-card look
- [Phase 04-02]: industry dropdown and "Back to Agent" link removed — name + phone + email sufficient for outbound demo call

### Pending Todos

None.

### Blockers/Concerns

- Phase 3 (Agent Prompt): Retell Conversation Flow as fallback if single-prompt two-path approach proves unreliable. Flag for plan-phase.
- Phase 4 (Demo UI): reCAPTCHA v3 + React 19 compatibility was LOW confidence — RESOLVED: next-recaptcha-v3@1.5.3 installed and works with React 19 / Next.js 16 without peer dep issues.

## Session Continuity

Last session: 2026-02-21
Stopped at: Completed 04-02-PLAN.md — DemoForm live on homepage, animated orb design, reCAPTCHA removed, user-approved. Next: Phase 5 (Verification).
Resume file: None
