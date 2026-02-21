# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** Prospective clients feel the AI intake experience on their own phone before buying
**Current focus:** Phase 3 — Agent Prompt

## Current Position

Phase: 3 of 5 (Agent Prompt)
Plan: 1 of 1 in current phase
Status: Phase 3 Plan 01 complete — Kate prompt live, route updated
Last activity: 2026-02-21 — Phase 3 Plan 01 complete: Kate prompt + voicemail detection + name field in route

Progress: [█████░░░░░] 55%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: ~21 min
- Total execution time: ~62 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-provisioning | 1 | ~45 min | ~45 min |
| 02-secure-api-route | 2 | ~17 min | ~8 min |
| 03-agent-prompt | 1 | ~4 min | ~4 min |

**Recent Trend:**
- Last 5 plans: 01-01 (~45 min), 02-01 (~2 min), 02-02 (~15 min), 03-01 (~4 min)
- Trend: Fast execution on well-researched plans

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

### Pending Todos

None.

### Blockers/Concerns

- Phase 3 (Agent Prompt): Retell Conversation Flow as fallback if single-prompt two-path approach proves unreliable. Flag for plan-phase.
- Phase 4 (Demo UI): reCAPTCHA v3 + React 19 compatibility is LOW confidence — validate at Phase 4 start.

## Session Continuity

Last session: 2026-02-21
Stopped at: Completed 03-01-PLAN.md (Kate prompt + voicemail detection + route name field + 120s cap)
Resume file: None
