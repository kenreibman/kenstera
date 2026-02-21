# Coding Conventions

**Analysis Date:** 2026-02-21

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `BlogCard.tsx`, `IntakeWizard.tsx`, `ContactForm.tsx`)
- Library/utility files: camelCase (e.g., `blog.ts`, `leads.ts`, `send.ts`, `utils.ts`)
- API routes: kebab-case (e.g., `/api/pi-intake-audit/capture/route.ts`, `/api/newsletter/route.ts`)
- Directories: kebab-case (e.g., `components/`, `pi-intake-audit/`, `case-studies/`)

**Functions:**
- Component functions: PascalCase (e.g., `BlogCard`, `IntakeWizard`, `ProgressIndicator`)
- Utility/helper functions: camelCase (e.g., `getAllPosts()`, `getPostBySlug()`, `formatDate()`, `generateLeadId()`)
- Exported types/interfaces: PascalCase (e.g., `BlogPost`, `FormData`, `CaseStudy`, `LeadStatus`)

**Variables:**
- Component state: camelCase (e.g., `formData`, `currentStep`, `leadId`, `direction`)
- Constants: camelCase or UPPER_SNAKE_CASE for module-level constants (e.g., `BLOG_DIR`, `ABANDONMENT_DELAY_SECONDS`)
- Configuration objects: camelCase (e.g., `leadOptions`, `roleOptions`, `calloutConfig`)

**Types:**
- Interfaces: PascalCase, prefixed with descriptive name (e.g., `BlogPost`, `BlogPostMeta`, `ContactFormProps`, `CalloutProps`)
- Type unions: PascalCase (e.g., `LeadStatus`, `CalloutType`)
- Generic props types: Suffix with `Props` (e.g., `BlogCardProps`, `ContactFormProps`, `CalloutProps`)

## Code Style

**Formatting:**
- ESLint + Next.js config (no Prettier configured separately)
- Config: `eslint.config.mjs` uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Trailing semicolons: used consistently
- Quotes: double quotes for JSX attributes, single quotes for string literals
- Line length: no hard limit observed, varies by context (50-100+ characters)

**Linting:**
- Framework: ESLint v9 with Next.js-specific rules
- Config file: `eslint.config.mjs` (flat config format)
- Rules enforced: Next.js Core Web Vitals and TypeScript best practices
- Run command: `npm run lint` (eslint with default Next.js rules)

**Example formatting observed:**
```typescript
// From lib/blog.ts
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  // ...
}
```

## Import Organization

**Order:**
1. Node.js built-in modules (`fs`, `path`, `crypto`)
2. Third-party dependencies (`react`, `next`, UI libraries)
3. Local absolute imports with `@/` alias
4. Local relative imports (not used; `@/` is preferred)

**Path Aliases:**
- `@/*` → root directory (configured in `tsconfig.json`)
- All internal imports use `@/` prefix: `@/lib/blog`, `@/components/blog`, `@/lib/db/leads`

**Example from `app/newsletter/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend } from '@/lib/email/send'
```

## Error Handling

**Patterns:**
- **API routes:** Wrap in try-catch, return NextResponse with appropriate status codes
  - 400 for invalid input (JSON parsing or validation errors)
  - 500 for server errors
  - Returns `{ success: boolean, error?: string }` JSON response
- **Library functions:** Throw Error with descriptive messages for missing environment variables
  - Example: `throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN environment variables')`
- **Client-side:** Silent error handling where appropriate (e.g., clipboard copy failures)
  - Example in `CodeBlock.tsx`: `catch { // silently ignore clipboard errors }`
- **Validation:** Use Zod schemas with `safeParse()` for non-throwing validation
  - Example: `const parsed = newsletterSchema.safeParse(data)`
  - Check with `if (!parsed.success)` and return detailed error info

**Example from `app/api/newsletter/route.ts`:**
```typescript
export async function POST(request: NextRequest) {
  try {
    let data: unknown
    try {
      data = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const parsed = newsletterSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    // ...
  } catch (error) {
    console.error('[Newsletter] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

## Logging

**Framework:** Node.js `console` object (no dedicated logging library)

**Patterns:**
- Prefix log messages with module context in brackets: `[Newsletter]`, `[Email]`, `[Intake Audit]`
- Use appropriate log level: `console.log()` for info, `console.error()` for errors
- Include structured data in production logs: timestamps, IDs, relevant context
- Example: `console.log('[Newsletter] New subscriber:', parsed.data.email)`
- Silent failures for non-critical operations (e.g., missing NEXT_PUBLIC_BASE_URL logs error but continues)

**Example from `lib/email/send.ts`:**
```typescript
console.error('[Email] Failed to send abandonment email:', error)
console.log('[Email] Abandonment email sent to lead:', lead.id)
```

## Comments

**When to Comment:**
- Security-related code: path traversal prevention, HTML escaping
- Non-obvious logic: e.g., "Prevent path traversal" before security checks
- Business logic explanations: e.g., "Resend returns an error if the contact already exists"
- Fire-and-forget patterns: e.g., "Navigate IMMEDIATELY for responsive UX" / "Capture lead data in background"

**JSDoc/TSDoc:**
- Not widely used in this codebase
- Type annotations via TypeScript interfaces are preferred for documentation
- Example of detailed inline comments:
  ```typescript
  // Prevent path traversal
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return null;
  }
  ```

## Function Design

**Size:**
- Utility functions: concise, 10-50 lines typical
- Components: 50-200 lines for single components (larger components broken into sub-components)
- API route handlers: 30-80 lines after accounting for error handling

**Parameters:**
- Props passed as single object: `({ post }: BlogCardProps)`
- Destructure in function signature when possible
- Optional parameters use `?:` syntax in types
- Data objects passed to async functions: use Zod schemas for validation before processing

**Return Values:**
- Null for "not found" cases: `getPostBySlug()` returns `BlogPost | null`
- Objects for multiple return values: `{ success: boolean, error?: string }`
- Never use empty arrays or objects as falsy sentinels (explicit null preferred)

**Example pattern from `lib/blog.ts`:**
```typescript
export function getPostBySlug(slug: string): BlogPost | null {
  // Early returns for validation
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return null;
  }

  // Check file existence before reading
  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Parse and return data structure
  return {
    slug,
    title: data.title || "Untitled",
    // ...
  };
}
```

## Module Design

**Exports:**
- Prefer named exports: `export function getAllPosts()`, `export interface BlogPost`
- Mix of types and functions exported from utility modules
- Default exports used only for Next.js page/layout components

**Barrel Files:**
- Used selectively: `components/blog/index.ts`, `app/booking-confirmed/components/index.ts`
- Simplifies imports: `import { FeaturedPosts } from '@/components/blog'` instead of full path
- Pattern: explicit named exports in barrel file

**Example barrel from `components/booking-confirmed/index.ts`:**
```typescript
export { ConfirmationHero } from './ConfirmationHero'
export { FeaturedPosts } from './FeaturedPosts'
export { NextSteps } from './NextSteps'
```

## Tailwind CSS Patterns

**Usage:**
- Utility-first approach with semantic class combinations
- CSS variables for theme tokens: `--bg`, `--surface`, `--text`, `--foreground`, `--muted-foreground`, `--border`, `--accent`
- Dynamic color variations used with opacity modifiers: `bg-white/50`, `text-black/80`
- Responsive prefixes: `sm:`, `md:` for breakpoints

**Common patterns:**
```typescript
// From components/blog/BlogCard.tsx
className="group block"
className="aspect-[16/10] overflow-hidden rounded-xl bg-muted mb-4"
className="text-xl sm:text-2xl font-semibold text-foreground"
className="transition-transform duration-500 group-hover:scale-105"
```

**Utility function usage:**
- `cn()` utility from `@/lib/utils` for conditional class merging
- Uses `clsx` for class composition and `tailwind-merge` for conflict resolution
- Example: `className={cn("h-1 w-12 rounded-full", i < currentStep ? 'bg-blue-950' : 'bg-gray-200')}`

## Component Patterns

**Client Components:**
- Marked with `'use client'` directive when using hooks (React 18+)
- State management: React hooks (`useState`, `useEffect`)
- Props interface defined above component
- Motion/animation: Framer Motion with typed variants

**Server Components:**
- Default (implicit) for data fetching and static rendering
- Use `async` for server-side operations
- Metadata exported via `export const metadata` in pages

**Example client component pattern:**
```typescript
'use client'

import { useState } from 'react'

interface MyComponentProps {
  prop: string
}

export function MyComponent({ prop }: MyComponentProps) {
  const [state, setState] = useState('')
  // ...
}
```

---

*Convention analysis: 2026-02-21*
