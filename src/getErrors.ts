/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidElement } from 'react';

import Package from '../package.json';

type ErrorsObj = {
  shouldRender: boolean;
  errorReason: string;
};

const getErrorReason = (reason: string) =>
  `[${Package.name}] - Nothing's returned from rendering. Reason: ${reason}.`;

const setErrors = (targetObj: ErrorsObj, reason: string) => {
  targetObj['shouldRender'] = false;
  targetObj['errorReason'] = getErrorReason(reason);

  return targetObj;
};

const invalidJSXMsg = 'svgChildNodes is not a valid JSX element';

export const getErrors = (
  limit: any,
  value: any,
  readOnly: any,
  highlightOnlySelected: any,
  onChange: any,
  svgChildNodes: any
) => {
  const errorsObj: ErrorsObj = { shouldRender: true, errorReason: '' };

  if (typeof limit !== 'number' || limit < 1 || limit > 10) {
    return setErrors(errorsObj, 'limit is invalid');
  }
  if (typeof value !== 'number' || value < 0 || value > limit) {
    return setErrors(errorsObj, 'value is invalid');
  }
  if (typeof readOnly !== 'boolean') {
    return setErrors(errorsObj, 'readOnly type mismatch');
  }
  if (typeof highlightOnlySelected !== 'boolean') {
    return setErrors(errorsObj, 'highlightOnlySelected type mismatch');
  }
  if (readOnly === false && typeof onChange !== 'function') {
    return setErrors(errorsObj, 'onChange is required');
  }
  if (readOnly === false && !Number.isInteger(value)) {
    return setErrors(errorsObj, 'The value provided is not an integer');
  }
  if (!svgChildNodes) {
    return setErrors(errorsObj, 'itemStyles needs at least the property svgChildNodes set');
  }
  if (!Array.isArray(svgChildNodes) && !isValidElement(svgChildNodes)) {
    return setErrors(errorsObj, invalidJSXMsg);
  }
  if (Array.isArray(svgChildNodes)) {
    if (svgChildNodes.length !== limit) {
      return setErrors(errorsObj, 'svgChildNodes length mismatch');
    }
    const areValid = (svgChildNodes as any[]).every((svgChildNode) =>
      isValidElement(svgChildNode)
    );
    if (!areValid) {
      return setErrors(errorsObj, invalidJSXMsg);
    }
  }

  return errorsObj;
};
