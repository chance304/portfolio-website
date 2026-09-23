import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handle } from '../../scripts/contact-mock.mjs'

test('mock: invalid JSON → 400', () => assert.equal(handle('{not json')[0], 400))
test('mock: validation errors → 400 with fields', () => {
  const [status, body] = handle(JSON.stringify({ name: 'x' }))
  assert.equal(status, 400)
  assert.ok(body.fields.name)
})
test('mock: valid → 200 ok', () => {
  const [status, body] = handle(JSON.stringify({ name: 'Ada Lovelace', email: 'ada@example.com', subject: 'Hello there', message: 'A message long enough.' }))
  assert.equal(status, 200)
  assert.deepEqual(body, { ok: true })
})
test('mock: honeypot → 200 ok (silently dropped)', () => {
  const [status] = handle(JSON.stringify({ name: 'Bot Name', email: 'b@example.com', subject: 'Buy this now', message: 'spam spam spam', website: 'x' }))
  assert.equal(status, 200)
})
test('mock: rate limit matches production (5 per hour per client)', async () => {
  const { limit } = await import('../../scripts/contact-mock.mjs')
  for (let i = 0; i < 5; i++) assert.equal((await limit('10.0.0.9')).allowed, true)
  assert.equal((await limit('10.0.0.9')).allowed, false)
})
