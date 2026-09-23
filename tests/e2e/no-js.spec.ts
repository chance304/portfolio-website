import { expect, test } from '@playwright/test'
import { routes } from '../../src/lib/seo/routes'

// AI crawlers don't execute JavaScript, and some people browse without it.
// Every route must ship its content, and show it, with JS disabled.
test.use({ javaScriptEnabled: false })

for (const r of routes) {
  test(`${r.path} renders its content without JavaScript`, async ({ page }) => {
    await page.goto(r.path)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    const text = await page.locator('main').innerText()
    expect(text.split(/\s+/).length).toBeGreaterThan(300)
    // Scroll-reveal wrappers must not leave content invisible.
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('main h2')].filter((el) => {
        let n: Element | null = el
        while (n) {
          if (Number(getComputedStyle(n).opacity) < 0.5) return true
          n = n.parentElement
        }
        return false
      }).length,
    )
    expect(hidden).toBe(0)
  })
}
