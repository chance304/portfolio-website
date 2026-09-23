// Single source for site-wide identity. Wording comes from brand/core.md
// (ADR-001, #4). Change it there first, then here.
export const siteConfig = {
  url: 'https://shobhittripathi.com',
  name: 'Shobhit Tripathi',
  coreSentence: 'Engineering leader who builds rigorous, AI-native platforms end to end.',
  statusLine: 'CTO / IT Director, NS Engineering',
  description:
    "Shobhit Tripathi is an engineering leader who builds rigorous, AI-native platforms end to end. CTO / IT Director at NS Engineering, ex-Deloitte (7+ years, Technology Guild Guru), and creator of Quantum Foundry, an open-source semiconductor simulator.",
  locale: 'en_US',
  defaultOgImage: '/og/home.png',
  sameAs: [
    'https://github.com/chance304',
    'https://www.linkedin.com/in/shobhittripathi304/',
  ],
  jobTitle: 'CTO / IT Director',
  worksFor: { name: 'NS Engineering & Geotechnical Services' },
  alumniOf: [{ name: 'Vellore Institute of Technology' }, { name: 'Sharda University' }],
  knowsAbout: [
    'Platform engineering',
    'Kubernetes',
    'Identity and single sign-on',
    'CI/CD',
    'AI-assisted software engineering',
    'Retrieval-augmented generation',
    'Semiconductor device simulation',
    'Blockchain (Hyperledger Fabric, DAML)',
  ],
  location: 'Kathmandu, Nepal',
} as const

export const absoluteUrl = (path = '/') => new URL(path, siteConfig.url).toString()
