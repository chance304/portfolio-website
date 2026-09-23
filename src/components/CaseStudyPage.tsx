import { JsonLd } from '@/components/JsonLd'
import type { CaseStudy } from '@/content/profile'
import { articleSchema, breadcrumbSchema, graph } from '@/lib/seo/schema'

// Shared case-study template (issue: "Case study template"):
// problem → approach → what was hard → result → honest limits.
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border py-12">
      <h2 id={id} className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
      <div className="mt-5 space-y-4 text-muted-foreground">{children}</div>
    </section>
  )
}

export function CaseStudyPage({ study, path }: { study: CaseStudy; path: string }) {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-20">
      <JsonLd
        data={graph(
          articleSchema({ headline: study.title, description: study.summary, path, image: `/og/${study.slug}.png`, datePublished: study.datePublished }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work/' }, { name: study.title, path }]),
        )}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <a href="/work/" className="underline-offset-4 hover:underline">Work</a> / <span>{study.kicker.replace('Case study · ', '')}</span>
      </nav>
      <p className="mt-8 text-sm font-medium text-muted-foreground">{study.kicker}</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{study.title}</h1>
      <p className="mt-5 text-lg text-muted-foreground">{study.summary}</p>
      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
        <div><dt className="text-muted-foreground">Role</dt><dd className="mt-1 font-medium">{study.role}</dd></div>
        <div><dt className="text-muted-foreground">Period</dt><dd className="mt-1 font-medium">{study.period}</dd></div>
      </dl>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
        {study.stack.map((t) => (
          <li key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{t}</li>
        ))}
      </ul>

      <div className="mt-12">
        <Section id="problem" title="The problem">
          {study.problem.map((p) => <p key={p}>{p}</p>)}
        </Section>
        <Section id="approach" title="Approach">
          {study.approach.map((a) => (
            <div key={a.heading}>
              <h3 className="font-medium text-foreground">{a.heading}</h3>
              <p className="mt-1">{a.body}</p>
            </div>
          ))}
        </Section>
        <Section id="hard" title="What was hard">
          {study.hard.map((a) => (
            <div key={a.heading}>
              <h3 className="font-medium text-foreground">{a.heading}</h3>
              <p className="mt-1">{a.body}</p>
            </div>
          ))}
        </Section>
        <Section id="result" title="Result">
          <ul className="list-disc space-y-2 pl-5">{study.result.map((r) => <li key={r}>{r}</li>)}</ul>
        </Section>
        <Section id="limits" title="Honest limits">
          <ul className="list-disc space-y-2 pl-5">{study.limits.map((r) => <li key={r}>{r}</li>)}</ul>
        </Section>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        More: <a className="underline underline-offset-4" href="/work/">all case studies</a> ·{' '}
        <a className="underline underline-offset-4" href="/#contact">get in touch</a>
      </p>
    </main>
  )
}
