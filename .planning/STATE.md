# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** Prospective clients feel the AI intake experience on their own phone before buying
**Current focus:** Phase 2 — Secure API Route

## Current Position

Phase: 2 of 5 (Secure API Route)
Plan: 1 of 1 in current phase
Status: Phase complete — ready for Phase 3
Last activity: 2026-02-21 — Phase 2 Plan 01 complete: POST /api/demo-call with full security pipeline

Progress: [████░░░░░░] 40%

## Performance Metrics

**Velocity:**
- Total plans completed: 1
- Average duration: ~45 min
- Total execution time: ~45 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-provisioning | 1 | ~45 min | ~45 min |
| 02-secure-api-route | 1 | ~2 min | ~2 min |

**Recent Trend:**
- Last 5 plans: 01-01 (~45 min), 02-01 (~2 min)
- Trend: Fast execution — well-researched plan

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

### Pending Todos

None.

### Blockers/Concerns

- Phase 3 (Agent Prompt): Retell Conversation Flow as fallback if single-prompt two-path approach proves unreliable. Flag for plan-phase.
- Phase 2 (API Route): reCAPTCHA v3 + React 19 compatibility is LOW confidence — validate early.

## Session Continuity

Last session: 2026-02-21
Stopped at: Completed 02-01-PLAN.md (Secure API Route — POST /api/demo-call with full security pipeline)
Resume file: None
