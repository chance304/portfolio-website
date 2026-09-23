import { Award, Link2, ScrollText, Zap } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const CERTIFICATIONS = [
  { icon: Award, label: 'Technology Guild Guru (Highest Level)' },
  { icon: Link2, label: 'Deloitte Blockchain Architect' },
  { icon: Link2, label: 'Deloitte Blockchain Practitioner' },
  { icon: ScrollText, label: 'Hyperledger Apprentice Badge' },
  { icon: Zap, label: 'DAML Smart Contract Certification' },
]

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Professional Experience
          </h2>
        </Reveal>

        <div className="mt-10 space-y-12">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-lg font-medium">NS Engineering</h3>
                <span className="text-sm text-muted-foreground">Kathmandu, Nepal</span>
              </div>
              <span className="text-sm text-muted-foreground">Nov 2025 – Present</span>
            </div>
            <h4 className="mt-1 text-base text-muted-foreground">CTO / IT Director</h4>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Designed and run the company's entire technology stack as its sole engineer —
                infrastructure, applications, and architecture
              </li>
              <li>
                Designed and deployed the identity and access backbone: directory services,
                single sign-on, and an encrypted network mesh connecting every internal system
              </li>
              <li>
                Built a self-hosted internal platform suite covering team communication,
                company email, and real-time document collaboration, unified under one
                identity system
              </li>
              <li>
                Developed a custom enterprise application on an ERP platform to run lab
                operations, project tracking, and organization-wide goal/task management
              </li>
              <li>
                Digitized the company's quality management system to align lab operations with
                ISO/IEC 17025 international standards
              </li>
              <li>
                Shifted the department from reactive, ad hoc support to a governance-driven IT
                function — formal engagement agreements, budgeting, and a training model
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-lg font-medium">Deloitte</h3>
                <span className="text-sm text-muted-foreground">Delhi, India</span>
              </div>
              <span className="text-sm text-muted-foreground">Jun 2018 – Aug 2025</span>
            </div>
            <h4 className="mt-1 text-base text-muted-foreground">
              Senior Analyst & Technology Guild Guru
            </h4>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Owned the Kubernetes/Helm deployment layer of a 17-microservice platform running
                at 99.9% uptime
              </li>
              <li>
                Earned Technology Guild Guru certification — the highest level of blockchain
                expertise at Deloitte
              </li>
              <li>Built enterprise RAG systems and AI-powered document automation solutions</li>
              <li>
                Mentored 50+ practitioners in emerging technologies including blockchain and
                AI/ML
              </li>
              <li>
                Architected blockchain solutions for supply chain transparency using
                Hyperledger and DAML
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <h3 className="text-sm font-medium text-muted-foreground">
            Certifications & Achievements
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.label}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm"
              >
                <cert.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{cert.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
