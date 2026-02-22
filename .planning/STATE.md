# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** Prospective clients feel the AI intake experience on their own phone before buying
**Current focus:** Phase 5 — Verification

## Current Position

Phase: 5 of 5 (Verification) — IN PROGRESS
Plan: 1 of 2 in phase (complete) — Plan 01 done: SEC-01 key-leak check PASSED
Status: Phase 5 Plan 01 complete — production build passes SEC-01, VERIFICATION.md created with Tests 2-5 templated. Ready for Phase 5 Plan 02 (manual browser tests).
Last activity: 2026-02-22 — Phase 5 Plan 01: production build SEC-01 key-leak check passed, VERIFICATION.md checklist created

Progress: [█████████░] 90%

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: ~14 min
- Total execution time: ~71 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-provisioning | 1 | ~45 min | ~45 min |
| 02-secure-api-route | 2 | ~17 min | ~8 min |
| 03-agent-prompt | 2 | ~55 min | ~27 min |
| 04-form-ui | 2 | ~33 min | ~16 min |
| 05-verification | 1 | ~3 min | ~3 min |

**Recent Trend:**
- Last 5 plans: 02-02 (~15 min), 03-01 (~4 min), 03-02 (~50 min), 04-01 (~17 min), 05-01 (~3 min)
- Trend: Fast code plans; iterative voice QA plans take longer due to human test loop

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
- [Phase 05-01]: Key prefix key_ba8f (first 8 chars of RETELL_API_KEY) used for value-leak check — confirmed absent from .next/static/ after production build
- [Phase 05-01]: SEC-01 verified empirically: both string name and key value prefix absent from all client bundles; server bundle legitimately contains key reference

## Session Continuity

Last session: 2026-02-22
Stopped at: Completed 05-01-PLAN.md — production build passes SEC-01 key-leak check, VERIFICATION.md created with Tests 2-5 templated. Next: Phase 5 Plan 02 (manual browser verification).
Resume file: None
