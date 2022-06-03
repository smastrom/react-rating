import { isEmptyObject } from './utils';

type ErrorsObj = {
  shouldRender: boolean;
  errorReason: string;
};

const getErrorReason = (reason: string) =>
  `[react-advanced-rating] - There's an error with ${reason} prop. Nothing's returned from rendering.
    Please check the "Troubleshooting" section of the README.`;

const setErrors = (targetObj: ErrorsObj, errorReason: string) => {
  targetObj['shouldRender'] = false;
  targetObj['errorReason'] = getErrorReason(errorReason);
};

// To do: implement other errors

export const getErrors = (
  limit: any,
  value: any,
  readOnly: any,
  onChange: any,
  itemStyles: any,
  highlightOnlySelected: any
) => {
  const errorsObj: ErrorsObj = { shouldRender: true, errorReason: '' };

  if (typeof limit !== 'number' || limit < 1 || limit > 10) {
    setErrors(errorsObj, '"limit"');
  }
  if (typeof value !== 'number' || value < 0 || value > limit) {
    setErrors(errorsObj, '"number"');
  }
  if (readOnly === false && typeof onChange !== 'function') {
    setErrors(errorsObj, '"onChange"');
  }
  if (readOnly === false && !Number.isInteger(value)) {
    setErrors(errorsObj, '"readOnly" and "value"');
  }
  if (isEmptyObject(itemStyles)) {
    setErrors(errorsObj, '"itemStyles"');
  }
  if (typeof highlightOnlySelected !== 'boolean') {
    setErrors(errorsObj, '"highlightOnlySelected"');
  }

  return errorsObj;
};
