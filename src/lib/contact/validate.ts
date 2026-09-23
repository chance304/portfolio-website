// Contact-form contract, shared by the form, the host function
// (functions/api/contact.ts), the local dev mock and the tests, so the rules
// can never drift apart. Plain TypeScript with no dependencies and only
// erasable syntax, so Node can run it directly.

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot: hidden from people, often filled by bots. Must stay empty. */
  website?: string
}

export type ContactField = 'name' | 'email' | 'subject' | 'message'
export type ValidationResult =
  | { ok: true; spam: boolean; value: ContactPayload }
  | { ok: false; errors: Partial<Record<ContactField, string>> }

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 5, max: 150 },
  message: { min: 10, max: 5000 },
} as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(input: unknown): ValidationResult {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const str = (k: string) => (typeof raw[k] === 'string' ? (raw[k] as string).trim() : '')
  const value: ContactPayload = { name: str('name'), email: str('email'), subject: str('subject'), message: str('message'), website: str('website') }
  const errors: Partial<Record<ContactField, string>> = {}

  if (value.name.length < LIMITS.name.min) errors.name = 'Please enter your name.'
  else if (value.name.length > LIMITS.name.max) errors.name = `Name must be at most ${LIMITS.name.max} characters.`
  if (!EMAIL.test(value.email) || value.email.length > LIMITS.email.max) errors.email = 'Please enter a valid email address.'
  if (value.subject.length < LIMITS.subject.min) errors.subject = 'Subject is too short.'
  else if (value.subject.length > LIMITS.subject.max) errors.subject = `Subject must be at most ${LIMITS.subject.max} characters.`
  if (value.message.length < LIMITS.message.min) errors.message = 'Message is too short.'
  else if (value.message.length > LIMITS.message.max) errors.message = `Message must be at most ${LIMITS.message.max} characters.`

  if (Object.keys(errors).length) return { ok: false, errors }
  // A filled honeypot is reported as success to the sender but never delivered.
  return { ok: true, spam: Boolean(value.website), value }
}
