import { makeLazyRatelimit } from './factory'

// Intake-audit lead capture: each accepted request writes to Redis, schedules
// a QStash job, and ultimately sends an email to the submitted address — keep
// the window tight while leaving room for a legitimate correction or two.
export const captureRatelimit = makeLazyRatelimit('intake-audit:capture:ip', 5, '10 m')

// Newsletter signup: subscribing writes a contact into the Resend audience.
export const newsletterRatelimit = makeLazyRatelimit('newsletter:ip', 3, '10 m')
