import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  // reporter: [['html', { open: 'always' }]], // Options: 'never', 'on-failure', 'always' // for local
  reporter: [['junit', { outputFile: 'test-results/smoke-results.xml' }]], // for CI
  use: {
    baseURL: 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
