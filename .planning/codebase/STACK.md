# Technology Stack

**Analysis Date:** 2026-03-05

## Languages

**Primary:**
- TypeScript 5.x - All application code (`app/`, `lib/`, `components/`, `scripts/`)

**Secondary:**
- MDX - Blog and case study content (`content/blog/*.mdx`, `content/case-studies/*.mdx`)
- CSS (Tailwind v4) - Styling via `app/globals.css` and utility classes

## Runtime

**Environment:**
- Node.js (version not pinned; no `.nvmrc` or `.node-version` detected)
- Target: ES2022 (`tsconfig.json` compilerOptions.target)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.1.3 - Full-stack React framework with App Router
  - Config: `next.config.ts`
  - Uses Turbopack for dev (`next dev --turbopack`)
  - React Server Components enabled (shadcn `components.json` has `"rsc": true`)
- React 19.2.0 / React DOM 19.2.0

**UI / Component Library:**
- shadcn/ui (New York style) - Component primitives
  - Config: `components.json`
  - Base color: neutral
  - CSS variables enabled
  - Icon library: lucide-react
- Radix UI primitives: `@radix-ui/react-dialog` ^1.1.15, `@radix-ui/react-navigation-menu` ^1.2.14, `@radix-ui/react-slot` ^1.2.4

**Styling:**
- Tailwind CSS v4 - Utility-first CSS
  - PostCSS plugin: `@tailwindcss/postcss` (config: `postcss.config.mjs`)
  - Animations: `tw-animate-css` ^1.4.0
  - Merge utility: `tailwind-merge` ^3.4.0
  - Class composition: `clsx` ^2.1.1, `class-variance-authority` ^0.7.1

**Animation:**
- Framer Motion ^12.23.25 - React animation library
- `@paper-design/shaders-react` ^0.0.71 - WebGL shader effects

**Build/Dev:**
- Turbopack - Dev server bundler (via `next dev --turbopack`)
- ESLint 9 with flat config (`eslint.config.mjs`)
  - Extends: `eslint-config-next` (core-web-vitals + typescript)
- tsx ^4.21.0 - TypeScript execution for provisioning scripts

## Key Dependencies

**Critical (application logic):**
- `retell-sdk` ^5.2.0 - AI voice agent for outbound demo calls
- `resend` ^6.9.1 - Transactional email (abandonment + follow-up emails, newsletter)
- `@upstash/redis` ^1.36.2 - Serverless Redis for lead storage
- `@upstash/qstash` ^2.9.0 - Delayed job scheduling (email follow-ups at 15-min delay)
- `@upstash/ratelimit` ^2.0.8 - Rate limiting on demo call API route
- `@calcom/embed-react` ^1.5.3 - Embedded scheduling calendar
- `zod` ^4.3.6 - Runtime schema validation for all API route inputs

**Content:**
- `gray-matter` ^4.0.3 - MDX frontmatter parsing
- `next-mdx-remote` ^6.0.0 - Server-side MDX rendering
- `remark-gfm` ^4.0.1 - GitHub Flavored Markdown support
- `reading-time` ^1.5.0 - Reading time estimation

**Utilities:**
- `libphonenumber-js` ^1.12.37 - US phone number validation and E.164 formatting
- `lucide-react` ^0.556.0 - Icon library (tree-shakeable, optimized in next.config)
- `embla-carousel-react` ^8.6.0 - Carousel/slider component

**Observability:**
- `@vercel/analytics` ^1.6.1 - Page view and web vitals tracking
- `@vercel/speed-insights` ^1.3.1 - Performance monitoring

## Configuration

**Environment:**
- `.env.local` file present (not committed)
- Required env vars (inferred from code):
  - `RETELL_API_KEY` - Retell AI authentication
  - `RETELL_PHONE_NUMBER` - Outbound call number (E.164 format)
  - `RETELL_LLM_ID` - Retell LLM resource ID
  - `RETELL_AGENT_ID` - Retell agent resource ID
  - `RESEND_API_KEY` - Resend email service
  - `RESEND_AUDIENCE_ID` - Resend newsletter audience
  - `UPSTASH_REDIS_REST_URL` - Upstash Redis connection
  - `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis auth
  - `QSTASH_TOKEN` - QStash publish token
  - `QSTASH_CURRENT_SIGNING_KEY` - QStash webhook verification
  - `QSTASH_NEXT_SIGNING_KEY` - QStash webhook verification (rotation)
  - `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA v3 server key
  - `NEXT_PUBLIC_BASE_URL` - Public base URL for QStash callback targets
- Optional env vars:
  - `FROM_EMAIL` - Sender email address (defaults to `notifications@yourdomain.com`)
  - `FROM_NAME` - Sender display name (defaults to `Kenstera`)

**TypeScript:**
- `tsconfig.json` - Main app config (strict mode, bundler resolution, `@/*` path alias)
- `tsconfig.scripts.json` - Scripts config (CommonJS module, node16 resolution, includes `scripts/**/*.ts`)

**Build:**
- `next.config.ts` - Security headers (HSTS, X-Frame-Options DENY, nosniff, strict referrer, permissions-policy), AVIF/WebP image optimization, package import optimization for lucide-react and framer-motion, `poweredByHeader: false`
- `postcss.config.mjs` - Tailwind CSS PostCSS plugin

**Linting:**
- `eslint.config.mjs` - ESLint 9 flat config extending Next.js core-web-vitals and TypeScript rules
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Scripts

```bash
npm run dev              # next dev --turbopack
npm run build            # next build
npm run start            # next start
npm run lint             # eslint
npm run setup:retell     # npx tsx --tsconfig tsconfig.scripts.json scripts/setup-retell.ts
```

## Platform Requirements

**Development:**
- Node.js with npm
- `.env.local` with all required env vars populated

**Production:**
- Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, serverless API routes)
- Domain: `kenstera.com` (hardcoded in `app/layout.tsx` metadataBase)

## Fonts

- Inter (Google Fonts) - loaded via `next/font/google` with `display: "swap"`, CSS variable `--font-inter`

---

*Stack analysis: 2026-03-05*
