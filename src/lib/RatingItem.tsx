// @ts-nocheck

import React, { useLayoutEffect, useRef, useState } from 'react';

import { toSecondDecimal } from './utils';
import { ItemProps, SVGAtrributes } from './types';

export const RatingItem = ({
  svgChildNodes = null,
  svgItemLabel = '',
  strokeWidth = 0,
  kern = undefined,
}: ItemProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGPathElement | null>(null);

  const [viewBox, setViewBox] = useState<SVGAtrributes | null>(null);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const {
      width: pathWidth,
      height: pathHeight,
      x: pathXPos,
      y: pathYPos,
    } = svgRef?.current?.getBBox({ stroke: true }) as SVGRect;

    console.log(pathWidth, pathHeight, pathYPos, pathXPos);

    const adjustStroke = strokeWidth > 0 ? -(strokeWidth / 2) : 0;

    if (
      typeof pathWidth === 'number' &&
      typeof pathHeight === 'number' &&
      typeof pathYPos === 'number' &&
      typeof pathXPos === 'number'
    ) {
      setViewBox({
        width: toSecondDecimal(pathWidth) + strokeWidth,
        height: toSecondDecimal(pathHeight) + strokeWidth,
        translateOffset: strokeWidth > 0 ? `${adjustStroke} ${adjustStroke}` : '0 0',
        translateY: pathYPos === 0 ? 0 : pathYPos * -1,
        translateX: pathXPos === 0 ? 0 : pathXPos * -1,
      });
      setIsReady(true);
    }
  }, [kern, strokeWidth]);

  const transformData = viewBox
    ? `translate(${toSecondDecimal(viewBox?.translateX as number)}, ${toSecondDecimal(
        viewBox?.translateY as number
      )})`
    : undefined;

  return (
    <div className="rating-box-controller" ref={containerRef}>
      <svg
        strokeWidth={isReady ? strokeWidth : 0}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${viewBox?.translateOffset} ${viewBox?.width} ${viewBox?.height}`}
        width="100%"
      >
        <title>{svgItemLabel}</title>
        <g ref={svgRef} transform={transformData}>
          {svgChildNodes}
        </g>
      </svg>
    </div>
  );
};
