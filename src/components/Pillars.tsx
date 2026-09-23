import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { pillars } from '@/content/profile'

/** The four proof pillars from brand/core.md, each linking to its evidence. */
export function Pillars() {
  return (
    <section id="pillars" aria-labelledby="pillars-heading" className="border-t border-border py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 id="pillars-heading" className="text-2xl font-semibold tracking-tight md:text-3xl">
            What I bring
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.05}>
              <a href={p.href} className="group block h-full rounded-xl border border-border p-6 transition-colors hover:bg-muted/50">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-medium">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  See the evidence <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
