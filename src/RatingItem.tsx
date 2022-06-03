import React, { useLayoutEffect, useRef, useState } from 'react';

import { toSecondDecimal } from './utils';

import { ItemStylesProp, KeyAndValueStrings } from './types';

type RatingItemProps = Pick<ItemStylesProp, 'svgChildNodes' | 'itemStrokeWidth'> & {
  hasHalfFill: boolean;
};

export const RatingItem = ({
  svgChildNodes,
  itemStrokeWidth = 0,
  hasHalfFill = false,
}: RatingItemProps) => {
  const svgRef = useRef<SVGPathElement | null>(null);

  const uniqId = useRef<string | null>(
    hasHalfFill ? (Math.random() + 1).toString(36).substring(7) : null
  );

  const [svgData, setSvgData] = useState<KeyAndValueStrings | null>(null);

  const strokeOffset = itemStrokeWidth > 0 ? -(itemStrokeWidth / 2) : 0;

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
      const translateOffset =
        itemStrokeWidth > 0 ? `${strokeOffset} ${strokeOffset}` : '0 0';

      const viewBox = `${translateOffset} ${toSecondDecimal(
        svgWidth + itemStrokeWidth
      )} ${toSecondDecimal(svgHeight + itemStrokeWidth)}`;

      const translateData = `${svgXPos === 0 ? 0 : toSecondDecimal(svgXPos) * -1} ${
        svgYPos === 0 ? 0 : toSecondDecimal(svgYPos) * -1
      }`;

      setSvgData({
        viewBox,
        translateData,
      });
    }
  }, [itemStrokeWidth, svgChildNodes]);

  const strokeClassName = itemStrokeWidth > 0 ? 'rar--svg-stroke' : '';

  const getReadOnlyPrecisionAttrs = () => {
    if (hasHalfFill) {
      return {
        fill: `url('#${uniqId.current}_rar_hf')`,
      };
    }
    return {};
  };

  return (
    <svg
      aria-hidden="true"
      className={`rar--svg-item ${strokeClassName}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={svgData ? svgData.viewBox : '0 0 0 0'}
      strokeWidth={itemStrokeWidth || 0}
      width="100%"
    >
      {hasHalfFill && (
        <defs>
          <linearGradient id={`${uniqId.current}_rar_hf`}>
            <stop className="rar--precision-stop-1" offset="50%" />
            <stop className="rar--precision-stop-2" offset="50%" />
          </linearGradient>
        </defs>
      )}

      <g
        ref={svgRef}
        transform={svgData ? `translate(${svgData.translateData})` : undefined}
        {...getReadOnlyPrecisionAttrs()}
      >
        {svgChildNodes}
      </g>
    </svg>
  );
};
