# Phase 1: Provisioning - Research

**Researched:** 2026-02-21
**Domain:** Retell AI SDK — LLM, agent, and phone number provisioning via TypeScript script
**Confidence:** MEDIUM-HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **LLM model:** GPT-4.1 — battle-tested with Retell, lowest latency for real-time voice (NOTE: the user originally said "GPT-4o" but GPT-4o was deprecated on Retell; `gpt-4.1` is the current equivalent and Retell's default)
- **Voice:** Professional female — warm, confident, polished (legal intake specialist feel)
- **Voice selection:** Hardcode a good default voice from Retell's library; no interactive picker at runtime
- **Voice quality bar:** Realistic call-center quality — reference: retellai.com's own website demo quality
- **Phone area code:** Local NYC number — try area codes 212, 646, 917, 347, 929; take whichever is available
- **Caller ID:** Display "Kenstera" — investigate CNAM support on Retell's telephony provider
- **Interruption handling:** Natural — caller can cut in anytime, agent yields immediately (high `interruption_sensitivity`)
- **Latency:** Quick/snappy — responds almost immediately after caller stops talking (high `responsiveness`)
- **Language:** English only
- **Filler words:** None — clean, direct, professional tone

### Claude's Discretion
- Exact Retell voice ID selection (within "professional female, realistic" constraint)
- Script output formatting and progress feedback
- Idempotency detection strategy (name lookup, env var check, etc.)
- Error handling and partial failure recovery
- `.env.local` merge strategy (append vs overwrite)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFR-01 | One-time setup script provisions Retell LLM response engine, voice agent, and phone number via API using only the API key | SDK `client.llm.create()`, `client.agent.create()`, `client.phoneNumber.create()` documented; idempotency via list-then-check pattern |
| INFR-02 | Provisioned resource IDs (LLM ID, agent ID, phone number) are written to `.env.local` as environment variables | Native Node.js `fs` read-parse-merge-write pattern; no external dependency needed |
</phase_requirements>

---

## Summary

Phase 1 provisions three Retell resources — an LLM response engine, a voice agent, and a phone number — via a single `npm run setup:retell` script written in TypeScript. The script must be idempotent (safe to run multiple times) and must write the resulting IDs to `.env.local` without clobbering existing entries.

The Retell TypeScript SDK (`retell-sdk` v4.66.0) exposes all three creation operations as first-class methods: `client.llm.create()`, `client.agent.create()`, and `client.phoneNumber.create()`. Each resource type also has a `.list()` method, which is the correct idempotency mechanism: check if a named resource already exists, return its ID if so, create it if not. The script should persist IDs using a read-parse-merge-write pattern against `.env.local` using Node's built-in `fs` module — no external dotenv-write library is needed.

**Key model note:** The user specified GPT-4o, but GPT-4o was deprecated on Retell (migrated to `gpt-4.1`). The correct model string for the Retell LLM `create` call is `"gpt-4.1"`. Retell has confirmed `gpt-4.1` is NOT being deprecated on their platform. For voice selection, the specific voice ID cannot be hardcoded from research alone because the voice catalog requires an authenticated API call to enumerate. The script should use a well-known default voice ID (see Code Examples) or — better — include a `list-voices` step at script runtime that selects the best matching female professional voice. The recommended approach is to hardcode a known good `voice_id` and document it as the default.

**Primary recommendation:** Write `scripts/setup-retell.ts` as a standalone Node/tsx script. Use `client.llm.list()`, `client.agent.list()`, and `client.phoneNumber.list()` to detect existing resources by a stable sentinel name (e.g., `"kenstera-intake-llm"`), then create only what is missing. Write IDs to `.env.local` with a parse-and-merge strategy.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| retell-sdk | 4.66.0 | Retell REST API client for Node.js/TypeScript | Official SDK; auto-retry, typed responses, all three creation methods included |
| tsx | (use existing or add) | Run TypeScript files directly with `node` via `npx tsx` | Zero-config TS execution for scripts; avoids a separate build step |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Node.js `fs` (built-in) | n/a | Read and write `.env.local` | Merge IDs into env file without overwriting existing entries |
| Node.js `path` (built-in) | n/a | Resolve `.env.local` path relative to project root | Always use `path.join(process.cwd(), '.env.local')` for portability |
| dotenv | (already available via Next.js) | Optionally pre-load existing env vars into `process.env` at script start | Useful to detect if IDs already set without reading the file twice |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `tsx` direct execution | `ts-node`, compile then run | `tsx` is faster and has no tsconfig conflicts; prefer it |
| Native `fs` for .env merge | `dotenv-cli`, `update-dotenv` | Native fs avoids an extra dependency; the merge logic is ~15 lines |
| Idempotency via `.list()` | Idempotency via env var check only | Env var check alone doesn't prevent duplicates if .env.local was deleted; list-then-check is safer |

**Installation:**
```bash
npm install retell-sdk
# tsx is likely already available via Next.js devDependencies; if not:
npm install --save-dev tsx
```

---

## Architecture Patterns

### Recommended Project Structure
```
scripts/
└── setup-retell.ts       # The provisioning script (INFR-01, INFR-02)

lib/
└── retell/
    └── client.ts         # Retell singleton (server-side only import guard)

.env.local                # Written by script; RETELL_LLM_ID, RETELL_AGENT_ID, RETELL_PHONE_NUMBER
```

### Pattern 1: Singleton Retell Client
**What:** One instantiation of `new Retell({ apiKey })` exported from a server-side module, reused everywhere.
**When to use:** Any server-side file (API routes, scripts) that calls Retell.
**Example:**
```typescript
// lib/retell/client.ts
// Source: https://docs.retellai.com/get-started/sdk
import Retell from 'retell-sdk';

if (!process.env.RETELL_API_KEY) {
  throw new Error('RETELL_API_KEY is not set');
}

export const retell = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});
```
This module must NEVER be imported in client-side code. In Next.js, placing it under `lib/retell/` and only importing from Server Components or API routes is sufficient.

### Pattern 2: List-Then-Create Idempotency
**What:** Before creating a resource, list existing resources of that type and check for a sentinel name. Return the existing ID if found; create and return the new ID if not.
**When to use:** All three resource types (LLM, agent, phone number).
**Example:**
```typescript
// Source: Retell SDK api.md — client.llm.list(), client.llm.create()
const SENTINEL_LLM_NAME = 'kenstera-intake-llm';

async function ensureLlm(client: Retell): Promise<string> {
  const existing = await client.llm.list();
  const found = existing.find((llm) => llm.llm_name === SENTINEL_LLM_NAME);
  if (found) {
    console.log(`  LLM already exists: ${found.llm_id}`);
    return found.llm_id;
  }

  const created = await client.llm.create({
    llm_name: SENTINEL_LLM_NAME,
    model: 'gpt-4.1',
    start_speaker: 'agent',
    begin_message:
      'Thank you for calling Kenstera. I\'m your AI intake specialist. Are you calling about a legal matter, or would you like to learn more about our AI solutions?',
    general_prompt: `You are a professional intake specialist at a personal injury law firm. ...`,
    model_high_priority: false,
  });
  console.log(`  LLM created: ${created.llm_id}`);
  return created.llm_id;
}
```

**Phone number idempotency note:** `phoneNumber.list()` returns existing numbers. The script can check if any number in the list is already bound to the target agent. Phone numbers have no `name` field — check `outbound_agent_id` match instead.

### Pattern 3: .env.local Merge (Read-Parse-Merge-Write)
**What:** Read the existing `.env.local`, parse each line as `KEY=VALUE`, overwrite or append each new key, write back.
**When to use:** When writing provisioned IDs to `.env.local`.
**Example:**
```typescript
// Source: Node.js built-in fs module pattern
import fs from 'fs';
import path from 'path';

function updateEnvLocal(updates: Record<string, string>): void {
  const envPath = path.join(process.cwd(), '.env.local');

  // Read existing file or start empty
  let lines: string[] = [];
  if (fs.existsSync(envPath)) {
    lines = fs.readFileSync(envPath, 'utf8').split('\n');
  }

  // Build map of existing entries
  const entries = new Map<string, string>();
  for (const line of lines) {
    const eqIdx = line.indexOf('=');
    if (eqIdx > 0) {
      entries.set(line.slice(0, eqIdx).trim(), line.slice(eqIdx + 1).trim());
    }
  }

  // Merge updates
  for (const [key, value] of Object.entries(updates)) {
    entries.set(key, value);
  }

  // Write back
  const output = Array.from(entries.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  fs.writeFileSync(envPath, output + '\n', 'utf8');
}
```

### Pattern 4: NYC Area Code Fallback Loop
**What:** Try each allowed NYC area code in sequence until `phoneNumber.create` succeeds.
**When to use:** Provisioning the Retell phone number with NYC area code preference.
**Example:**
```typescript
// Source: Retell SDK phone-number.ts — PhoneNumberCreateParams.area_code
const NYC_AREA_CODES = [212, 646, 917, 347, 929];

async function ensurePhoneNumber(client: Retell, agentId: string): Promise<string> {
  // Check if we already have a number bound to this agent
  const existing = await client.phoneNumber.list();
  const found = existing.find((n) => n.outbound_agent_id === agentId);
  if (found) {
    console.log(`  Phone number already exists: ${found.phone_number}`);
    return found.phone_number;
  }

  // Try each NYC area code
  for (const areaCode of NYC_AREA_CODES) {
    try {
      const created = await client.phoneNumber.create({
        area_code: areaCode,
        outbound_agent_id: agentId,
        inbound_agent_id: agentId,
        country_code: 'US',
      });
      console.log(`  Phone number created: ${created.phone_number} (area code ${areaCode})`);
      return created.phone_number;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`  Area code ${areaCode} unavailable: ${msg}`);
    }
  }

  throw new Error('No NYC area code available. All five codes (212, 646, 917, 347, 929) failed.');
}
```

### Anti-Patterns to Avoid
- **Importing `lib/retell/client.ts` in client-side code:** The API key will leak into the browser bundle. Enforce server-only by using Next.js `server-only` package or runtime env var checks.
- **Hardcoding model as `"gpt-4o"`:** This string is deprecated on Retell (auto-migrated to `gpt-4.1`). Use `"gpt-4.1"` directly.
- **Using `s2s_model: "gpt-4o-realtime"` on the LLM:** Speech-to-speech and standard text LLM are mutually exclusive. Use `model: "gpt-4.1"` for the standard path (lower cost, same conversational quality for this use case).
- **Creating resources without naming them:** Without a sentinel name on LLM and agent, the idempotency check degrades to env var presence — fragile if `.env.local` is deleted.
- **Setting `enable_backchannel: true`:** Backchannel phrases ("uh-huh", "yeah") are informal filler — contradicts the "no filler words" requirement.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Retell API HTTP calls | Custom fetch wrapper with auth headers | `retell-sdk` client | Handles auto-retry (2x with exponential backoff), typed responses, error normalization |
| Voice catalog discovery | Static hardcoded list of voice IDs | `client.voice.list()` at setup time OR use a known-good tested voice ID | Voice catalog changes; listed voices include `gender`, `accent`, `preview_audio_url` for validation |
| .env file management | Custom regex-based env parser | Simple `split('\n')` + `indexOf('=')` parse (15 lines) | Full dotenv parsing is unnecessary for this write-only use case |

**Key insight:** The SDK handles all the fragile HTTP surface. The setup script's only custom logic should be: list→check→create idempotency, area code fallback loop, and env merge.

---

## Common Pitfalls

### Pitfall 1: GPT-4o Model Name
**What goes wrong:** Passing `model: 'gpt-4o'` to `llm.create()` — Retell either rejects it or silently substitutes `gpt-4.1`.
**Why it happens:** The user decision was documented as "GPT-4o" but that model was deprecated on Retell in early 2026 (migrated to `gpt-4.1`).
**How to avoid:** Use `model: 'gpt-4.1'` explicitly. This is Retell's current default and the direct replacement.
**Warning signs:** If the script runs without error but the created LLM shows `gpt-4.1` in the Retell dashboard despite passing `gpt-4o`, this is the cause.

### Pitfall 2: `start_speaker` Is Now Required
**What goes wrong:** `llm.create()` call fails with a validation error if `start_speaker` is omitted.
**Why it happens:** Retell made `start_speaker` a required field in a recent API update.
**How to avoid:** Always include `start_speaker: 'agent'` (agent speaks first with `begin_message`).
**Warning signs:** API 422 validation error mentioning `start_speaker`.

### Pitfall 3: Phone Number `area_code` Type Is Number, Not String
**What goes wrong:** Passing `area_code: '212'` (string) instead of `area_code: 212` (number) causes a validation error.
**Why it happens:** TypeScript SDK type is `number`, but instinct is to write it as a string.
**How to avoid:** Pass integer values from the `NYC_AREA_CODES` array: `[212, 646, 917, 347, 929]`.
**Warning signs:** SDK type error or API 422 at runtime.

### Pitfall 4: CNAM / Branded Caller ID Is a Post-Provisioning Dashboard Step
**What goes wrong:** Expecting caller ID to display "Kenstera" immediately after script runs.
**Why it happens:** Branded Caller ID requires a manual application through the Retell dashboard, carrier approval (1–2 weeks), and adds $0.10/min cost. It cannot be set via API at provisioning time.
**How to avoid:** The provisioning script should NOT attempt CNAM setup. Document this as a manual post-provisioning step in a README comment in the script.
**Warning signs:** No branded_caller_id field exists in `PhoneNumberCreateParams`.

### Pitfall 5: Idempotency Check on Phone Number Bound to Wrong Agent
**What goes wrong:** Second run finds a phone number but it's bound to a deleted/old agent, so the new agent has no number.
**Why it happens:** Idempotency check only looks for the presence of any phone number in the list.
**How to avoid:** Filter phone numbers by `outbound_agent_id === agentId` specifically, not just presence.
**Warning signs:** `.env.local` has a `RETELL_PHONE_NUMBER` but calls fail because that number is bound to a stale agent.

### Pitfall 6: Script Imports Not Compatible with `tsx` Direct Execution
**What goes wrong:** Script fails to run with `npx tsx scripts/setup-retell.ts` due to module resolution issues.
**Why it happens:** Next.js projects often have `"moduleResolution": "bundler"` in tsconfig, which may conflict with tsx's node resolver.
**How to avoid:** Either use a separate `tsconfig.scripts.json` with `"moduleResolution": "node16"`, or pass `--tsconfig` to tsx, or simply ensure imports use explicit extensions (`.js` for compiled output or no extension with tsx).
**Warning signs:** `Cannot find module` errors that don't appear in the Next.js build.

---

## Code Examples

Verified patterns from official sources:

### Full Script Skeleton
```typescript
// scripts/setup-retell.ts
// Source: retell-sdk official SDK (github.com/RetellAI/retell-typescript-sdk)
import Retell from 'retell-sdk';
import fs from 'fs';
import path from 'path';

const SENTINEL_LLM_NAME = 'kenstera-intake-llm';
const SENTINEL_AGENT_NAME = 'kenstera-intake-agent';

// Voice ID — use a known professional female voice from Retell's catalog.
// Run `client.voice.list()` once to enumerate and pick; this is a safe default.
// "11labs-Matilda" is a professional, warm, natural-sounding female voice on ElevenLabs.
// Verify in Retell dashboard before finalizing.
const DEFAULT_VOICE_ID = '11labs-Matilda';

async function main() {
  if (!process.env.RETELL_API_KEY) {
    console.error('ERROR: RETELL_API_KEY environment variable is not set.');
    process.exit(1);
  }

  const client = new Retell({ apiKey: process.env.RETELL_API_KEY });

  console.log('Step 1/3: Provisioning Retell LLM...');
  const llmId = await ensureLlm(client);

  console.log('Step 2/3: Provisioning Retell Agent...');
  const agentId = await ensureAgent(client, llmId);

  console.log('Step 3/3: Provisioning Phone Number (NYC area code)...');
  const phoneNumber = await ensurePhoneNumber(client, agentId);

  console.log('Writing IDs to .env.local...');
  updateEnvLocal({
    RETELL_LLM_ID: llmId,
    RETELL_AGENT_ID: agentId,
    RETELL_PHONE_NUMBER: phoneNumber,
  });

  console.log('\nProvisioning complete.');
  console.log(`  LLM ID:       ${llmId}`);
  console.log(`  Agent ID:     ${agentId}`);
  console.log(`  Phone Number: ${phoneNumber}`);
  console.log('\nNOTE: To display "Kenstera" as caller ID, apply for Branded Caller ID');
  console.log('in the Retell dashboard (Advanced Add-Ons > Branded Call). Approval: 1-2 weeks.');
}

main().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
```

### LLM Create (with correct params)
```typescript
// Source: docs.retellai.com/api-references/create-retell-llm
const created = await client.llm.create({
  llm_name: SENTINEL_LLM_NAME,
  model: 'gpt-4.1',              // NOT 'gpt-4o' — that model is deprecated on Retell
  start_speaker: 'agent',        // Required field as of recent API update
  begin_message:
    "Thank you for calling Kenstera. I'm your AI intake specialist. " +
    "Are you calling about a legal matter, or would you like to learn more about our AI solutions?",
  general_prompt:
    'You are a professional intake specialist at a law firm. ' +
    'You are warm, confident, and direct. Never use filler words. ' +
    'For the intake path: ask about the situation, injuries, and timeline. ' +
    'For the Q&A path: pitch Kenstera\'s AI intake automation and direct callers to book at kenstera.com.',
  model_high_priority: false,    // Set true to reduce latency at higher cost (Phase 3 can tune)
});
```

### Agent Create (with correct params)
```typescript
// Source: docs.retellai.com/api-references/create-agent
const created = await client.agent.create({
  agent_name: SENTINEL_AGENT_NAME,
  response_engine: {
    type: 'retell-llm',
    llm_id: llmId,
  },
  voice_id: DEFAULT_VOICE_ID,
  voice_model: 'eleven_turbo_v2_5',   // Fast, high-quality ElevenLabs model
  voice_temperature: 0.8,             // Slight warmth variation; not robotic
  voice_speed: 1.0,                   // Natural pace
  language: 'en-US',
  interruption_sensitivity: 0.9,      // High — agent yields immediately to caller
  responsiveness: 1.0,                // Maximum — responds as fast as possible
  enable_backchannel: false,          // No "uh-huh" / "yeah" filler
  normalize_for_speech: true,         // Convert numbers/dates to spoken form
  reminder_trigger_ms: 10000,         // 10s silence before reminder
  reminder_max_count: 1,
  // max_call_duration_ms NOT set here — set per-call at call creation time (Phase 2)
  // per STATE.md: set max_call_duration_ms at per-call level to avoid agent version mismatch
});
```

### Phone Number Create (with area code fallback)
```typescript
// Source: retell-typescript-sdk src/resources/phone-number.ts — PhoneNumberCreateParams
const created = await client.phoneNumber.create({
  area_code: areaCode,           // number (not string) — e.g., 212
  country_code: 'US',
  outbound_agent_id: agentId,
  inbound_agent_id: agentId,
});
```

### Singleton Client for Server-Side Use
```typescript
// lib/retell/client.ts
// Source: docs.retellai.com/get-started/sdk
import Retell from 'retell-sdk';

if (!process.env.RETELL_API_KEY) {
  throw new Error(
    'RETELL_API_KEY is not defined. This module must only be imported server-side.'
  );
}

export const retell = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `model: 'gpt-4o'` on Retell LLM | `model: 'gpt-4.1'` | Early 2026 (Retell auto-migrated) | Must use `gpt-4.1` string in code |
| `gpt-4o-mini` on Retell | `gpt-4.1-mini` | Early 2026 | Same migration |
| `start_speaker` optional | `start_speaker` required | Recent Retell API update | Omitting it causes 422 |
| V1 APIs | V2 APIs (February 5, 2025) | Feb 2025 | V1 deprecated; SDK is V2 |

**Deprecated/outdated:**
- `model: 'gpt-4o'` on Retell: auto-migrated to `gpt-4.1`; pass the new name directly
- Retell V1 API endpoints: deprecated Feb 5, 2025; retell-sdk v4+ uses V2 only

---

## Open Questions

1. **Exact voice_id for "professional female, call-center quality"**
   - What we know: Voice catalog requires an authenticated `client.voice.list()` call to enumerate. Voice IDs follow format `11labs-{Name}` (ElevenLabs) or `openai-{Name}`. Known female ElevenLabs voices include `11labs-Matilda`, `11labs-Rachel`, `11labs-Bella`.
   - What's unclear: Which specific voice_id in Retell's current catalog best matches the "retellai.com demo quality" bar. Voice catalog changes without version notices.
   - Recommendation: The setup script should print the list of available female voices on first run (using `client.voice.list()`) so the developer can pick from previews. Alternatively, hardcode `11labs-Matilda` (warm, professional, American English) as the default and note it's tunable.

2. **`max_call_duration_ms` placement**
   - What we know: STATE.md explicitly records: "Set `max_call_duration_ms: 180000` at the per-call level, not only at the agent level (agent version mismatch pitfall)."
   - What's unclear: Whether setting it at the agent level in addition to per-call causes any issue.
   - Recommendation: Follow STATE.md decision — do NOT set `max_call_duration_ms` in `agent.create()`. Set it at call creation time in Phase 2.

3. **tsx script execution in Next.js project**
   - What we know: Next.js uses `"moduleResolution": "bundler"` in tsconfig by default; tsx may need explicit config.
   - What's unclear: Whether `npx tsx scripts/setup-retell.ts` works out-of-the-box with this project's tsconfig.
   - Recommendation: Add the script as `"setup:retell": "npx tsx scripts/setup-retell.ts"` in package.json and verify at implementation time. If tsx fails, add `tsconfig.scripts.json` with `"moduleResolution": "node"`.

---

## Sources

### Primary (HIGH confidence)
- `RetellAI/retell-typescript-sdk` GitHub (src/resources/phone-number.ts, agent.ts, llm.ts) — `PhoneNumberCreateParams.area_code` type is `number`; `AgentCreateParams` full field list; `LlmCreateParams` full field list including `start_speaker` required
- https://docs.retellai.com/api-references/create-agent — Full agent create parameter list
- https://docs.retellai.com/api-references/create-retell-llm — Full LLM create parameter list including current model strings

### Secondary (MEDIUM confidence)
- https://www.retellai.com/changelog — GPT-4o → GPT-4.1 migration confirmed; `start_speaker` now required; v4.66.0 is latest retell-sdk
- https://docs.retellai.com/deploy/purchase-number — `phoneNumber.create()` method; `inbound_agent_id`, `outbound_agent_id`, `area_code` params confirmed
- https://www.retellai.com/features/branded-call-id — CNAM/Branded Caller ID is dashboard-only, 1–2 week approval, $0.10/min, cannot be set via provisioning API

### Tertiary (LOW confidence)
- Voice ID `11labs-Matilda` as default — mentioned in community/blog context; not officially verified as currently available in Retell's catalog. Must validate at implementation time via `client.voice.list()`.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — retell-sdk v4.66.0 confirmed; all three create methods verified against official docs and SDK source
- Architecture: HIGH — idempotency pattern, env merge, and fallback loop are straightforward Node.js patterns with no hidden complexity
- Pitfalls: HIGH — GPT-4o deprecation, `start_speaker` required, and CNAM limitation all verified from official Retell changelog and docs
- Voice ID selection: LOW — catalog is dynamic; specific `voice_id` values must be validated at runtime

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (Retell SDK and model catalog change frequently; re-verify model names if implementing after this date)
