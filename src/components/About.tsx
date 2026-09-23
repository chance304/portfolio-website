import { Reveal } from '@/components/Reveal'

const STATS = [
  { value: '11+', label: 'Years in Engineering' },
  { value: '7+', label: 'Years at Deloitte' },
  { value: '1', label: "Company's Full Stack, Built Solo" },
  { value: 'Guild Guru', label: "Deloitte's Highest Blockchain Recognition" },
]

export function About() {
  return (
    <section id="about" className="border-t border-border py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">About Me</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-6 max-w-3xl space-y-4 text-muted-foreground">
          <p>
            I'm a builder first — someone who takes a system from a blank repository to
            something real people depend on, across every layer: infrastructure, backend,
            frontend, and the AI tooling increasingly wrapped around all of it. Today I'm CTO / IT
            Director at NS Engineering, a geotechnical services company in Kathmandu, Nepal, where
            I designed and run the entire technology stack as its sole engineer: identity and
            infrastructure, internal platforms, and a custom enterprise application running the
            company's core operations.
          </p>
          <p>
            Before that, I spent 7+ years at Deloitte, where I earned the{' '}
            <strong className="text-foreground">Technology Guild Guru</strong> — the firm's
            highest internal recognition for blockchain expertise — while working across
            enterprise-grade platforms, AI/ML systems, and blockchain architecture.
          </p>
          <p>
            My approach is research-first: I'd rather spend the time confirming how something
            actually works than ship on an assumption. Standards and structure aren't a
            preference for me, they're the floor — chaos gets organized before anything else
            gets built.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
