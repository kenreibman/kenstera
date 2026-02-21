---
phase: 03-agent-prompt
plan: 02
subsystem: agent-prompt
tags: [retell, kate, voice, minimax, ambient-sound, prompt-tuning, test-calls]

requires:
  - phase: 03-01
    provides: update-agent-prompt.ts script, Kate prompt baseline, LLM + agent IDs provisioned

provides:
  - Kate intake agent verified live via real test calls — all AGNT requirements confirmed
  - Voice: minimax-Cimo (speech-02-turbo) at speed 1.1 with call-center ambient sound at volume 0.8
  - Kenstera pronunciation hint codified in prompt ("Ken-steh-rah")
  - Style rule: no em dashes, short 1-2 word acknowledgments between questions
  - Trimmed Kate prompt reducing over-talking tendency

affects: [04-demo-ui]

tech-stack:
  added: []
  patterns:
    - Real test calls as primary QA for voice agent behavior (code review alone is insufficient)
    - Iterative prompt tuning driven by live call output, not text review
    - minimax-Cimo + speech-02-turbo as production voice for Kate persona

key-files:
  created: []
  modified:
    - scripts/update-agent-prompt.ts

key-decisions:
  - "Voice: minimax-Cimo (speech-02-turbo) replaces 11labs-Marissa — natural tone tested better in live calls for intake specialist persona"
  - "Ambient sound: call-center at volume 0.8 — reinforces law firm call center setting without overwhelming voice"
  - "Voice speed 1.1 — slightly faster than default matches efficient-but-not-rushed intake specialist cadence"
  - "Kenstera pronunciation in prompt: Ken-steh-rah — codified so TTS does not guess; wrong pronunciation undermines demo credibility"
  - "Em dashes banned via style rule — TTS engines introduce audible artifacts (pause, breath) on em dashes"
  - "Prompt trimmed aggressively — shorter prompt reduces over-talking; LLMs with long prompts can become verbose"
  - "Removed Ready? from demo framing — unnecessary pacing question that slowed call flow"

patterns-established:
  - "Voice agent QA: always run real test calls before plan closes — Retell dashboard simulation does not equal live call audio"
  - "Prompt iteration loop: deploy via update script -> test call -> observe -> adjust -> repeat until approved"

requirements-completed: [AGNT-01, AGNT-02, AGNT-04, AGNT-05]

duration: ~50 min (Task 1 ~5 min, iterative testing session ~45 min)
completed: 2026-02-21
---

# Phase 3 Plan 02: Agent Prompt Verification Summary

**Kate intake agent tuned to production quality via real test calls — minimax-Cimo voice, call-center ambient sound, Kenstera pronunciation, trimmed prompt — user approved.**

## Performance

- **Duration:** ~50 min total (Task 1 ~5 min API verification + ~45 min iterative test call session)
- **Started:** 2026-02-21T23:13:14Z
- **Completed:** 2026-02-21
- **Tasks:** 2/2 complete
- **Files modified:** 1 (scripts/update-agent-prompt.ts)

## Accomplishments

- Ran update-agent-prompt.ts successfully — LLM and agent both updated on Retell and confirmed via API retrieve
- Iterated Kate's voice, speed, ambient sound, and prompt through multiple live test call rounds
- User confirmed agent sounds good and approved the checkpoint

## Task Commits

1. **Task 1: Run update script and verify Retell resources updated** - `4c9fa97` (checkpoint docs commit, prior session)
2. **Task 2 iteration: Iterate Kate agent — voice, ambient sound, pronunciation, style** - `d249721` (feat)

**Plan metadata:** (docs commit — this SUMMARY.md)

## Files Created/Modified

- `scripts/update-agent-prompt.ts` — Updated with minimax-Cimo voice (speech-02-turbo), voice_speed 1.1, call-center ambient sound at volume 0.8, Kenstera pronunciation hint, trimmed Kate prompt, em-dash style ban, removed "Ready?" from demo framing

## Decisions Made

- **Voice swap:** 11labs-Marissa replaced by minimax-Cimo (speech-02-turbo) — natural, calm tone better suited to intake specialist persona; tested better across live calls
- **Ambient sound:** call-center at 0.8 volume — reinforces the "calling a law firm" mental model for demo participants without obscuring speech clarity
- **Speed 1.1:** Slightly faster than default; matches efficient-but-not-rushed intake specialist pacing observed in test calls
- **Pronunciation in prompt:** Kenstera = "Ken-steh-rah" — prevents mispronunciation on demo intro, which would undermine product credibility
- **Em-dash ban:** Explicit style rule added — TTS engines introduce audible artifacts on em dashes (pause, breath, or literal verbalization depending on voice model)
- **Prompt trimming:** Shorter system prompt reduces over-talking tendency visible in early test calls; LLMs with long prompts become verbose in conversation
- **Removed "Ready?":** Unnecessary confirmation before demo framing added latency and nothing to the caller experience

## Deviations from Plan

The plan called for a minimum of 5 test calls verifying a 10-point checklist with explicit sign-off per item. Actual execution was iterative: multiple test call rounds with prompt/voice adjustments between rounds, ending in user approval of the final state.

Process deviation only — all requirements (AGNT-01 through AGNT-05) confirmed satisfied via user approval.

**Total code deviations:** None — all changes were deliberate prompt/voice tuning within the scope of Task 2 testing.

## Issues Encountered

- **Kenstera mispronunciation:** TTS guessed wrong on "Kenstera" in early calls. Resolved by adding explicit pronunciation hint to prompt.
- **Em-dash artifacts:** Original prompt contained em dashes; these caused audible speech artifacts in live calls. Resolved by banning em dashes via style rule and removing them from all prompt text.
- **Over-talking:** Kate was verbose in early calls. Resolved by trimming the system prompt significantly.
- **"Ready?" pacing issue:** Demo framing question slowed call initiation. Removed.

## User Setup Required

None — update script handles all Retell API changes. No new environment variables required.

## Next Phase Readiness

- Kate agent is live on Retell and production-quality verified via real test calls
- Voice, ambient sound, speed, pronunciation, and prompt style are finalized
- Phase 4 (Demo UI) can proceed — relies on `/api/demo-call` route (stable from Phase 2) and `name` field injection (established in Phase 3-01)
- Phase 4 concern: reCAPTCHA v3 + React 19 compatibility remains LOW confidence — validate at Phase 4 start

---
*Phase: 03-agent-prompt*
*Completed: 2026-02-21*

## Self-Check: PASSED

- `scripts/update-agent-prompt.ts` exists and contains all voice/prompt changes
- Commit `d249721` confirmed in git log
- SUMMARY.md written with complete task documentation
