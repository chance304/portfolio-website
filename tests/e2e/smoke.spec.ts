import { expect, test } from '@playwright/test'

test('homepage leads with the brand core', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Shobhit Tripathi')
  await expect(page.locator('main')).toContainText('Engineering leader who builds rigorous, AI-native platforms end to end')
})

test('theme toggle switches and persists across reloads', async ({ page, isMobile }) => {
  await page.goto('/')
  const html = page.locator('html')
  const wasDark = (await html.getAttribute('class'))?.includes('dark') ?? false
  await page.getByRole('button', { name: /toggle dark\/light theme/i }).click()
  await expect(html).toHaveClass(wasDark ? /^(?!.*dark).*$/ : /dark/)
  await page.reload()
  await expect(html).toHaveClass(wasDark ? /^(?!.*dark).*$/ : /dark/)
  expect(isMobile !== undefined).toBe(true)
})

test('header section links navigate back to the homepage from other routes', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop navigation only; mobile uses the sheet menu')
  await page.goto('/quantum-foundry/')
  await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/#projects$/)
})

test('every internal link resolves', async ({ page, request }) => {
  const seen = new Set<string>()
  for (const start of ['/', '/quantum-foundry/']) {
    await page.goto(start)
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href') ?? ''))
    for (const h of hrefs) seen.add(h.split('#')[0] || '/')
  }
  for (const path of seen) expect((await request.get(path)).status(), path).toBe(200)
})
