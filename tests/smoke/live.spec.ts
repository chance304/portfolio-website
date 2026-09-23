import { expect, test } from '@playwright/test'
import { routes } from '../../src/lib/seo/routes'

const base = process.env.BASE_URL ?? ''
const isProduction = /shobhittripathi\.com/.test(base)

for (const r of routes) {
  test(`${r.path} serves 200 with its content`, async ({ page }) => {
    const res = await page.goto(r.path)
    expect(res?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
}

test('sitemap, robots and llms.txt are served', async ({ request }) => {
  for (const p of ['/sitemap.xml', '/robots.txt', '/llms.txt']) expect((await request.get(p)).status(), p).toBe(200)
})

test('security headers are applied', async ({ request }) => {
  const h = (await request.get('/')).headers()
  expect(h['x-content-type-options']).toBe('nosniff')
  expect(h['referrer-policy']).toBeTruthy()
  expect(h['x-frame-options']).toBe('DENY')
})

test('contact endpoint is live and validates input (sends nothing)', async ({ request }) => {
  const res = await request.post('/api/contact', { data: { name: 'x' } })
  expect([400, 429]).toContain(res.status())
})

test('unknown URLs return 404', async ({ request }) => {
  expect((await request.get('/this-page-does-not-exist/')).status()).toBe(404)
})

test('HTTPS and www redirect to the canonical origin', async ({ request }) => {
  test.skip(!isProduction, 'only meaningful on the production domain')
  const http = await request.get('http://shobhittripathi.com/', { maxRedirects: 0 })
  expect([301, 308]).toContain(http.status())
  const www = await request.get('https://www.shobhittripathi.com/', { maxRedirects: 0 })
  expect([301, 308, 200]).toContain(www.status())
})
