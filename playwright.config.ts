import { devices, PlaywrightTestConfig } from '@playwright/test';

const timeout = 30000;

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout,
  expect: {
    timeout,
  },
  fullyParallel: true,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    {
      name: 'Microsoft Edge',
      use: {
        channel: 'msedge',
      },
    },
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    },

    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 4a (5G)'],
        ...devices['Pixel 4a (5G) landscape'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 11'],
        ...devices['iPhone 11 landscape'],
      },
    },
  ],
};

export default config;
