import { test } from '@playwright/experimental-ct-react'
import {
   childTestIds,
   expectToBeTheOnlyChecked,
   expectToBeTheOnlyFocusable,
   getRandomInt,
   MountResult,
   nextArrow,
   resetTestId,
   setRTL,
   tabNavigateToRating,
} from './testUtils'
import { App } from '../../vite/App'

const ratingItems = 5
const childWithReset = [resetTestId, ...childTestIds]

test.beforeEach(async ({ page }) => {
   setRTL(page)
})

test.describe('Checked value should not change and should always be the only one checked', () => {
   const randomIterations = getRandomInt(200, 400)

   test('Not required', async ({ mount, page, browserName }) => {
      const randomRating = getRandomInt(0, ratingItems)
      const component = await mount(<App initialRating={randomRating} />)
      await tabNavigateToRating(page, browserName)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const iteration of Array.from({ length: randomIterations }, (_, index) => index)) {
         await page.keyboard.press(nextArrow)
      }

      await expectToBeTheOnlyChecked(component, childWithReset[randomRating])
   })

   test('isRequired', async ({ mount, page, browserName }) => {
      const randomRating = getRandomInt(1, ratingItems)
      const component = await mount(<App initialRating={randomRating} isRequired />)

      await tabNavigateToRating(page, browserName)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const iteration of Array.from({ length: randomIterations }, (_, index) => index)) {
         await page.keyboard.press(nextArrow)
      }

      await expectToBeTheOnlyChecked(component, childTestIds[randomRating - 1])
   })
})

test('Only the currently focused item should be focusable', async ({
   mount,
   page,
   browserName,
}) => {
   async function testFn(component: MountResult, isRequired: boolean) {
      const childArr = isRequired ? childTestIds : childWithReset

      for await (const radioIndex of Array.from(
         { length: isRequired ? ratingItems : ratingItems + 1 },
         (_, index) => index
      )) {
         await expectToBeTheOnlyFocusable(component, childArr[radioIndex])
         await page.keyboard.press(nextArrow)
      }
   }

   const component = await mount(<App initialRating={0} />)
   await tabNavigateToRating(page, browserName)
   await testFn(component, false)
   await component.unmount()

   const requiredComponent = await mount(<App initialRating={1} isRequired />)
   await tabNavigateToRating(page, browserName)
   await testFn(requiredComponent, true)
})

test('Should be able to loop through rating items', async ({ mount, page, browserName }) => {
   const randomRating = getRandomInt(1, ratingItems)
   const randomIterations = getRandomInt(200, 400)
   const component = await mount(<App initialRating={randomRating} />)
   await tabNavigateToRating(page, browserName)

   let iterationCount = 0
   let isFirstIteration = true

   /* Number of key-press needed to complete the first loop according to random initial rating */
   const iterationsNeeded = Math.abs(ratingItems - randomRating)

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   for await (const _iteration of Array.from({ length: randomIterations }, (_, index) => index)) {
      iterationCount += 1

      if (!isFirstIteration) {
         if (iterationCount === ratingItems + 1) {
            iterationCount = 0
         }
      } else {
         if (iterationCount === iterationsNeeded + 1) {
            iterationCount = 0
            isFirstIteration = false
         }
      }
      await page.keyboard.press(nextArrow)
   }

   await expectToBeTheOnlyFocusable(component, childWithReset[iterationCount])
   await expectToBeTheOnlyChecked(component, childWithReset[randomRating])
})
