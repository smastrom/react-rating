import { getColors } from '../../src/getColors'

describe('getColors returns proper arrayColors and staticColors objects', () => {
   const Test1 = 'Should return an object including only properties with string values'

   const sourceObject = {
      activeFillColor: 'transparent',
      activeStrokeColor: undefined,
      activeBoxColor: ['x', 'a', 'f', undefined, 0],
      activeBoxBorderColor: 3,

      inactiveFillColor: 'green',
      inactiveStrokeColor: '#FFFFFF',
      inactiveBoxColor: 'red',
      inactiveBoxBorderColor: undefined,
   }

   const expectedObject = {
      arrayColors: {
         activeBoxColor: ['x', 'a', 'f'],
      },
      staticColors: {
         activeFillColor: 'transparent',

         inactiveBoxColor: 'red',
         inactiveFillColor: 'green',
         inactiveStrokeColor: '#FFFFFF',
      },
   }

   test(Test1, () => {
      expect(getColors(sourceObject)).toStrictEqual(expectedObject)
   })

   const Test2 = 'Should never include non-array properties in arrayColors'

   const sourceObject2 = {
      activeBoxColor: ['x', 'a', 'f', undefined, 0],

      inactiveFillColor: ['green', 'red', 'blue'],
      inactiveStrokeColor: '#FFFFFF',
   }

   const expectedObject2 = {
      arrayColors: {
         activeBoxColor: ['x', 'a', 'f'],
      },
      staticColors: {
         inactiveStrokeColor: '#FFFFFF',
      },
   }

   test(Test2, () => {
      expect(getColors(sourceObject2)).toStrictEqual(expectedObject2)
   })

   const Test3 = 'Should return an empty object for arrayColors if no colors are provided as array'

   const sourceObject3 = {
      activeFillColor: '#ffb23f',
      activeBoxColor: 'red',
      activeBoxBorderColor: 'blue',
      activeStrokeColor: '#e17b21',

      inactiveFillColor: '#FFF7ED',
      inactiveStrokeColor: '#eda76a',
      inactiveBoxColor: 'green',
      inactiveBoxBorderColor: 'aliceblue',
   }

   const expectedObject3 = {
      arrayColors: {},
      staticColors: {
         ...sourceObject3,
      },
   }

   test(Test3, () => {
      expect(getColors(sourceObject3)).toStrictEqual(expectedObject3)
   })
})
