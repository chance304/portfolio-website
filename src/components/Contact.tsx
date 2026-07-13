import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Reveal } from '@/components/Reveal'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_STATE: FormState = { name: '', email: '', subject: '', message: '' }

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [submitting, setSubmitting] = useState(false)

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (form.name.trim().length < 2) return toast.error('Please enter your name.')
    if (!isValidEmail(form.email)) return toast.error('Please enter a valid email address.')
    if (form.subject.trim().length < 5) return toast.error('Subject is too short.')
    if (form.message.trim().length < 10) return toast.error('Message is too short.')

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      toast.success("Message sent — I'll get back to you soon.")
      setForm(INITIAL_STATE)
    } catch {
      toast.error('Something went wrong sending your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

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
                <span aria-hidden="true">📍</span>
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true">🌐</span>
                <span>shobhittripathi.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true">🛠️</span>
                <span>Builder & Founder, NS Engineering</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={handleChange('name')} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={handleChange('subject')} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
