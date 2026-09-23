import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LIMITS, validateContact } from '../../src/lib/contact/validate.ts'

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', subject: 'Hello there', message: 'A message long enough.' }

test('accepts a valid payload and trims fields', () => {
  const r = validateContact({ ...valid, name: '  Ada Lovelace  ' })
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.value.name, 'Ada Lovelace')
    assert.equal(r.spam, false)
  }
})

test('rejects missing and short fields with per-field errors', () => {
  const r = validateContact({ name: 'A', email: 'nope', subject: 'hi', message: 'short' })
  assert.equal(r.ok, false)
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ['email', 'message', 'name', 'subject'])
})

test('rejects oversized fields', () => {
  const r = validateContact({ ...valid, message: 'x'.repeat(LIMITS.message.max + 1), name: 'n'.repeat(LIMITS.name.max + 1) })
  assert.equal(r.ok, false)
  if (!r.ok) {
    assert.match(r.errors.message ?? '', /at most/)
    assert.match(r.errors.name ?? '', /at most/)
  }
})

test('flags a filled honeypot as spam without failing validation', () => {
  const r = validateContact({ ...valid, website: 'http://spam.example' })
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.spam, true)
})

test('treats non-object input as empty', () => {
  for (const input of [null, undefined, 'string', 42]) assert.equal(validateContact(input).ok, false)
})
