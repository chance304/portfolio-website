import { Resend } from 'resend'
import { validateContact } from '../../src/lib/contact/validate'
import { checkRateLimit } from '../../src/lib/contact/rate-limit'

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string
  CONTACT_FROM_EMAIL: string
  /** KV namespace for per-IP rate limiting (wrangler.toml). Optional: unbound = no limit. */
  CONTACT_RATE_LIMIT?: KVNamespace
}

const MAX_BODY_BYTES = 20_000

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Same contract as the form and the local mock (src/lib/contact/validate.ts).
  if (env.CONTACT_RATE_LIMIT) {
    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
    const rate = await checkRateLimit(env.CONTACT_RATE_LIMIT, ip)
    if (!rate.allowed) {
      return Response.json({ error: 'Too many messages' }, { status: 429, headers: { 'retry-after': String(rate.retryAfterSeconds) } })
    }
  }
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: 'Payload too large' }, { status: 413 })
  }
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const result = validateContact(payload)
  if (!result.ok) {
    return Response.json({ error: 'Validation failed', fields: result.errors }, { status: 400 })
  }
  if (result.spam) return Response.json({ ok: true })
  const { name, email, subject, message } = result.value

  // Fail clearly, never crash, if the host is missing configuration.
  const missing = (['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL'] as const).filter((k) => !env[k])
  if (missing.length) {
    console.error(`contact: missing configuration: ${missing.join(', ')}`)
    return Response.json({ error: 'Contact form not configured' }, { status: 503 })
  }

  const resend = new Resend(env.RESEND_API_KEY)

  let error: unknown = null
  try {
    ;({ error } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    }))
  } catch (e) {
    error = e
  }

  if (error) {
    console.error('contact: send failed', error)
    return Response.json({ error: 'Failed to send message' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
