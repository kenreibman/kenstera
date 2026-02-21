# Testing Patterns

**Analysis Date:** 2026-02-21

## Test Framework

**Status:** No test framework currently configured

**Analysis:**
- No `jest.config.*`, `vitest.config.*`, or test dependencies in `package.json`
- No test files found in codebase (no `*.test.*` or `*.spec.*` files)
- No testing libraries installed (`jest`, `vitest`, `@testing-library/*`)
- No test script in `package.json`

**Recommendation for future implementation:**
- For Next.js projects: Vitest or Jest with `@testing-library/react`
- Config file location: Create `vitest.config.ts` or `jest.config.js` in project root
- Test command to add: `"test": "vitest"` or `"test": "jest"`

## Testing Infrastructure Gaps

**Current State:**
- Zero test coverage
- No automated test execution pipeline
- No assertion libraries

**What Should Be Tested (by priority):**

1. **API Routes (Critical):**
   - `/app/api/newsletter/route.ts` - Email subscription validation and Resend API integration
   - `/app/api/pi-intake-audit/capture/route.ts` - Lead capture, validation, Redis storage, QStash scheduling
   - `/app/api/pi-intake-audit/booked/route.ts` - Lead status updates
   - `/app/api/pi-intake-audit/send-abandonment/route.ts` - Email sending logic

2. **Library Functions (High):**
   - `lib/blog.ts` - Post fetching, slug validation, path traversal prevention
   - `lib/case-studies.ts` - Case study loading, TOC generation, path security
   - `lib/db/leads.ts` - Lead creation, status updates, Redis serialization
   - `lib/email/send.ts` - Email HTML generation, escaping, error handling

3. **Components (Medium):**
   - `app/pi-intake-audit/components/IntakeWizard.tsx` - Form state management, step navigation
   - `app/pi-intake-audit/components/ContactForm.tsx` - Form validation, onChange handlers
   - `components/blog/CodeBlock.tsx` - Clipboard copying, state management

## Suggested Test Structure

**Test File Organization:**
- Co-located with source files: `lib/blog.ts` → `lib/blog.test.ts`
- Separate test directories not currently used

**Directory Pattern for New Tests:**
```
lib/
├── blog.ts
├── blog.test.ts
├── case-studies.ts
├── case-studies.test.ts
├── db/
│   ├── leads.ts
│   └── leads.test.ts
└── email/
    ├── send.ts
    └── send.test.ts

app/api/
├── newsletter/
│   ├── route.ts
│   └── route.test.ts
└── pi-intake-audit/
    ├── capture/
    │   ├── route.ts
    │   └── route.test.ts
    └── send-abandonment/
        ├── route.ts
        └── route.test.ts
```

## Test Type Recommendations

**Unit Tests:**
- **Scope:** Test individual functions in isolation with mocked dependencies
- **Location:** `lib/*.test.ts` files
- **Examples:**
  - Test `formatDate()` with various date strings
  - Test `getAllPosts()` with mock file system
  - Test `generateLeadId()` produces unique IDs
  - Test path traversal prevention in `getPostBySlug(slug.includes('..') === true)`

**Integration Tests:**
- **Scope:** Test API routes with mocked external services
- **Location:** `app/api/*/route.test.ts` files
- **Examples:**
  - Test newsletter endpoint: validation → Resend API call → response
  - Test lead capture: validation → Redis write → QStash scheduling
  - Test email sending with mocked Resend client

**No E2E Tests Currently:**
- Not configured (no Playwright, Cypress, etc.)
- Could be added later for user flows like intake wizard

## Mocking Strategy

**Framework:** Vitest or Jest (recommend Vitest for Next.js 15+)

**What to Mock:**
- External APIs: Resend, Upstash Redis, QStash
- File system operations in `lib/blog.ts` and `lib/case-studies.ts`
- Environment variables (per test case)

**What NOT to Mock:**
- Zod schema validation (test real validation behavior)
- Date functions (use fixed dates in tests)
- Utility functions like `cn()` (simple, test directly)
- TypeScript types (no runtime overhead)

**Mocking Examples (Vitest pattern):**

```typescript
// Test API route with mocked Resend
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/newsletter/route'
import { getResend } from '@/lib/email/send'

vi.mock('@/lib/email/send', () => ({
  getResend: vi.fn(),
}))

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should subscribe valid email to newsletter', async () => {
    const mockResend = {
      contacts: {
        create: vi.fn().mockResolvedValue({ error: null }),
      },
    }
    vi.mocked(getResend).mockReturnValue(mockResend as any)

    const response = await POST(
      new Request('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      })
    )

    const data = await response.json()
    expect(data.success).toBe(true)
    expect(mockResend.contacts.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    })
  })

  it('should return 400 for invalid email', async () => {
    const response = await POST(
      new Request('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: 'not-an-email' }),
      })
    )

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.success).toBe(false)
  })
})
```

```typescript
// Test library function with mocked file system
import { describe, it, expect, vi } from 'vitest'
import fs from 'fs'
import { getAllPosts } from '@/lib/blog'

vi.mock('fs')

describe('lib/blog', () => {
  it('should return empty array if blog directory does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)

    const posts = getAllPosts()

    expect(posts).toEqual([])
  })

  it('should filter only .mdx files', () => {
    const mockFiles = ['post-1.mdx', 'post-2.mdx', 'draft.txt', 'notes.md']
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(mockFiles as any)
    vi.mocked(fs.readFileSync).mockReturnValue(
      '---\ntitle: Test\ndate: 2026-02-21\n---\nContent'
    )

    const posts = getAllPosts()

    expect(posts).toHaveLength(2)
    expect(posts[0].slug).toBe('post-1')
  })
})
```

## Error Testing

**Pattern:** Test both success and error paths

```typescript
// Test error handling in API route
it('should return 500 when Resend API fails', async () => {
  const mockResend = {
    contacts: {
      create: vi.fn().mockResolvedValue({
        error: { message: 'API Error' },
      }),
    },
  }
  vi.mocked(getResend).mockReturnValue(mockResend as any)

  const response = await POST(
    new Request('http://localhost/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    })
  )

  expect(response.status).toBe(500)
  const data = await response.json()
  expect(data.success).toBe(false)
})
```

## Environment Variables in Tests

**Pattern:** Set per-test via `vi.stubEnv()` (Vitest)

```typescript
import { describe, it, expect, vi } from 'vitest'

describe('API with env vars', () => {
  it('should throw when env var missing', () => {
    vi.stubEnv('RESEND_API_KEY', '')

    expect(() => {
      getResend()
    }).toThrow('Missing RESEND_API_KEY environment variable')
  })

  it('should initialize client when env var present', () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')

    const client = getResend()

    expect(client).toBeDefined()
  })
})
```

## Fixtures and Test Data

**Pattern:** Create fixture files for reusable test data

**Location:** `lib/__fixtures__/` or `lib/__tests__/fixtures.ts`

```typescript
// lib/__fixtures__/leads.ts
export const mockLead = {
  id: 'lead_12345',
  email: 'test@example.com',
  fullName: 'John Doe',
  website: 'https://example.com',
  role: 'owner-partner',
  inboundLeads: '50-150',
  status: 'pending' as const,
  createdAt: new Date('2026-02-21T10:00:00Z').toISOString(),
  updatedAt: new Date('2026-02-21T10:00:00Z').toISOString(),
}

export const mockBlogPost = {
  slug: 'test-post',
  title: 'Test Post',
  description: 'A test blog post',
  date: '2026-02-21',
  author: 'Test Author',
  tags: ['test'],
  keywords: ['test'],
  content: '# Test\nThis is test content',
  readingTime: '1 min read',
}
```

## Coverage Goals

**Current:** 0% (no tests implemented)

**Recommended Targets:**
- API routes: 90%+ (critical path)
- Library utilities: 85%+
- Components: 60-70% (lower priority, UI changes frequently)
- Overall: 70%+ for production-ready state

**View Coverage:**
```bash
# To be added after test setup
# npm run test:coverage
# vitest --coverage
```

## Validation Testing

**Zod Schema Testing:**
- Test valid data passes validation
- Test invalid data fails with expected error
- Test edge cases (empty strings, boundary values)

```typescript
import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

describe('newsletterSchema', () => {
  it('should validate correct email', () => {
    const result = newsletterSchema.safeParse({ email: 'test@example.com' })
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'not-an-email' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.email).toBeDefined()
  })

  it('should reject missing email', () => {
    const result = newsletterSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
```

## Security Testing

**Priority Areas:**
- Path traversal in file operations (`lib/blog.ts`, `lib/case-studies.ts`)
- Input validation for all API routes
- HTML escaping in email templates (`lib/email/send.ts`)

```typescript
// Test path traversal prevention
describe('blog path traversal prevention', () => {
  it('should reject slug with ../', () => {
    const post = getPostBySlug('../../../etc/passwd')
    expect(post).toBeNull()
  })

  it('should reject slug with backslash', () => {
    const post = getPostBySlug('..\\..\\..\\etc\\passwd')
    expect(post).toBeNull()
  })
})

// Test HTML escaping in emails
describe('email HTML escaping', () => {
  it('should escape HTML in lead name', () => {
    const html = generateEmailHtml({
      fullName: '<script>alert("xss")</script>',
    })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })
})
```

## Next Steps for Implementation

1. Install test dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom`
2. Create `vitest.config.ts` configuration file
3. Add test script to `package.json`: `"test": "vitest"`
4. Create `.test.ts` files for critical API routes first
5. Gradually add component and utility tests
6. Set up coverage reporting

---

*Testing analysis: 2026-02-21*
