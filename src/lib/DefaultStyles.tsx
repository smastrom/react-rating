import React from 'react';

import { ElementStyle } from './types';

const Star = <polygon points="100,10 40,198 190,78 10,78 160,198" />;

export const defaultItemStyles: ElementStyle = {
  svgChildNodes: Star,
  itemStrokeWidth: 0,
  itemStrokeStyle: 'round',
  activeItemColor: '#DCFCE7',
  activeItemStrokeColor: undefined,
  activeBoxColor: '#22C55E',
  activeBoxBorderColor: '#22C55E',
  inactiveItemColor: '#22C55E',
  inactiveItemStrokeColor: undefined,
  inactiveBoxColor: '#FFFFFF',
  inactiveBoxBorderColor: '#FFFFFF',
};
