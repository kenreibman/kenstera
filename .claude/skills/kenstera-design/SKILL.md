---
name: kenstera-design
description: Build or restyle any Kenstera page or section in the ElevenLabs-inspired design system (framed column, grainy gradient cards, live product-UI demos, sticky feature rows, scroll text fill). Use whenever adding or changing pages, sections, or components on the Kenstera site.
---

# Kenstera design system (ElevenLabs-style)

Recreate ElevenLabs' patterns, motion and structure with Kenstera's own content and drawn visuals. Never copy their images, copy, logos or font files. Study the reference with Playwright (playwright-core, Edge channel) when in doubt: screenshot sections, list keyframes, watch interactions.

## Rules the owner has given
- Only TheTickSuit is real client proof. No fake reviews, testimonials, stats, logos, or compliance claims (no SOC II / GDPR / HIPAA).
- No blog, no voice-AI demo, no spheres/blobs/orbs, no videos in heroes, no numbered eyebrows or mono labels, no heavy divider lines.
- Illustrations use generic data only: 555 numbers, "Your shop / Another shop", and an "Illustration, not a real customer" note where a review appears.
- Keep the original navigation (Services dropdown with Services + Industries, Case Studies, Contact Us).
- Booking goes to `/contact` (Cal.com `kenstera/meet-with-kenstera`). Email is contact@kenstera.com.
- Must be mobile responsive. Check 390px width: no horizontal scroll.
- Work on a branch. Do not push or go live without the owner's explicit OK.

## Building blocks (use these, don't reinvent)
- `components/el/ui.tsx`: `Container({framed})`, `Section` (hairline top, `scroll-mt-32`), `SectionHeader` (label + big light headline + button left, description right), `Button`, `Card`, `GradientCard`, `CardCaption`.
- `components/el/motion.tsx` (client): `Reveal` (fade/rise on scroll), `ScrollText` (words fill gray to black on scroll), `StickyFeatures` (copy scrolls left, gradient panel pinned right and swaps; stacks on mobile), `useSequence(run, times[])` (timed step playback), `useInView`.
- `app/globals.css`: tokens (`bg-page`, `bg-surface`, `text-subtle`, `border-hairline`), `.grad` + `g-ember|dusk|dawn|moss|iris` (animated grain), `.dotted-row`, `.pop-in`, `.typing-dot`, `.fade-in-up`, `.reveal`.
- Live demos: `components/hvac/live.tsx` (LiveCalls, LiveThread, LiveReview, HvacHeroCard), `components/home/live.tsx` (LiveWebsite, LiveTextBack, LiveReviewRequest, LiveCampaign, LiveLocal), realistic `PhoneFrame` in `components/hvac/mocks.tsx`.

## Page recipe
1. Hero: big regular-weight headline left, short statement right, two pill buttons, then a gradient product card (optionally with a pill toggle or tabs that auto-advance).
2. Statement: `ScrollText` paragraph, then feature chips.
3. Sticky feature rows: one per capability, each with a live animated demo on a gradient.
4. Gradient cards (3-up) for audiences/cases, a dotted-row comparison table, dotted-divider FAQ.
5. Closing gradient card with the primary CTA. Product pages may add a sticky sub-nav under the main nav.

## Gotchas
- `.grad` sets `position: relative` (unlayered CSS beats Tailwind utilities). Put `absolute`/`fixed` on a wrapper, not on the `.grad` element.
- Headings are Inter at weight 400 with tight tracking (forced in globals.css); don't add bold weights to h1/h2.
- Components passing render functions (e.g. `visual`) must be client components; wrap them in a `"use client"` file.
- `html` has smooth scrolling: in Playwright use `scrollTo({top, behavior:"instant"})`.
- After switching branches, delete `.next` if styles look stale.
- Verify with screenshots at 1440px and 390px before reporting done.
