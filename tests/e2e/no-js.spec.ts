import { expect, test } from '@playwright/test'
import { routes } from '../../src/lib/seo/routes'

// AI crawlers don't execute JavaScript, and some people browse without it.
// Every route must ship the same content, visibly, with JS disabled.
for (const r of routes) {
  test(`${r.path} renders the same content without JavaScript`, async ({ browser }) => {
    const words = async (javaScriptEnabled: boolean) => {
      const ctx = await browser.newContext({ javaScriptEnabled })
      const page = await ctx.newPage()
      await page.goto(r.path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      const text = await page.locator('main').innerText()
      // Scroll-reveal wrappers must not leave headings invisible.
      const hidden = await page.evaluate(() =>
        [...document.querySelectorAll('main h2')].filter((el) => {
          for (let n: Element | null = el; n; n = n.parentElement) if (Number(getComputedStyle(n).opacity) < 0.5) return true
          return false
        }).length,
      )
      await ctx.close()
      return { count: text.split(/\s+/).filter(Boolean).length, hidden }
    }
    const withJs = await words(true)
    const noJs = await words(false)
    expect(noJs.hidden).toBe(0)
    expect(noJs.count).toBeGreaterThan(80)
    // Allow a small difference for client-only UI text (e.g. toasts), never missing content.
    expect(noJs.count).toBeGreaterThanOrEqual(Math.floor(withJs.count * 0.95))
  })
}
