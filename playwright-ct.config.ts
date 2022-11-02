import { devices, PlaywrightTestConfig } from '@playwright/experimental-ct-react';
import { playwrightConfig } from './vite.config';

const config: PlaywrightTestConfig = {
	testDir: './tests/e2e-ct',
	snapshotDir: './__snapshots__',
	timeout: 30 * 1000,
	fullyParallel: false,
	reporter: 'html',
	use: {
		trace: 'on-first-retry',
		ctViteConfig: {
			...playwrightConfig,
		},
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
