---
phase: 01-provisioning
plan: "01"
subsystem: infra
tags: [retell-sdk, tsx, typescript, phone-provisioning, voice-agent, llm]

# Dependency graph
requires: []
provides:
  - "lib/retell/client.ts — server-side Retell SDK singleton with env var guard"
  - "scripts/setup-retell.ts — idempotent provisioning script for LLM, agent, phone number"
  - "RETELL_LLM_ID, RETELL_AGENT_ID, RETELL_PHONE_NUMBER written to .env.local"
affects:
  - "02-api-route (needs RETELL_AGENT_ID to create calls)"
  - "03-agent-prompt (needs RETELL_LLM_ID to update prompts)"
  - "All server-side files using Retell (import lib/retell/client.ts)"

# Tech tracking
tech-stack:
  added:
    - "retell-sdk@5.2.0 (Retell AI REST API client)"
    - "tsx@4.21.0 (TypeScript script runner for npm scripts)"
  patterns:
    - "Singleton pattern: one Retell client instance exported from lib/retell/client.ts"
    - "List-then-create idempotency: check by name before calling create()"
    - "Area code fallback loop: try NYC codes [212, 646, 917, 347, 929] in order"
    - "Read-parse-merge-write: safe .env.local updates without clobbering existing entries"
    - "Separate tsconfig.scripts.json with node16 moduleResolution for tsx script execution"

key-files:
  created:
    - "lib/retell/client.ts"
    - "scripts/setup-retell.ts"
    - "tsconfig.scripts.json"
  modified:
    - "package.json (added setup:retell script, retell-sdk dep, tsx devDep)"

key-decisions:
  - "Use gpt-4.1 model (not gpt-4o which was deprecated on Retell in early 2026)"
  - "Voice: 11labs-Matilda — professional female, warm, American English (tunable in Phase 3)"
  - "Do NOT set max_call_duration_ms on agent — set per-call in Phase 2 (avoids agent version mismatch)"
  - "Idempotency via API list() calls, not env var presence check (safe if .env.local is deleted)"
  - "tsconfig.scripts.json with node16 moduleResolution avoids bundler moduleResolution conflict with tsx"
  - "Script does NOT import lib/retell/client.ts singleton — uses local Retell instance to avoid circular dependency"

patterns-established:
  - "Server-only module guard: throw if RETELL_API_KEY not in process.env at import time"
  - "Sentinel names: kenstera-intake-llm and kenstera-intake-agent are stable idempotency keys"

requirements-completed: [INFR-01, INFR-02]

# Metrics
duration: 3min
completed: 2026-02-21
---

# Phase 1 Plan 01: Retell Provisioning Summary

**Retell SDK singleton and idempotent provisioning script for LLM (gpt-4.1), voice agent (11labs-Matilda), and NYC phone number with .env.local merge**

## Performance

- **Duration:** ~3 min (automated tasks only; checkpoint pending human verification)
- **Started:** 2026-02-21T19:40:44Z
- **Completed:** 2026-02-21T19:42:52Z (at checkpoint)
- **Tasks:** 2 of 3 complete (Task 3 is a human-verify checkpoint)
- **Files modified:** 5

## Accomplishments

- Installed retell-sdk@5.2.0 and tsx@4.21.0; wired `npm run setup:retell` entry point
- Created `lib/retell/client.ts` — server-side singleton with env var guard (throws if RETELL_API_KEY missing)
- Created `scripts/setup-retell.ts` — fully idempotent provisioning script with three `ensure*` functions, NYC area code fallback loop, and .env.local read-parse-merge-write

## Task Commits

Each task was committed atomically:

1. **Task 1: Install retell-sdk, add tsx, create Retell client singleton** - `bffeee6` (feat)
2. **Task 2: Create idempotent Retell provisioning script** - `c4ac060` (feat)
3. **Task 3: Verify provisioning script runs correctly** - PENDING (human-verify checkpoint)

**Plan metadata:** TBD after Task 3 approved

## Files Created/Modified

- `lib/retell/client.ts` — Retell SDK singleton, server-only, throws if RETELL_API_KEY unset
- `scripts/setup-retell.ts` — Idempotent provisioning script (ensureLlm, ensureAgent, ensurePhoneNumber)
- `tsconfig.scripts.json` — Separate tsconfig with node16 moduleResolution for tsx compatibility
- `package.json` — Added setup:retell script, retell-sdk dependency, tsx devDependency
- `package-lock.json` — Updated lockfile

## Decisions Made

- Used `gpt-4.1` model string (gpt-4o deprecated on Retell, replaced by gpt-4.1 in early 2026)
- Chose `11labs-Matilda` as default voice (professional female, warm, American English) — tunable in Phase 3
- Did NOT set `max_call_duration_ms` on agent (per STATE.md decision: set per-call in Phase 2)
- Added `tsconfig.scripts.json` with `"moduleResolution": "node16"` to avoid conflicts with Next.js bundler moduleResolution
- Script does NOT import `lib/retell/client.ts` to avoid dependency on env vars the script itself writes

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added tsconfig.scripts.json for tsx moduleResolution compatibility**
- **Found during:** Task 1 (planning the npm script)
- **Issue:** Next.js project uses `"moduleResolution": "bundler"` in tsconfig.json; tsx needs `node` or `node16` resolution for direct TypeScript script execution
- **Fix:** Created `tsconfig.scripts.json` with `"moduleResolution": "node16"` and updated npm script to `npx tsx --tsconfig tsconfig.scripts.json scripts/setup-retell.ts`
- **Files modified:** tsconfig.scripts.json, package.json
- **Verification:** tsx runs correctly with --tsconfig flag; entry guard fires correctly without API key
- **Committed in:** bffeee6 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking — tsconfig moduleResolution)
**Impact on plan:** Required to make the npm script executable in this Next.js project. No scope creep. Plan explicitly anticipated this scenario in the task description.

## Issues Encountered

None — plan executed cleanly. The tsconfig deviation was anticipated by the plan itself.

## User Setup Required

**External service requires API key.** Before running `npm run setup:retell`:

1. Get your Retell API key from: https://dashboard.retellai.com -> Settings -> API Keys
2. Add to `.env.local`: `RETELL_API_KEY=key_xxxxxxxxxxxxxxxxxxxxxxxx`
3. Run: `npm run setup:retell`

After provisioning completes, `.env.local` will contain:
- `RETELL_LLM_ID` — LLM response engine ID
- `RETELL_AGENT_ID` — Voice agent ID
- `RETELL_PHONE_NUMBER` — NYC phone number

**Branded Caller ID ("Kenstera" on recipient phone):**
This is a manual post-provisioning step. Go to Retell Dashboard > Advanced Add-Ons > Branded Call. Carrier approval takes 1-2 weeks and adds $0.10/min.

## Next Phase Readiness

- Task 3 (human-verify) is the gate: user must run `npm run setup:retell` with a valid API key to produce `.env.local` values
- Once Task 3 is approved, Phase 2 (API Route) can begin — it requires `RETELL_AGENT_ID` from `.env.local`
- `lib/retell/client.ts` singleton is ready for import in all Phase 2+ server-side files

---
*Phase: 01-provisioning*
*Completed: 2026-02-21 (Tasks 1-2; Task 3 pending human verification)*
