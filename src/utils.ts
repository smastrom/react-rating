import { useEffect, useLayoutEffect } from 'react';

export const isSSR = typeof window === 'undefined';

export const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

export const isPlainObject = (object: any) =>
  !Array.isArray(object) && typeof object === 'object' && object !== null;

export const isObjectWithKeys = (object: any) =>
  isPlainObject(object) && Object.keys(object).length > 0;

export const isValidPositiveNumber = (value: any) => typeof value === 'number' && value > 0;

export const isValidColor = (color: any) =>
  typeof color === 'string' && CSS.supports('color', color);

export const toSecondDecimal = (number: number): number => Math.round(number * 100) / 100;

export const roundToHalf = (number: number) => Math.round(number * 2) / 2;

export const getUniqueId = () => (Math.random() + 1).toString(36).substring(7);

export const isFinalValueFloat = (ratingValue: number) => {
  const roundedHalf = Number.isInteger(roundToHalf(ratingValue));
  if (Number.isInteger(roundedHalf)) {
    return false;
  }
  return true;
};

export const getIntersectionIndex = (ratingValues: number[], ratingValue: number) => {
  const roundedHalf = roundToHalf(ratingValue);
  if (Number.isInteger(roundedHalf)) {
    return ratingValues.indexOf(roundedHalf);
  }
  const intersectionIndex = Math.floor(roundedHalf);
  return intersectionIndex;
};
