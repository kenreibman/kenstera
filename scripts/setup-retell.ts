/**
 * scripts/setup-retell.ts
 *
 * Idempotent provisioning script for the Kenstera Retell stack.
 * Creates (or detects existing) Retell LLM, voice agent, and NYC phone number,
 * then writes their IDs to .env.local.
 *
 * Usage:
 *   npm run setup:retell
 *
 * Prerequisites:
 *   RETELL_API_KEY must be set in your environment or in .env.local before running.
 *
 * Idempotency:
 *   Safe to run multiple times. Each resource is looked up by name (or agent binding
 *   for phone numbers) before creation. Existing resources are reused, not duplicated.
 *
 * NOTE — Branded Caller ID ("Kenstera" on recipient phone):
 *   CNAM registration cannot be set via the Retell provisioning API.
 *   To display "Kenstera" as the caller ID, apply manually:
 *   Retell Dashboard > Advanced Add-Ons > Branded Call
 *   Approval takes 1–2 weeks and adds $0.10/min to call costs.
 */

import Retell from 'retell-sdk';
import fs from 'fs';
import path from 'path';

// ─── Load .env.local so RETELL_API_KEY is available ─────────────────────────
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

// ─── Sentinel names (stable identifiers for idempotency) ────────────────────
const SENTINEL_LLM_NAME = 'kenstera-intake-llm';
const SENTINEL_AGENT_NAME = 'kenstera-intake-agent';

// Voice ID — professional female, warm, American English.
// "11labs-Marissa" is a well-regarded ElevenLabs voice on Retell.
// Tunable: run `client.voice.list()` to browse alternatives.
const DEFAULT_VOICE_ID = '11labs-Marissa';

// NYC area codes tried in order. Area code type must be number (not string).
const NYC_AREA_CODES = [212, 646, 917, 347, 929];

// ─── Step 1/3: LLM ──────────────────────────────────────────────────────────

async function ensureLlm(client: Retell): Promise<string> {
  // Retell's llm.list() does NOT return llm_name, so we can't match by name.
  // Instead, check if RETELL_LLM_ID is already set and verify it still exists.
  const existingId = process.env.RETELL_LLM_ID;
  if (existingId) {
    try {
      await client.llm.retrieve(existingId);
      console.log(`  LLM already exists: ${existingId}`);
      return existingId;
    } catch {
      console.log(`  Stored LLM ID ${existingId} no longer valid, creating new one...`);
    }
  }

  const created = await client.llm.create({
    llm_name: SENTINEL_LLM_NAME,
    // NOTE: 'gpt-4o' is deprecated on Retell (migrated early 2026). Use 'gpt-4.1'.
    model: 'gpt-4.1',
    // start_speaker is required as of recent Retell API update.
    start_speaker: 'agent',
    // Placeholder greeting — Phase 3 will refine this prompt extensively.
    begin_message:
      "Thank you for calling Kenstera. I'm your AI intake specialist. " +
      'Are you calling about a legal matter, or would you like to learn more about our AI solutions?',
    // Placeholder system prompt — Phase 3 will refine this prompt extensively.
    general_prompt:
      'You are a professional intake specialist. ' +
      'You are warm, confident, and direct. Never use filler words. ' +
      'For the intake path: gather details about the caller\'s situation, injuries, and timeline. ' +
      "For the Q&A path: explain Kenstera's AI intake automation and invite callers to book at kenstera.com.",
    model_high_priority: false,
  });

  console.log(`  LLM created: ${created.llm_id}`);
  return created.llm_id;
}

// ─── Step 2/3: Agent ────────────────────────────────────────────────────────

async function ensureAgent(client: Retell, llmId: string): Promise<string> {
  const existing = await client.agent.list();
  const found = existing.find((agent) => agent.agent_name === SENTINEL_AGENT_NAME);

  if (found) {
    console.log(`  Agent already exists: ${found.agent_id}`);
    return found.agent_id;
  }

  const created = await client.agent.create({
    agent_name: SENTINEL_AGENT_NAME,
    response_engine: {
      type: 'retell-llm',
      llm_id: llmId,
    },
    voice_id: DEFAULT_VOICE_ID,
    voice_model: 'eleven_turbo_v2_5', // Fast, high-quality ElevenLabs model
    voice_temperature: 0.8,           // Slight variation — natural, not robotic
    voice_speed: 1.0,                 // Natural conversational pace
    language: 'en-US',
    interruption_sensitivity: 0.9,    // High — agent yields immediately to caller
    responsiveness: 1.0,              // Maximum — responds as fast as possible
    enable_backchannel: false,        // No filler words ("uh-huh", "yeah")
    normalize_for_speech: true,       // Convert numbers/dates to spoken form
    reminder_trigger_ms: 10000,       // Reminder after 10s of silence
    reminder_max_count: 1,
    // max_call_duration_ms is NOT set here.
    // Per project decision (STATE.md): set max_call_duration_ms at the per-call level
    // in Phase 2 to avoid agent version mismatch issues.
  });

  console.log(`  Agent created: ${created.agent_id}`);
  return created.agent_id;
}

// ─── Step 3/3: Phone Number ─────────────────────────────────────────────────

async function ensurePhoneNumber(client: Retell, agentId: string): Promise<string> {
  // Check if any existing number is already bound to this specific agent
  const existing = await client.phoneNumber.list();
  const found = existing.find((n) => n.outbound_agent_id === agentId);

  if (found) {
    console.log(`  Phone number already exists: ${found.phone_number}`);
    return found.phone_number;
  }

  // Try each NYC area code until one succeeds
  for (const areaCode of NYC_AREA_CODES) {
    try {
      const created = await client.phoneNumber.create({
        area_code: areaCode,           // Must be number, not string
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

  throw new Error(
    'No NYC area code available. All five codes (212, 646, 917, 347, 929) failed. ' +
    'Try again later or check Retell dashboard for available numbers.'
  );
}

// ─── .env.local merge ───────────────────────────────────────────────────────

function updateEnvLocal(updates: Record<string, string>): void {
  const envPath = path.join(process.cwd(), '.env.local');

  // Read existing file or start empty
  let lines: string[] = [];
  if (fs.existsSync(envPath)) {
    lines = fs.readFileSync(envPath, 'utf8').split('\n');
  }

  // Build map of existing key=value entries (preserves comments as-is)
  const entries = new Map<string, string>();
  const comments: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      comments.push(line);
      continue;
    }
    const eqIdx = line.indexOf('=');
    if (eqIdx > 0) {
      entries.set(line.slice(0, eqIdx).trim(), line.slice(eqIdx + 1).trim());
    }
  }

  // Merge new values (overwrite if key exists, append if new)
  for (const [key, value] of Object.entries(updates)) {
    entries.set(key, value);
  }

  // Reconstruct file: comments first, then all key=value entries
  const kvLines = Array.from(entries.entries()).map(([k, v]) => `${k}=${v}`);
  const output = [...comments.filter(Boolean), ...kvLines].join('\n');
  fs.writeFileSync(envPath, output + '\n', 'utf8');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // Entry guard: RETELL_API_KEY must be set before running this script.
  if (!process.env.RETELL_API_KEY) {
    console.error('');
    console.error('ERROR: RETELL_API_KEY is not set.');
    console.error('');
    console.error('To fix: add your Retell API key to your environment or to .env.local:');
    console.error('  RETELL_API_KEY=key_xxxxxxxxxxxxxxxxxxxxxxxx');
    console.error('');
    console.error('Get your API key at: https://dashboard.retellai.com -> Settings -> API Keys');
    process.exit(1);
  }

  // Use a local Retell instance — do NOT import lib/retell/client.ts here,
  // because that singleton depends on env vars this script is responsible for writing.
  const client = new Retell({ apiKey: process.env.RETELL_API_KEY });

  console.log('\nKenstera Retell Provisioning');
  console.log('============================\n');

  console.log('Step 1/3: Provisioning Retell LLM...');
  const llmId = await ensureLlm(client);

  console.log('Step 2/3: Provisioning Retell Agent...');
  const agentId = await ensureAgent(client, llmId);

  console.log('Step 3/3: Provisioning Phone Number (NYC area code)...');
  const phoneNumber = await ensurePhoneNumber(client, agentId);

  console.log('\nWriting IDs to .env.local...');
  updateEnvLocal({
    RETELL_LLM_ID: llmId,
    RETELL_AGENT_ID: agentId,
    RETELL_PHONE_NUMBER: phoneNumber,
  });

  console.log('\nProvisioning complete.');
  console.log('─────────────────────────────────────────');
  console.log(`  LLM ID:       ${llmId}`);
  console.log(`  Agent ID:     ${agentId}`);
  console.log(`  Phone Number: ${phoneNumber}`);
  console.log('─────────────────────────────────────────');
  console.log('\nNOTE: To display "Kenstera" as caller ID:');
  console.log('  1. Go to Retell Dashboard > Advanced Add-Ons > Branded Call');
  console.log('  2. Submit the application (carrier approval: 1–2 weeks, $0.10/min)');
  console.log('  This step cannot be automated via the Retell provisioning API.\n');
}

main().catch((err) => {
  console.error('\nSetup failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
