import { JsonLd } from '@/components/JsonLd'
import { publications, researchInterests } from '@/content/profile'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema, graph } from '@/lib/seo/schema'

const DESCRIPTION =
  'Research interests of Shobhit Tripathi: honest scientific software, device-level simulation for post-silicon and 3D-stacked transistors, and reliable distributed and identity systems. Includes Quantum Foundry and how to cite it.'

export const metadata = generatePageMetadata({ title: 'Research', description: DESCRIPTION, path: '/research/', image: '/og/research.png' })

const CITE = `@software{tripathi_quantum_foundry_2026,
  author  = {Tripathi, Shobhit},
  title   = {Quantum Foundry: a multi-physics simulator for
             post-silicon and 3D-stacked semiconductor devices},
  version = {0.3.0},
  year    = {2026},
  url     = {https://github.com/chance304/quantum-foundry},
  license = {Apache-2.0}
}`

export default function ResearchPage() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-20">
      <JsonLd data={graph(breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Research', path: '/research/' }]))} />
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Research</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        I&apos;m an engineer moving deliberately towards research. My strongest evidence is software built to research standards, not a
        publication record, and this page says so plainly.
      </p>

      <section aria-labelledby="interests" className="mt-14">
        <h2 id="interests" className="text-xl font-semibold tracking-tight md:text-2xl">Interests</h2>
        <ul className="mt-6 space-y-6">
          {researchInterests.map((r) => (
            <li key={r.title}>
              <h3 className="font-medium">{r.title}</h3>
              <p className="mt-1 text-muted-foreground">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="software" className="mt-14 border-t border-border pt-12">
        <h2 id="software" className="text-xl font-semibold tracking-tight md:text-2xl">Research software</h2>
        <h3 className="mt-6 font-medium">
          <a className="underline underline-offset-4" href="/quantum-foundry/">Quantum Foundry</a>
        </h3>
        <p className="mt-1 text-muted-foreground">
          An open-source (Apache-2.0) multi-physics simulator for post-silicon and 3D-stacked transistors: a cited materials database, quantum
          transport (Kwant NEGF), multi-tier thermal models, Monte Carlo yield and Pareto search. Every result records which solver produced it;
          missing data is refused, not invented. Source:{' '}
          <a className="underline underline-offset-4" href="https://github.com/chance304/quantum-foundry">github.com/chance304/quantum-foundry</a>.
        </p>
        <p className="mt-4 text-sm font-medium">How to cite</p>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-xs leading-relaxed">{CITE}</pre>
        <p className="mt-2 text-sm text-muted-foreground">
          The repository also ships a <code className="rounded bg-muted px-1 text-foreground">CITATION.cff</code> file, which GitHub renders as &ldquo;Cite this repository&rdquo;.
        </p>
      </section>

      <section aria-labelledby="pubs" className="mt-14 border-t border-border pt-12">
        <h2 id="pubs" className="text-xl font-semibold tracking-tight md:text-2xl">Publications and training</h2>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">
          {publications.map((p) => <li key={p.citation}>{p.citation}</li>)}
          <li>IBM Qiskit Global Summer School (Quantum Computing).</li>
        </ul>
      </section>

      <p className="mt-14 text-muted-foreground">
        Interested in working together on research? <a className="underline underline-offset-4" href="/#contact">Get in touch</a>.
      </p>
    </main>
  )
}
