// Renders the built /resume/ page to a PDF, so the web résumé and the PDF can
// never drift apart. Run after `npm run build`:
//   npm run resume:pdf
// Writes public/shobhit-tripathi-resume.pdf (committed, shipped with the site)
// and copies it into out/ so the current build serves it too.
import { spawn } from 'node:child_process'
import { copyFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const PORT = 4174
const server = spawn(process.execPath, ['scripts/serve-out.mjs'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' })
try {
  await new Promise((r) => setTimeout(r, 600))
  const browser = await chromium.launch()
  const page = await browser.newPage({ colorScheme: 'light' })
  await page.goto(`http://127.0.0.1:${PORT}/resume/`, { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.pdf({ path: 'public/shobhit-tripathi-resume.pdf', format: 'A4', printBackground: false, preferCSSPageSize: true })
  await browser.close()
  await copyFile('public/shobhit-tripathi-resume.pdf', 'out/shobhit-tripathi-resume.pdf')
  console.log('wrote public/shobhit-tripathi-resume.pdf')
} finally {
  server.kill()
}
