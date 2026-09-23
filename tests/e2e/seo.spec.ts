import { expect, test } from '@playwright/test'
import { routes } from '../../src/lib/seo/routes'
import { AI_CRAWLERS } from '../../src/app/robots'

const SITE = 'https://shobhittripathi.com'

type Meta = { title: string; description: string; canonical: string; ogTitle: string; ogImage: string; twitterCard: string; h1: number; jsonld: unknown[] }

async function meta(page: import('@playwright/test').Page, path: string): Promise<Meta> {
  await page.goto(path)
  return page.evaluate(() => {
    const m = (sel: string) => document.querySelector(sel)?.getAttribute('content') ?? ''
    return {
      title: document.title,
      description: m('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      ogTitle: m('meta[property="og:title"]'),
      ogImage: m('meta[property="og:image"]'),
      twitterCard: m('meta[name="twitter:card"]'),
      h1: document.querySelectorAll('h1').length,
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent ?? 'null')),
    }
  })
}

test.describe('metadata', () => {
  for (const r of routes) {
    test(`${r.path} has complete metadata, one h1 and valid JSON-LD`, async ({ page, request }) => {
      const m = await meta(page, r.path)
      expect(m.title.length).toBeGreaterThan(10)
      expect(m.description.length).toBeGreaterThan(50)
      expect(m.canonical).toBe(`${SITE}${r.path}`)
      expect(m.ogTitle).toBeTruthy()
      expect(m.twitterCard).toBe('summary_large_image')
      expect(m.h1).toBe(1)
      // The OG image exists in the build.
      const img = new URL(m.ogImage).pathname
      expect((await request.get(img)).status()).toBe(200)
      // JSON-LD parses and every internal @id reference resolves to a defined node.
      expect(m.jsonld.length).toBeGreaterThan(0)
      const nodes = m.jsonld.flatMap((d) => ((d as { '@graph'?: Record<string, unknown>[] })['@graph'] ?? []))
      const defined = new Set(nodes.map((n) => n['@id']).filter(Boolean))
      const refs = JSON.stringify(m.jsonld).match(/"@id":"[^"]+"/g) ?? []
      for (const ref of refs) {
        const id = ref.slice('"@id":"'.length, -1)
        const isDefinedHere = defined.has(id)
        const isPersonOrSite = id.endsWith('/#person') || id.endsWith('/#website')
        expect(isDefinedHere || isPersonOrSite, `unresolved @id ${id}`).toBe(true)
      }
    })
  }

  test('titles and descriptions are unique across routes', async ({ page }) => {
    const all = []
    for (const r of routes) all.push(await meta(page, r.path))
    expect(new Set(all.map((m) => m.title)).size).toBe(routes.length)
    expect(new Set(all.map((m) => m.description)).size).toBe(routes.length)
  })

  test('homepage JSON-LD describes the Person with public profiles', async ({ page }) => {
    const m = await meta(page, '/')
    const person = (m.jsonld[0] as { '@graph': Record<string, unknown>[] })['@graph'].find((n) => n['@type'] === 'Person')
    expect(person?.['@id']).toBe(`${SITE}/#person`)
    expect(person?.sameAs).toEqual(expect.arrayContaining(['https://github.com/chance304']))
  })
})

test.describe('crawl surface', () => {
  test('sitemap lists every route', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    for (const r of routes) expect(xml).toContain(`<loc>${SITE}${r.path}</loc>`)
  })

  test('robots.txt allows every AI crawler explicitly and points to the sitemap', async ({ request }) => {
    const txt = await (await request.get('/robots.txt')).text()
    for (const ua of AI_CRAWLERS) expect(txt).toContain(`User-Agent: ${ua}`)
    expect(txt).toContain(`Sitemap: ${SITE}/sitemap.xml`)
    expect(txt).not.toMatch(/Disallow: \/\s*$/m)
  })

  // URLs published before the migration must keep resolving.
  for (const path of ['/', '/quantum-foundry/', '/robots.txt', '/sitemap.xml', '/favicon.svg', '/og-image.jpg', '/llms.txt', '/site.webmanifest']) {
    test(`previously published URL still resolves: ${path}`, async ({ request }) => {
      expect((await request.get(path)).status()).toBe(200)
    })
  }

  test('unknown URLs return the 404 page with status 404', async ({ request, page }) => {
    expect((await request.get('/does-not-exist/')).status()).toBe(404)
    await page.goto('/does-not-exist/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("doesn't exist")
  })
})

test('résumé PDF is published and linked from the résumé page', async ({ page, request }) => {
  const res = await request.get('/shobhit-tripathi-resume.pdf')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('application/pdf')
  expect((await res.body()).length).toBeGreaterThan(20_000)
  await page.goto('/resume/')
  await expect(page.getByRole('link', { name: /download pdf/i })).toHaveAttribute('href', '/shobhit-tripathi-resume.pdf')
})

test('public pages never expose a phone number or personal email', async ({ page }) => {
  for (const r of routes) {
    await page.goto(r.path)
    const html = await page.content()
    expect(html, r.path).not.toMatch(/\+977|9843500060|chancer\.304@/)
  }
})
