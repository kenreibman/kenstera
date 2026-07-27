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

type Duration = Parameters<typeof Ratelimit.slidingWindow>[1]

// Lazy Ratelimit factory — getRedis() is deferred until first .limit() call so
// the module can be imported during Next.js build without env vars present.
export function makeLazyRatelimit(prefix: string, tokens: number, window: Duration): Ratelimit {
  let instance: Ratelimit | null = null
  return new Proxy({} as Ratelimit, {
    get(_target, prop: string | symbol) {
      if (!instance) {
        instance = new Ratelimit({
          redis: getRedis(),
          limiter: Ratelimit.slidingWindow(tokens, window),
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
