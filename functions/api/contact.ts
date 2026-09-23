import { Resend } from 'resend'
import { validateContact } from '../../src/lib/contact/validate'

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string
  CONTACT_FROM_EMAIL: string
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
  // Per-IP rate limiting is configured on the host (ADR-003, #6), not here.
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

  const resend = new Resend(env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `[Portfolio Contact] ${subject}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    return Response.json({ error: 'Failed to send message' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
