# Testing Patterns

**Analysis Date:** 2026-03-05

## Test Framework

**Runner:**
- Not configured. No test framework installed.
- No `jest.config.*`, `vitest.config.*`, or test runner in `package.json` devDependencies
- No test script in `package.json`

**Assertion Library:**
- None installed

**Run Commands:**
```bash
# Not yet available -- to be configured:
# npm test              # Run all tests
# npm run test:watch    # Watch mode
# npm run test:coverage # Coverage
```

## Test File Organization

**Location:**
- No test files exist in the project (zero test coverage)

**Recommended pattern: co-located tests**

**Naming:**
- Use `*.test.ts` for utility/lib tests
- Use `*.test.tsx` for component tests

**Structure:**
```
lib/
  blog.ts
  blog.test.ts
  db/
    leads.ts
    leads.test.ts
    demo-leads.ts
    demo-leads.test.ts
  email/
    send.ts
    send.test.ts
  recaptcha/
    verify.ts
    verify.test.ts
app/api/
  demo-call/
    route.ts
    route.test.ts
    send-followup/
      route.ts
      route.test.ts
  newsletter/
    route.ts
    route.test.ts
  pi-intake-audit/
    capture/
      route.ts
      route.test.ts
    booked/
      route.ts
      route.test.ts
    send-abandonment/
      route.ts
      route.test.ts
```

## Test Structure

**Recommended suite organization (Vitest):**
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('moduleName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('functionName', () => {
    it('should handle the happy path', () => {
      // Arrange -> Act -> Assert
    })

    it('should return null for invalid input', () => {
      // ...
    })

    it('should throw when env var is missing', () => {
      // ...
    })
  })
})
```

**Patterns:**
- Setup: `beforeEach` with `vi.clearAllMocks()` to reset between tests
- Teardown: Use `afterEach` for env var cleanup if using `vi.stubEnv()`
- Assertions: Standard `expect()` with `.toBe()`, `.toEqual()`, `.toBeNull()`, `.toThrow()`

## Mocking

**Framework:** Vitest recommended (best Next.js App Router compatibility)

**Patterns:**

```typescript
// Mock an entire module
vi.mock('@/lib/email/send', () => ({
  getResend: vi.fn(),
}))

// Mock with implementation
vi.mock('@/lib/db/demo-leads', () => ({
  createDemoLead: vi.fn().mockResolvedValue({
    id: 'demo_test-uuid',
    name: 'Test User',
    email: 'test@example.com',
    status: 'pending',
    createdAt: '2026-03-05T00:00:00.000Z',
    updatedAt: '2026-03-05T00:00:00.000Z',
  }),
  getDemoLead: vi.fn(),
  updateDemoLeadStatus: vi.fn(),
}))

// Mock environment variables
vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://test.upstash.io')
vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'test-token')
```

**What to Mock:**
- External APIs: Resend (`lib/email/send.ts`), Upstash Redis (`lib/db/leads.ts`, `lib/db/demo-leads.ts`), QStash (`@upstash/qstash`), Retell SDK (`lib/retell/client.ts`)
- File system operations in `lib/blog.ts` and `lib/case-studies.ts` (mock `fs`)
- Environment variables via `vi.stubEnv()`
- `crypto.randomUUID()` for deterministic IDs

**What NOT to Mock:**
- Zod schema validation (test real validation behavior)
- `libphonenumber-js` phone parsing (test with real library)
- Utility functions like `cn()`, `escapeHtml()`, `formatDate()` (simple pure functions, test directly)
- TypeScript types (no runtime impact)

## Fixtures and Factories

**Test Data:**
```typescript
// lib/__fixtures__/test-data.ts

export const mockLead = {
  id: 'lead_12345',
  email: 'test@lawfirm.com',
  fullName: 'Jane Attorney',
  website: 'https://lawfirm.com',
  role: 'owner-partner',
  inboundLeads: '50-150',
  status: 'pending' as const,
  createdAt: '2026-03-05T10:00:00.000Z',
  updatedAt: '2026-03-05T10:00:00.000Z',
}

export const mockDemoLead = {
  id: 'demo_12345',
  name: 'John Smith',
  email: 'john@example.com',
  status: 'pending' as const,
  createdAt: '2026-03-05T10:00:00.000Z',
  updatedAt: '2026-03-05T10:00:00.000Z',
}

export const mockBlogPost = {
  slug: 'test-post',
  title: 'Test Post',
  description: 'A test blog post',
  date: '2026-03-01',
  author: 'Kenstera',
  tags: ['test'],
  keywords: ['testing'],
  content: '# Test\nThis is test content.',
  readingTime: '1 min read',
}
```

**Location:**
- Place fixtures in `lib/__fixtures__/` for shared test data
- Inline simple test data in individual test files when not reused

## Coverage

**Requirements:** None enforced (0% current coverage)

**Recommended Targets:**
- API routes: 90%+ (critical business logic and security)
- `lib/db/` modules: 85%+ (data integrity)
- `lib/email/send.ts`: 85%+ (escaping, error handling)
- `lib/blog.ts`: 90%+ (path traversal prevention is security-critical)
- Components: 50-60% (UI changes frequently)
- Overall: 70%+

**View Coverage:**
```bash
# After setup:
npx vitest --coverage
```

## Test Types

**Unit Tests:**
- Scope: Individual functions in `lib/` modules
- Priority files to test:
  - `lib/blog.ts` - `getAllPosts()`, `getPostBySlug()`, `getAllSlugs()`, `formatDate()`, path traversal prevention
  - `lib/db/leads.ts` - `createLead()`, `getLead()`, `updateLeadStatus()`
  - `lib/db/demo-leads.ts` - `createDemoLead()`, `getDemoLead()`, `updateDemoLeadStatus()`
  - `lib/email/send.ts` - `escapeHtml()`, `sendAbandonmentEmail()`, `sendDemoFollowUpEmail()`
  - `lib/recaptcha/verify.ts` - `verifyRecaptchaToken()`
  - `lib/rate-limit/demo-call.ts` - lazy Proxy initialization

**Integration Tests:**
- Scope: API route handlers with mocked external services
- Priority routes:
  - `app/api/demo-call/route.ts` - Zod validation, phone parsing, rate limiting, Retell call creation, QStash scheduling
  - `app/api/demo-call/send-followup/route.ts` - lead lookup, email sending, status update
  - `app/api/newsletter/route.ts` - email validation, Resend contact creation, duplicate handling
  - `app/api/pi-intake-audit/capture/route.ts` - lead capture flow
  - `app/api/pi-intake-audit/send-abandonment/route.ts` - abandonment email flow

**E2E Tests:**
- Not configured (no Playwright, Cypress)
- Lower priority given the site is primarily marketing/lead-gen

## Common Patterns

**Async Testing:**
```typescript
it('should create a demo lead and return success', async () => {
  const mockCreate = vi.fn().mockResolvedValue({ id: 'demo_123', status: 'pending' })
  vi.mocked(createDemoLead).mockImplementation(mockCreate)

  const request = new NextRequest('http://localhost/api/demo-call', {
    method: 'POST',
    body: JSON.stringify({ phone: '(555) 123-4567', name: 'Test', email: 'test@example.com' }),
  })

  const response = await POST(request)
  const data = await response.json()

  expect(response.status).toBe(200)
  expect(data.success).toBe(true)
})
```

**Error Testing:**
```typescript
it('should return 429 when rate limited', async () => {
  vi.mocked(ipRatelimit.limit).mockResolvedValue({
    success: false,
    reset: Date.now() + 600_000,
    limit: 1,
    remaining: 0,
  })

  const request = new NextRequest('http://localhost/api/demo-call', {
    method: 'POST',
    body: JSON.stringify({ phone: '(555) 123-4567', name: 'Test', email: 'test@example.com' }),
  })

  const response = await POST(request)
  expect(response.status).toBe(429)

  const data = await response.json()
  expect(data.success).toBe(false)
  expect(data.retryAfter).toBeDefined()
})
```

**Security Testing:**
```typescript
describe('path traversal prevention', () => {
  it('should reject slug with ../', () => {
    const post = getPostBySlug('../../../etc/passwd')
    expect(post).toBeNull()
  })

  it('should reject slug with backslash', () => {
    const post = getPostBySlug('..\\..\\..\\etc\\passwd')
    expect(post).toBeNull()
  })

  it('should reject slug with forward slash', () => {
    const post = getPostBySlug('path/to/file')
    expect(post).toBeNull()
  })
})

describe('HTML escaping', () => {
  it('should escape angle brackets in user input', () => {
    // Test escapeHtml() in lib/email/send.ts
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    )
  })
})
```

**Validation Testing:**
```typescript
describe('demo-call bodySchema', () => {
  it('should accept valid input', () => {
    const result = bodySchema.safeParse({
      phone: '(555) 123-4567',
      name: 'John',
      email: 'john@example.com',
    })
    expect(result.success).toBe(true)
  })

  it('should reject empty phone', () => {
    const result = bodySchema.safeParse({
      phone: '',
      name: 'John',
      email: 'john@example.com',
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid email', () => {
    const result = bodySchema.safeParse({
      phone: '5551234567',
      name: 'John',
      email: 'not-email',
    })
    expect(result.success).toBe(false)
  })
})
```

**Environment Variable Testing:**
```typescript
describe('singleton clients with missing env vars', () => {
  it('should throw when Redis env vars are missing', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')

    expect(() => getRedis()).toThrow('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN')
  })
})
```

## Setup Steps

To add testing to this project:

1. Install dependencies:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

2. Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // for component tests; use 'node' for API/lib tests
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

3. Add scripts to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

4. Start with highest-priority test files:
   - `lib/blog.test.ts` (path traversal security)
   - `app/api/demo-call/route.test.ts` (core business flow)
   - `lib/email/send.test.ts` (HTML escaping, error handling)

---

*Testing analysis: 2026-03-05*
