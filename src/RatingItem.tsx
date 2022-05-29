import React, { useLayoutEffect, useRef, useState } from 'react';

import { toSecondDecimal } from './utils';

type RatingItemProps = {
  svgChildNodes?: JSX.Element;
  strokeWidth?: number;
  isPrecisionReadonly?: boolean;
};

type SvgData = {
  [key: string]: string;
};

export const RatingItem = ({
  svgChildNodes,
  strokeWidth = 0,
  isPrecisionReadonly = false,
}: RatingItemProps) => {
  const svgRef = useRef<SVGPathElement | null>(null);

  const [svgData, setSvgData] = useState<SvgData | null>(null);

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

  const getReadOnlyPrecisionAttrs = () => {
    if (isPrecisionReadonly) {
      return {
        fill: "url('#rri_precision')",
      };
    }
    return {};
  };

  return (
    <svg
      className="rri--svg-item"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={svgData ? svgData.viewBox : '0 0 0 0'}
      strokeWidth={strokeWidth || 0}
      width="100%"
    >
      {isPrecisionReadonly && (
        <defs>
          <linearGradient id="rri_precision">
            <stop className="rri--precision-stop-1" offset="50%" />
            <stop className="rri--precision-stop-2" offset="50%" />
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
