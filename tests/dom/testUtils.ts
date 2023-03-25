import { ThinStar } from '../../src/Shapes'
import { useState } from 'react'
import { ItemStyles } from '../../src/exportedTypes'
export { render, screen } from '@testing-library/react'
import { StickerStar } from '../../src/Shapes'

export const GROUP_ID = 'rating'

export const CHILD_RESET_ID = 'rating-reset'

export const CHILD_ID_1 = 'rating-child-1'
export const CHILD_ID_2 = 'rating-child-2'
export const CHILD_ID_3 = 'rating-child-3'
export const CHILD_ID_4 = 'rating-child-4'
export const CHILD_ID_5 = 'rating-child-5'

export const SVGCHILD_ID_1 = 'rating-child-svg-1'
export const SVGCHILD_ID_2 = 'rating-child-svg-2'
export const SVGCHILD_ID_3 = 'rating-child-svg-3'
export const SVGCHILD_ID_4 = 'rating-child-svg-4'
export const SVGCHILD_ID_5 = 'rating-child-svg-5'

export const childArr = [CHILD_ID_1, CHILD_ID_2, CHILD_ID_3, CHILD_ID_4, CHILD_ID_5]

export const itemStyles: ItemStyles = {
   itemShapes: ThinStar,
}

export const useOnChange = (initialValue: number) => {
   const [ratingValue, setRatingValue] = useState(initialValue)

   return { ratingValue, setRatingValue }
}

export const arrayColorStyles: ItemStyles = {
   itemShapes: StickerStar,
   activeFillColor: ['#FEE2E2', '#FFEDD5', '#FEF9C3', '#ECFCCB', '#D1FAE5'],
   activeBoxColor: ['#DA1600', '#DB711A', '#DCB000', '#61BB00', '#009664'],
   activeBoxBorderColor: ['#C41400', '#D05E00', '#CCA300', '#498D00', '#00724C'],
   activeStrokeColor: ['#C41400', '#D05E00', '#CCA300', '#498D00', '#00724C'],
}
