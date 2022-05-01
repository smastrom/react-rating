import React, { useLayoutEffect, useRef, useState } from 'react';

import { toSecondDecimal } from './utils';
import { ItemProps, SVGAtrributes } from './types';

export const RatingItem = ({
  svgChildNodes = null,
  svgItemLabel = 'Rating Item',
  strokeWidth = 0,
}: ItemProps) => {
  const svgRef = useRef<SVGPathElement | null>(null);

  const [svgData, setSvgData] = useState<SVGAtrributes | null>(null);

  const strokeOffset = strokeWidth > 0 ? -(strokeWidth / 2) : 0;

  useLayoutEffect(() => {
    const {
      width: svgWidth,
      height: svgHeight,
      x: svgXPos,
      y: svgYPos,
    } = svgRef?.current?.getBBox() as SVGRect;

    if (
      typeof svgWidth === 'number' &&
      typeof svgHeight === 'number' &&
      typeof svgXPos === 'number' &&
      typeof svgYPos === 'number'
    ) {
      const translateOffset = strokeWidth > 0 ? `${strokeOffset} ${strokeOffset}` : '0 0';

      const viewBox = `${translateOffset} ${toSecondDecimal(
        svgWidth + strokeWidth
      )} ${toSecondDecimal(svgHeight + strokeWidth)}`;

      const translateData = `${svgXPos === 0 ? 0 : toSecondDecimal(svgXPos) * -1} ${
        svgYPos === 0 ? 0 : toSecondDecimal(svgYPos) * -1
      }`;

      setSvgData({
        viewBox,
        translateData,
      });
    }
  }, [strokeWidth, svgChildNodes]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={svgData ? svgData.viewBox : '0 0 0 0'}
      strokeWidth={strokeWidth || 0}
      width="100%"
    >
      <title>{svgItemLabel}</title>
      <g
        ref={svgRef}
        transform={svgData ? `translate(${svgData.translateData})` : undefined}
      >
        {svgChildNodes}
      </g>
    </svg>
  );
};
