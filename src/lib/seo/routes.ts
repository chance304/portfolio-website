// Every public route. The sitemap is generated from this list, and the
// URL-stability test checks that each one still resolves after a build.
export const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/quantum-foundry/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/work/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/work/company-platform/', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/work/enterprise-delivery/', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/research/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/resume/', changeFrequency: 'monthly', priority: 0.7 },
] as const
