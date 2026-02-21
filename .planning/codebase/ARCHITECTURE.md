# Architecture

**Analysis Date:** 2026-02-21

## Pattern Overview

**Overall:** Next.js 16 full-stack web application with filesystem-based content management and serverless backend integrations.

**Key Characteristics:**
- App Router architecture with both SSG and server-rendered pages
- Content-driven design: blog posts, case studies, industries, and services all built from MDX files
- Hybrid frontend/backend: React components for UI + serverless API routes for business logic
- Third-party integrations: Upstash Redis for lead persistence, QStash for scheduled tasks, Resend for email, Cal.com for scheduling
- Dynamic routing: slug-based content pages generated statically at build time
- Layered component system: reusable UI components, section components, and page-specific layouts

---

## Layers

**Presentation Layer (UI/Components):**
- Purpose: Render user-facing interfaces for browsing content, filling forms, and viewing structured information
- Location: `components/` directory containing reusable components, section components, and form logic
- Contains: React components (TSX), UI primitives, navigation, footers, carousels, CTAs, form handlers
- Depends on: Content layer (via lib utilities), Shadcn UI components, Framer Motion, Radix UI
- Used by: Page routes in `app/` directory

**Content/Data Layer:**
- Purpose: Parse and serve MDX-based content files with metadata (frontmatter), generate reading times, table of contents, and provide type-safe interfaces
- Location: `lib/` directory with utilities (`blog.ts`, `case-studies.ts`, `industry-content.ts`, `service-content.ts`) and content files in `content/`
- Contains: Content readers with file-system operations, frontmatter parsing via gray-matter, reading-time calculations, TypeScript interfaces, static content objects
- Depends on: Node.js file system, gray-matter, reading-time libraries
- Used by: Page routes for SSG/SSR, components for content display

**Database/Persistence Layer:**
- Purpose: Manage lead records with CRUD operations, status tracking, and TTL-based expiration
- Location: `lib/db/leads.ts`
- Contains: Lead model interface, Upstash Redis singleton, CRUD functions (create, read, update), key generation
- Depends on: Upstash Redis REST API
- Used by: Intake audit API routes and abandonment email logic

**API Layer (Serverless Routes):**
- Purpose: Handle form submissions, webhook callbacks, scheduled tasks, and side effects (email, database updates)
- Location: `app/api/` with routes for newsletter signup, intake audit capture, booking confirmation, abandonment email scheduling
- Contains: POST/GET handlers with Zod validation, error handling, external service calls
- Depends on: Resend (email), Upstash QStash (task scheduling), Upstash Redis (persistence), NextResponse
- Used by: Frontend forms and external webhooks (Cal.com)

**Email/Notification Layer:**
- Purpose: Send transactional emails with templated HTML and plain-text fallbacks
- Location: `lib/email/send.ts`
- Contains: Resend client singleton, abandonment email template with personalization and escaped HTML
- Depends on: Resend email service
- Used by: QStash-triggered abandonment email route

**Page Router/Layout Layer:**
- Purpose: Define route structure, metadata, static generation strategies, and page composition
- Location: Root `app/layout.tsx`, `app/page.tsx`, and nested routes under `app/blog/`, `app/case-studies/`, `app/industries/`, `app/services/`, `app/pricing/`, etc.
- Contains: Route definitions, metadata generation, SSG params generation, page composition via section components
- Depends on: Content layer for data fetching, components for rendering
- Used by: Next.js router to serve HTTP responses

---

## Data Flow

**Blog Post Rendering:**

1. User navigates to `/blog` or `/blog/[slug]`
2. Page route calls `getAllPosts()` or `getPostBySlug()` from `lib/blog.ts`
3. Library reads `.mdx` files from `content/blog/`, parses frontmatter, extracts content, calculates reading time
4. Page component receives typed `BlogPost` or `BlogPostMeta` objects
5. MDXRemote component renders MDX content with custom components from `components/blog/MDXComponents.ts`
6. Metadata hook generates OG tags, JSON-LD structured data, and SEO meta tags

**Case Studies with Table of Contents:**

1. Similar to blog posts, but with additional TOC extraction from H2 headings in `lib/case-studies.ts`
2. Page extracts heading IDs for anchor links, client photo, pull quotes, stats
3. CaseStudySidebar component displays TOC and metadata sidebar on desktop (sticky)
4. Mobile view collapses sidebar and shows breadcrumb navigation

**Intake Audit Lead Capture:**

1. User submits form on `/pi-intake-audit` page with email, name, website, role, inbound leads count
2. Form POSTs to `/api/pi-intake-audit/capture` endpoint
3. Route validates input with Zod schema, creates Lead record in Upstash Redis
4. Route schedules abandonment email via QStash (15-minute delay)
5. Frontend receives success response, stores leadId in session/localStorage for booking tracking
6. If user books via Cal.com callback, `/api/pi-intake-audit/booked` updates lead status to "booked"
7. QStash job fires at 15-minute mark, checks if status is still "pending"
8. If pending, sends abandonment email via Resend with personalized booking link

**Newsletter Subscription:**

1. User submits email in footer or CTA components
2. POSTs to `/api/newsletter`
3. Route validates email, calls Resend to add contact to audience
4. Returns success, handles duplicate email gracefully

**Static Generation:**

- `generateStaticParams()` in blog and case study routes generates all slug routes at build time
- `getAllSlugs()` and `getAllCaseStudySlugs()` scan filesystem during build
- Pages are pre-rendered as static HTML with ISR (Incremental Static Regeneration) for content updates

**State Management:**

- No client-side state management library (React Context for layout visibility via `LayoutWrapper`)
- Form state managed locally with React hooks
- Lead ID persisted in browser session for booking confirmation tracking
- Lead records stored in Redis with 30-day TTL

---

## Key Abstractions

**BlogPost / BlogPostMeta:**
- Purpose: Type-safe blog content with frontmatter metadata and rendered content
- Examples: `lib/blog.ts` interfaces and `getPostBySlug()`, `getAllPosts()` functions
- Pattern: Filesystem-based content with gray-matter parsing, lazy content rendering with MDXRemote

**CaseStudy:**
- Purpose: Extended blog-like structure with client testimonials, stats, video embeds, sidebar metadata, and auto-generated TOC
- Examples: `lib/case-studies.ts` types and content loading
- Pattern: Derived TOC from markdown headings, client-side sidebar navigation for desktop

**Lead:**
- Purpose: Intake audit form submission record with lifecycle tracking (pending → booked → email_sent)
- Examples: `lib/db/leads.ts` interface and CRUD functions
- Pattern: Redis-backed single-instance singleton, time-limited storage, status-based business logic

**Section Component:**
- Purpose: Reusable page section (hero, features, CTA, testimonials, pricing cards, carousel)
- Examples: `ShaderHero`, `IntakeCall`, `CaseStudies`, `FAQ`, `FinalCTA` in `components/sections/`
- Pattern: Stateless or minimally stateful React components with hardcoded or prop-driven content, often paired with Framer Motion animations

**Content Registry:**
- Purpose: Centralized mapping of slugs to typed content objects for industries and services
- Examples: `lib/industry-content.ts` and `lib/service-content.ts` with `industryRegistry`, `serviceRegistry`
- Pattern: Import all content modules, export registry dict and helpers for `getContent()` and `getAllSlugs()`

**Layout Wrapper:**
- Purpose: Conditional rendering of navigation and footer based on route, hiding layout on ad landing pages
- Examples: `components/LayoutWrapper.tsx` with `HIDDEN_LAYOUT_ROUTES` array
- Pattern: Client component using `usePathname()` to detect routes dynamically

---

## Entry Points

**Root HTML Page:**
- Location: `app/page.tsx`
- Triggers: HTTP GET `/`
- Responsibilities: Compose homepage from section components (hero, integrations, case studies, FAQ, CTA), call `getAllPosts()` for blog previews

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: All routes
- Responsibilities: Set global metadata, fonts (Inter), analytics (Vercel, Facebook Pixel), theme color, wrap children in LayoutWrapper for conditional nav/footer

**Blog List:**
- Location: `app/blog/page.tsx`
- Triggers: HTTP GET `/blog`
- Responsibilities: Fetch all posts, render grid of BlogCard components with filtering/sorting by date

**Blog Detail:**
- Location: `app/blog/[slug]/page.tsx`
- Triggers: HTTP GET `/blog/{slug}`
- Responsibilities: Load post by slug, render title/metadata header, MDX content via MDXRemote, author card, TOC sidebar, newsletter CTA, generate static params for SSG

**Case Studies Detail:**
- Location: `app/case-studies/[slug]/page.tsx`
- Triggers: HTTP GET `/case-studies/{slug}`
- Responsibilities: Load case study with TOC, render hero with stats/pull quote, two-column layout (sidebar + content), video embed, FinalCTA

**Intake Audit Form Page:**
- Location: `app/pi-intake-audit/page.tsx`
- Triggers: HTTP GET `/pi-intake-audit`
- Responsibilities: Render multi-step form UI, POST to `/api/pi-intake-audit/capture`, handle lead creation and abandonment scheduling

**API: Newsletter Signup:**
- Location: `app/api/newsletter/route.ts`
- Triggers: POST `/api/newsletter`
- Responsibilities: Validate email with Zod, add to Resend audience, handle duplicate contact gracefully

**API: Intake Capture:**
- Location: `app/api/pi-intake-audit/capture/route.ts`
- Triggers: POST `/api/pi-intake-audit/capture`
- Responsibilities: Validate form data, create Lead in Redis, schedule QStash abandonment email task, return leadId

**API: Booking Confirmation:**
- Location: `app/api/pi-intake-audit/booked/route.ts`
- Triggers: POST `/api/pi-intake-audit/booked` (webhook from Cal.com)
- Responsibilities: Receive leadId from external webhook, update lead status to "booked", prevent abandonment email

**API: Abandonment Email:**
- Location: `app/api/pi-intake-audit/send-abandonment/route.ts`
- Triggers: HTTP POST from QStash (scheduled 15 minutes after capture)
- Responsibilities: Retrieve lead from Redis, verify status is "pending", send abandonment email via Resend, update status to "email_sent"

---

## Error Handling

**Strategy:** Try-catch with JSON error responses, validation at API boundary with Zod, optional chaining for null-safe navigation.

**Patterns:**

- **API Validation:** Zod `safeParse()` with detailed field-level error responses (`error.flatten().fieldErrors`)
- **Missing Config:** Console errors logged, JSON responses with 500 status codes
- **Database Failures:** Catch Redis errors, log with context (leadId, timestamp), return 500 with generic message
- **Email Failures:** Log detailed Resend error, return `{ success: false, error: message }`, gracefully handle duplicate contact "already exists" as success
- **Not Found:** Blog/case study routes call `notFound()` from Next.js, triggers 404 page
- **Null Safety:** MDXRemote renders conditionally, components destructure with defaults (data.title || "Untitled")

---

## Cross-Cutting Concerns

**Logging:**
- Console-based with context prefixes: `[Newsletter]`, `[Email]`, `[Intake Audit]`, `[Intake Audit]`
- Includes timestamp, operation name, IDs, error details for traceability

**Validation:**
- Zod schemas at API routes for all external input (newsletter email, intake form, webhook leadId)
- Path traversal protection in blog/case-studies slugs: reject `..`, `/`, `\`
- HTML escaping in email templates to prevent injection

**Authentication:**
- None required for public pages
- QStash uses QSTASH_TOKEN environment variable for task scheduling auth
- Resend uses RESEND_API_KEY for email sending auth
- Redis uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN

**Performance Optimization:**
- Static generation (SSG) for blog posts and case studies via `generateStaticParams()`
- Lazy loading of MDXRemote components with Suspense boundaries
- Image optimization via Next.js Image component with `fill` layout and responsive sizes
- Carousel lazy loading for projects
- CSS-in-JS with Tailwind for minimal bundle impact

**SEO:**
- Open Graph and Twitter Card metadata on every page
- JSON-LD structured data (Article schema) on blog and case study pages
- Canonical URLs in metadata
- Keywords and descriptions from frontmatter
- Reading time displayed for long-form content
- Semantic HTML structure with proper heading hierarchy

---

*Architecture analysis: 2026-02-21*
