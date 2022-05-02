// @ts-nocheck

import React, { CSSProperties, forwardRef, useRef } from 'react';

import { RatingItem } from './RatingItem';
import { getBreakpointRules } from './getBreakpointRules';
import { getItemStyles } from './getItemStyles';
import { defaultItemStyles } from './DefaultStyles';

import { InputGroupProps } from './types';

export const RatingInput = forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      ratingValues = undefined,
      ratingValue = undefined,
      customLabels = undefined,

      itemStyles = [defaultItemStyles],
      direction = 'horizontal',
      customEasing = '500ms cubic-bezier(0, 0, 0.2, 1)',
      breakpoints = undefined,

      highlightOnlySelected = false,
      enableHover = true,
      enableTransitions = true,
      enableKeyboard = true,

      id = undefined,
      className = undefined,
      style = undefined,

      boxRadius = 20, // Add containerWidth
      boxBorder = 0,
      boxPadding = 20,
      boxGap = 20,

      onChange = undefined,
    },
    externalRef
  ) => {
    if (!ratingValues || !ratingValue || !onChange || !itemStyles) {
      throw new Error(
        'The following props are required: ratingValues, ratingValue, onChange, itemStyles.'
      );
    }

    const itemsNumber = ratingValues.length;
    const radioDivs = useRef<HTMLDivElement[] | []>([]);

    // Handlers

    const handleSelection = (index: number) => {
      if (typeof onChange === 'function') {
        onChange(ratingValues[index]);
      }
    };

    const handleKeydown = (
      event:
        | React.MouseEventHandler<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>,
      index: number
    ) => {
      event.preventDefault();

      const previousValue = index - 1;
      const lastValue = itemsNumber - 1;
      const nextValue = index + 1;

      const isEventFiringFromLastItem = lastValue === index;
      const isEventFiringFromFistItem = index === 0;

      switch (event.code) {
        case 'Tab':
        case 'Escape':
          radioDivs.current[index].blur();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          {
            const indexToSelect = isEventFiringFromLastItem ? 0 : nextValue;
            radioDivs.current[indexToSelect].focus();
            handleSelection(indexToSelect);
          }
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          {
            const indexToSelect = isEventFiringFromFistItem ? lastValue : previousValue;
            radioDivs.current[indexToSelect].focus();
            handleSelection(indexToSelect);
          }
          break;
      }
    };

    const handleHighlight = (index: number) => {
      const valueAtIndex = ratingValues.indexOf(ratingValue as any);

      if (highlightOnlySelected) {
        if (valueAtIndex === index) {
          return 'rri--active';
        }
        return 'rri--inactive';
      }
      if (valueAtIndex + 1 <= index) {
        return 'rri--inactive';
      }
      return 'rri--active';
    };

    // Labels

    const defaultLabels: string[] = ratingValues.map(
      (_, index: number) => `Vote ${ratingValues[index]}`
    );

    const itemLabels = typeof customLabels === 'undefined' ? defaultLabels : customLabels;

    // Styles

    const sharedStyles = {
      '--rri--box-radius': `${boxRadius}px`,
      '--rri--box-border-width': `${boxBorder}px`,
      '--rri--box-padding': `${boxPadding}px`,
      '--rri--box-gap': `${boxGap}px`, // Create new function - Append global styles
      '--rri--easing': customEasing,
      '--rri--direction': direction === 'horizontal' ? 'row' : 'column',
    } as CSSProperties;

    const additionalClassNames = `${enableHover ? 'rri--has-hover' : ''} ${
      enableTransitions ? 'rri--has-transitions' : ''
    }`;

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
          className={`rri--radio-group ${className || ''}`}
          id={id}
          style={{
            ...style,
            ...sharedStyles,
            ...appendStyles(),
          }}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              role="radio"
              ref={(ref) => (radioDivs.current[index] = ref)}
              className={`rri--radio ${handleHighlight(index)} ${additionalClassNames}`}
              tabIndex={enableKeyboard && ratingValues[index] === ratingValue ? 0 : -1}
              aria-checked={ratingValues[index] === ratingValue}
              aria-label={itemLabels?.[index]}
              onClick={() => handleSelection(index)}
              onKeyDown={
                enableKeyboard ? (event) => handleKeydown(event, index) : undefined
              }
            >
              <div style={{ ...appendSingleStyles(index) }} className="rri--box">
                <RatingItem
                  svgChildNodes={getSvgItem(index)}
                  svgItemLabel={itemLabels?.[index]}
                  strokeWidth={getStrokeIndex(index)}
                />
              </div>
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
