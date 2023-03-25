import { setColorCssVars } from './setColorCssVars'
import { ItemStyles } from './exportedTypes'
import { CSSVariables, StaticColors } from './internalTypes'
import { ItemVars } from './constants'
import { isPositiveNum } from './utils'

export function getStaticCssVars(
   staticColors: StaticColors,
   boxBorderWidth: NonNullable<ItemStyles['boxBorderWidth']>
): CSSVariables {
   const cssVars: CSSVariables = {}

   if (isPositiveNum(boxBorderWidth)) {
      cssVars[ItemVars.BORDER_WIDTH] = `${boxBorderWidth}px`
   }

   const colorsEntries = Object.entries(staticColors)

   if (colorsEntries.length > 0) {
      for (const [key, value] of colorsEntries) {
         setColorCssVars(cssVars, key, value)
      }
   }

   return cssVars
}
