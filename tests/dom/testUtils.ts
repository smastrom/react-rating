import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StrangeFace } from '../../vite/Shapes';
import { useState } from 'react';
import { ItemStyles } from '../../src/exportedTypes';

const before = () =>
	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
		// @ts-ignore
		window.SVGElement.prototype.getBBox = () => ({
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		});
	});

const after = () =>
	afterEach(() => {
		// @ts-ignore
		delete window.SVGElement.prototype.getBBox;
	});

export { render, screen, before as beforeEach, after as afterEach };

export const ID = 'rating';
export const CHILD_ID_1 = 'rating-child-1';
export const CHILD_ID_2 = 'rating-child-2';
export const CHILD_ID_3 = 'rating-child-3';
export const CHILD_ID_4 = 'rating-child-4';
export const CHILD_ID_5 = 'rating-child-5';

export const SVGCHILD_ID_1 = 'rating-child-svg-1';
export const SVGCHILD_ID_2 = 'rating-child-svg-2';
export const SVGCHILD_ID_3 = 'rating-child-svg-3';
export const SVGCHILD_ID_4 = 'rating-child-svg-4';
export const SVGCHILD_ID_5 = 'rating-child-svg-5';

export const itemStyles: ItemStyles = {
	itemShapes: StrangeFace,
};

export const useSelectedRatingValue = (initialValue: number) => {
	const [ratingValue, setRatingValue] = useState(initialValue);

	return { ratingValue, setRatingValue };
};
