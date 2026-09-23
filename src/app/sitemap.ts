import type { MetadataRoute } from 'next'
import { routes } from '@/lib/seo/routes'
import { absoluteUrl } from '@/lib/seo/site-config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: absoluteUrl(r.path), changeFrequency: r.changeFrequency, priority: r.priority }))
}
