import { makeLazyRatelimit } from './factory'

// 1 request per IP per 10-minute sliding window
export const ipRatelimit = makeLazyRatelimit('demo-call:ip', 1, '10 m')

// 1 request per phone number per 10-minute sliding window
export const phoneRatelimit = makeLazyRatelimit('demo-call:phone', 1, '10 m')
