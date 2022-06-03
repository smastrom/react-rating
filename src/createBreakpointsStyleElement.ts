import { getBreakpointRules } from './getBreakpointRules';

import { MaybeInvalidBreakPoints } from './types';

type RarId = `rar_${string}`;

export const createBreakpointsStyleElement = (
  tagId: RarId,
  breakpoints: MaybeInvalidBreakPoints
): HTMLStyleElement | void => {
  const breakpointsRules = getBreakpointRules(tagId, breakpoints as MaybeInvalidBreakPoints);

  if (breakpointsRules.length > 0) {
    const breakpointsStyleElem = document.createElement('style');
    breakpointsStyleElem.id = tagId;
    breakpointsStyleElem.textContent = breakpointsRules;
    return breakpointsStyleElem;
  }
};
