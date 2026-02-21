# Codebase Structure

**Analysis Date:** 2026-02-21

## Directory Layout

```
/c/Users/DESKTOP/kenstera/
├── app/                           # Next.js App Router pages and API routes
│   ├── api/                        # Serverless API endpoints
│   │   ├── newsletter/             # Newsletter subscription
│   │   └── pi-intake-audit/        # Lead capture, booking, abandonment email
│   ├── blog/                       # Blog listing and detail pages
│   ├── case-studies/               # Case studies listing and detail pages
│   ├── industries/                 # Industry-specific landing pages
│   ├── services/                   # Service-specific landing pages
│   ├── pricing/                    # Pricing page
│   ├── contact-sales/              # Contact form page
│   ├── booking-confirmed/          # Booking success confirmation
│   ├── privacy/                    # Privacy policy
│   ├── terms/                      # Terms of service
│   ├── cookies/                    # Cookie policy
│   ├── layout.tsx                  # Root layout with global metadata, fonts, scripts
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # Global Tailwind styles, CSS variables
│   ├── error.tsx                   # Error boundary component
│   ├── loading.tsx                 # Loading UI skeleton
│   └── not-found.tsx               # 404 page
│
├── components/                     # Reusable React components
│   ├── sections/                   # Full-width section components
│   │   ├── ShaderHero.tsx          # Homepage hero with shader animations
│   │   ├── IntakeCall.tsx          # Intake call feature section
│   │   ├── IntakeBooking.tsx       # Booking feature section
│   │   ├── IntakeSetup.tsx         # Setup/onboarding feature section
│   │   ├── CRMIntegrations.tsx     # Integrations showcase
│   │   ├── CaseStudies.tsx         # Featured case studies carousel
│   │   ├── FAQ.tsx                 # FAQ section
│   │   ├── FinalCTA.tsx            # Call-to-action footer
│   │   ├── Objections.tsx          # Objection handling section
│   │   ├── Leads.tsx               # Leads feature section
│   │   ├── Flow.tsx                # Process flow section
│   │   ├── Pricing.tsx             # Pricing overview section
│   │   ├── DashboardPreview.tsx    # Product screenshot section
│   │   ├── About.tsx               # About company section
│   │   └── Hero.tsx                # Generic hero component
│   │
│   ├── blog/                       # Blog-specific components
│   │   ├── MDXComponents.tsx       # Custom markdown renderers (headings, code, links, etc.)
│   │   ├── BlogCard.tsx            # Blog post card for listings
│   │   ├── TableOfContents.tsx     # Sticky TOC sidebar
│   │   ├── AuthorCard.tsx          # Author metadata and reading time
│   │   └── NewsletterCTA.tsx       # Newsletter signup CTA
│   │
│   ├── case-studies/               # Case study-specific components
│   │   ├── CaseStudySidebar.tsx    # Case study sidebar with TOC and metadata
│   │   └── [other case study UI components]
│   │
│   ├── industries/                 # Industry page components
│   │   └── [industry page sections]
│   │
│   ├── ui/                         # Shadcn/Radix UI primitives
│   │   ├── button.tsx              # Button component
│   │   ├── carousel.tsx            # Carousel wrapper
│   │   ├── sheet.tsx               # Mobile menu sheet
│   │   └── [other Radix-based components]
│   │
│   ├── LayoutWrapper.tsx           # Conditional nav/footer visibility based on route
│   ├── MainNavigation.tsx          # Header navigation with mobile menu
│   ├── Footer.tsx                  # Site footer
│   ├── PricingCards.tsx            # Pricing card grid
│   ├── SectionHeader.tsx           # Reusable section title/description
│   ├── StickyNav.tsx               # Alternate navigation variant
│   ├── Video.tsx                   # Video embed wrapper
│   └── ProjectsCarousel.tsx        # Project showcase carousel
│
├── content/                        # Markdown/MDX content files (source of truth)
│   ├── blog/                       # Blog post MDX files
│   │   ├── ai-intake-automation-law-firms.mdx
│   │   ├── law-firm-seo-without-ads.mdx
│   │   ├── law-firm-website-conversion.mdx
│   │   ├── personal-injury-client-journey.mdx
│   │   └── top-ranked-pi-firms-analysis.mdx
│   │
│   ├── case-studies/               # Case study MDX files
│   │   ├── david-w-personal-injury.mdx
│   │   ├── lily-n-bilingual-intake.mdx
│   │   ├── maria-t-operations.mdx
│   │   └── [more case studies]
│   │
│   ├── industries/                 # Industry landing page content objects
│   │   ├── default.ts
│   │   ├── healthcare.ts
│   │   ├── law.ts
│   │   └── real-estate.ts
│   │
│   └── services/                   # Service landing page content objects
│       ├── default.ts
│       ├── intake-and-scheduling.ts
│       ├── custom-development.ts
│       └── support-automation.ts
│
├── lib/                            # Utility functions and helpers
│   ├── blog.ts                     # Blog post loading, slug generation, formatting
│   ├── case-studies.ts             # Case study loading, TOC extraction, slug generation
│   ├── industry-content.ts         # Industry content registry and helpers
│   ├── service-content.ts          # Service content registry and helpers
│   ├── utils.ts                    # General utility functions
│   │
│   ├── db/                         # Database/persistence layer
│   │   └── leads.ts                # Redis lead CRUD operations
│   │
│   └── email/                      # Email service layer
│       └── send.ts                 # Resend email client and templates
│
├── public/                         # Static assets (images, videos, icons)
│   ├── images/                     # Optimized images
│   ├── video/                      # Video files
│   ├── logo-main.svg               # Brand logo
│   ├── og-image.jpg                # OpenGraph image for social sharing
│   └── favicon.ico                 # Browser favicon
│
├── .planning/                      # GSD planning documents (auto-generated)
│   └── codebase/                   # Architecture and structure analysis
│
├── Configuration Files:
│   ├── package.json                # Dependencies, scripts (dev, build, start, lint)
│   ├── tsconfig.json               # TypeScript compiler config with path alias (@/*)
│   ├── tailwind.config.ts          # Tailwind CSS configuration
│   ├── postcss.config.mjs          # PostCSS plugins for Tailwind
│   ├── next.config.ts              # Next.js build configuration
│   ├── components.json             # Shadcn component registry
│   ├── eslint.config.mjs           # ESLint rules
│   └── README.md                   # Project documentation
│
└── Git:
    └── .git/                       # Git repository
```

---

## Directory Purposes

**`app/`:**
- Purpose: Next.js 16 App Router pages and serverless API routes
- Contains: Route definitions, page components, API endpoints, layouts, error pages
- Key files: `layout.tsx` (root layout), `page.tsx` (homepage), route-specific directories

**`app/api/`:**
- Purpose: Serverless API endpoints for business logic and webhooks
- Contains: POST handlers for form submissions (newsletter, intake, booking), scheduled tasks
- Key files: `newsletter/route.ts`, `pi-intake-audit/capture/route.ts`, `pi-intake-audit/booked/route.ts`, `pi-intake-audit/send-abandonment/route.ts`

**`app/blog/`:**
- Purpose: Blog pages (listing and individual post views)
- Contains: `page.tsx` (blog list), `[slug]/page.tsx` (individual post with MDX rendering)
- Key files: Static generation via `generateStaticParams()`, uses `lib/blog.ts` for content loading

**`app/case-studies/`:**
- Purpose: Case study pages (listing and detail views)
- Contains: `page.tsx` (case studies list), `[slug]/page.tsx` (detail with sidebar, TOC, video)
- Key files: Uses `lib/case-studies.ts`, renders MDX with custom components

**`app/industries/` & `app/services/`:**
- Purpose: Industry-specific and service-specific landing pages
- Contains: `[slug]/page.tsx` routes that render content from registry objects
- Key files: Uses `lib/industry-content.ts` and `lib/service-content.ts`

**`components/`:**
- Purpose: Reusable React components for page composition
- Contains: Section components (full-width sections), UI primitives, layout wrappers, custom renderers
- Key patterns: Stateless or minimally stateful, composition over inheritance, Tailwind-styled

**`components/sections/`:**
- Purpose: Full-width, self-contained page sections (hero, features, testimonials, CTA)
- Contains: Marketing content and CTAs, animations with Framer Motion, carousel/gallery widgets
- Usage: Import and compose into pages for flexible homepage and landing page layouts

**`components/blog/`:**
- Purpose: Blog-specific UI components
- Contains: MDX custom component renderers, blog post cards, TOC, author cards, newsletter CTAs
- Key files: `MDXComponents.tsx` (maps markdown to React components), `TableOfContents.tsx` (sticky sidebar)

**`components/ui/`:**
- Purpose: Shadcn/Radix UI primitive components
- Contains: Button, Sheet, Carousel, and other base components with consistent styling
- Usage: Import into higher-level components for accessibility and consistent behavior

**`content/`:**
- Purpose: Source of truth for blog posts, case studies, and landing page content
- Contains: MDX files for markdown content, TypeScript objects for structured page data
- Structure: Organized by content type (blog, case-studies, industries, services)

**`content/blog/` & `content/case-studies/`:**
- Purpose: MDX-based long-form content with frontmatter metadata
- Format: YAML frontmatter + markdown body + MDX components
- Metadata: title, description, date, updated, author, tags, keywords, hero image, canonical URL

**`content/industries/` & `content/services/`:**
- Purpose: Typed JavaScript/TypeScript content objects for dynamic landing pages
- Format: Exported objects matching `IndustryContent` interface
- Structure: Hero section, use cases, features, FAQs, integrations, CTAs

**`lib/`:**
- Purpose: Pure utility functions and business logic helpers (content loading, validation, formatting)
- Contains: File-system readers, database CRUD, email templates, type definitions
- No side effects on import (except singletons for external clients)

**`lib/db/`:**
- Purpose: Data persistence layer for intake audit leads
- Contains: Lead model, Redis client singleton, CRUD functions with TTL management
- Depends on: Upstash Redis

**`lib/email/`:**
- Purpose: Email sending logic and templates
- Contains: Resend client singleton, email template building, HTML escaping
- Usage: Called from API routes and QStash-triggered jobs

**`public/`:**
- Purpose: Static assets served at root URL (images, videos, icons)
- Contains: Optimized images (next/image compatible), SVGs, brand assets, OG image
- Usage: Referenced in components via relative paths (e.g., `/logo-main.svg`)

---

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout with metadata, fonts, analytics integration
- `app/page.tsx`: Homepage composition with section components
- `app/blog/page.tsx`: Blog listing page
- `app/blog/[slug]/page.tsx`: Dynamic blog post page with MDX rendering
- `app/case-studies/[slug]/page.tsx`: Case study detail with TOC and sidebar

**Configuration:**
- `tsconfig.json`: TypeScript config with `@/*` path alias
- `next.config.ts`: Next.js build config
- `tailwind.config.ts`: Tailwind CSS design tokens and customization
- `eslint.config.mjs`: Linting rules
- `components.json`: Shadcn component registry

**Core Logic:**
- `lib/blog.ts`: Blog content loader with Zod-style path validation
- `lib/case-studies.ts`: Case study loader with TOC extraction from markdown
- `lib/db/leads.ts`: Lead persistence with Redis backend
- `lib/email/send.ts`: Abandonment email template and Resend integration

**API Routes:**
- `app/api/newsletter/route.ts`: Newsletter subscription handler with Resend
- `app/api/pi-intake-audit/capture/route.ts`: Lead form capture with QStash scheduling
- `app/api/pi-intake-audit/booked/route.ts`: Webhook handler for booking confirmation
- `app/api/pi-intake-audit/send-abandonment/route.ts`: QStash scheduled task for abandonment emails

---

## Naming Conventions

**Files:**
- **React components:** PascalCase, e.g., `BlogCard.tsx`, `MainNavigation.tsx`
- **Utility modules:** camelCase, e.g., `blog.ts`, `leads.ts`
- **API routes:** `route.ts` in numbered directory structure, e.g., `app/api/newsletter/route.ts`
- **Content files:** kebab-case slugs, e.g., `ai-intake-automation-law-firms.mdx`

**Directories:**
- **Page directories:** kebab-case, e.g., `pi-intake-audit/`, `case-studies/`
- **Dynamic routes:** `[paramName]`, e.g., `[slug]` for blog posts
- **Feature directories:** kebab-case or feature name, e.g., `components/blog/`, `components/ui/`

**Exports:**
- **Components:** Named exports using component name, e.g., `export function BlogCard()`
- **Utilities:** Named exports for each function, e.g., `export function getAllPosts()`
- **Types/Interfaces:** PascalCase, e.g., `export interface BlogPost`, `export type LeadStatus`

**Variables & Functions:**
- **Constants:** UPPER_SNAKE_CASE (for module-level constants), e.g., `BLOG_DIR`, `HIDDEN_LAYOUT_ROUTES`
- **Functions:** camelCase, e.g., `getPostBySlug()`, `createLead()`, `sendAbandonmentEmail()`
- **CSS classes:** Tailwind utility classes, custom classes in kebab-case, e.g., `bg-background`, `text-foreground`

---

## Where to Add New Code

**New Blog Post:**
- Content file: `content/blog/[slug-name].mdx` with YAML frontmatter (title, description, date, author, tags, keywords)
- Component: No component needed—use existing `app/blog/[slug]/page.tsx`
- Automatic: Slug automatically discovered via `getAllSlugs()` at build time

**New Case Study:**
- Content file: `content/case-studies/[slug-name].mdx` with extended frontmatter (clientName, clientPhoto, pullQuote, stats, sidebarMeta, toc)
- Component: No component needed—use existing `app/case-studies/[slug]/page.tsx`
- Automatic: Slug automatically discovered and TOC extracted at build time

**New Industry Landing Page:**
- Content object: `content/industries/[industry-name].ts` exporting `[industryName]Content` matching `IndustryContent` interface
- Registry update: Add import and registry entry in `lib/industry-content.ts`
- Page component: Use existing `app/industries/[slug]/page.tsx`
- No file system scanning needed—registry-driven

**New Service Landing Page:**
- Content object: `content/services/[service-name].ts` following `IndustryContent` interface
- Registry update: Add import and registry entry in `lib/service-content.ts`
- Page component: Use existing `app/services/[slug]/page.tsx`

**New Homepage Section:**
- Component file: `components/sections/[SectionName].tsx` as React component exporting named function
- Page import: Add import to `app/page.tsx` and include in JSX composition
- Styling: Use Tailwind utility classes, no scoped CSS
- Animation: Use Framer Motion for motion effects, keep motion-library imports minimal

**New UI Primitive:**
- Component file: `components/ui/[component-name].tsx` from Shadcn or custom
- Export: Named export matching Shadcn conventions
- Usage: Import into higher-level components

**New Utility Function:**
- File location: `lib/[feature].ts` or `lib/[category]/[feature].ts`
- Export: Named exports, no default exports
- Types: Define interfaces/types in same file, prefix with capital letter
- Testing: Co-located test files with `.test.ts` suffix (if added)

**New API Route:**
- File location: `app/api/[feature]/[action]/route.ts`
- Pattern: POST handler with Zod validation, error handling, logging with context prefix
- Secrets: Reference via `process.env.VAR_NAME`, never commit secrets to code
- Logging: Use console with `[Feature]` prefix for traceability

**Static Asset (Image, Video, Icon):**
- Location: `public/[asset-type]/[name].[ext]`
- Usage: Reference via `/asset-type/name.ext` in components or metadata
- Images: Use Next.js `Image` component with `src`, `alt`, and `fill` or `width/height`

---

## Special Directories

**`.git/`:**
- Purpose: Git version control
- Generated: Yes
- Committed: Yes (repo initialized)

**`.next/`:**
- Purpose: Next.js build output and cached compilation
- Generated: Yes (on `npm run build` or `npm run dev`)
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (on `npm install`)
- Committed: No (in `.gitignore`)

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents (ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md, STACK.md, INTEGRATIONS.md)
- Generated: Yes (auto-generated by `/gsd:map-codebase` command)
- Committed: Yes (tracked for future phases)

---

## Import Path Aliases

**Configured in `tsconfig.json`:**
- `@/*` → `./` (root directory)

**Usage Examples:**
```typescript
import { BlogCard } from '@/components/blog'
import { getPostBySlug } from '@/lib/blog'
import { getAllPosts } from '@/lib/blog'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import { ShaderHero } from '@/components/sections/ShaderHero'
```

---

*Structure analysis: 2026-02-21*
