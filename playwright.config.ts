import { devices, PlaywrightTestConfig } from '@playwright/test';

const timeout = 40000;

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
		baseURL: process.env.DEPLOY_URL || 'http://localhost:5173',
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
