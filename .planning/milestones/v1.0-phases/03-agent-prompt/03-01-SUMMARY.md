---
phase: 03-agent-prompt
plan: 01
subsystem: agent-prompt
tags: [retell, llm, prompt, kate, voicemail, dynamic-variables]
dependency_graph:
  requires: [02-02]
  provides: [AGNT-01, AGNT-02, AGNT-04, AGNT-05]
  affects: [app/api/demo-call/route.ts, scripts/update-agent-prompt.ts]
tech_stack:
  added: []
  patterns:
    - retell-sdk LLM update with general_tools end_call
    - retell_llm_dynamic_variables for per-call caller name injection
    - voicemail_option with action.type hangup via agent.update
key_files:
  created:
    - scripts/update-agent-prompt.ts
  modified:
    - app/api/demo-call/route.ts
decisions:
  - "Single-path intake simulation only — no Q&A/pitch path (per CONTEXT.md)"
  - "end_call tool uses static_text execution_message_type for predictable sign-off"
  - "voicemail_option uses action: { type: 'hangup' } (SDK shape, not voicemail_action string)"
  - "default_dynamic_variables caller_name='there' as fallback if name not passed"
  - "MAX_CALL_DURATION_MS reduced from 180_000 to 120_000 per Phase 3 context decision"
metrics:
  duration: ~4 min
  completed: 2026-02-21
  tasks_completed: 2
  files_changed: 2
---

# Phase 3 Plan 01: Agent Prompt Summary

**One-liner:** Kate intake specialist prompt with end_call tool, caller name injection via retell_llm_dynamic_variables, voicemail hangup, and 120s hard cap.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create update-agent-prompt.ts with Kate persona prompt | 110c047 | scripts/update-agent-prompt.ts (new, 186 lines) |
| 2 | Modify API route: name field, dynamic variables, 120s cap | 1f28847 | app/api/demo-call/route.ts |

## What Was Built

### scripts/update-agent-prompt.ts
A new update script following the same pattern as `setup-retell.ts` (manual .env.local parsing, local Retell client instance, tsx execution):

- **Step 1/2 — LLM update:** Sets `begin_message` ("Hi, my name is Kate, I'm looking to speak with {{caller_name}}."), full Kate prompt in `general_prompt`, model `gpt-4.1`, `start_speaker: 'agent'`, `default_dynamic_variables: { caller_name: 'there' }`, and one `end_call` general tool with `speak_during_execution: true` and `static_text` execution message.
- **Step 2/2 — Agent update:** Sets `enable_voicemail_detection: true`, `voicemail_option: { action: { type: 'hangup' } }`, and `voicemail_detection_timeout_ms: 30_000`.

Run command: `npx tsx --tsconfig tsconfig.scripts.json scripts/update-agent-prompt.ts`

### app/api/demo-call/route.ts
Three surgical changes:
1. `MAX_CALL_DURATION_MS` reduced from `180_000` to `120_000`
2. `name: z.string().min(1).max(100)` added to `bodySchema`
3. `retell_llm_dynamic_variables: { caller_name: name }` added to `createPhoneCall` call

All existing security controls (reCAPTCHA, rate limiting, consent logging) unchanged.

### Kate Prompt Coverage
- **AGNT-01 (greeting):** Satisfied — Kate opens with phone screening line, then demo framing mentioning Kenstera once
- **AGNT-02 (intake questions):** Satisfied — 4 questions: what happened, when, injuries, fault/liability
- **AGNT-03 (Q&A path):** Satisfied by single-path design per CONTEXT.md — no menu, default into intake
- **AGNT-04 (guardrails):** Satisfied — off-topic escalation (2-strike), abusive language (immediate), jailbreak (treated as off-topic)
- **AGNT-05 (graceful wrap-up):** Satisfied — "That's the end of the demo. Thanks for taking the time." then `end_call`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed voicemail_option shape mismatch**
- **Found during:** Task 1 TypeScript compilation
- **Issue:** Plan specified `voicemail_option: { action: { type: 'hangup' } }` but I initially wrote `{ voicemail_action: 'hangup' }` — incorrect SDK shape
- **Fix:** Corrected to `voicemail_option: { action: { type: 'hangup' } }` matching `VoicemailOption.VoicemailActionHangup` in retell-sdk types
- **Files modified:** scripts/update-agent-prompt.ts
- **Commit:** 110c047 (included in initial commit after fix)

**Note on tsconfig.scripts.json pre-existing error:** The plan's verify step (`npx tsc --noEmit --project tsconfig.scripts.json`) fails with a pre-existing TS5110 error (`module must be Node16 when moduleResolution is Node16`) that also affects setup-retell.ts. This is not caused by the new file. Standalone type check (`npx tsc --noEmit --strict ...`) passes cleanly, and `npx tsx` executes without error. Full project `npx tsc --noEmit` also passes.

## Verification Results

- [x] scripts/update-agent-prompt.ts exists (186 lines)
- [x] TypeScript compiles: standalone check passes, full project `npx tsc --noEmit` passes
- [x] Script contains: client.llm.update, client.agent.update, begin_message, general_prompt, general_tools, end_call, enable_voicemail_detection, default_dynamic_variables
- [x] Script does NOT contain: retell_llm_dynamic_variables (correctly in route.ts only)
- [x] route.ts: MAX_CALL_DURATION_MS = 120_000
- [x] route.ts: name field in bodySchema
- [x] route.ts: retell_llm_dynamic_variables with caller_name
- [x] npm run build: passes (Next.js production build succeeds)
- [x] All existing security controls unchanged

## Self-Check: PASSED
