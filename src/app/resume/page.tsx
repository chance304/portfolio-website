import { Download } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { RESUME_PDF_PATH as PDF_PATH, resume } from '@/content/profile'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema, graph } from '@/lib/seo/schema'
import './resume.css'

export const metadata = generatePageMetadata({
  title: 'Résumé',
  description: 'Résumé of Shobhit Tripathi, engineering leader: CTO / IT Director at NS Engineering, 7+ years at Deloitte (Technology Guild Guru), creator of Quantum Foundry.',
  path: '/resume/',
  image: '/og/resume.png',
  type: 'profile',
})

export default function ResumePage() {
  return (
    <main className="resume container mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={graph(breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Résumé', path: '/resume/' }]))} />
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">Also available as a PDF with identical content.</p>
        <a href={PDF_PATH} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted" download>
          <Download className="size-4" aria-hidden="true" /> Download PDF
        </a>
      </div>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight">{resume.name}</h1>
        <p className="mt-1 font-medium text-[color:var(--brand-accent,#1f6cb0)] dark:text-[#67aaed]">{resume.title}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {resume.location} ·{' '}
          {resume.links.map((l, i) => (
            <span key={l.href}>
              <a className="underline-offset-4 hover:underline" href={l.href}>{l.label}</a>
              {i < resume.links.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      </header>

      <section aria-labelledby="r-summary"><h2 id="r-summary">Summary</h2><p>{resume.summary}</p></section>

      <section aria-labelledby="r-exp">
        <h2 id="r-exp">Experience</h2>
        {resume.experience.map((e) => (
          <div key={e.org} className="job">
            <h3>{e.org} — {e.role}</h3>
            <p className="meta">{e.period} · {e.place}</p>
            <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="r-proj">
        <h2 id="r-proj">Open source</h2>
        {resume.projects.map((p) => (
          <p key={p.name}><a href={p.href} className="font-medium underline-offset-4 hover:underline">{p.name}</a>: {p.description}</p>
        ))}
      </section>

      <section aria-labelledby="r-skills">
        <h2 id="r-skills">Skills</h2>
        <dl className="skills">
          {resume.skills.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
      </section>

      <section aria-labelledby="r-edu">
        <h2 id="r-edu">Education and certifications</h2>
        <ul>{[...resume.education, ...resume.certifications].map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <p className="no-print mt-10 text-sm text-muted-foreground">
        Contact: <a className="underline underline-offset-4" href="/#contact">shobhittripathi.com/#contact</a>
      </p>
    </main>
  )
}
