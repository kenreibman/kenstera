# Codebase Structure

**Analysis Date:** 2026-03-05

## Directory Layout

```
kenstera/
├── app/                        # Next.js App Router pages and API routes
│   ├── layout.tsx              # Root layout (font, metadata, analytics, pixel)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles (Tailwind v4)
│   ├── loading.tsx             # Global loading state
│   ├── error.tsx               # Global error boundary
│   ├── not-found.tsx           # Global 404
│   ├── api/                    # Serverless API routes
│   │   ├── demo-call/          # Demo call triggering
│   │   │   ├── route.ts        # Retell outbound call + rate limiting
│   │   │   └── send-followup/  # QStash webhook for follow-up email
│   │   │       └── route.ts
│   │   ├── newsletter/         # Newsletter subscription
│   │   │   └── route.ts
│   │   └── pi-intake-audit/    # Lead capture funnel
│   │       ├── capture/        # Lead form submission
│   │       │   └── route.ts
│   │       ├── booked/         # Mark lead as booked
│   │       │   └── route.ts
│   │       └── send-abandonment/ # QStash webhook for abandonment email
│   │           └── route.ts
│   ├── blog/                   # Blog listing + [slug] detail
│   ├── booking-confirmed/      # Post-booking confirmation page
│   │   └── components/         # Co-located page components
│   ├── case-studies/           # Case studies listing + [slug] detail
│   ├── contact-sales/          # Contact/sales page
│   ├── cookies/                # Cookie policy
│   ├── industries/             # Industry pages (listing + [slug])
│   ├── pi-intake-audit/        # PI intake audit landing page
│   │   └── components/         # Co-located page components
│   ├── pricing/                # Pricing page
│   │   └── components/         # Co-located page components
│   ├── privacy/                # Privacy policy
│   ├── services/               # Service pages (listing + [slug])
│   └── terms/                  # Terms of service
├── components/                 # Shared React components
│   ├── LayoutWrapper.tsx       # Conditional nav/footer wrapper
│   ├── MainNavigation.tsx      # Site navigation
│   ├── Footer.tsx              # Site footer
│   ├── StickyNav.tsx           # Sticky navigation component
│   ├── SectionHeader.tsx       # Reusable section header
│   ├── PricingCards.tsx        # Pricing cards (shared)
│   ├── ProjectsCarousel.tsx    # Projects carousel
│   ├── Video.tsx               # Video component
│   ├── blog/                   # Blog-specific components
│   │   ├── index.ts            # Barrel export
│   │   ├── AuthorCard.tsx
│   │   ├── BlogCard.tsx
│   │   ├── Callout.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── MDXComponents.tsx
│   │   ├── NewsletterCTA.tsx
│   │   └── TableOfContents.tsx
│   ├── case-studies/           # Case study components
│   │   ├── CaseStudyCard.tsx
│   │   └── CaseStudySidebar.tsx
│   ├── industries/             # Industry page section components (also used by services)
│   │   ├── index.ts            # Barrel export
│   │   ├── IndustriesHero.tsx
│   │   ├── IndustriesUseCases.tsx
│   │   ├── IndustriesVoiceAgents.tsx
│   │   ├── IndustriesMultimodal.tsx
│   │   ├── IndustriesWorkflows.tsx
│   │   ├── IndustriesCustomizable.tsx
│   │   ├── IndustriesIntegrations.tsx
│   │   ├── IndustriesGettingStarted.tsx
│   │   ├── IndustriesFaqBlog.tsx
│   │   └── IndustriesCta.tsx
│   ├── sections/               # Homepage and shared section components
│   │   ├── Hero.tsx
│   │   ├── ShaderHero.tsx      # Homepage hero with shader background
│   │   ├── About.tsx
│   │   ├── BlogSection.tsx
│   │   ├── CRMIntegrations.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── DemoForm.tsx        # Demo call request form
│   │   ├── CaseStudies.tsx     # Featured case studies
│   │   ├── FinalCTA.tsx        # Bottom CTA section
│   │   ├── FAQ.tsx
│   │   ├── Flow.tsx
│   │   ├── IntakeBooking.tsx
│   │   ├── IntakeCall.tsx
│   │   ├── IntakeSetup.tsx
│   │   ├── Leads.tsx
│   │   ├── Objections.tsx
│   │   ├── Platforms.tsx
│   │   ├── Pricing.tsx
│   │   ├── Projects.tsx
│   │   ├── SecurityCompliance.tsx
│   │   ├── Services.tsx
│   │   └── Testimonials.tsx
│   └── ui/                     # Primitive UI components (shadcn/ui style)
│       ├── button.tsx
│       ├── carousel.tsx
│       └── sheet.tsx
├── content/                    # Static content (MDX + TS data)
│   ├── blog/                   # Blog posts (MDX with frontmatter)
│   │   ├── ai-intake-automation-law-firms.mdx
│   │   ├── law-firm-seo-without-ads.mdx
│   │   ├── law-firm-website-conversion.mdx
│   │   ├── personal-injury-client-journey.mdx
│   │   └── top-ranked-pi-firms-analysis.mdx
│   ├── case-studies/           # Case study articles (MDX)
│   │   ├── david-w-personal-injury.mdx
│   │   ├── lily-n-bilingual-intake.mdx
│   │   └── maria-t-operations.mdx
│   ├── industries/             # Industry page data (TS exports)
│   │   ├── default.ts
│   │   ├── healthcare.ts
│   │   ├── law.ts
│   │   └── real-estate.ts
│   └── services/               # Service page data (TS exports)
│       ├── default.ts
│       ├── intake-and-scheduling.ts
│       ├── custom-development.ts
│       └── support-automation.ts
├── lib/                        # Business logic and utilities
│   ├── blog.ts                 # Blog content reader
│   ├── case-studies.ts         # Case study content reader
│   ├── industry-content.ts     # Industry content registry + types
│   ├── service-content.ts      # Service content registry
│   ├── utils.ts                # cn() helper (clsx + tailwind-merge)
│   ├── db/                     # Data access (Upstash Redis)
│   │   ├── leads.ts            # Intake audit lead CRUD
│   │   └── demo-leads.ts       # Demo call lead CRUD
│   ├── email/                  # Email sending (Resend)
│   │   └── send.ts             # Abandonment + follow-up email functions
│   ├── rate-limit/             # Rate limiting (Upstash Ratelimit)
│   │   └── demo-call.ts        # IP + phone rate limiters (lazy proxy)
│   ├── recaptcha/              # reCAPTCHA verification
│   │   └── verify.ts           # Token verification helper
│   └── retell/                 # Retell AI voice agent
│       └── client.ts           # Retell SDK singleton (server-only)
├── public/                     # Static assets
│   ├── images/                 # Image assets
│   ├── video/                  # Video assets
│   ├── logo-main.svg           # Main logo
│   └── og-image.jpg            # Open Graph image
├── scripts/                    # Utility scripts (run via tsx)
│   ├── setup-retell.ts         # Retell agent setup
│   └── update-agent-prompt.ts  # Retell agent prompt update
├── .planning/                  # Planning documents
├── next.config.ts              # Next.js config (security headers, image optimization)
├── tsconfig.json               # TypeScript config (path alias @/* -> ./*)
├── tsconfig.scripts.json       # TypeScript config for scripts/
├── postcss.config.mjs          # PostCSS config (Tailwind)
├── eslint.config.mjs           # ESLint config
├── components.json             # shadcn/ui component config
└── package.json                # Dependencies and scripts
```

## Directory Purposes

**`app/`:**
- Purpose: All routes and pages following Next.js App Router conventions
- Contains: `page.tsx` (route component), `layout.tsx` (layout wrapper), `route.ts` (API handler), `error.tsx`, `not-found.tsx`, `loading.tsx`
- Key files: `app/layout.tsx` (root layout), `app/page.tsx` (homepage)

**`app/api/`:**
- Purpose: Serverless API endpoints organized by feature
- Contains: Route handlers in nested directories following REST-like structure
- Key files: `app/api/demo-call/route.ts` (most complex route), `app/api/pi-intake-audit/capture/route.ts`

**`app/pi-intake-audit/`:**
- Purpose: Ad landing page for personal injury intake audit funnel
- Contains: Page-specific components co-located in `components/` subdirectory (IntakeWizard, CalendarEmbed, ContactForm, Hero, Testimonials, CompaniesWorkedWith)
- Key files: `app/pi-intake-audit/page.tsx`, `app/pi-intake-audit/components/IntakeWizard.tsx`

**`app/booking-confirmed/`:**
- Purpose: Post-booking confirmation landing page
- Contains: Co-located components (ConfirmationHero, FeaturedPosts, NextSteps) with barrel export

**`app/pricing/`:**
- Purpose: Pricing page
- Contains: Co-located components (PricingCards, PricingCTA, PricingFAQ)

**`components/`:**
- Purpose: Shared components used across multiple pages
- Contains: Domain-grouped subdirectories (`blog/`, `industries/`, `sections/`, `ui/`, `case-studies/`) and standalone shared components
- Key files: `components/LayoutWrapper.tsx`, `components/industries/index.ts` (barrel)

**`components/sections/`:**
- Purpose: Full-width page sections primarily used on the homepage
- Contains: Hero variants, feature sections, CTAs, testimonials, FAQ, integrations, demo form

**`components/industries/`:**
- Purpose: Section components for industry AND service landing pages (shared via same `IndustryContent` interface)
- Contains: 10 composable section components with barrel export
- Key pattern: Both `app/industries/[slug]/page.tsx` and `app/services/[slug]/page.tsx` import from this directory

**`components/ui/`:**
- Purpose: Low-level UI primitives following shadcn/ui conventions
- Contains: Button (with CVA variants), carousel (Embla-based), sheet (Radix Dialog)

**`content/`:**
- Purpose: All static content separated from presentation
- Contains: MDX articles (`blog/`, `case-studies/`) and TypeScript data objects (`industries/`, `services/`)

**`lib/`:**
- Purpose: All business logic, data access, and external service wrappers
- Contains: Content readers, database modules, email module, rate limiting, reCAPTCHA, Retell client
- Key files: `lib/blog.ts`, `lib/db/leads.ts`, `lib/email/send.ts`

**`scripts/`:**
- Purpose: One-off setup and maintenance scripts for Retell AI agent configuration
- Contains: TypeScript scripts run via `npx tsx --tsconfig tsconfig.scripts.json`

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout, Inter font, global metadata, Vercel Analytics, Meta Pixel
- `app/page.tsx`: Homepage composition of section components
- `app/api/demo-call/route.ts`: Demo call API (rate limiting, Retell, QStash scheduling)

**Configuration:**
- `next.config.ts`: Security headers, image formats (AVIF/WebP), package import optimization
- `tsconfig.json`: TypeScript config with `@/*` path alias mapping to `./*`
- `tsconfig.scripts.json`: Separate TS config for `scripts/` directory
- `postcss.config.mjs`: PostCSS with `@tailwindcss/postcss` plugin
- `eslint.config.mjs`: ESLint with `eslint-config-next`
- `components.json`: shadcn/ui component configuration

**Core Logic:**
- `lib/blog.ts`: Blog post reading (`getAllPosts`, `getPostBySlug`, `getAllSlugs`, `formatDate`)
- `lib/case-studies.ts`: Case study reading with TOC extraction from H2 headings
- `lib/industry-content.ts`: Industry content registry, `IndustryContent` interface definition
- `lib/service-content.ts`: Service content registry (reuses `IndustryContent` type)
- `lib/db/leads.ts`: Intake lead CRUD (create, get, updateStatus) on Upstash Redis
- `lib/db/demo-leads.ts`: Demo lead CRUD on Upstash Redis
- `lib/email/send.ts`: `sendAbandonmentEmail()` and `sendDemoFollowUpEmail()` via Resend with HTML + plaintext
- `lib/rate-limit/demo-call.ts`: Lazy Ratelimit with Proxy pattern (1 req / 10 min sliding window)
- `lib/retell/client.ts`: Retell SDK singleton, server-only (throws if imported client-side)
- `lib/recaptcha/verify.ts`: Google reCAPTCHA v3 token verification

**Testing:**
- No test files exist in the codebase

## Naming Conventions

**Files:**
- React components: PascalCase (`IntakeWizard.tsx`, `BlogCard.tsx`, `ShaderHero.tsx`)
- Utility/lib modules: kebab-case (`industry-content.ts`, `demo-leads.ts`, `demo-call.ts`)
- Next.js conventions: lowercase (`page.tsx`, `layout.tsx`, `route.ts`, `error.tsx`, `not-found.tsx`, `loading.tsx`)
- Content files: kebab-case (`ai-intake-automation-law-firms.mdx`, `intake-and-scheduling.ts`)

**Directories:**
- Feature/domain groups: kebab-case (`pi-intake-audit/`, `case-studies/`, `demo-call/`)
- Component groups: kebab-case (`sections/`, `blog/`, `industries/`, `ui/`)
- Dynamic segments: `[param]` bracket notation (`[slug]/`)

**Components:**
- Industry components: `Industries` prefix (`IndustriesHero`, `IndustriesUseCases`, etc.)
- Section components: Descriptive names (`IntakeCall`, `CRMIntegrations`, `DashboardPreview`)
- UI primitives: lowercase kebab-case files, PascalCase exports (`button.tsx` exports `Button`)

**Exports:**
- Components: Named function exports (`export function BlogCard()`)
- Content data: Named exports with `Content` suffix (`healthcareContent`, `lawContent`, `defaultContent`)
- Types/interfaces: PascalCase (`BlogPost`, `Lead`, `IndustryContent`, `LeadStatus`)
- Constants: UPPER_SNAKE_CASE (`BLOG_DIR`, `HIDDEN_LAYOUT_ROUTES`, `MAX_CALL_DURATION_MS`)
- Functions: camelCase (`getPostBySlug()`, `createLead()`, `sendAbandonmentEmail()`)

**Barrel Exports:**
- Used in `components/blog/index.ts` and `components/industries/index.ts`
- Used in `app/booking-confirmed/components/index.ts`
- Pattern: re-export all public components from subdirectory

## Where to Add New Code

**New Page:**
- Create directory in `app/[page-name]/`
- Add `page.tsx` (and optionally `layout.tsx`, `error.tsx`, `not-found.tsx`)
- If landing page (no nav/footer), add route to `HIDDEN_LAYOUT_ROUTES` array in `components/LayoutWrapper.tsx`
- Page-specific components go in `app/[page-name]/components/` (co-located pattern)

**New Industry:**
- Create content file in `content/industries/[slug].ts` exporting an `IndustryContent` object
- Register in `lib/industry-content.ts` by importing and adding to `industryRegistry`
- No page file needed; `app/industries/[slug]/page.tsx` handles it via `generateStaticParams()`

**New Service:**
- Create content file in `content/services/[slug].ts` exporting an `IndustryContent` object (same interface as industries)
- Register in `lib/service-content.ts` by importing and adding to `serviceRegistry`
- No page file needed; `app/services/[slug]/page.tsx` handles it via `generateStaticParams()`

**New Blog Post:**
- Create MDX file in `content/blog/[slug].mdx`
- Required frontmatter: `title`, `description`, `date`, `author`, `tags`, `keywords`
- Optional frontmatter: `updated`, `canonical`, `heroImage`
- Automatically discovered by `lib/blog.ts` filesystem reader at build time

**New Case Study:**
- Create MDX file in `content/case-studies/[slug].mdx`
- Required frontmatter: `title`, `description`, `date`, `author`, `tags`, `category`, `clientName`, `clientTitle`, `pullQuote`, `stats`
- Optional: `keywords`, `canonical`, `heroImage`, `clientPhoto`, `videoUrl`, `industry`, `useTag`, `firmSize`, `location`
- H2 headings automatically extracted for table of contents

**New API Route:**
- Create `app/api/[feature]/route.ts` (or nested `app/api/[feature]/[action]/route.ts`)
- Use Zod for request body validation with `safeParse`
- Follow pattern: try-catch wrapper, `{ success: boolean, error?: string }` responses, `console.log` with `[Feature]` prefix
- For QStash webhooks: verify signature with `@upstash/qstash` `Receiver`
- If data persistence needed, create module in `lib/db/`

**New Shared Component:**
- Reusable across pages: add to `components/` root or appropriate subdirectory
- Homepage sections: `components/sections/[SectionName].tsx`
- Blog-specific: `components/blog/[ComponentName].tsx` and add to barrel export
- Industry/service sections: `components/industries/[ComponentName].tsx` and add to barrel export
- UI primitives: `components/ui/[component-name].tsx` (follow shadcn/ui pattern with CVA)

**New Library Module:**
- Data access: `lib/db/[module].ts` (follow Redis singleton pattern from `lib/db/leads.ts`)
- External service: `lib/[service-name]/client.ts` (follow lazy singleton pattern)
- Content reader: `lib/[content-type].ts` (follow pattern from `lib/blog.ts`)
- Utility: `lib/[name].ts`

## Special Directories

**`.next/`:**
- Purpose: Next.js build output and dev server cache
- Generated: Yes
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes
- Committed: No (in `.gitignore`)

**`.planning/`:**
- Purpose: Project planning and codebase analysis documents
- Generated: No (authored/generated by GSD commands)
- Committed: Yes

**`public/`:**
- Purpose: Static assets served at root URL path (`/images/...`, `/logo-main.svg`, etc.)
- Generated: No
- Committed: Yes

**`content/`:**
- Purpose: Content separated from code; MDX articles and TS data modules
- Generated: No (authored by content team)
- Committed: Yes

## Import Path Aliases

**Configured in `tsconfig.json`:**
- `@/*` maps to `./*` (project root)

**Usage:**
```typescript
import { BlogCard } from '@/components/blog'
import { getPostBySlug } from '@/lib/blog'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import { createLead } from '@/lib/db/leads'
import { retell } from '@/lib/retell/client'
```

---

*Structure analysis: 2026-03-05*
