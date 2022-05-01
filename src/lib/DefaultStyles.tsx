import { STROKE_STYLE_ROUND } from './constants';
import { ElementStyle } from './types';

export const defaultItemStyles: ElementStyle = {
  svgChildNodes: null,
  itemStrokeWidth: 0,
  itemStrokeStyle: STROKE_STYLE_ROUND,
  activeItemColor: '#DCFCE7',
  activeItemStrokeColor: undefined,
  activeBoxColor: '#22C55E',
  activeBoxBorderColor: '#22C55E',
  inactiveItemColor: '#22C55E',
  inactiveItemStrokeColor: undefined,
  inactiveBoxColor: '#FFFFFF',
  inactiveBoxBorderColor: '#FFFFFF',
};
