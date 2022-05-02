import React, { CSSProperties, forwardRef, useRef } from 'react';

import { RatingItem } from './RatingItem';
import { getBreakpointRules } from './getBreakpointRules';
import { getItemStyles } from './getItemStyles';
import { defaultItemStyles } from './DefaultStyles';

import { RatingItemProps } from './types';

export const RatingInput = forwardRef<HTMLDivElement, RatingItemProps>(
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

      containerGap = 20,
      boxRadius = 20,
      boxBorderWidth = 0,
      boxPadding = 20,

      onChange = undefined,
    },
    externalRef
  ) => {
    if (!ratingValues || !ratingValue || !onChange) {
      console.error(
        '[ReactRatingInput] - Props "ratingValues", "ratingValue", "onChange" are required.'
      );
      return null;
    }

    if (typeof onChange !== 'function') {
      console.error('[ReactRatingInput] - OnChange must be a function.');
      return null;
    }

    if (ratingValues.length > 10) {
      console.error('[ReactRatingInput] - Maximum 10 values are allowed.');
      return null;
    }

    const radioDivs = useRef<HTMLDivElement[] | []>([]);

    // Handlers

    const handleClick = (
      event: React.MouseEvent<HTMLDivElement>,
      index: number
    ): void => {
      event.preventDefault();
      event.stopPropagation();
      onChange(ratingValues[index]);
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      event.stopPropagation();

      const previousValue = index - 1;
      const lastValue = ratingValues.length - 1;
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
            onChange(ratingValues[indexToSelect]);
          }
          break;
        case 'ArrowUp':
        case 'ArrowLeft': {
          const indexToSelect = isEventFiringFromFistItem ? lastValue : previousValue;
          radioDivs.current[indexToSelect].focus();
          onChange(ratingValues[indexToSelect]);
        }
      }
    };

    const handleHighlight = (index: number) => {
      const valueAtIndex = ratingValues.indexOf(ratingValue as string);

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

    const globalStyles = {
      '--rri--container-gap': `${containerGap}px`,
      '--rri--box-radius': `${boxRadius}px`,
      '--rri--box-border-width': `${boxBorderWidth}px`,
      '--rri--box-padding': `${boxPadding}px`,
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
        const mappedIndex = ratingValues.map(() => itemStyles[0].itemStrokeWidth);
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
            ...globalStyles,
            ...appendStyles(),
          }}
        >
          {ratingValues.map((_, index) => (
            <div
              key={`rri_item_${index}`}
              role="radio"
              ref={(ref) => (radioDivs.current[index] = ref as HTMLDivElement)}
              className={`rri--radio ${handleHighlight(index)} ${additionalClassNames}`}
              tabIndex={enableKeyboard && ratingValues[index] === ratingValue ? 0 : -1}
              aria-labelledby={`rri_label_${index + 1}`}
              aria-checked={ratingValues[index] === ratingValue}
              onClick={(event) => handleClick(event, index)}
              onKeyDown={
                enableKeyboard ? (event) => handleKeydown(event, index) : undefined
              }
            >
              <div
                style={{ ...appendSingleStyles(index) }}
                className="rri--box"
                aria-hidden="true"
              >
                <RatingItem
                  svgChildNodes={getSvgItem(index)}
                  strokeWidth={getStrokeIndex(index)}
                />
              </div>
              <span className="rri--hidden" id={`rri_label_${index + 1}`}>
                {itemLabels?.[index]}
              </span>
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
