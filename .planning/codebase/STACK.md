# Technology Stack

**Analysis Date:** 2026-02-21

## Languages

**Primary:**
- TypeScript 5 - All source code (`.ts`, `.tsx` files)
- JavaScript (JSX/TSX) - React components and configuration

**Secondary:**
- HTML5 - Semantic markup via Next.js components
- CSS3 - Tailwind CSS for styling

## Runtime

**Environment:**
- Node.js (version not pinned - inferred as LTS compatible)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.1.3 - Full-stack React framework with App Router
  - Config: `next.config.ts`
  - Turbopack enabled for dev builds
  - Image optimization with AVIF/WebP format support

**Frontend:**
- React 19.2.0 - UI library
- React DOM 19.2.0 - DOM rendering

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework
  - PostCSS integration: `postcss.config.mjs`
  - TailwindCSS v4 PostCSS plugin
  - Custom animations via `tw-animate-css` 1.4.0

**UI Components:**
- Radix UI - Headless component library
  - `@radix-ui/react-dialog` 1.1.15
  - `@radix-ui/react-navigation-menu` 1.2.14
  - `@radix-ui/react-slot` 1.2.4
- Lucide React 0.556.0 - Icon library (tree-shakeable with optimization)
- Class Variance Authority 0.7.1 - Component variant library (className utilities)
- clsx 2.1.1 - Conditional className management
- tailwind-merge 3.4.0 - Smart Tailwind class merging

**Animation:**
- Framer Motion 12.23.25 - Motion library for React (optimized via next.config)
- Embla Carousel React 8.6.0 - Carousel/slider component

**Markdown & Content:**
- next-mdx-remote 6.0.0 - MDX rendering in Next.js
- remark-gfm 4.0.1 - GitHub-flavored Markdown plugin
- gray-matter 4.0.3 - YAML frontmatter parsing
- reading-time 1.5.0 - Estimated reading time calculation

## Key Dependencies

**Critical:**
- Zod 4.3.6 - Runtime type validation and schema parsing
  - Used in all API routes for request validation
  - Files: `app/api/newsletter/route.ts`, `app/api/pi-intake-audit/capture/route.ts`, `app/api/pi-intake-audit/booked/route.ts`

**Infrastructure & APIs:**
- @upstash/redis 1.36.2 - Redis client (REST API)
  - Lead data storage with 30-day TTL expiration
  - File: `lib/db/leads.ts`
  - Requires: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

- @upstash/qstash 2.9.0 - Serverless task queue
  - Scheduled abandonment email delivery
  - Files: `app/api/pi-intake-audit/capture/route.ts`, `app/api/pi-intake-audit/send-abandonment/route.ts`
  - Requires: `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`

- Resend 6.9.1 - Email delivery service
  - Newsletter subscription and abandonment email sending
  - Files: `lib/email/send.ts`, `app/api/newsletter/route.ts`
  - Requires: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`
  - Optional: `FROM_EMAIL`, `FROM_NAME`

- @calcom/embed-react 1.5.3 - Cal.com calendar embedding
  - Booking calendar integration
  - File: `app/pi-intake-audit/components/CalendarEmbed.tsx`
  - Cal link: `kenstera/intake-15-minutes`

**Monitoring & Analytics:**
- @vercel/analytics 1.6.1 - Web Vitals tracking
  - Integrated in: `app/layout.tsx`

- @vercel/speed-insights 1.3.1 - Performance monitoring
  - Integrated in: `app/layout.tsx`

**Utilities:**
- @paper-design/shaders-react 0.0.71 - Shader-based visual effects (optional)

## Configuration

**Environment:**
- Environment variables required (no `.env` files checked in):
  - `RESEND_API_KEY` - Email API authentication
  - `RESEND_AUDIENCE_ID` - Newsletter audience ID
  - `UPSTASH_REDIS_REST_URL` - Redis endpoint
  - `UPSTASH_REDIS_REST_TOKEN` - Redis authentication
  - `QSTASH_TOKEN` - Task queue API token
  - `QSTASH_CURRENT_SIGNING_KEY` - QStash signature verification (current)
  - `QSTASH_NEXT_SIGNING_KEY` - QStash signature verification (next rotation)
  - `NEXT_PUBLIC_BASE_URL` - Application base URL (public, for API callbacks)
  - `FROM_EMAIL` - Email sender address (defaults to notifications@yourdomain.com)
  - `FROM_NAME` - Email sender name (defaults to Kenstera)

**Build Configuration:**
- `tsconfig.json` - TypeScript compilation settings
  - Target: ES2022
  - Strict mode enabled
  - Module resolution: bundler
  - Path alias: `@/*` maps to project root
  - JSX: react-jsx (automatic runtime)
  - Incremental builds enabled

- `next.config.ts` - Next.js configuration
  - Removed powered-by header for security
  - Image formats: AVIF, WebP
  - Package import optimization: lucide-react, framer-motion
  - Security headers configured (see `next.config.ts`)
  - HSTS enabled with 2-year max-age
  - CSP-adjacent headers: X-Frame-Options DENY, X-Content-Type-Options nosniff

**Linting & Code Quality:**
- ESLint 9 with eslint-config-next 16.1.3
  - Config: `eslint.config.mjs` (flat config format)
  - Web Vitals rules enabled
  - TypeScript support enabled
  - Excludes: .next, out, build, next-env.d.ts
  - Run via: `npm run lint`

**Styling Configuration:**
- Tailwind CSS 4 with PostCSS integration
  - Config: `postcss.config.mjs`
  - Uses @tailwindcss/postcss plugin

## Platform Requirements

**Development:**
- Node.js (version number not pinned in repo - LTS recommended)
- npm package manager
- TypeScript 5 knowledge for source modifications

**Production:**
- Deployment target: Vercel (native Next.js support)
- External service dependencies:
  - Upstash Redis (serverless Redis)
  - Upstash QStash (serverless task queue)
  - Resend (email service)
  - Cal.com (booking calendar)
  - Vercel Analytics & Speed Insights

## Development & Build Scripts

```bash
npm run dev              # Run development server with Turbopack
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint checks
```

---

*Stack analysis: 2026-02-21*
