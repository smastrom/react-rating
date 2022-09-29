/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useLayoutEffect } from 'react';

export const isSSR = typeof window === 'undefined';

export const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

export const isValidPositiveNumber = (value: any) => typeof value === 'number' && value > 0;

export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const roundToHalf = (number: number) => Math.round(number * 2) / 2;

export const getUniqueId = () => (Math.random() + 1).toString(36).substring(7);

export const isGraphicalValueInteger = (ratingValue: number) =>
	Number.isInteger(roundToHalf(ratingValue));

export function getIntersectionIndex(ratingValues: number[], ratingValue: number) {
	const roundedHalf = roundToHalf(ratingValue);

	if (Number.isInteger(roundedHalf)) {
		return ratingValues.indexOf(roundedHalf);
	}
	const intersectionIndex = Math.floor(roundedHalf);
	return intersectionIndex;
}

/* istanbul ignore next */
export const devTestId = __DEV__ ? { 'data-testid': 'rating' } : {};

/* istanbul ignore next */
export function getChildTestIds(childIndex: number) {
	if (__DEV__) {
		return { 'data-testid': `rating-child-${childIndex + 1}` };
	}
	return {};
}

/* istanbul ignore next */
export function getSvgChildTestIds(childIndex: number) {
	if (__DEV__) {
		return {
			testId: `rating-child-svg-${childIndex + 1}`,
		};
	}
	return {};
}
