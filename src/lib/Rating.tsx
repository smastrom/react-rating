// @ts-nocheck

import React, { CSSProperties, forwardRef } from 'react';

import { RatingItem } from './RatingItem';
import { getBreakpointRules } from './getBreakpointRules';
import { getItemStyles } from './getItemStyles';
import { defaultItemStyles } from './DefaultStyles';

import { Breakpoints, ItemStyle, RatingItemProps, SvgChildNodes } from './types';

const isPlainObject = (object: any) =>
  !Array.isArray(object) && typeof object === 'object' && object !== null;

const roundToHalf = (num: number) => Math.round(num * 2) / 2;

export const Rating = forwardRef<HTMLDivElement, RatingItemProps>(
  (
    {
      readOnlyLabel = 'Rating', // Rename to accessibleLabel
      readOnlyPrecision = 0.5, // Rename to precision
      readOnlyPrecisionFillMode = 'svg', // Rename to fillMode
      readOnlyLimit = 5, // Rename to limit
      ratingValue = 5,

      itemStyles = defaultItemStyles,
      direction = 'horizontal',

      containerGap = 20,
      boxRadius = 20,
      boxBorderWidth = 0,
      boxPadding = 20,
      breakpoints = undefined,

      id = undefined,
      className = undefined,
      style = undefined,
    },
    externalRef
  ) => {
    const isItemStylesArray = Array.isArray(itemStyles);
    const isItemStylesObject = isPlainObject(itemStyles);

    // Styles

    const isHalfPrecisionActive = readOnlyPrecision === 0.5;
    const isHalfPrecisionActiveBox =
      isHalfPrecisionActive && readOnlyPrecisionFillMode === 'box';
    const isHalfPrecisionActiveSvg =
      isHalfPrecisionActive && readOnlyPrecisionFillMode === 'svg';

    const getGlobalResponsiveStyles = () => {
      if (typeof breakpoints === 'undefined') {
        return {
          '--rri--container-gap': `${containerGap}px`,
          '--rri--box-radius': `${boxRadius}px`,
          '--rri--box-border-width': `${boxBorderWidth}px`,
          '--rri--box-padding': `${boxPadding}px`,
        } as CSSProperties;
      }
      return {};
    }; // Maybe remove and apply to all elements

    const globalStyles = {
      ...getGlobalResponsiveStyles(),
      '--rri--direction': direction === 'horizontal' ? 'row' : 'column',
    } as CSSProperties;

    const getFullBreakpoints = (): Breakpoints => {
      if (isPlainObject(breakpoints)) {
        const fullBreakpoints = { ...breakpoints };

        fullBreakpoints[0] = {
          containerGap,
          boxRadius,
          boxBorderWidth,
          boxPadding,
        };

        return fullBreakpoints;
      }
      return {};
    };

    const getPrecisionIntersectionIndex = (ratingVal: number | string): number | null => {
      if (isHalfPrecisionActive) {
        const ratingValueNum = Number(ratingVal);
        if (isNaN(ratingValueNum)) {
          return null;
        }
        const roundedHalf = roundToHalf(ratingValueNum);

        if (Number.isInteger(roundedHalf)) {
          console.log(roundedHalf);
          return roundedHalf;
        }

        const intersectionIndex = Math.floor(roundedHalf);
        return intersectionIndex;
      }
      return null;
    };

    const getReadOnlyPrecisionClassNames = (index: number): string => {
      const intersectionIndex = getPrecisionIntersectionIndex(ratingValue);

      // Add no half

      if (typeof intersectionIndex === 'number') {
        if (isHalfPrecisionActiveBox) {
          if (index > intersectionIndex) {
            return 'rri--readonly-precision-inactive-box';
          }
          if (index < intersectionIndex) {
            return 'rri--readonly-precision-active-box';
          }
          return 'rri--readonly-precision-box-int';
        }

        if (isHalfPrecisionActiveSvg) {
          if (index > intersectionIndex) {
            return 'rri--readonly-precision-svg-inactive';
          }
          if (index < intersectionIndex) {
            return 'rri--readonly-precision-svg-active';
          }
          return 'rri--readonly-precision-svg-int';
        }
      }
      return '';
    };

    const getCssVariables = () => {
      if (isItemStylesObject) {
        return getItemStyles([itemStyles as ItemStyle])[0];
      }
      return {};
    };

    const getSingleCssVariables = (index: number) => {
      if (isItemStylesArray) {
        return getItemStyles(itemStyles)?.[index];
      }
      return {};
    };

    const getSingleStroke = (index: number): number => {
      if (isItemStylesArray) {
        const mappedIndex = itemStyles.map(({ itemStrokeWidth }) =>
          typeof itemStrokeWidth === 'number' ? itemStrokeWidth : 0
        );
        return mappedIndex[index];
      }
      if (isItemStylesObject) {
        const mappedIndex = ratingValues.map(() => itemStyles.itemStrokeWidth);
        return mappedIndex[index] as number;
      }
      return 0;
    };

    const getSvgItem = (index: number): SvgChildNodes => {
      if (isItemStylesObject) {
        return itemStyles.svgChildNodes as SvgChildNodes;
      }
      if (isItemStylesArray) {
        return itemStyles[index].svgChildNodes as SvgChildNodes;
      }
      return null;
    };

    const ariaProps = { role: 'img', 'aria-label': readOnlyLabel };

    return (
      <>
        <div
          ref={externalRef}
          className={`rri--group ${className || ''}`.trim()}
          id={id}
          style={{
            ...style,
            ...globalStyles,
            ...getCssVariables(),
          }}
          {...ariaProps}
        >
          {new Array(readOnlyLimit).fill(undefined).map((_, index) => (
            <div
              key={`rri_item_${index}`}
              className={`rri--radio ${getReadOnlyPrecisionClassNames(index)}`}
            >
              <div
                style={getSingleCssVariables(index)}
                className="rri--box"
                aria-hidden="true"
              >
                <RatingItem
                  isPrecisionReadonly={
                    isHalfPrecisionActiveSvg
                      ? getPrecisionIntersectionIndex(ratingValue as any) === index
                      : false
                  }
                  svgChildNodes={getSvgItem(index)}
                  strokeWidth={getSingleStroke(index)}
                />
              </div>
            </div>
          ))}
        </div>
        {isPlainObject(breakpoints) && (
          <style>{getBreakpointRules(getFullBreakpoints())}</style>
        )}
      </>
    );
  }
);
