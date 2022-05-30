// @ts-nocheck

import React, { forwardRef, useEffect, useState } from 'react';

import { RatingItem } from './RatingItem';
import { defaultItemStyles } from './DefaultStyles';
import { getBreakpointRules } from './getBreakpointRules';
import { getSvgNodes } from './getSvgNodes';
import { getSvgStroke } from './getSvgStroke';
// import { getArrayCssVars, getObjectCssVars } from './getCssVars';
import { getActiveClassNames } from './getActiveClassNames';
import { getGlobalStyles } from './getGlobalStyles';
import { isPlainObject } from './utils';

import { CSSVariables, ItemStylesProp, RatingProps } from './types';

export const Rating = forwardRef<HTMLDivElement, RatingProps>( // Define props
  (
    {
      ratingValue = null,
      limit = 5,
      highlightOnlySelected = false,
      orientation = 'horizontal',
      halfPrecision = false,
      halfPrecisionFillMode = 'svg',
      itemStyles = defaultItemStyles,
      boxMargin = 20,
      boxRadius = 20,
      boxBorderWidth,
      boxPadding = 20,
      breakpoints,
      id,
      className,
      style,
      accessibleLabel,
    },
    externalRef
  ) => {
    const isStylesPropArray = Array.isArray(itemStyles);
    const isStylesPropObj = isPlainObject(itemStyles);

    if (typeof limit !== 'number' || limit < 1 || limit > 10) {
      return null;
    }
    if (!isStylesPropObj && !isStylesPropArray) {
      return null;
    }
    if (isStylesPropArray && itemStyles.length !== limit) {
      return null;
    }

    const ratingValues = Array.from(Array(limit), (_, index) => index + 1);

    const isHalfPrecisionSvg = halfPrecision && halfPrecisionFillMode === 'svg';
    const isHalfPrecisionBox = halfPrecision && halfPrecisionFillMode === 'box';

    /* State and effect */

    const getClassNames = () => {
      return getActiveClassNames(
        highlightOnlySelected,
        ratingValues,
        ratingValues.indexOf(ratingValue || 0)
      );
    };

    const [dynamicStyles, setDynamicStyles] = useState(() => ({
      cssVars: isStylesPropArray
        ? getArrayCssVars(itemStyles as ItemStylesProp[], ratingValue || 0)
        : getObjectCssVars(itemStyles as ItemStylesProp),
      activeClassNames: getClassNames(),
    }));

    useEffect(() => {
      let cssVars: CSSVariables | CSSVariables[];

      if (isStylesPropArray) {
        cssVars = getArrayCssVars(itemStyles, ratingValues.indexOf(ratingValue || 0));
      } else {
        cssVars = getObjectCssVars(itemStyles);
      }

      const activeClassNames = getClassNames();
      setDynamicStyles({ cssVars, activeClassNames });
    }, [ratingValue, itemStyles]);

    /* Props */

    const ariaProps = { role: 'img', 'aria-label': accessibleLabel };

    /* Render */

    return (
      <>
        <div
          ref={externalRef}
          className={`rri--group ${className || ''}`.trim()}
          id={id}
          style={{
            ...style,
            ...(isStylesPropObj ? ({ ...dynamicStyles?.cssVars } as CSSVariables) : {}),
            ...getGlobalStyles({
              orientation,
              breakpoints,
              boxMargin,
              boxPadding,
              boxRadius,
              boxBorderWidth,
            }),
          }}
          {...ariaProps}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              className={`rri--radio ${getReadOnlyPrecisionClassNames(index)}`}
            >
              <div
                style={
                  isStylesPropArray
                    ? { ...(dynamicStyles?.cssVars as CSSVariables[])?.[index] }
                    : {}
                }
                className="rri--box"
                aria-hidden="true"
              >
                <RatingItem
                  isPrecisionReadonly={
                    isHalfPrecisionActiveSvg
                      ? getPrecisionIntersectionIndex(ratingValue as any) === index
                      : false
                  }
                  svgChildNodes={getSvgNodes(itemStyles, index)}
                  strokeWidth={getSvgStroke(itemStyles, index)}
                />
              </div>
            </div>
          ))}
        </div>
        {isPlainObject(breakpoints) && (
          <style>
            {getBreakpointRules({
              breakpoints,
              boxMargin,
              boxPadding,
              boxRadius,
              boxBorderWidth,
            })}
          </style>
        )}
      </>
    );
  }
);
