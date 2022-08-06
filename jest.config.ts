import { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
	globals: {
		'ts-jest': {
			useESM: true,
		},
		__DEV__: true,
	},
	preset: 'ts-jest/presets/default-esm',
	testPathIgnorePatterns: ['./tests/e2e'],
	testEnvironment: 'jsdom',
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
};

export default config;
