import { devices, PlaywrightTestConfig } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';

const reporterOutputDir = process.env.IS_RTL ? 'playwright-rtl-report' : 'playwright-report';

const config: PlaywrightTestConfig = {
	testDir: './tests/ct',
	timeout: 30 * 1000,
	fullyParallel: false,
	reporter: [['html', { outputFolder: reporterOutputDir }]],
	use: {
		trace: 'on-first-retry',
		ctViteConfig: {
			define: {
				__DEV__: true,
			},
			// @ts-ignore - ""
			plugins: [react()],
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
