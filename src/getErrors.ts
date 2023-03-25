import { isValidElement } from 'react'
import { ItemStyles, RatingProps } from './exportedTypes'
import Package from '../package.json'

type ErrorObj = {
   shouldRender: boolean
   reason: string
}

const getErrorReason = (reason: string) =>
   `[${Package.name}] - Nothing's returned from rendering. Reason: ${reason}.`

function setErrors(targetObj: ErrorObj, reason: string) {
   targetObj.shouldRender = false
   targetObj.reason = getErrorReason(reason)

   return targetObj
}

const invalidJSXMsg = 'itemShapes is not a valid JSX element'

type Props = Pick<RatingProps, 'items'> & Pick<ItemStyles, 'itemShapes'>

type ParamObj = Required<{
   [Prop in keyof Props]: unknown
}>

export function getErrors({ items, itemShapes }: ParamObj) {
   const errorsObj: ErrorObj = { shouldRender: true, reason: '' }

   if (typeof items !== 'number' || items < 1 || items > 10) {
      return setErrors(errorsObj, 'items is invalid')
   }

   if (!itemShapes) {
      return setErrors(errorsObj, 'itemStyles needs at least the property itemShapes set')
   }
   if (!Array.isArray(itemShapes) && !isValidElement(itemShapes as object | null | undefined)) {
      return setErrors(errorsObj, invalidJSXMsg)
   }

   if (Array.isArray(itemShapes)) {
      if (itemShapes.length !== items) {
         return setErrors(errorsObj, 'itemShapes length mismatch')
      }
      const areValid = (itemShapes as (object | null | undefined)[]).every((svgChildNode) =>
         isValidElement(svgChildNode)
      )
      if (!areValid) {
         return setErrors(errorsObj, invalidJSXMsg)
      }
   }

   return errorsObj
}
