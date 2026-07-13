import { Resend } from 'resend'

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string
  CONTACT_FROM_EMAIL: string
}

interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: Partial<ContactPayload>
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, subject, message } = payload

  if (!name || name.trim().length < 2) {
    return Response.json({ error: 'Invalid name' }, { status: 400 })
  }
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!subject || subject.trim().length < 5) {
    return Response.json({ error: 'Invalid subject' }, { status: 400 })
  }
  if (!message || message.trim().length < 10) {
    return Response.json({ error: 'Invalid message' }, { status: 400 })
  }

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
