import React, { useRef, useState } from 'react';

import { getUniqueId, toSecondDecimal, useIsomorphicLayoutEffect } from './utils';

import { RatingItemProps, KeyAndValueStrings } from './internalTypes';

export const RatingItem = ({
	itemShapes,
	testId = undefined,
	itemStrokeWidth = 0,
	orientationProp = 'horizontal',
	hasHalfFill = false,
}: RatingItemProps) => {
	const strokeOffset = itemStrokeWidth > 0 ? -(itemStrokeWidth / 2) : 0;
	const translateOffset = itemStrokeWidth > 0 ? `${strokeOffset} ${strokeOffset}` : '0 0';

	const svgRef = useRef<SVGPathElement | null>(null);
	const uniqId = useRef<string | null>(null);

	const [svgData, setSvgData] = useState<KeyAndValueStrings | null>(null);

	useIsomorphicLayoutEffect(() => {
		if (hasHalfFill && !uniqId.current) {
			uniqId.current = getUniqueId();
		}

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
			const viewBox = `${translateOffset} ${toSecondDecimal(
				svgWidth + itemStrokeWidth
			)} ${toSecondDecimal(svgHeight + itemStrokeWidth)}`;

			const translateData = `${svgXPos === 0 ? 0 : toSecondDecimal(svgXPos) * -1} ${
				svgYPos === 0 ? 0 : toSecondDecimal(svgYPos) * -1
			}`;

			setSvgData({
				viewBox,
				translateData,
			});
		}
	}, [itemShapes, itemStrokeWidth, hasHalfFill]);

	/* Props */

	const getHalfFillAttr = () => {
		if (hasHalfFill) {
			return {
				fill: `url('#${uniqId.current}_rr_hf')`,
			};
		}
		return {};
	};

	/* istanbul ignore next */
	const getGradientTransformAttr = () => {
		if (orientationProp === 'vertical') {
			return {
				gradientTransform: 'rotate(90)',
			};
		}
		return {};
	};

	const getStrokeAttribute = () => {
		if (itemStrokeWidth > 0) {
			return {
				strokeWidth: itemStrokeWidth,
			};
		}
		return {};
	};

	const getTransform = () => {
		if (svgData) {
			const translateProp = `translate(${svgData?.translateData})`;
			if (translateProp === 'translate(0 0)') {
				return {};
			}
			return { transform: translateProp };
		}
		return { transform: undefined };
	};

	const getTestIds = () => {
		if (__DEV__ && testId && testId.length > 0) {
			return {
				'data-testid': testId,
			};
		}
		return {};
	};

	const getDefsTestId = () => {
		if (__DEV__) {
			return {
				'data-testid': 'svg-defs-testid',
			};
		}
		return {};
	};

	/* Render */

	return (
		<svg
			{...getStrokeAttribute()}
			{...getTestIds()}
			aria-hidden="true"
			className="rr--svg"
			xmlns="http://www.w3.org/2000/svg"
			viewBox={svgData ? svgData.viewBox : '0 0 0 0'}
			preserveAspectRatio="xMidYMid meet"
		>
			{hasHalfFill && (
				<defs {...getDefsTestId()}>
					<linearGradient id={`${uniqId.current}_rr_hf`} {...getGradientTransformAttr()}>
						<stop className="rr--svg-stop-1" offset="50%" />
						<stop className="rr--svg-stop-2" offset="50%" />
					</linearGradient>
				</defs>
			)}

			<g ref={svgRef} {...getTransform()} {...getHalfFillAttr()}>
				{itemShapes}
			</g>
		</svg>
	);
};
