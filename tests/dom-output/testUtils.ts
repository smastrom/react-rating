import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StrangeFace } from '../../dev/Shapes';
import { useState } from 'react';
import { ItemStylesProp } from '../../src/exportedTypes';

const before = () =>
  beforeEach(() => {
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

export const itemStyles: ItemStylesProp = {
  svgChildNodes: StrangeFace,
};

export const useSelectedRatingValue = (initialValue: number) => {
  const [ratingValue, setRatingValue] = useState(initialValue);

  return { ratingValue, setRatingValue };
};
