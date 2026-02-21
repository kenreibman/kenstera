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

// 1 request per IP per 10-minute sliding window (per user decision)
export const ipRatelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(1, '10 m'),
  prefix: 'demo-call:ip',
})

// 1 request per phone number per 10-minute sliding window (per user decision)
export const phoneRatelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(1, '10 m'),
  prefix: 'demo-call:phone',
})
