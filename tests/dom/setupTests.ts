import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeEach(() => {
	vi.spyOn(console, 'error').mockImplementation(() => undefined);
	window.SVGElement.prototype.getBBox = () => ({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
});

afterEach(() => {
	delete window.SVGElement.prototype.getBBox;
	cleanup();
});
