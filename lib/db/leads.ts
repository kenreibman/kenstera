import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return redis
}

export type LeadStatus = 'pending' | 'booked' | 'email_sent'

export interface Lead {
  id: string
  email: string
  fullName: string
  website: string
  role: string
  inboundLeads: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

function getLeadKey(id: string): string {
  return `intake-audit:lead:${id}`
}

export async function createLead(data: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
  const now = new Date().toISOString()
  const lead: Lead = {
    id: generateLeadId(),
    ...data,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }

  await getRedis().set(getLeadKey(lead.id), JSON.stringify(lead), {
    ex: 60 * 60 * 24 * 30, // Expire after 30 days
  })

  return lead
}

export async function getLead(id: string): Promise<Lead | null> {
  const data = await getRedis().get<string>(getLeadKey(id))
  if (!data) return null
  return typeof data === 'string' ? JSON.parse(data) : data
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  const lead = await getLead(id)
  if (!lead) return null

  const updatedLead: Lead = {
    ...lead,
    status,
    updatedAt: new Date().toISOString(),
  }

  await getRedis().set(getLeadKey(id), JSON.stringify(updatedLead), {
    ex: 60 * 60 * 24 * 30, // Expire after 30 days
  })

  return updatedLead
}
