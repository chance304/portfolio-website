import { expect, test } from '@playwright/test'

async function fill(page: import('@playwright/test').Page, v: Partial<Record<'name' | 'email' | 'subject' | 'message', string>>) {
  for (const [k, val] of Object.entries(v)) await page.locator(`#${k}`).fill(val ?? '')
}
const VALID = { name: 'Ada Lovelace', email: 'ada@example.com', subject: 'Hello there', message: 'A message long enough to send.' }

test.beforeEach(async ({ page }) => {
  await page.goto('/#contact')
})

test('shows per-field errors and focuses the first invalid field', async ({ page }) => {
  await fill(page, { name: 'A', email: 'nope' })
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#name-error')).toBeVisible()
  await expect(page.locator('#email-error')).toBeVisible()
  await expect(page.locator('#name')).toBeFocused()
})

test('success state is announced and the form resets', async ({ page }) => {
  await page.route('**/api/contact**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }))
  await fill(page, VALID)
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.locator('#contact-status')).toHaveText(/Message sent/)
  await expect(page.locator('#name')).toHaveValue('')
})

test('error state is announced when the endpoint fails', async ({ page }) => {
  await page.route('**/api/contact**', (r) => r.fulfill({ status: 502, contentType: 'application/json', body: '{"error":"Failed"}' }))
  await fill(page, VALID)
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.locator('#contact-status')).toHaveText(/Something went wrong/)
})

test('honeypot field is hidden from people and assistive tech', async ({ page }) => {
  const hp = page.locator('#website')
  await expect(hp).toHaveAttribute('tabindex', '-1')
  const box = await hp.boundingBox()
  expect(box === null || box.x < 0).toBe(true)
})
