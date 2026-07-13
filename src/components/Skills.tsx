import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: ['C#', 'Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'],
  },
  {
    title: 'Frameworks & Frontend',
    skills: ['.NET', 'React', 'Vite', 'Tailwind CSS', 'Angular', 'Node.js', 'Flask'],
  },
  {
    title: 'Infrastructure & Identity',
    skills: [
      'Active Directory',
      'Keycloak / OIDC',
      'WireGuard',
      'Docker',
      'GitHub Actions CI/CD',
      'Prometheus / Grafana',
    ],
    highlight: true,
  },
  {
    title: 'Enterprise Platforms',
    skills: ['ERPNext / Frappe', 'MariaDB', 'Playwright E2E', 'Self-hosted collaboration stacks'],
    highlight: true,
  },
  {
    title: 'AI / ML',
    skills: ['RAG Systems', 'LangChain', 'PyTorch', 'Transformers', 'Vector Databases', 'LoRA / QLoRA'],
  },
  {
    title: 'Blockchain',
    skills: ['Hyperledger', 'DAML', 'Smart Contracts', 'Solidity', 'Web3'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Technical Skills</h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.05}>
              <h3 className="text-sm font-medium text-muted-foreground">{category.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={category.highlight ? 'default' : 'secondary'}
                    className="font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
