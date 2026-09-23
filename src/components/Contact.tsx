'use client'

import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { MapPin, Globe, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Reveal } from '@/components/Reveal'
import { LIMITS, validateContact, type ContactField } from '@/lib/contact/validate'

type FormState = { name: string; email: string; subject: string; message: string; website: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

const INITIAL_STATE: FormState = { name: '', email: '', subject: '', message: '', website: '' }

const STATUS_TEXT: Record<Status, string> = {
  idle: '',
  sending: 'Sending your message…',
  sent: "Message sent. I'll get back to you soon.",
  error: 'Something went wrong sending your message. Please try again.',
}

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({})

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (field !== 'website') setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = validateContact(form)
    if (!result.ok) {
      setErrors(result.errors)
      setStatus('idle')
      const first = (['name', 'email', 'subject', 'message'] as const).find((f) => result.errors[f])
      if (first) document.getElementById(first)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { fields?: Partial<Record<ContactField, string>> }
        if (body.fields) setErrors(body.fields)
        throw new Error('Request failed')
      }
      setStatus('sent')
      toast.success(STATUS_TEXT.sent)
      setForm(INITIAL_STATE)
    } catch {
      setStatus('error')
      toast.error(STATUS_TEXT.error)
    }
  }

  const fieldProps = (field: ContactField) => ({
    id: field,
    name: field,
    value: form[field],
    onChange: handleChange(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    maxLength: field === 'email' ? LIMITS.email.max : LIMITS[field].max,
    required: true,
  })

  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="text-sm text-destructive">
        {errors[field]}
      </p>
    ) : null

  return (
    <section id="contact" className="border-t border-border py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Get In Touch</h2>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h3 className="text-lg font-medium">Let's Connect</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I'm always open to discussing new opportunities, ambitious builds, or simply
              connecting with fellow engineers — whether that's enterprise infrastructure,
              AI-native tooling, or something further out.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>shobhittripathi.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Wrench className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>CTO / IT Director, NS Engineering</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-describedby="contact-status">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input {...fieldProps('name')} autoComplete="name" />
                {fieldError('name')}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input {...fieldProps('email')} type="email" autoComplete="email" />
                {fieldError('email')}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input {...fieldProps('subject')} />
                {fieldError('subject')}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea {...fieldProps('message')} rows={5} />
                {fieldError('message')}
              </div>
              {/* Honeypot: invisible to people and screen readers; bots tend to fill it. */}
              <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange('website')} />
              </div>
              <Button type="submit" className="w-full" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>
              <p id="contact-status" role="status" aria-live="polite" className={`text-sm ${status === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
                {STATUS_TEXT[status]}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
