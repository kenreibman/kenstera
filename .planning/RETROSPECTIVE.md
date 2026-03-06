# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-05
**Phases:** 5 | **Plans:** 9

### What Was Built
- Idempotent Retell AI provisioning script (LLM, agent, phone number)
- Secure API route with rate limiting (IP + phone), phone validation, consent logging
- Kate intake agent — car accident PI intake simulation with abuse detection and graceful wrap-up
- DemoForm component with animated orb design, all UX states (loading, success, rate limit, validation error)
- Full production verification: API key leak check, browser-based security control testing

### What Worked
- Strict sequential dependency chain (provisioning -> API -> agent -> UI -> verification) prevented integration surprises
- Research phase before each plan caught critical pitfalls early (e.g., per-call vs agent-level call duration cap, Retell API quirks)
- Human checkpoint plans (curl testing, live test calls, browser verification) caught issues code-only testing would miss
- Coarse granularity (5 phases) kept overhead low for a focused feature

### What Was Inefficient
- Agent prompt QA required multiple real test calls (~50 min for Phase 3 Plan 2) — unavoidable for voice but worth noting
- reCAPTCHA was fully integrated then fully removed (Phase 4) — decision could have been made earlier in questioning
- PROJECT.md Key Decisions were all "Pending" throughout — should have been updated as decisions were made

### Patterns Established
- Lazy Proxy pattern for environment-dependent singletons (prevents build-time throws)
- tsconfig.scripts.json for script files that need different module resolution than the app
- Em dash ban in TTS prompts — TTS engines produce artifacts on em dashes
- Per-call agent_override for call duration instead of agent-level setting (avoids Retell version mismatch)

### Key Lessons
1. Voice agent QA cannot be simulated — real test calls are the only reliable verification method
2. reCAPTCHA decisions should be made during questioning, not after integration — removal cost was low here but could be expensive
3. Retell API has undocumented quirks (llm.list() missing fields, agent.retrieve() not echoing all settings) — always verify via API response, not docs alone
4. Production build verification (grepping .next/static/ for secrets) is cheap and should be standard for any project with API keys

### Cost Observations
- Model mix: 100% sonnet (balanced profile)
- Total execution: ~168 min across 9 plans
- Notable: Verification phases (05-01, 05-02) were fastest (~18 min combined) — high ROI for confidence gained

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 5 | 9 | Strict sequential chain, coarse granularity, human checkpoints |

### Top Lessons (Verified Across Milestones)

1. Voice/telephony features require real-device testing — simulations are insufficient
2. Security verification in production builds is cheap and high-value
