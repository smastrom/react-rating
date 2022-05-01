// @ts-nocheck

import React, { CSSProperties, forwardRef, useState } from 'react';

import { RatingItem } from './RatingItem';
import { getBreakpointRules } from './getBreakpointRules';
import { getItemStyles } from './getItemStyles';
import { getLabelDirectionValue } from './utils';
import { defaultItemStyles } from './DefaultStyles';
import {
  CSS_ACTIVE_CLASS,
  CSS_INACTIVE_CLASS,
  DEFAULT_BOX_BORDER_VALUE,
  DEFAULT_BOX_GAP_VALUE,
  DEFAULT_BOX_PADDING_VALUE,
  DEFAULT_BOX_RADIUS_VALUE,
  DEFAULT_EASING_VALUE,
  DIRECTION_Y,
  LABEL_POSITION_BOTTOM,
} from './constants';
import { InputGroupProps, TabIndexValues } from './types';

export const RatingInput = forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      // Component
      ratingValues = [],
      ratingValue = undefined,
      customLabels = undefined,
      hoverEffects = true,
      highlightOnlySelected = false,
      displayLabel = false,
      labelPosition = LABEL_POSITION_BOTTOM,
      direction = DIRECTION_Y,
      customEasing = DEFAULT_EASING_VALUE,
      // Item Styles
      itemStyles = [defaultItemStyles],
      breakpoints = undefined,
      // HTML
      id = undefined,
      className = undefined,
      style = undefined,
      // Box
      boxRadius = DEFAULT_BOX_RADIUS_VALUE,
      boxBorder = DEFAULT_BOX_BORDER_VALUE,
      boxPadding = DEFAULT_BOX_PADDING_VALUE,
      boxGap = DEFAULT_BOX_GAP_VALUE,
      // Callbacks
      onChange = undefined,
      onClick = undefined,
    },
    externalRef
  ) => {
    const itemsNumber = ratingValues.length;

    // States

    const initialTabIndexValues: TabIndexValues[] = new Array(itemsNumber).fill(-1);
    const [tabIndex, setTabIndex] = useState<TabIndexValues[]>(initialTabIndexValues);

    // Handlers

    const handleTabIndex = (index: number): void => {
      const newValues: TabIndexValues[] = new Array(itemsNumber).fill(-1);
      newValues[index] = 0;
      setTabIndex(newValues);
    };

    const handleHighlight = (index: number) => {
      const valueAtIndex = ratingValues.indexOf(ratingValue as any);

      if (highlightOnlySelected) {
        if (valueAtIndex === index) {
          return CSS_ACTIVE_CLASS;
        }
        return CSS_INACTIVE_CLASS;
      }
      if (valueAtIndex + 1 <= index) {
        return CSS_INACTIVE_CLASS;
      }
      return CSS_ACTIVE_CLASS;
    };

    const handleClick = (index: number) => {
      if (typeof onChange === 'function') {
        setTimeout(() => {
          onChange(ratingValues[index]);
        });
      }
      if (typeof onClick === 'function') {
        setTimeout(() => {
          onClick();
        });
      }
    };

    const handleMouseLeave = () => {
      setTabIndex(initialTabIndexValues);
    };

    const handleMouseEnter = (index: number) => {
      handleTabIndex(index);
    };

    // Labels

    const defaultLabels: string[] = new Array(itemsNumber)
      .fill('')
      .map((_, index: number) => `Vote ${index + 1} on ${itemsNumber}`);

    const itemLabels = typeof customLabels === 'undefined' ? defaultLabels : customLabels;

    // CSS Variables

    const sharedStyles = {
      '--react-rating-input-label-position': getLabelDirectionValue(
        displayLabel,
        labelPosition
      ),
      '--react-rating-input-box-radius': `${boxRadius}px`,
      '--react-rating-input-box-border-width': `${boxBorder}px`,
      '--react-rating-input-box-padding': `${boxPadding}px`,
      '--react-rating-input-box-gap': `${boxGap}px`, // Create new function - Append global styles
      '--react-rating-input-easing': customEasing,
      '--react-rating-input-direction': direction === 'horizontal' ? 'row' : 'column',
    } as CSSProperties;

    const appendStyles = () => {
      if (getItemStyles(itemStyles)?.length === 1) {
        return getItemStyles(itemStyles)?.[0];
      }
      return {};
    };

    const appendSingleStyles = (index: number) => {
      if (getItemStyles(itemStyles)?.length > 1) {
        return getItemStyles(itemStyles)?.[index];
      }
      return {};
    };

    const getStrokeIndex = (index: number) => {
      if (itemStyles.length === 1) {
        const mappedIndex = new Array(itemsNumber)
          .fill(0)
          .map(() => itemStyles[0].itemStrokeWidth);
        return mappedIndex[index];
      }
      if (itemStyles.length > 1) {
        const mappedIndex = itemStyles.map(({ itemStrokeWidth }) =>
          typeof itemStrokeWidth === 'number' ? itemStrokeWidth : 0
        );
        return mappedIndex[index];
      }
    };

    const getSvgItem = (index: number) => {
      if (itemStyles.length === 1) {
        return itemStyles[0].svgChildNodes;
      }
      if (itemStyles.length > 1) {
        return itemStyles[index].svgChildNodes;
      }
      return null;
    };

    return (
      <>
        <div
          role="radiogroup"
          ref={externalRef}
          className={`react-rating-input-radio-group ${className || ''}`}
          id={id}
          style={{
            ...style,
            ...sharedStyles,
            ...appendStyles(),
          }}
        >
          {new Array(itemsNumber).fill(undefined).map((_, index) => (
            <div
              key={`react_rating_item_${index}`}
              role="radio"
              aria-labelledby={`react-rating-item-value-${index + 1}`}
              className={`react-rating-input-radio ${handleHighlight(index)} ${
                hoverEffects ? 'react-rating-input-has-hover' : ''
              }`}
              aria-checked={ratingValues[index] === ratingValue}
              tabIndex={tabIndex[index]}
              aria-label={itemLabels?.[index]}
              onClick={() => handleClick(index)}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <div
                style={{ ...appendSingleStyles(index) }}
                className="rating-box-wrapper"
              >
                <RatingItem
                  kern={itemStyles}
                  svgChildNodes={getSvgItem(index)}
                  svgItemLabel={itemLabels?.[index]}
                  strokeWidth={getStrokeIndex(index)}
                />
              </div>
              {displayLabel && (
                <label
                  id={`react-rating-item-value-${index}`}
                  style={{ textAlign: 'center', fontSize: '0.875rem' }}
                >
                  Excellent
                </label>
              )}
            </div>
          ))}
        </div>
        {typeof breakpoints === 'object' && (
          <style>{getBreakpointRules(breakpoints)}</style>
        )}
      </>
    );
  }
);
