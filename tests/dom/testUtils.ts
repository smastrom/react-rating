import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThinStar } from '../../src/Shapes';
import { useState } from 'react';
import { ItemStyles } from '../../src/exportedTypes';

function before() {
	return beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => null);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.SVGElement.prototype.getBBox = () => ({
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		});
	});
}

function after() {
	return afterEach(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		delete window.SVGElement.prototype.getBBox;
	});
}

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

export const childArr = [CHILD_ID_1, CHILD_ID_2, CHILD_ID_3, CHILD_ID_4, CHILD_ID_5];

export const itemStyles: ItemStyles = {
	itemShapes: ThinStar,
};

export const useSelectedRatingValue = (initialValue: number) => {
	const [ratingValue, setRatingValue] = useState(initialValue);

	return { ratingValue, setRatingValue };
};
