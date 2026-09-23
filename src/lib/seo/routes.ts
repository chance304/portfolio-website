// Every public route. The sitemap is generated from this list, and the
// URL-stability test checks that each one still resolves after a build.
export const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/quantum-foundry/', changeFrequency: 'monthly', priority: 0.8 },
] as const
