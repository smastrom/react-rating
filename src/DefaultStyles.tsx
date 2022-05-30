import React from 'react';

import { ItemStylesProp } from './types';

const Star = <polygon points="100,10 40,198 190,78 10,78 160,198" />;

export const defaultItemStyles: ItemStylesProp = {
  svgChildNodes: Star,
  itemStrokeWidth: 1,
  itemStrokeStyle: 'round',

  activeFillColor: '#00CB75',
  activeStrokeColor: 'green',
  inactiveFillColor: 'white',
  inactiveStrokeColor: 'white',

  activeBoxColor: 'white',
  inactiveBoxColor: '#00CB75',
};
