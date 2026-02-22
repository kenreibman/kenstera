import { Redis } from '@upstash/redis'

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

export type DemoLeadStatus = 'pending' | 'email_sent'

export interface DemoLead {
  id: string
  name: string
  email: string
  status: DemoLeadStatus
  createdAt: string
  updatedAt: string
}

function generateDemoLeadId(): string {
  return `demo_${crypto.randomUUID()}`
}

function getDemoLeadKey(id: string): string {
  return `demo-call:lead:${id}`
}

export async function createDemoLead(data: { name: string; email: string }): Promise<DemoLead> {
  const now = new Date().toISOString()
  const lead: DemoLead = {
    id: generateDemoLeadId(),
    ...data,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }

  await getRedis().set(getDemoLeadKey(lead.id), JSON.stringify(lead), {
    ex: 60 * 60 * 24 * 30, // Expire after 30 days
  })

  return lead
}

export async function getDemoLead(id: string): Promise<DemoLead | null> {
  const data = await getRedis().get<string>(getDemoLeadKey(id))
  if (!data) return null
  return typeof data === 'string' ? JSON.parse(data) : data
}

export async function updateDemoLeadStatus(id: string, status: DemoLeadStatus): Promise<DemoLead | null> {
  const lead = await getDemoLead(id)
  if (!lead) return null

  const updatedLead: DemoLead = {
    ...lead,
    status,
    updatedAt: new Date().toISOString(),
  }

  await getRedis().set(getDemoLeadKey(id), JSON.stringify(updatedLead), {
    ex: 60 * 60 * 24 * 30, // Expire after 30 days
  })

  return updatedLead
}
