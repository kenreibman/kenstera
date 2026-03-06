# Kenstera Demo Intake Specialist

## What This Is

A live, interactive demo on the kenstera homepage that lets prospective clients experience AI-powered intake firsthand. Visitors fill out a short form (name, phone, email), and within seconds receive a phone call from an AI intake specialist ("Kate") built on Retell AI. The call simulates a car accident personal injury intake — qualifying leads, asking about injuries and timeline, and guiding the conversation naturally within 2 minutes.

## Core Value

Prospective clients feel the AI intake experience on their own phone before buying — the single most persuasive sales tool on the site.

## Requirements

### Validated

- ✓ Homepage demo form (name, phone, email) between CRM Integrations and Case Studies sections — v1.0
- ✓ Phone validation (US E.164 format) before submission — v1.0
- ✓ Server-side API route proxying Retell calls (API key never client-side) — v1.0
- ✓ Rate limiting per IP and per phone number via Upstash Redis — v1.0
- ✓ Call duration hard-capped at 120 seconds via per-call agent_override — v1.0
- ✓ Consent timestamp and IP logged server-side on call trigger — v1.0
- ✓ Retell stack provisioned via idempotent setup script (LLM, agent, phone number) — v1.0
- ✓ Kate agent: greets by name, simulates PI intake, detects abuse, wraps up gracefully — v1.0
- ✓ Form UX: loading spinner, success state with booking CTA, distinct error messages, double-submit prevention — v1.0
- ✓ All security controls verified in production build — v1.0

### Active

(None — next milestone not yet planned)

### Out of Scope

- Cal.com booking from within the demo call — just mention visiting the website
- Call recording playback or transcript display on the frontend
- Multi-language support — English only for v1
- Warm transfer to a live person during the demo call
- SMS follow-up after the demo call — requires separate TCPA consent
- Analytics dashboard for demo call metrics — use Retell's built-in dashboard
- Live call transcript on website — Retell doesn't expose real-time transcript for outbound calls
- WebRTC browser call option — outbound phone ring is the "whoa" moment

## Context

Kenstera is an AI intake automation platform targeting law firms (primarily personal injury). The site is a Next.js 16 app with React 19, TypeScript, Tailwind CSS 4, Framer Motion, and Radix UI. Backend services include Upstash Redis for rate limiting, Resend for email, and Cal.com for booking.

Shipped v1.0 with ~13,100 LOC TypeScript/React. Demo form uses animated orb design with underline-style inputs on a dark navy section. Kate agent uses minimax-Cimo voice (speech-02-turbo) at speed 1.1 with call-center ambient sound. reCAPTCHA was removed during development — form friction not worth protection complexity for a demo lead form.

## Constraints

- **Tech stack**: Next.js 16 / React 19 / TypeScript / Tailwind CSS 4
- **Retell AI**: All agent provisioning via API — no manual dashboard configuration
- **Cost control**: 120s call cap, rate limiting, to keep Retell API costs predictable
- **Security**: Retell API key never exposed client-side — all calls proxied through API routes

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-path intake only (no Q&A path) | Demo clarity — intake simulation is the "whoa" moment; Q&A dilutes it | ✓ Good |
| Single-prompt agent (not conversation flow) | Simpler to build; demo short enough that branching logic isn't needed | ✓ Good |
| Upstash Redis for rate limiting | Already in stack for lead persistence; no new dependency | ✓ Good |
| reCAPTCHA removed | Form friction not worth protection for low-stakes demo lead form | ✓ Good |
| 120s call cap at per-call level | Avoids Retell agent version mismatch pitfall; set via agent_override | ✓ Good |
| minimax-Cimo voice at speed 1.1 | Better than 11labs-Marissa in live test calls; call-center ambient adds realism | ✓ Good |
| Em dashes banned from prompt | TTS engines produce audible artifacts on em dashes | ✓ Good |
| Lazy Proxy pattern for Ratelimit | Defer getRedis() to first .limit() call; prevents build-time throw when env vars absent | ✓ Good |

---
*Last updated: 2026-03-05 after v1.0 milestone*
