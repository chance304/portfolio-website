// Per-IP fixed-window rate limit for the contact endpoint. The store is an
// interface so production can use Cloudflare KV while the dev mock and tests
// use memory; the logic is identical everywhere.
//
// KV is eventually consistent, so under a burst from many edge locations a
// sender may get slightly more than `max` through. That's acceptable for a
// contact form: the goal is to stop floods, not to meter exactly.

export type RateStore = {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

export type RateLimit = { max: number; windowSeconds: number }

export const RATE_LIMIT: RateLimit = { max: 5, windowSeconds: 3600 }

export type RateDecision = { allowed: boolean; remaining: number; retryAfterSeconds: number }

export async function checkRateLimit(store: RateStore, clientId: string, now = Date.now(), limit: RateLimit = RATE_LIMIT): Promise<RateDecision> {
  const nowSec = Math.floor(now / 1000)
  const window = Math.floor(nowSec / limit.windowSeconds)
  const key = `contact:${clientId}:${window}`
  const retryAfterSeconds = (window + 1) * limit.windowSeconds - nowSec
  const count = Number((await store.get(key)) ?? 0)
  if (count >= limit.max) return { allowed: false, remaining: 0, retryAfterSeconds }
  // KV requires a TTL of at least 60 seconds.
  await store.put(key, String(count + 1), { expirationTtl: Math.max(60, retryAfterSeconds) })
  return { allowed: true, remaining: limit.max - count - 1, retryAfterSeconds }
}

export function memoryStore(): RateStore {
  const m = new Map<string, string>()
  return {
    get: async (k) => m.get(k) ?? null,
    put: async (k, v) => void m.set(k, v),
  }
}
