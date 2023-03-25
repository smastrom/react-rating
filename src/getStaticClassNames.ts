import { CSSClassName, MaybeEmptyClassName } from './internalTypes'
import {
   Sizes,
   TransitionProps,
   TransitionClasses,
   RadiusClasses,
   GapClasses,
   PaddingClasses,
} from './constants'

const colorsWith = (transition: CSSClassName): CSSClassName =>
   `${transition} ${TransitionClasses.COLORS}`

/* c8 ignore start */
export function getTransitionClassNames(transitionProp: unknown): MaybeEmptyClassName {
   switch (transitionProp) {
      case TransitionProps.ZOOM:
         return colorsWith(TransitionClasses.ZOOM)
      case TransitionProps.POSITION:
         return colorsWith(TransitionClasses.POSITION)
      case TransitionProps.OPACITY:
         return colorsWith(TransitionClasses.OPACITY)
      case TransitionProps.COLORS:
         return TransitionClasses.COLORS
      default:
         return ''
   }
}
/* c8 ignore stop */

/* c8 ignore start */
export function getRadiusClassName(radiusProp: unknown): MaybeEmptyClassName {
   switch (radiusProp) {
      case Sizes.SMALL:
         return RadiusClasses.SMALL
      case Sizes.MEDIUM:
         return RadiusClasses.MEDIUM
      case Sizes.LARGE:
         return RadiusClasses.LARGE
      case Sizes.FULL:
         return RadiusClasses.FULL
      default:
         return ''
   }
}
/* c8 ignore stop */

/* c8 ignore start */
export function getGapClassName(gapProp: unknown): MaybeEmptyClassName {
   switch (gapProp) {
      case Sizes.SMALL:
         return GapClasses.SMALL
      case Sizes.MEDIUM:
         return GapClasses.MEDIUM
      case Sizes.LARGE:
         return GapClasses.LARGE
      default:
         return ''
   }
}
/* c8 ignore stop */

/* c8 ignore start */
export function getPaddingClassName(paddingProp: unknown): MaybeEmptyClassName {
   switch (paddingProp) {
      case Sizes.SMALL:
         return PaddingClasses.SMALL
      case Sizes.MEDIUM:
         return PaddingClasses.MEDIUM
      case Sizes.LARGE:
         return PaddingClasses.LARGE
      default:
         return ''
   }
}
/* c8 ignore stop */
