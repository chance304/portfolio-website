// Public-safe profile content: the single source for the homepage pillars, the
// case studies, the research page and the résumé (web page + PDF).
//
// Rules (brand/core.md, ADR-001 #4, ADR-005 #8, ADR-006 #9):
// - Every claim is verifiable (evidence kept privately).
// - Company and client work stays at system/scope level: no named incidents,
//   bugs, audit findings, internal project codenames or client-internal detail.
// - No phone number and no personal email address.

export const pillars = [
  {
    title: 'Platform & infrastructure',
    summary:
      "Designed and runs a company's entire technology stack as its sole engineer: identity and single sign-on, private networking across environments, CI/CD from zero, production monitoring and ERP. At Deloitte, owned the Kubernetes/Helm layer of a 17-microservice platform at 99.9% uptime.",
    href: '/work/company-platform/',
  },
  {
    title: 'AI-native engineering',
    summary:
      'AI-assisted, agentic engineering is the default way I build and maintain production systems, not an experiment. Hands-on retrieval (RAG) and vector-search work.',
    href: '/work/company-platform/',
  },
  {
    title: 'Research rigor',
    summary:
      "Quantum Foundry: an open-source multi-physics simulator for post-silicon transistors, built on one rule: never report a number a solver didn't produce.",
    href: '/quantum-foundry/',
  },
  {
    title: 'Enterprise delivery',
    summary:
      "7+ years at Deloitte: led the team behind a firm-wide inter-firm agreement system, ran delivery as Scrum Master and client-facing technical lead, mentored 50+ engineers, and earned Technology Guild Guru.",
    href: '/work/enterprise-delivery/',
  },
] as const

export type CaseStudy = {
  slug: string
  title: string
  kicker: string
  summary: string
  role: string
  period: string
  stack: string[]
  problem: string[]
  approach: { heading: string; body: string }[]
  hard: { heading: string; body: string }[]
  result: string[]
  limits: string[]
  datePublished: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'company-platform',
    title: "A company's entire technology stack, built by one engineer",
    kicker: 'Case study · Platform & infrastructure',
    summary:
      'Identity, networking, delivery pipelines, monitoring and a lab ERP for a geotechnical and materials-testing company, designed and run end to end by its sole engineer.',
    role: 'CTO / IT Director, NS Engineering',
    period: 'Nov 2025 – present',
    stack: ['Active Directory', 'Keycloak (SSO)', 'LDAPS', 'WireGuard', 'GitHub Actions', 'FastAPI + RQ', 'Prometheus / Grafana', 'Frappe / ERPNext', 'Playwright'],
    problem: [
      'A growing engineering company needed the technology backbone of a much larger organisation: one identity for every employee and system, separate development, staging and production environments, reliable deployments, and software for a testing laboratory working to ISO/IEC 17025.',
      'It had one engineer to build and operate all of it. So the design had to keep the ongoing operating load low.',
    ],
    approach: [
      {
        heading: 'Identity first',
        body: 'A single directory (Active Directory) federated into Keycloak over LDAPS gives every application single sign-on from one source of truth. Collaboration tools, the ERP and internal services all authenticate against it, so joining or leaving the company is one change, not many.',
      },
      {
        heading: 'Isolated environments on a private network',
        body: 'Development, staging and production run on separate hosts connected by a WireGuard mesh. The environments are designed so that a test run or a restored backup can never write to production identity data.',
      },
      {
        heading: 'Everything deployed by CI',
        body: 'A previously manual, SSH-driven setup moved to GitHub Actions pipelines with secrets rotation, linting of the pipelines themselves, and production deploys gated behind their own environment.',
      },
      {
        heading: 'Durable by design',
        body: "HR-facing account changes go through a queue-backed provisioning service (FastAPI + RQ), so an outage in a downstream system delays a change instead of losing it. Prometheus and Grafana monitor the identity and application stack.",
      },
      {
        heading: 'Lab software that meets a standard',
        body: 'A Frappe/ERPNext-based lab and operations system covers the testing workflow, with compliance data migrated for ISO/IEC 17025 (equipment, personnel authorisation, historical certification records), an organisation-wide OKR system, and a Playwright end-to-end test suite.',
      },
      {
        heading: 'AI-assisted engineering as the default',
        body: 'The whole stack is built and maintained with an AI-assisted, agentic workflow. That is what makes one person able to cover this much surface, with tests and live verification as the check on its output.',
      },
    ],
    hard: [
      {
        heading: 'One source of truth for identity',
        body: "Every new system wants its own user list. Integrating each application with the one directory, rather than giving it a separate set of accounts, is more work up front for every system added.",
      },
      {
        heading: 'Green checks are not the same as working',
        body: 'With no second engineer to catch problems, the discipline that mattered most was verifying behaviour live (killing a dependency mid-operation to confirm recovery, for example) instead of trusting a successful deploy.',
      },
      {
        heading: 'Scope versus capacity',
        body: "Self-hosting keeps the company's data in the company, but every service is also something to patch, monitor and back up, by the same one person.",
      },
    ],
    result: [
      'One identity across the company, with single sign-on to its systems.',
      'Separate, isolated development, staging and production environments.',
      'Deployments that go through CI instead of manual SSH, with production gated.',
      'Monitoring across the identity and application stack.',
      'Laboratory workflows and compliance records digitised for ISO/IEC 17025.',
    ],
    limits: [
      'A one-engineer platform has a bus factor of one. Documentation, runbooks and CI reduce that risk but do not remove it.',
      "This page describes the systems' scope and design only; operational details stay private to the company.",
    ],
    datePublished: '2026-09-23',
  },
  {
    slug: 'enterprise-delivery',
    title: 'Seven years of enterprise delivery at Deloitte',
    kicker: 'Case study · Enterprise delivery',
    summary:
      'Leading a firm-wide platform team, owning the Kubernetes layer of a high-availability microservices platform, running delivery for US stakeholders, and building a blockchain practice to the firm’s highest level.',
    role: 'Senior Analyst / Technology Guild Guru, Deloitte India',
    period: 'Jun 2018 – Aug 2025',
    stack: ['Kubernetes', 'Helm', '.NET / C#', 'Azure DevOps', 'ServiceNow', 'Hyperledger Fabric', 'DAML'],
    problem: [
      "Deloitte's member firms in different countries need a formal way to engage and work with each other across borders. Client engagements, sales opportunities and engagement financials need dependable internal platforms. Those platforms need to stay up.",
      'Delivering that from Hyderabad for US-based stakeholders meant combining hands-on engineering with running the delivery itself.',
    ],
    approach: [
      {
        heading: 'Leading the team behind a firm-wide system',
        body: 'Led the team that built a Deloitte-wide inter-firm agreement system, which lets member firms in different countries formally engage and work with each other.',
      },
      {
        heading: 'Owning the platform layer',
        body: 'On a 17-microservice platform running at 99.9% uptime, owned the Kubernetes and Helm deployment layer.',
      },
      {
        heading: 'Running delivery, not just code',
        body: "Owned the team's Azure DevOps board and backlog and served as Scrum Master; acted as the primary technical point of contact for US stakeholders; managed a lean team handling production tickets against SLA commitments.",
      },
      {
        heading: 'Building a practice',
        body: "Built enterprise blockchain solutions on Hyperledger Fabric and DAML, earning Technology Guild Guru, the firm's highest internal recognition for blockchain expertise, plus three DAML certifications. Judged firm-wide blockchain hackathons and mentored 50+ engineers through guild summits and learning series.",
      },
    ],
    hard: [
      {
        heading: 'Delivery across time zones',
        body: 'Serving as the primary technical point of contact for US-based stakeholders from Hyderabad meant working across a large time-zone gap on every engagement.',
      },
      {
        heading: 'Engineer and delivery lead at once',
        body: 'Scrum Master, backlog owner and hands-on engineer were held at the same time on the same engagements.',
      },
    ],
    result: [
      'A firm-wide inter-firm agreement system delivered by a team I led.',
      'The Kubernetes/Helm layer of a 17-microservice platform at 99.9% uptime.',
      'Technology Guild Guru, plus DAML Associate, Solutions Architect and Applications Engineer certifications.',
      '50+ engineers mentored; founding host of an internal engineering podcast that grew to 500+ listeners.',
      'Core team member of a firm-wide initiative that improved remote hiring and reduced new-employee attrition.',
    ],
    limits: [
      'This work belongs to the firm and its clients, so it is described at the level of scope and role only.',
      'Figures are as measured and reported at the time.',
    ],
    datePublished: '2026-09-23',
  },
]

export const researchInterests = [
  {
    title: 'Scientific software that stays honest',
    body: "Simulation pipelines where every output is traceable to a solver that actually ran and to cited data, and where missing data is refused rather than filled in. Quantum Foundry is my working example.",
  },
  {
    title: 'Device-level simulation for post-silicon and 3D-stacked transistors',
    body: 'Coupling materials data, quantum transport, thermal and yield models to rank 2D-material and stacking choices (CFET, GAA, monolithic 3D) on performance and manufacturability together.',
  },
  {
    title: 'Reliable distributed and identity systems',
    body: 'The infrastructure side of my professional work: identity federation, environment isolation, durable queues and delivery pipelines that stay correct when components fail.',
  },
] as const

export const publications = [
  {
    citation: '“Energy Transmission Protocols for Wireless Sensor Networks: A Review.” International Journal of Engineering and Computer Science, October 2014.',
  },
] as const

/** Public résumé PDF, generated from /resume/ by scripts/resume-pdf.mjs. */
export const RESUME_PDF_PATH = '/shobhit-tripathi-resume.pdf'

export const resume = {
  name: 'Shobhit Tripathi',
  title: 'Engineering Leader — Platforms, AI Engineering & Research Software',
  location: 'Kathmandu, Nepal · open to remote work',
  links: [
    { label: 'shobhittripathi.com', href: 'https://shobhittripathi.com' },
    { label: 'github.com/chance304', href: 'https://github.com/chance304' },
    { label: 'linkedin.com/in/shobhittripathi304', href: 'https://www.linkedin.com/in/shobhittripathi304/' },
  ],
  summary:
    "Engineering leader who builds rigorous, AI-native platforms end to end. As CTO / IT Director at a geotechnical services company, I designed and run its entire technology stack as its sole engineer: identity and single sign-on, private networking across environments, CI/CD built from zero, production monitoring, and an ERP supporting ISO/IEC 17025 lab compliance, built with AI-assisted engineering as the default practice. Before that, 7+ years at Deloitte (11+ years in total), where I led the team behind a firm-wide inter-firm agreement system, owned the Kubernetes/Helm layer of a 17-microservice platform at 99.9% uptime, and earned Technology Guild Guru. I also build Quantum Foundry, an open-source multi-physics semiconductor simulator.",
  experience: [
    {
      org: 'N.S. Engineering & Geotechnical Services',
      role: 'CTO / IT Director',
      period: 'Nov 2025 – Present',
      place: 'Kathmandu, Nepal',
      bullets: [
        'Designed and deployed a production identity and single sign-on stack (Active Directory, Keycloak, LDAPS federation) with a private WireGuard mesh connecting dev, stage and prod environments.',
        'Built a durable, queue-backed provisioning service (FastAPI + RQ) so an outage in a downstream service never loses or blocks an HR-facing write.',
        'Built CI/CD (GitHub Actions) from zero for the whole stack, with secrets rotation and environment-gated production deploys.',
        'Run production monitoring (Prometheus/Grafana) across the identity and application stack.',
        'Led development of a Frappe/ERPNext-based LIMS/ERP with a Playwright test suite, ISO/IEC 17025 compliance data migration and an org-wide OKR system.',
        'Run an AI-assisted engineering workflow (agentic tooling) as the default way the stack is built and maintained.',
      ],
    },
    {
      org: 'Deloitte India',
      role: 'Senior Analyst / Technology Guild Guru',
      period: 'Jun 2018 – Aug 2025',
      place: 'Hyderabad, India · US-facing engagements',
      bullets: [
        'Led the team that built a Deloitte-wide inter-firm agreement system enabling member firms to engage and work with each other across borders.',
        'Key developer on the platform handling client engagements, sales opportunities and engagement financials.',
        'Owned the Kubernetes and Helm deployment layer of a 17-microservice platform running at 99.9% uptime.',
        "Owned the team's Azure DevOps board and backlog and served as Scrum Master; primary technical point of contact for US-based stakeholders.",
        'Managed a lean delivery team handling ServiceNow production tickets against SLA commitments.',
        "Earned Technology Guild Guru, Deloitte's highest internal recognition for blockchain expertise; built solutions on Hyperledger Fabric and DAML; judged firm-wide blockchain hackathons; mentored 50+ engineers.",
        'Founding host and two-year communications lead of an engineering community of practice, growing its podcast to 500+ listeners.',
        'Core team member of a firm-wide COVID-era initiative improving remote hiring and reducing new-employee attrition.',
      ],
    },
    {
      org: 'Freelance',
      role: 'Software Engineer',
      period: 'Aug 2025 – Present',
      place: 'Remote',
      bullets: [
        'Built and shipped the website for a registered Nepali non-profit: Next.js, TypeScript and Tailwind CSS, statically exported and deployed via a CI/CD pipeline.',
        'Built a suite of event and registration microsites with Google Apps Script backends for a hospitality brand.',
      ],
    },
  ],
  projects: [
    {
      name: 'Quantum Foundry',
      href: 'https://github.com/chance304/quantum-foundry',
      description: 'Open-source (Apache-2.0) multi-physics simulator for post-silicon and 3D-stacked transistors: cited materials database, Kwant NEGF transport, multi-tier thermal, Monte Carlo yield, Pareto search.',
    },
  ],
  skills: [
    ['Languages', 'Python, TypeScript/JavaScript, C#, PHP, C++'],
    ['Backend & infrastructure', 'FastAPI, .NET, Node.js, Next.js, Docker, Kubernetes, Helm, GitHub Actions, Azure DevOps'],
    ['Identity & security', 'Active Directory/LDAP, Keycloak, OIDC/SSO, WireGuard'],
    ['Data', 'PostgreSQL, MongoDB, SQL Server, Redis'],
    ['AI', 'Agentic engineering tooling, RAG, vector search, LangChain'],
    ['Blockchain', 'Hyperledger Fabric, DAML, Solidity'],
    ['ERP & quality', 'Frappe/ERPNext, ISO/IEC 17025 compliance data'],
  ],
  education: [
    'Master of Computer Applications — Vellore Institute of Technology, 2016–2018',
    "Bachelor's in Computer Applications — Sharda University, 2013–2016",
  ],
  certifications: [
    'IBM Qiskit Global Summer School (Quantum Computing)',
    'DAML Applications Engineer · DAML Solutions Architect · DAML Associate',
    'Deloitte Blockchain Architect · Deloitte Hyperledger Fabric 1.4',
  ],
}
