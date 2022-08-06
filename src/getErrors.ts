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

const invalidJSXMsg = 'itemShapes is not a valid JSX element';

export const getErrors = (
	items: any,
	value: any,
	readOnly: any,
	onChange: any,
	itemShapes: any
) => {
	const errorsObj: ErrorsObj = { shouldRender: true, errorReason: '' };

	if (typeof items !== 'number' || items < 1 || items > 10) {
		return setErrors(errorsObj, ' is invalid');
	}
	if (typeof value !== 'number' || value < 0 || value > items) {
		return setErrors(errorsObj, 'value is invalid');
	}
	if (readOnly === false && typeof onChange !== 'function') {
		return setErrors(errorsObj, 'onChange is required');
	}
	if (readOnly === false && !Number.isInteger(value)) {
		return setErrors(errorsObj, 'Value is not an integer');
	}
	if (!itemShapes) {
		return setErrors(errorsObj, 'itemStyles needs at least the property itemShapes set');
	}
	if (!Array.isArray(itemShapes) && !isValidElement(itemShapes)) {
		return setErrors(errorsObj, invalidJSXMsg);
	}
	if (Array.isArray(itemShapes)) {
		if (itemShapes.length !== items) {
			return setErrors(errorsObj, 'itemShapes length mismatch');
		}
		const areValid = (itemShapes as any[]).every((svgChildNode) =>
			isValidElement(svgChildNode)
		);
		if (!areValid) {
			return setErrors(errorsObj, invalidJSXMsg);
		}
	}

	return errorsObj;
};
