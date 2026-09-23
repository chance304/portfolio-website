import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// Fully static site (ADR-002, #5): every route is prerendered to HTML at build
// time and deployable to any static host (ADR-003 decides which).
const config: NextConfig = {
  output: isDev ? undefined : 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Local development only: the contact form posts to /api/contact, which in
  // production is the host's function (functions/api/contact.ts). In dev it is
  // proxied to the local mock started by scripts/dev.mjs, so no cloud
  // credentials are needed.
  ...(isDev && {
    async rewrites() {
      // trailingSlash redirects /api/contact -> /api/contact/ first (fetch follows
      // the 308 with the POST body intact), so match both forms.
      const destination = `http://127.0.0.1:${process.env.CONTACT_MOCK_PORT ?? 8788}/api/contact`
      return [
        { source: '/api/contact', destination },
        { source: '/api/contact/', destination },
      ]
    },
  }),
}

export default config
