import { defineConfig } from '@playwright/test'

// Post-deploy smoke tests against a live URL:
//   BASE_URL=https://shobhittripathi.com npm run smoke
if (!process.env.BASE_URL) throw new Error('Set BASE_URL, e.g. BASE_URL=https://shobhittripathi.com npm run smoke')

export default defineConfig({
  testDir: 'tests/smoke',
  reporter: 'list',
  retries: 1,
  use: { baseURL: process.env.BASE_URL },
})
