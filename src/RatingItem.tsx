import { useCallback, useId, useRef, useState } from 'react'
import {
   areNum,
   getNewPosition as getNewPos,
   getDefsTestId,
   toSecondDecimal as toSecondDec,
   useIsomorphicLayoutEffect,
   getHiddenParent,
} from './utils'
import { RatingClasses, OrientationProps } from './constants'
import { RatingItemProps, SvgData } from './internalTypes'

export function RatingItem({
   itemShapes,
   testId,
   itemStrokeWidth = 0,
   orientation = OrientationProps.HORIZONTAL,
   hasHF = false,
}: RatingItemProps) {
   const strokeOffset = itemStrokeWidth > 0 ? -(itemStrokeWidth / 2) : 0
   const translateOffset = itemStrokeWidth > 0 ? `${strokeOffset} ${strokeOffset}` : '0 0'

   const uniqId = useId()

   const groupRef = useRef<SVGPathElement | null>(null)
   const [svgData, _setSvgData] = useState<SvgData | null>(null)

   const [isHiddenParentDetected, setIsHiddenParentDetected] = useState(false)
   const mutationObserver = useRef<MutationObserver | null>(null)
   const hiddenParent = useRef<HTMLElement | SVGElement | null>(null)

   const setSvgData = useCallback(
      (el: SVGPathElement) => {
         const { width: w, height: h, x, y } = el.getBBox()

         if (areNum(w, h, x, y)) {
            const viewBox = `${translateOffset} ${toSecondDec(w + itemStrokeWidth)} ${toSecondDec(
               h + itemStrokeWidth
            )}`
            const translateData = `${getNewPos(x)} ${getNewPos(y)}`

            _setSvgData({
               viewBox,
               translateData,
            })
         }
      },
      [itemStrokeWidth, translateOffset]
   )

   useIsomorphicLayoutEffect(() => {
      if (groupRef.current) {
         const { width: w, height: h, x, y } = groupRef.current.getBBox()

         const isHidden = w === 0 && h === 0 && x === 0 && y === 0

         if (isHidden) {
            const _hiddenParent = getHiddenParent(groupRef.current)
            if (_hiddenParent) {
               hiddenParent.current = _hiddenParent
               setIsHiddenParentDetected(true)
            }
         } else {
            setIsHiddenParentDetected(false)
         }

         setSvgData(groupRef.current)
      }
   }, [itemShapes, itemStrokeWidth, hasHF])

   useIsomorphicLayoutEffect(() => {
      if (isHiddenParentDetected && hiddenParent.current) {
         mutationObserver.current = new MutationObserver((mutations, observer) => {
            mutations.forEach(() => {
               const isDisplayNone =
                  window.getComputedStyle(hiddenParent.current as Element).display === 'none'

               if (!isDisplayNone) {
                  setSvgData(groupRef.current as SVGPathElement)
                  observer.disconnect()
               }
            })
         })

         mutationObserver.current.observe(hiddenParent.current, {
            attributes: true,
         })

         return () => {
            mutationObserver.current?.disconnect()
         }
      }
   }, [isHiddenParentDetected, setSvgData])

   /* Props */

   function getHFAttr() {
      if (hasHF) {
         return {
            fill: `url('#${uniqId}')`,
         }
      }
      return {}
   }

   function getGradientTransformAttr() {
      if (orientation === OrientationProps.VERTICAL) {
         return {
            gradientTransform: 'rotate(90)',
         }
      }
      return {}
   }

   function getStrokeAttribute() {
      if (itemStrokeWidth > 0) {
         return {
            strokeWidth: itemStrokeWidth,
         }
      }
      return {}
   }

   function getTransform() {
      if (svgData) {
         const translateProp = `translate(${svgData?.translateData})`
         if (translateProp === 'translate(0 0)') {
            return {}
         }
         return { transform: translateProp }
      }
      return { transform: undefined }
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
         {hasHF && (
            <defs {...getDefsTestId()}>
               <linearGradient id={uniqId} {...getGradientTransformAttr()}>
                  <stop className={RatingClasses.DEF_50} offset="50%" />
                  <stop className={RatingClasses.DEF_100} offset="50%" />
               </linearGradient>
            </defs>
         )}

         <g ref={groupRef} shapeRendering="geometricPrecision" {...getTransform()} {...getHFAttr()}>
            {itemShapes}
         </g>
      </svg>
   )
}
