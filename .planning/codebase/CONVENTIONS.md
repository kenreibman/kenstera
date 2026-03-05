# Coding Conventions

**Analysis Date:** 2026-03-05

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `DemoForm.tsx`, `MainNavigation.tsx`, `BlogCard.tsx`, `IntakeWizard.tsx`)
- Utility/library modules: kebab-case for multi-word (e.g., `demo-leads.ts`, `rate-limit/demo-call.ts`, `industry-content.ts`, `case-studies.ts`)
- Single-word lib files: lowercase (e.g., `blog.ts`, `utils.ts`)
- API routes: kebab-case directories following Next.js conventions (`/api/demo-call/send-followup/route.ts`, `/api/pi-intake-audit/capture/route.ts`)
- Next.js special files: `page.tsx`, `layout.tsx`, `route.ts`, `error.tsx`, `not-found.tsx`, `loading.tsx`
- Barrel files: `index.ts` for re-exports in component groups

**Functions:**
- Use camelCase for all functions: `getAllPosts()`, `getPostBySlug()`, `createDemoLead()`, `formatDate()`
- React components use PascalCase: `DemoForm`, `MainNavigation`, `LayoutWrapper`
- Prefix getter/factory functions with `get`: `getRedis()`, `getResend()`, `getQStash()`, `getClientIp()`
- Prefix generator functions with `generate`: `generateDemoLeadId()`, `generateLeadId()`
- Prefix boolean-returning helpers descriptively: `verifyRecaptchaToken()` returns `number | null`

**Variables:**
- Use camelCase: `phoneDisplay`, `formState`, `fieldErrors`, `globalError`
- Constants use UPPER_SNAKE_CASE: `MAX_CALL_DURATION_MS`, `FOLLOWUP_DELAY_SECONDS`, `BLOG_DIR`, `HIDDEN_LAYOUT_ROUTES`
- Ref variables use `Ref` suffix: `lastScrollYRef`, `prevDigitsRef`, `isSubmitting` (ref used as mutex)

**Types/Interfaces:**
- PascalCase for all types and interfaces: `BlogPost`, `BlogPostMeta`, `DemoLead`, `LeadStatus`, `IndustryContent`
- Use `interface` for object shapes: `interface BlogPost { ... }`
- Use `type` for unions and aliases: `type FormState = 'idle' | 'submitting' | 'success' | 'error'`
- Use `type` for status unions: `type DemoLeadStatus = 'pending' | 'email_sent'`
- Suffix component props with descriptive inline types or separate `Props` interfaces
- Export types alongside their related functions in the same module

## Code Style

**Formatting:**
- No dedicated formatter config (no Prettier config file)
- ESLint handles formatting via `eslint-config-next`
- 2-space indentation throughout
- Single quotes in `.ts` files, double quotes in `.tsx` JSX attributes (mixed in practice -- some `.ts` files also use single quotes for imports)
- Trailing commas used in multi-line structures
- Semicolons: generally present but occasionally omitted in some files

**Linting:**
- ESLint 9 flat config at `eslint.config.mjs`
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No custom rules added beyond Next.js defaults
- Run with: `npm run lint`

**TypeScript:**
- Strict mode enabled in `tsconfig.json`
- Target: ES2022
- Path alias: `@/*` maps to project root (`"./*"`)
- Always use `@/` imports for project files (e.g., `@/lib/blog`, `@/components/sections/Hero`)
- Separate `tsconfig.scripts.json` for scripts directory (excluded from main tsconfig)

## Import Organization

**Order:**
1. Node.js built-in modules (`fs`, `path`, `crypto`)
2. React/Next.js framework imports (`react`, `next/...`, `next/font/google`)
3. Third-party libraries (`zod`, `framer-motion`, `libphonenumber-js`, `lucide-react`)
4. Internal imports using `@/` alias (`@/lib/...`, `@/components/...`)
5. Relative imports (used within same directory, e.g., `./globals.css`)

**Path Aliases:**
- `@/*` -> project root (configured in `tsconfig.json` and `components.json`)
- Always prefer `@/` over relative paths for cross-directory imports
- shadcn/ui aliases: `@/components/ui`, `@/lib/utils`, `@/hooks`

**Example:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { Client } from '@upstash/qstash'
import { ipRatelimit, phoneRatelimit } from '@/lib/rate-limit/demo-call'
import { retell } from '@/lib/retell/client'
import { createDemoLead } from '@/lib/db/demo-leads'
```

## Component Patterns

**Server vs Client Components:**
- Default to Server Components (no directive needed)
- Add `'use client'` only when using hooks, event handlers, or browser APIs
- Client components: `LayoutWrapper.tsx`, `MainNavigation.tsx`, `DemoForm.tsx`, `TableOfContents.tsx`
- Server components: page files, layout files (except where interactivity is needed)

**Component Export Style:**
- Use named exports for all components: `export function DemoForm() { ... }`
- Use `export default` only for Next.js pages/layouts: `export default function Home() { ... }`
- Barrel files re-export named exports: `export { TableOfContents } from "./TableOfContents"`

**Props:**
- Define prop types inline or as interfaces within the same file
- Use destructuring in function parameters
- Example: `function MobileNavItem({ item, isExpanded, onToggle, onClose }: { ... })`

**Styling:**
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Use `cn()` utility from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)
- shadcn/ui components in `components/ui/` (new-york style, RSC-compatible): `button.tsx`, `carousel.tsx`, `sheet.tsx`
- CSS variables for theme tokens defined in `app/globals.css` using oklch color space
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:` for breakpoints
- Inline styles used sparingly for animations and dynamic values (e.g., CSS keyframes in `DemoForm.tsx`)
- Motion/animation via Framer Motion with `AnimatePresence` for transitions

**Common Tailwind patterns:**
```typescript
// Group hover patterns
className="group block"
className="transition-transform duration-500 group-hover:scale-105"

// Conditional classes with cn()
className={cn("h-1 w-12 rounded-full", i < currentStep ? 'bg-blue-950' : 'bg-gray-200')}

// Responsive layout
className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4"
```

## Error Handling

**API Routes:**
- Wrap entire handler in try/catch returning `{ success: false, error: string }` with appropriate HTTP status
- Parse JSON body in inner try/catch to return 400 for malformed requests
- Use Zod `safeParse()` for input validation -- never throw on validation failure
- Return user-friendly error messages, not raw error details
- Log errors with prefixed tags: `console.error('[Demo Call] Unexpected error:', error)`
- Non-critical failures (like email scheduling) are caught separately and logged without failing the main operation
- Rate limit responses include `retryAfter` field

**API Route Pattern (follow this exactly for new routes):**
```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Parse JSON body
    let data: unknown
    try {
      data = await request.json()
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    // 2. Validate with Zod
    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 })
    }

    // 3-N. Business logic with numbered steps

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Tag] Unexpected error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong.' }, { status: 500 })
  }
}
```

**Client Components:**
- Use React error boundaries via Next.js `error.tsx` files
- Form submissions use state machine pattern: `type FormState = 'idle' | 'submitting' | 'success' | 'error'`
- Field-level errors stored in `Record<string, string>` and global errors in separate state
- Use `useRef` as submission mutex to prevent double-submit: `isSubmitting.current`
- Network errors caught with generic fallback message

**Data Fetching (lib modules):**
- Return `null` for not-found cases (e.g., `getPostBySlug` returns `BlogPost | null`)
- Return empty arrays for empty collections (e.g., `getAllPosts` returns `[]` if directory missing)
- Throw on missing environment variables (fail fast on misconfiguration)

## Logging

**Framework:** `console.log` / `console.error` (no structured logging library)

**Patterns:**
- Prefix all logs with bracketed domain tag: `[Demo Call]`, `[Email]`, `[Newsletter]`, `[Intake Audit]`
- Use `JSON.stringify` for structured data in consent/audit logs
- Log both success and failure paths
- Include relevant identifiers (leadId, email, IP) but avoid logging full secrets

**Examples:**
```typescript
console.log('[Demo Call] Consent logged:', JSON.stringify({ timestamp, ip, phone }))
console.log('[Demo Call] Call triggered:', { ip: clientIp, phone: e164Phone })
console.error('[Email] Failed to send abandonment email:', error)
console.log('[Newsletter] New subscriber:', parsed.data.email)
```

## Comments

**When to Comment:**
- Security-critical decisions get inline comments explaining the "why" (see `lib/retell/client.ts` server-only guard, `lib/blog.ts` path traversal guard)
- API route steps are numbered with comments: `// 1. Parse JSON body`, `// 2. Validate schema with Zod`
- Architecture decisions documented inline: `// CRITICAL: Do NOT set max_call_duration_ms on the agent object` in `app/api/demo-call/route.ts`
- Rate limit configurations get descriptive comments
- Lazy initialization patterns get comments explaining why deferred: `// Lazy Ratelimit factory` in `lib/rate-limit/demo-call.ts`
- Commented-out code is left in place (e.g., video section in `components/sections/Hero.tsx`)

**JSDoc/TSDoc:**
- Not used. No JSDoc comments detected in the codebase.
- Type annotations via TypeScript interfaces serve as the primary documentation.

## Function Design

**Size:** Functions are generally focused and under 50 lines. API route handlers are longer (up to 160 lines for `app/api/demo-call/route.ts`) but are structured with numbered steps.

**Parameters:** Prefer object parameters for functions with multiple inputs: `createDemoLead({ name, email })`. Simple getters take primitives: `getPostBySlug(slug: string)`. Use `Omit<>` for create functions that auto-generate fields: `createLead(data: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>)`.

**Return Values:** API routes return `NextResponse.json()`. Utility functions return typed values or null. Email functions return `{ success: boolean; error?: string }`.

## Module Design

**Exports:**
- Named exports for everything except Next.js page defaults
- One primary export per file in `lib/` modules
- Multiple exports allowed when closely related (e.g., `createDemoLead`, `getDemoLead`, `updateDemoLeadStatus` from `lib/db/demo-leads.ts`)

**Barrel Files:**
- Used for component groups: `components/blog/index.ts`, `components/industries/index.ts`, `app/booking-confirmed/components/index.ts`
- Not used for `lib/` or `app/` directories
- Pattern: explicit named re-exports only

**Singleton Pattern (use this for all external service clients):**
- Module-scoped `let client: Client | null = null` with `getClient()` factory function
- Used for: Redis (`lib/db/leads.ts`, `lib/db/demo-leads.ts`), Resend (`lib/email/send.ts`), QStash (`app/api/demo-call/route.ts`)
- Retell uses eager singleton with env-var guard at module load (`lib/retell/client.ts`)
- Rate limiters use Proxy-based lazy pattern to defer Redis connection until first `.limit()` call (`lib/rate-limit/demo-call.ts`)

**Example singleton pattern:**
```typescript
let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) {
      throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN environment variables')
    }
    redis = new Redis({ url, token })
  }
  return redis
}
```

## Validation

**Schema validation:** Zod for all API input validation
- Define schemas at module level as `const bodySchema = z.object({ ... })`
- Use `safeParse()` (never `parse()`) to avoid throwing
- Phone validation uses `libphonenumber-js` after Zod passes
- Client-side validation mirrors server-side checks but is simpler

**Security:**
- Path traversal prevention in `lib/blog.ts` (checks for `..`, `/`, `\` and resolves path against base directory)
- HTML escaping via custom `escapeHtml()` function in `lib/email/send.ts`
- Rate limiting via Upstash sliding window (IP + phone number, 1 per 10 min)
- reCAPTCHA v3 integration available at `lib/recaptcha/verify.ts`
- Security headers set in `next.config.ts`: HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy
- Server-only modules guarded with env-var checks at module load: `lib/retell/client.ts`

## SEO & Metadata

**Pattern:** Use Next.js `generateMetadata()` for dynamic pages, `export const metadata` for static pages.
- Include OpenGraph and Twitter card metadata
- JSON-LD structured data added via `<script type="application/ld+json">` in page components
- Canonical URLs set via `metadataBase` in root layout

---

*Convention analysis: 2026-03-05*
