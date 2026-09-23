import { defineConfig, devices } from '@playwright/test'

// E2E tests run against the production build (out/) served with static-host
// semantics, so they exercise exactly what ships. Run `npm run build` first.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: { command: 'node scripts/serve-out.mjs', url: 'http://127.0.0.1:4173/', reuseExistingServer: !process.env.CI },
})
