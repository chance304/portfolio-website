import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Reveal } from '@/components/Reveal'

type Project = {
  title: string
  role: string
  description: string
  tech: string[]
  achievements: string[]
  link?: { href: string; label: string }
}

const PROJECTS: Project[] = [
  {
    title: 'Quantum Foundry',
    role: 'Creator · Open Source',
    description:
      'An open-source multi-physics simulator for post-silicon and 3D-stacked transistors. It ranks 2D channel materials and stacking choices on performance, heat and manufacturability together, and never reports a number a solver didn\u2019t produce.',
    tech: ['Python', 'Kwant (NEGF)', 'HotSpot', 'gmsh', 'Monte Carlo yield', 'Apache-2.0'],
    achievements: [
      'Five-stage pipeline with swappable stub and real-solver backends',
      'Cited materials database for 10 2D materials and gate dielectrics',
      'Multi-tier thermal physics for CFET, GAA and monolithic-3D stacks',
      'Provenance on every result: which solver ran, and whether it was real',
    ],
    link: { href: '/quantum-foundry/', label: 'Read the project write-up' },
  },
  {
    title: 'Enterprise Identity & Infrastructure Platform',
    role: 'Infrastructure Architect',
    description:
      'Designed and built a production identity and access backbone for a growing organization — directory services, single sign-on, and a secure encrypted network mesh connecting distributed systems, backed by full CI/CD and observability.',
    tech: ['Active Directory', 'Keycloak / OIDC', 'WireGuard', 'Docker', 'GitHub Actions', 'Prometheus / Grafana'],
    achievements: [
      'Centralized single sign-on across every internal system',
      'Encrypted mesh network connecting distributed infrastructure',
      'Full CI/CD pipeline replacing manual operations',
      'Production observability stack',
    ],
  },
  {
    title: 'Self-Hosted Collaboration Suite',
    role: 'Platform Engineer',
    description:
      'Built a complete internal alternative to commercial productivity suites — team chat, company email, and real-time office-document collaboration — self-hosted for data ownership and unified under a single identity system.',
    tech: ['Docker Compose', 'OIDC / SSO Integration', 'Real-time Co-editing Engines'],
    achievements: [
      'Three integrated platforms unified under single sign-on',
      'Real-time multi-user document editing',
      'Full data sovereignty — zero third-party SaaS dependency',
    ],
  },
  {
    title: 'Enterprise Lab & Operations Management System',
    role: 'Application Developer & Architect',
    description:
      'Built a custom enterprise application on an open-source ERP framework to run material-testing lab operations, organization-wide project tracking, and OKR/task management across multiple departments.',
    tech: ['Python', 'Frappe Framework', 'MariaDB', 'Playwright E2E Testing'],
    achievements: [
      'End-to-end lab workflow from sample intake to certified report',
      'Organization-wide goal/task rollup system across departments',
      'Automated end-to-end test suite',
      'Full digitization of an ISO/IEC 17025 quality management system',
    ],
  },
  {
    title: 'AI-Powered Document Generation System',
    role: 'AI/ML Lead Developer',
    description:
      'Developed an intelligent document automation platform using retrieval-augmented generation and enterprise templates, powered by chat-based interfaces.',
    tech: ['Python', 'LangChain', 'RAG', 'Vector Databases', 'NLP'],
    achievements: [
      '90% efficiency improvement in document processing',
      'Enterprise-grade template automation',
      'Real-time chat-based document generation',
    ],
  },
  {
    title: 'Blockchain Supply Chain Solution',
    role: 'Blockchain Architect',
    description:
      'Architected and implemented blockchain solutions for supply chain transparency using Hyperledger and DAML smart contracts.',
    tech: ['Hyperledger', 'DAML', 'Smart Contracts', 'Blockchain'],
    achievements: [
      'Digital bonds digitization for enterprise clients',
      'End-to-end supply chain transparency',
      'Smart contract automation',
    ],
  },
]

export function Projects() {
  return (
    <section id="projects" className="border-t border-border py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Featured Projects</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <h3 className="text-base font-medium">{project.title}</h3>
                  <span className="text-sm text-muted-foreground">{project.role}</span>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {project.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  {project.link && (
                    <a
                      href={project.link.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {project.link.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
