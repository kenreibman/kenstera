# Architecture

**Analysis Date:** 2026-03-05

## Pattern Overview

**Overall:** Next.js 16 App Router with Static Site Generation (SSG) + Serverless API Routes

**Key Characteristics:**
- Content-driven marketing site with statically generated pages at build time
- API routes handle lead capture, demo calls, and email automation (serverless functions)
- Content stored as MDX files (blog, case studies) and TypeScript data modules (industries, services)
- No traditional database; Upstash Redis used as key-value store for transient lead data
- Delayed job processing via Upstash QStash (scheduled email follow-ups)
- Client components used sparingly; most pages are React Server Components

## Layers

**Presentation Layer (Pages):**
- Purpose: Renders pages using Next.js App Router conventions
- Location: `app/`
- Contains: Page components (`page.tsx`), layouts (`layout.tsx`), error boundaries (`error.tsx`), not-found pages
- Depends on: Components layer, Content layer, Lib layer
- Used by: End users via browser

**Component Layer:**
- Purpose: Reusable UI components organized by domain
- Location: `components/`
- Contains: Section components, blog components, industry components, UI primitives
- Depends on: `lib/utils.ts` (cn helper), Radix UI, Framer Motion, Lucide icons
- Used by: Pages in `app/`

**Content Layer:**
- Purpose: Static content authored as MDX or TypeScript data objects
- Location: `content/`
- Contains: Blog posts (MDX), case studies (MDX), industry data (TS), service data (TS)
- Depends on: Nothing
- Used by: Lib layer content readers, then Pages

**Library Layer:**
- Purpose: Business logic, data access, and external service clients
- Location: `lib/`
- Contains: Content readers, database clients, email senders, rate limiters, Retell client, reCAPTCHA verifier
- Depends on: External SDKs (Upstash, Resend, Retell), content files
- Used by: API routes, page components (server-side only)

**API Layer:**
- Purpose: Serverless endpoints for lead capture, demo calls, email automation, newsletter
- Location: `app/api/`
- Contains: Route handlers (`route.ts`)
- Depends on: Lib layer (db, email, rate-limit, retell, recaptcha)
- Used by: Client-side form submissions, QStash webhooks

## Data Flow

**Blog/Case Study Content Flow:**

1. Author creates `.mdx` file in `content/blog/` or `content/case-studies/`
2. At build time, `lib/blog.ts` or `lib/case-studies.ts` reads files via `fs`, parses frontmatter with `gray-matter`
3. Page component (`app/blog/[slug]/page.tsx`) calls content reader, passes to `MDXRemote` for rendering
4. `generateStaticParams()` pre-renders all slugs at build time (full SSG)

**Industry/Service Content Flow:**

1. Content defined as TypeScript objects in `content/industries/*.ts` or `content/services/*.ts`
2. Registry in `lib/industry-content.ts` or `lib/service-content.ts` maps slugs to content objects
3. Dynamic route pages (`app/industries/[slug]/page.tsx`, `app/services/[slug]/page.tsx`) look up content by slug
4. `dynamicParams = false` + `generateStaticParams()` ensures fully static output

**Lead Capture Flow (PI Intake Audit):**

1. User fills intake wizard on `/pi-intake-audit` page
2. Client POSTs to `app/api/pi-intake-audit/capture/route.ts`
3. API validates with Zod, stores lead in Upstash Redis via `lib/db/leads.ts`
4. API schedules abandonment email via QStash (15-min delay)
5. If user books, client POSTs to `app/api/pi-intake-audit/booked/route.ts` to mark status as `booked`
6. When QStash fires, `app/api/pi-intake-audit/send-abandonment/route.ts` checks lead status; skips if booked, sends email via Resend if still pending

**Demo Call Flow:**

1. User submits phone/name/email on homepage demo form
2. Client POSTs to `app/api/demo-call/route.ts`
3. API validates phone (libphonenumber-js), checks IP + phone rate limits (Upstash), triggers Retell outbound call
4. API stores demo lead in Redis, schedules follow-up email via QStash (15-min delay)
5. `app/api/demo-call/send-followup/route.ts` handles delayed email send via Resend

**Newsletter Subscription Flow:**

1. User submits email via blog newsletter CTA
2. Client POSTs to `app/api/newsletter/route.ts`
3. API adds contact to Resend audience

**State Management:**
- No client-side global state management (no Redux, Zustand, etc.)
- Server-side state is transient lead data in Upstash Redis with 30-day TTL
- Page state handled locally via React component state in client components
- `LayoutWrapper` uses `usePathname()` to conditionally render nav/footer

## Key Abstractions

**Content Registries:**
- Purpose: Map URL slugs to structured content objects for industry and service pages
- Examples: `lib/industry-content.ts`, `lib/service-content.ts`
- Pattern: TypeScript Record keyed by slug, with `getXContent(slug)` and `getAllXSlugs()` helpers. Both industry and service pages share the same `IndustryContent` interface and reuse the same `components/industries/` component set.

**MDX Content Readers:**
- Purpose: Read MDX files from disk, parse frontmatter, compute reading time
- Examples: `lib/blog.ts`, `lib/case-studies.ts`
- Pattern: File-system based readers using `gray-matter` + `reading-time`. Each exposes `getAll*()`, `get*BySlug()`, and `getAll*Slugs()` functions. Path traversal prevention included.

**Lazy Singleton Clients:**
- Purpose: Defer SDK initialization until first use so modules can be imported during build without env vars
- Examples: `lib/db/leads.ts` (Redis), `lib/email/send.ts` (Resend), `lib/rate-limit/demo-call.ts` (Ratelimit via Proxy), API route files (QStash Client)
- Pattern: Module-scoped `let client: T | null = null` with `getClient()` factory function. Rate limiter uses a `Proxy` for extra laziness.

**Lead Data Models:**
- Purpose: Represent transient lead records stored in Redis
- Examples: `lib/db/leads.ts` (`Lead` type with status `pending | booked | email_sent`), `lib/db/demo-leads.ts` (`DemoLead` type with status `pending | email_sent`)
- Pattern: CRUD functions operating on Redis keys with `crypto.randomUUID()` IDs and 30-day expiry

## Entry Points

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Sets Inter font, global metadata/OG tags, wraps children with `LayoutWrapper`, injects Vercel Analytics, Speed Insights, and Meta Pixel

**Layout Wrapper:**
- Location: `components/LayoutWrapper.tsx`
- Triggers: Every page render (client component)
- Responsibilities: Conditionally shows/hides `MainNavigation` and `Footer` based on pathname. Landing pages listed in `HIDDEN_LAYOUT_ROUTES` array get no nav/footer.

**Homepage:**
- Location: `app/page.tsx`
- Triggers: Root URL `/`
- Responsibilities: Composes ShaderHero, IntakeCall, IntakeBooking, IntakeSetup, CRMIntegrations, DemoForm, CaseStudies, IndustriesFaqBlog, FinalCTA. Injects Organization + FAQ structured data (JSON-LD).

**API Routes:**
- `app/api/demo-call/route.ts`: Triggers outbound Retell demo calls with rate limiting
- `app/api/demo-call/send-followup/route.ts`: QStash webhook for demo follow-up emails
- `app/api/pi-intake-audit/capture/route.ts`: Captures intake audit leads
- `app/api/pi-intake-audit/booked/route.ts`: Marks leads as booked
- `app/api/pi-intake-audit/send-abandonment/route.ts`: QStash webhook for abandonment emails
- `app/api/newsletter/route.ts`: Newsletter subscription via Resend audiences

## Error Handling

**Strategy:** Zod validation at API boundaries, try-catch with structured error responses, Next.js error boundaries for pages

**Patterns:**
- All API routes wrap handler logic in try-catch, return `{ success: false, error: string }` with appropriate HTTP status codes
- Request body parsing is double-wrapped: outer try-catch for `request.json()` parse errors, then Zod schema validation with `safeParse`
- Content readers return `null` for missing slugs; page components call `notFound()` to trigger 404
- Path traversal prevention in blog and case study readers via string checks + `path.resolve` comparison
- QStash webhook endpoints verify signatures via `@upstash/qstash` `Receiver` before processing
- Global error boundary at `app/error.tsx`; route-level error boundary at `app/blog/[slug]/error.tsx`
- Non-critical failures (e.g., follow-up email scheduling) are caught and logged but do not fail the primary operation

## Cross-Cutting Concerns

**Logging:** `console.log` / `console.error` with structured prefix tags: `[Demo Call]`, `[Intake Audit]`, `[Abandonment]`, `[Demo Follow-up]`, `[Email]`, `[Newsletter]`. Includes contextual data (leadId, timestamp, IP).

**Validation:** Zod schemas at every API route boundary. Phone validation via `libphonenumber-js` (US numbers only). reCAPTCHA verification available via `lib/recaptcha/verify.ts`. HTML escaping in email templates via `escapeHtml()` in `lib/email/send.ts`.

**Authentication:** No user authentication. API protection via rate limiting (Upstash Ratelimit sliding window: 1 request per IP and 1 per phone per 10 minutes on demo-call). QStash signature verification on webhook endpoints using `Receiver.verify()`.

**Security Headers:** Configured in `next.config.ts`: X-Content-Type-Options (nosniff), X-Frame-Options (DENY), Referrer-Policy (strict-origin-when-cross-origin), Permissions-Policy (camera/microphone/geolocation disabled), HSTS (2-year max-age with preload), X-DNS-Prefetch-Control (on). `poweredByHeader: false`.

**SEO:** Per-page metadata exports via Next.js `generateMetadata()`, JSON-LD structured data (Organization, FAQPage, Article schemas), Open Graph + Twitter card tags, canonical URLs via `metadataBase`.

**Analytics:** Vercel Analytics (`@vercel/analytics`), Vercel Speed Insights (`@vercel/speed-insights`), Meta/Facebook Pixel via inline script in root layout.

---

*Architecture analysis: 2026-03-05*
