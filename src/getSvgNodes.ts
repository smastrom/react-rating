import { ItemStylesProp } from './types';

export const getSvgNodes = (
  svgChildNodes: ItemStylesProp['svgChildNodes'],
  childNodeIndex: number
): JSX.Element => {
  if (Array.isArray(svgChildNodes)) {
    return svgChildNodes[childNodeIndex];
  }
  return svgChildNodes;
};
