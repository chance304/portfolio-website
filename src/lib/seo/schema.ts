// Typed JSON-LD generators. Every entity is linked by @id so search and AI
// engines can resolve "this project was made by this person on this site".
import { absoluteUrl, siteConfig } from './site-config'

export const ids = {
  person: absoluteUrl('/#person'),
  website: absoluteUrl('/#website'),
}

type Thing = Record<string, unknown> & { '@type': string }

export function personSchema(): Thing {
  return {
    '@type': 'Person',
    '@id': ids.person,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.coreSentence,
    jobTitle: siteConfig.jobTitle,
    worksFor: { '@type': 'Organization', name: siteConfig.worksFor.name },
    alumniOf: siteConfig.alumniOf.map((o) => ({ '@type': 'CollegeOrUniversity', name: o.name })),
    knowsAbout: [...siteConfig.knowsAbout],
    homeLocation: { '@type': 'Place', name: siteConfig.location },
    sameAs: [...siteConfig.sameAs],
  }
}

export function websiteSchema(): Thing {
  return { '@type': 'WebSite', '@id': ids.website, url: siteConfig.url, name: siteConfig.name, description: siteConfig.description, publisher: { '@id': ids.person }, inLanguage: 'en' }
}

export function profilePageSchema(): Thing {
  return { '@type': 'ProfilePage', '@id': absoluteUrl('/#profile'), url: siteConfig.url, name: siteConfig.name, isPartOf: { '@id': ids.website }, mainEntity: { '@id': ids.person } }
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  }
}

export function softwareSourceCodeSchema(input: { name: string; description: string; path: string; codeRepository: string; license: string; programmingLanguage: string; keywords: string[] }): Thing {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': absoluteUrl(`${input.path}#software`),
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    codeRepository: input.codeRepository,
    license: input.license,
    programmingLanguage: input.programmingLanguage,
    keywords: input.keywords,
    author: { '@id': ids.person },
    creator: { '@id': ids.person },
  }
}

export function articleSchema(input: { headline: string; description: string; path: string; image: string; datePublished: string; dateModified?: string; about?: string }): Thing {
  return {
    '@type': 'Article',
    '@id': absoluteUrl(`${input.path}#article`),
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    image: absoluteUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@id': ids.person },
    publisher: { '@id': ids.person },
    isPartOf: { '@id': ids.website },
    ...(input.about ? { about: { '@id': input.about } } : {}),
  }
}

/** Wraps entities in one @graph document. */
export function graph(...things: Thing[]) {
  return { '@context': 'https://schema.org', '@graph': things }
}
