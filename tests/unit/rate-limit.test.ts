import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkRateLimit, memoryStore } from '../../src/lib/contact/rate-limit.ts'

const T0 = Date.UTC(2026, 8, 23, 10, 0, 0)

test('allows up to the limit, then rejects with retry-after', async () => {
  const store = memoryStore()
  const limit = { max: 3, windowSeconds: 3600 }
  for (let i = 0; i < 3; i++) assert.equal((await checkRateLimit(store, '1.2.3.4', T0, limit)).allowed, true)
  const blocked = await checkRateLimit(store, '1.2.3.4', T0 + 1000, limit)
  assert.equal(blocked.allowed, false)
  assert.ok(blocked.retryAfterSeconds > 0 && blocked.retryAfterSeconds <= 3600)
})

test('limits are per client', async () => {
  const store = memoryStore()
  const limit = { max: 1, windowSeconds: 3600 }
  assert.equal((await checkRateLimit(store, 'a', T0, limit)).allowed, true)
  assert.equal((await checkRateLimit(store, 'b', T0, limit)).allowed, true)
  assert.equal((await checkRateLimit(store, 'a', T0, limit)).allowed, false)
})

test('a new window resets the count', async () => {
  const store = memoryStore()
  const limit = { max: 1, windowSeconds: 60 }
  assert.equal((await checkRateLimit(store, 'a', T0, limit)).allowed, true)
  assert.equal((await checkRateLimit(store, 'a', T0 + 1000, limit)).allowed, false)
  assert.equal((await checkRateLimit(store, 'a', T0 + 61_000, limit)).allowed, true)
})

test('writes a TTL of at least 60s (KV minimum)', async () => {
  const puts: { expirationTtl?: number }[] = []
  const store = { get: async () => null, put: async (_k: string, _v: string, o?: { expirationTtl?: number }) => void puts.push(o ?? {}) }
  await checkRateLimit(store, 'a', T0 + 3599_000, { max: 5, windowSeconds: 3600 })
  assert.ok((puts[0].expirationTtl ?? 0) >= 60)
})
