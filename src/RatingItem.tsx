import React, { useRef, useState } from 'react';
import {
	areNum,
	getNewPosition,
	getDefsTestId,
	getUniqueId,
	toSecondDecimal,
	useIsomorphicLayoutEffect,
} from './utils';
import { RatingClasses, OrientationProps } from './constants';
import { RatingItemProps, SvgData } from './internalTypes';

export function RatingItem({
	itemShapes,
	testId,
	itemStrokeWidth = 0,
	orientation = OrientationProps.HORIZONTAL,
	hasHF = false,
}: RatingItemProps) {
	const strokeOffset = itemStrokeWidth > 0 ? -(itemStrokeWidth / 2) : 0;
	const translateOffset = itemStrokeWidth > 0 ? `${strokeOffset} ${strokeOffset}` : '0 0';

	const svgRef = useRef<SVGPathElement | null>(null);
	const uniqId = useRef<string | null>(null);

	const [svgData, setSvgData] = useState<SvgData | null>(null);

	useIsomorphicLayoutEffect(() => {
		if (hasHF && !uniqId.current) {
			uniqId.current = `rr_hf_${getUniqueId()}`;
		}

		if (svgRef.current) {
			const {
				width: svgWidth,
				height: svgHeight,
				x: svgXPos,
				y: svgYPos,
			} = svgRef.current.getBBox();

			if (areNum(svgWidth, svgHeight, svgXPos, svgYPos)) {
				const viewBox = `${translateOffset} ${toSecondDecimal(
					svgWidth + itemStrokeWidth
				)} ${toSecondDecimal(svgHeight + itemStrokeWidth)}`;
				const translateData = `${getNewPosition(svgXPos)} ${getNewPosition(svgYPos)}`;

				setSvgData({
					viewBox,
					translateData,
				});
			}
		}
	}, [itemShapes, itemStrokeWidth, hasHF]);

	/* Props */

	function getHFAttr() {
		if (hasHF) {
			return {
				fill: `url('#${uniqId.current}')`,
			};
		}
		return {};
	}

	/* istanbul ignore next */
	function getGradientTransformAttr() {
		if (orientation === OrientationProps.VERTICAL) {
			return {
				gradientTransform: 'rotate(90)',
			};
		}
		return {};
	}

	function getStrokeAttribute() {
		if (itemStrokeWidth > 0) {
			return {
				strokeWidth: itemStrokeWidth,
			};
		}
		return {};
	}

	function getTransform() {
		if (svgData) {
			const translateProp = `translate(${svgData?.translateData})`;
			if (translateProp === 'translate(0 0)') {
				return {};
			}
			return { transform: translateProp };
		}
		return { transform: undefined };
	}

	return (
		<svg
			aria-hidden="true"
			className={RatingClasses.SVG}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={svgData ? svgData.viewBox : '0 0 0 0'}
			preserveAspectRatio="xMidYMid meet"
			{...getStrokeAttribute()}
			{...testId}
		>
			{hasHF && uniqId.current && (
				<defs {...getDefsTestId()}>
					<linearGradient id={uniqId.current} {...getGradientTransformAttr()}>
						<stop className={RatingClasses.DEF_50} offset="50%" />
						<stop className={RatingClasses.DEF_100} offset="50%" />
					</linearGradient>
				</defs>
			)}

			<g ref={svgRef} {...getTransform()} {...getHFAttr()}>
				{itemShapes}
			</g>
		</svg>
	);
}
