import type { MetadataRoute } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/seo/site-config'

export const dynamic = 'force-static'

// AI crawlers are allowed explicitly (not just via the wildcard) so the intent
// is unambiguous: this site wants to be read by AI search and assistants.
export const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'] as const

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((ua) => ({ userAgent: ua, allow: '/' })),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  }
}
