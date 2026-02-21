import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN')
    redis = new Redis({ url, token })
  }
  return redis
}

// Lazy Ratelimit factory — getRedis() is deferred until first .limit() call so
// the module can be imported during Next.js build without env vars present.
function makeLazyRatelimit(prefix: string): Ratelimit {
  let instance: Ratelimit | null = null
  return new Proxy({} as Ratelimit, {
    get(_target, prop: string | symbol) {
      if (!instance) {
        instance = new Ratelimit({
          redis: getRedis(),
          limiter: Ratelimit.slidingWindow(1, '10 m'),
          prefix,
        })
      }
      const value = (instance as unknown as Record<string | symbol, unknown>)[prop]
      if (typeof value === 'function') {
        return value.bind(instance)
      }
      return value
    },
  })
}

// 1 request per IP per 10-minute sliding window
export const ipRatelimit = makeLazyRatelimit('demo-call:ip')

// 1 request per phone number per 10-minute sliding window
export const phoneRatelimit = makeLazyRatelimit('demo-call:phone')
