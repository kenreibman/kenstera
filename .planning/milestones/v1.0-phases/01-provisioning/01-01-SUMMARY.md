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
  - "RETELL_LLM_ID (llm_c5caadcc545519e4d0eb862d844b) written to .env.local"
  - "RETELL_AGENT_ID (agent_f5a7553f934f5574deae7369db) written to .env.local"
  - "RETELL_PHONE_NUMBER (+16467132039) written to .env.local"
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
    - "Stored-ID idempotency: after first creation write ID to .env.local; on subsequent runs retrieve() by stored ID"
    - "Area code fallback loop: try NYC codes [212, 646, 917, 347, 929] in order"
    - "Read-parse-merge-write: safe .env.local updates without clobbering existing entries"
    - "Separate tsconfig.scripts.json with node16 moduleResolution for tsx script execution"
    - "Manual .env.local parser in scripts: load file before process.env access"

key-files:
  created:
    - "lib/retell/client.ts"
    - "scripts/setup-retell.ts"
    - "tsconfig.scripts.json"
  modified:
    - "package.json (added setup:retell script, retell-sdk dep, tsx devDep)"

key-decisions:
  - "Use gpt-4.1 model (not gpt-4o which was deprecated on Retell in early 2026)"
  - "Voice: 11labs-Marissa (11labs-Matilda not available on Retell; Marissa is closest professional female voice)"
  - "Do NOT set max_call_duration_ms on agent — set per-call in Phase 2 (avoids agent version mismatch)"
  - "LLM idempotency via retrieve() by stored ID (llm.list() does not return llm_name field on Retell)"
  - "tsconfig.scripts.json with node16 moduleResolution avoids bundler moduleResolution conflict with tsx"
  - "Script does NOT import lib/retell/client.ts singleton — uses local Retell instance to avoid circular dependency"
  - "Script parses .env.local manually at startup (dotenv not used; manual parser keeps deps minimal)"

patterns-established:
  - "Server-only module guard: throw if RETELL_API_KEY not in process.env at import time"
  - "Sentinel names: kenstera-intake-llm and kenstera-intake-agent are stable idempotency keys"
  - "Stored-ID pattern preferred over name-matching when API list() omits name fields"

requirements-completed: [INFR-01, INFR-02]

# Metrics
duration: ~45min
completed: 2026-02-21
---

# Phase 1 Plan 01: Retell Provisioning Summary

**Retell SDK singleton and idempotent provisioning script for LLM (gpt-4.1), voice agent (11labs-Marissa, NYC +16467132039) fully provisioned and verified idempotent across two runs**

## Performance

- **Duration:** ~45 min (including human verification and post-checkpoint fixes)
- **Started:** 2026-02-21T19:40:44Z
- **Completed:** 2026-02-21 (all tasks including human verification)
- **Tasks:** 3 of 3 complete
- **Files modified:** 5

## Accomplishments

- Installed retell-sdk@5.2.0 and tsx@4.21.0; wired `npm run setup:retell` entry point
- Created `lib/retell/client.ts` — server-side singleton with env var guard (throws if RETELL_API_KEY missing)
- Created `scripts/setup-retell.ts` — fully idempotent provisioning script with three `ensure*` functions, NYC area code fallback loop, and .env.local read-parse-merge-write
- Provisioned all three Retell resources: LLM `llm_c5caadcc545519e4d0eb862d844b`, Agent `agent_f5a7553f934f5574deae7369db`, Phone `+16467132039`
- Human-verified: first run creates resources, second run detects all existing without duplicates

## Task Commits

Each task was committed atomically:

1. **Task 1: Install retell-sdk, add tsx, create Retell client singleton** - `bffeee6` (feat)
2. **Task 2: Create idempotent Retell provisioning script** - `c4ac060` (feat)
3. **Task 3: Checkpoint commit at human-verify** - `326402c` (docs)
4. **Post-verification fixes: .env.local loading, LLM idempotency, Marissa voice** - `957cb30` (fix)

**Plan metadata:** TBD (this commit)

## Files Created/Modified

- `lib/retell/client.ts` — Retell SDK singleton, server-only, throws if RETELL_API_KEY unset
- `scripts/setup-retell.ts` — Idempotent provisioning script (ensureLlm, ensureAgent, ensurePhoneNumber) with stored-ID pattern
- `tsconfig.scripts.json` — Separate tsconfig with node16 moduleResolution for tsx compatibility
- `package.json` — Added setup:retell script, retell-sdk dependency, tsx devDependency
- `package-lock.json` — Updated lockfile

## Decisions Made

- Used `gpt-4.1` model string (gpt-4o deprecated on Retell, replaced by gpt-4.1 in early 2026)
- Changed to `11labs-Marissa` (plan specified Matilda but that voice does not exist on Retell)
- Did NOT set `max_call_duration_ms` on agent (per STATE.md decision: set per-call in Phase 2)
- Added `tsconfig.scripts.json` with `"moduleResolution": "node16"` to avoid conflicts with Next.js bundler moduleResolution
- Script does NOT import `lib/retell/client.ts` to avoid dependency on env vars the script itself writes
- LLM idempotency switched from name-matching to stored-ID retrieve (Retell llm.list() omits llm_name)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added tsconfig.scripts.json for tsx moduleResolution compatibility**
- **Found during:** Task 1 (planning the npm script)
- **Issue:** Next.js project uses `"moduleResolution": "bundler"` in tsconfig.json; tsx needs `node` or `node16` resolution for direct TypeScript script execution
- **Fix:** Created `tsconfig.scripts.json` with `"moduleResolution": "node16"` and updated npm script to `npx tsx --tsconfig tsconfig.scripts.json scripts/setup-retell.ts`
- **Files modified:** tsconfig.scripts.json, package.json
- **Verification:** tsx runs correctly with --tsconfig flag; entry guard fires correctly without API key
- **Committed in:** bffeee6 (Task 1 commit)

**2. [Rule 3 - Blocking] Script did not load .env.local before reading env vars**
- **Found during:** Task 3 verification (first provisioning run)
- **Issue:** `process.env.RETELL_API_KEY` was undefined even when set in `.env.local`; tsx does not auto-load .env files
- **Fix:** Added manual `.env.local` parser at script startup — reads the file, splits KEY=VALUE lines, populates `process.env` for each entry
- **Files modified:** `scripts/setup-retell.ts`
- **Verification:** Script ran successfully with API key loaded from `.env.local`
- **Committed in:** `957cb30`

**3. [Rule 1 - Bug] LLM idempotency broken: llm.list() does not return llm_name field**
- **Found during:** Task 3 verification (second script run created a duplicate LLM)
- **Issue:** The plan specified finding the LLM by matching `llm_name === 'kenstera-intake-llm'` in the list response, but Retell's API does not include the `llm_name` field in `llm.list()` responses. Name search always returned "not found", so every run created a new LLM.
- **Fix:** Switched to stored-ID pattern — after first creation, `RETELL_LLM_ID` is written to `.env.local`. Subsequent runs load that ID and call `llm.retrieve(id)` to verify existence.
- **Files modified:** `scripts/setup-retell.ts`
- **Verification:** Second run correctly detected existing LLM without creating a duplicate
- **Committed in:** `957cb30`

**4. [Rule 1 - Bug] Voice ID 11labs-Matilda not available on Retell**
- **Found during:** Task 3 verification (agent creation)
- **Issue:** Plan specified `voice_id: '11labs-Matilda'` but this voice ID does not exist in the Retell voice catalog; agent creation failed
- **Fix:** Changed to `voice_id: '11labs-Marissa'` — the closest available professional female voice
- **Files modified:** `scripts/setup-retell.ts`
- **Verification:** Agent created successfully with Marissa voice; provisioning script completed
- **Committed in:** `957cb30`

---

**Total deviations:** 4 auto-fixed (2 blocking, 2 bugs)
**Impact on plan:** All fixes were necessary for the script to run correctly end-to-end. The LLM idempotency fix (deviation 3) establishes a more robust pattern that should be used if any future Retell resource type also omits name fields from list responses. No scope creep.

## Issues Encountered

- Retell's `llm.list()` API omits `llm_name` from response objects. The workaround (store ID after creation, retrieve by ID on subsequent runs) is actually more reliable than name matching since names could change.
- 212 area code was unavailable for phone number provisioning; 646 succeeded on the second attempt in the fallback loop.

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

- All three Retell resource IDs are written to `.env.local` and verified working
- `lib/retell/client.ts` singleton is ready for import in all Phase 2+ server-side files
- Phase 2 (API Route) can begin immediately — needs `RETELL_AGENT_ID` to initiate calls
- **Validate early in Phase 2:** reCAPTCHA v3 + React 19 compatibility is a known low-confidence concern from research

---
*Phase: 01-provisioning*
*Completed: 2026-02-21*
