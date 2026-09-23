import type { Metadata } from 'next'
import { absoluteUrl, siteConfig } from './site-config'

type PageMetadataInput = {
  /** Page title without the site-name suffix. Omit for the homepage. */
  title?: string
  description: string
  /** Route path with trailing slash, e.g. "/quantum-foundry/". */
  path: string
  /** Path under public/, e.g. "/og/quantum-foundry.png". */
  image?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
}

/** Builds canonical, Open Graph, Twitter and robots metadata for one route. */
export function generatePageMetadata({ title, description, path, image, type = 'website', keywords }: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} · ${siteConfig.name}` : `${siteConfig.name}: ${siteConfig.coreSentence.replace(/\.$/, '')}`
  const img = absoluteUrl(image ?? siteConfig.defaultOgImage)
  const url = absoluteUrl(path)
  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { type, url, title: fullTitle, description, siteName: siteConfig.name, locale: siteConfig.locale, images: [{ url: img, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [img] },
    robots: { index: true, follow: true },
  }
}
