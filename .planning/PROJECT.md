# Kenstera Demo Intake Specialist

## What This Is

A live, interactive demo on the kenstera homepage that lets prospective clients experience AI-powered intake firsthand. Visitors fill out a short form (name, phone, email), and within seconds receive a phone call from an AI intake specialist built on Retell AI. The call demonstrates what their own callers would experience — qualifying leads, handling questions, and guiding conversations naturally.

## Core Value

Prospective clients feel the AI intake experience on their own phone before buying — the single most persuasive sales tool on the site.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage demo form component (name, phone number, email) placed between CRM Integrations and Case Studies sections
- [ ] Form validation with reCAPTCHA to prevent bot submissions
- [ ] Next.js API route to receive form data and trigger Retell AI outbound call
- [ ] Retell AI agent setup via API: LLM response engine, voice agent, and purchased phone number
- [ ] Agent prompt that offers two paths: simulated PI intake demo OR kenstera Q&A
- [ ] Simulated intake path: asks about the caller's situation, qualifies the lead, demonstrates conversational depth
- [ ] Kenstera Q&A path: brief pitch on AI intake automation, mentions key benefits (24/7, booking, CRM integration)
- [ ] Both paths wrap up within ~2 minutes and nudge the caller to visit the website and book a real sales call
- [ ] Rate limiting per IP address and per phone number to prevent API abuse
- [ ] Max call duration cap (2-3 minutes) enforced at the Retell agent level
- [ ] Prompt-level abuse detection: hang up on off-topic, abusive, or clearly exploitative callers
- [ ] Setup script that provisions the entire Retell stack (LLM, agent, phone number) using only the API key
- [ ] Environment variable configuration for Retell API key and agent/phone IDs

### Out of Scope

- Cal.com booking integration from within the demo call — just mention visiting the website
- Call recording playback or transcript display on the frontend
- Multi-language support — English only for v1
- Warm transfer to a live person during the demo call
- SMS follow-up after the demo call
- Analytics dashboard for demo call metrics (use Retell's built-in dashboard)

## Context

Kenstera is an AI intake automation platform targeting law firms (primarily personal injury). The existing site is a Next.js 16 app with React 19, TypeScript, Tailwind CSS 4, Framer Motion, and Radix UI. Backend services include Upstash Redis for lead persistence, Resend for email, and Cal.com for booking.

The homepage currently has 8 sections: ShaderHero → IntakeCall → IntakeBooking → IntakeSetup → CRMIntegrations → CaseStudies → IndustriesFaqBlog → FinalCTA. The demo form section will be inserted between CRMIntegrations and CaseStudies.

Retell AI provides the telephony and conversational AI layer. Key APIs: create-retell-llm (configure prompt/model), create-agent (voice + behavior), purchase phone number, and create-phone-call (trigger outbound call). The agent will use a single-prompt approach with a begin_message greeting, and max_call_duration_ms capped to prevent cost overruns.

Abuse prevention combines frontend (reCAPTCHA, form validation), backend (rate limiting via Upstash Redis), Retell-level (max call duration, geo-restrictions), and prompt-level (detecting and terminating bad-faith callers) protections.

## Constraints

- **Tech stack**: Must integrate into existing Next.js 16 / React 19 / TypeScript / Tailwind CSS 4 codebase
- **Retell AI**: All agent provisioning done via API — no manual dashboard configuration required
- **Cost control**: Max call duration capped at 2-3 minutes, rate limiting enforced, to keep Retell API costs predictable
- **Security**: Retell API key never exposed client-side — all calls proxied through Next.js API routes
- **Design**: Demo section must match existing site aesthetic (earthy tones, glassmorphism, Framer Motion animations)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hybrid demo approach (intake sim OR Q&A) | Pure intake sim requires awkward role-play; pure sales pitch doesn't show the product | — Pending |
| Single-prompt agent (not conversation flow) | Simpler to build and maintain; demo is short enough that branching logic isn't needed | — Pending |
| Upstash Redis for rate limiting | Already in the stack for lead persistence; no new dependency | — Pending |
| reCAPTCHA on form | Retell docs strongly recommend it to prevent bot abuse | — Pending |
| 2-3 minute max call duration | Enough to demonstrate value, short enough to control costs | — Pending |

---
*Last updated: 2026-02-21 after initialization*
