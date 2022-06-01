import { ItemStylesProp } from './types';

export const getSvgNodes = (
  svgChildNodes: JSX.Element | JSX.Element[],
  index: number
): JSX.Element => {
  if (Array.isArray(svgChildNodes)) {
    return svgChildNodes[index];
  }
  return svgChildNodes;
};
