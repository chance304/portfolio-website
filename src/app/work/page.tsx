import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { caseStudies } from '@/content/profile'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema, graph } from '@/lib/seo/schema'

const DESCRIPTION =
  'Case studies by Shobhit Tripathi: research software that never reports a number a solver did not produce, a company platform built by one engineer, and seven years of enterprise delivery at Deloitte.'

export const metadata = generatePageMetadata({ title: 'Work', description: DESCRIPTION, path: '/work/', image: '/og/work.png' })

const items = [
  {
    href: '/quantum-foundry/',
    kicker: 'Case study · Research rigor',
    title: 'Quantum Foundry: an honest simulator for post-silicon devices',
    summary: "An open-source multi-physics simulator for 2D-material and 3D-stacked transistors, built on one rule: never report a number a solver didn't produce.",
  },
  ...caseStudies.map((c) => ({ href: `/work/${c.slug}/`, kicker: c.kicker, title: c.title, summary: c.summary })),
]

export default function WorkPage() {
  return (
    <main className="container mx-auto max-w-5xl px-6 py-20">
      <JsonLd data={graph(breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work/' }]))} />
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Work</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        In-depth case studies, each written the same way: the problem, the approach, what was hard, the result, and its honest limits.
      </p>
      <ul className="mt-12 grid gap-6">
        {items.map((it) => (
          <li key={it.href}>
            <a href={it.href} className="group block rounded-xl border border-border p-6 transition-colors hover:bg-muted/50">
              <p className="text-sm text-muted-foreground">{it.kicker}</p>
              <h2 className="mt-1 text-xl font-medium">{it.title}</h2>
              <p className="mt-2 text-muted-foreground">{it.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                Read the case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
