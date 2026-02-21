# Phase 1: Provisioning - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

One-time setup script (`npm run setup:retell`) that provisions the Retell LLM response engine, voice agent, and phone number via API — then writes their IDs to `.env.local`. Must be idempotent. Produces the env vars every other phase depends on.

</domain>

<decisions>
## Implementation Decisions

### Agent voice & LLM model
- LLM: GPT-4o — battle-tested with Retell, lowest latency for real-time voice
- Voice: Professional female — warm, confident, polished (legal intake specialist feel)
- Hardcode a good default voice from Retell's library (no interactive voice picker at runtime)
- Must sound like a real call center agent — realistic, not robotic (reference: Retell's own website demo quality)
- Researcher should investigate which specific Retell voice (ElevenLabs, Retell custom, etc.) best matches this quality bar

### Phone number selection
- Local number with a New York area code (212, 646, 917, 347, 929)
- Try all NYC area codes — take whichever is available
- Caller ID should display "Kenstera" (researcher to verify CNAM support on Retell's telephony provider)

### Agent initial config
- Natural interruption handling — caller can cut in anytime, agent yields immediately
- Quick/snappy response latency — responds almost immediately after caller stops talking
- English only
- No filler words — clean, direct, professional tone (like a trained receptionist, not casual)

### Claude's Discretion
- Exact Retell voice ID selection (within the "professional female, realistic" constraint)
- Script output formatting and progress feedback
- Idempotency detection strategy (name lookup, env var check, etc.)
- Error handling and partial failure recovery
- `.env.local` merge strategy (append vs overwrite)

</decisions>

<specifics>
## Specific Ideas

- "I want the voice to be realistic. If you call retellai.com's actual demo, the agent sounds like it's at a call center, and sounds real." — This is the quality bar.
- Caller ID showing "Kenstera" on the recipient's phone — investigate feasibility via CNAM registration.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-provisioning*
*Context gathered: 2026-02-21*
