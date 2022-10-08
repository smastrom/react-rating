import { useEffect, useLayoutEffect } from 'react';

export const isSSR = typeof window === 'undefined';

export const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

export const isPositiveNum = (value: unknown) => typeof value === 'number' && value > 0;

export const getNumber = (value: unknown) => (isPositiveNum(value) ? (value as number) : 0);

export const toSecondDecimal = (number: number) => Math.round(number * 100) / 100;

export const roundToHalf = (number: number) => Math.round(number * 2) / 2;

export const getUniqueId = () => (Math.random() + 1).toString(36).substring(7);

export const areNum = (...values: unknown[]) =>
	values.every((value) => typeof value === 'number');

export const getNewPosition = (originalPos: number) =>
	originalPos === 0 ? 0 : toSecondDecimal(originalPos) * -1;

export const isGraphicalValueInteger = (ratingValue: number) =>
	Number.isInteger(roundToHalf(ratingValue));

export function getIntersectionIndex(ratingValues: number[], ratingValue: number) {
	const roundedHalf = roundToHalf(ratingValue);

	if (Number.isInteger(roundedHalf)) {
		return ratingValues.indexOf(roundedHalf);
	}
	return Math.floor(roundedHalf);
}

/* istanbul ignore next */
export const devTestId = __DEV__ ? { 'data-testid': 'rating' } : {};

/* istanbul ignore next */
export function getRadioTestIds(childIndex: number) {
	if (__DEV__) {
		return { 'data-testid': `rating-child-${childIndex + 1}` };
	}
	return {};
}

/* istanbul ignore next */
export function getSvgTestIds(childIndex: number) {
	if (__DEV__) {
		return {
			'data-testid': `rating-child-svg-${childIndex + 1}`,
		};
	}
	return {};
}

/* istanbul ignore next */
export function getDefsTestId() {
	if (__DEV__) {
		return {
			'data-testid': 'svg-defs-testid',
		};
	}
	return {};
}
