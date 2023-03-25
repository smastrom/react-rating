import { roundToHalf } from './utils'
import { NonNullProp, CSSClassName } from './internalTypes'
import { HFClasses } from './constants'

export function getHFClassNames(
   ratingValue: NonNullProp<'value'>,
   items: NonNullProp<'items'>,
   absoluteHFMode: NonNullProp<'halfFillMode'>
): CSSClassName[] {
   const intersectionIndex = Math.floor(roundToHalf(ratingValue))

   return Array.from({ length: items }, (_, index) => {
      if (absoluteHFMode === 'box') {
         if (index > intersectionIndex) {
            return HFClasses.BOX_OFF
         }
         if (index === intersectionIndex) {
            return HFClasses.BOX_INT
         }
         return HFClasses.BOX_ON
      }
      if (index > intersectionIndex) {
         return HFClasses.SVG_OFF
      }
      return HFClasses.SVG_ON
   })
}
