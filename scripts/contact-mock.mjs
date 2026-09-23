// Local stand-in for the production contact endpoint: same request/response
// contract (src/lib/contact/validate.ts), no email provider, no credentials.
// Accepted messages are printed to the terminal instead of being sent.
import { createServer } from 'node:http'
import { validateContact } from '../src/lib/contact/validate.ts'
import { checkRateLimit, memoryStore } from '../src/lib/contact/rate-limit.ts'

const port = Number(process.env.CONTACT_MOCK_PORT ?? 8788)
const MAX_BODY = 20_000

const store = memoryStore()

/** Same limit as production, keyed by client address. */
export async function limit(clientId) {
  return checkRateLimit(store, clientId)
}

export function handle(bodyText) {
  let payload
  try {
    payload = JSON.parse(bodyText)
  } catch {
    return [400, { error: 'Invalid request body' }]
  }
  const result = validateContact(payload)
  if (!result.ok) return [400, { error: 'Validation failed', fields: result.errors }]
  if (!result.spam) console.log('[contact-mock] message accepted:', JSON.stringify(result.value))
  return [200, { ok: true }]
}

// Only listen when run directly, so tests can import handle() without a server.
if (import.meta.main) createServer((req, res) => {
  if (req.method !== 'POST' || !['/api/contact', '/api/contact/'].includes(req.url)) {
    res.writeHead(404).end()
    return
  }
  let size = 0
  const chunks = []
  req.on('data', (c) => {
    size += c.length
    if (size > MAX_BODY) {
      res.writeHead(413, { 'content-type': 'application/json' }).end(JSON.stringify({ error: 'Payload too large' }))
      req.destroy()
    } else chunks.push(c)
  })
  req.on('end', async () => {
    if (res.writableEnded) return
    const rate = await limit(req.socket.remoteAddress ?? 'local')
    if (!rate.allowed) {
      res.writeHead(429, { 'content-type': 'application/json', 'retry-after': String(rate.retryAfterSeconds) }).end(JSON.stringify({ error: 'Too many messages' }))
      return
    }
    const [status, body] = handle(Buffer.concat(chunks).toString('utf8'))
    res.writeHead(status, { 'content-type': 'application/json' }).end(JSON.stringify(body))
  })
}).listen(port, '127.0.0.1', () => console.log(`[contact-mock] listening on http://127.0.0.1:${port}/api/contact`))
