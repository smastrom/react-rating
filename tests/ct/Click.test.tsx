import { test } from '@playwright/experimental-ct-react'
import { App } from '../../vite/App'
import {
   childTestIds,
   resetTestId,
   expectNoneToBeChecked,
   expectToBeTheOnlyChecked,
   expectToBeTheOnlyFocusable,
   getRandomInt,
} from './testUtils'

test('Whether rating is required or not, the clicked target should always be the only checked and focusable element', async ({
   mount,
}) => {
   const component = await mount(<App />)

   for await (const testId of childTestIds) {
      await component.locator(testId).click()
      await expectToBeTheOnlyChecked(component, testId)
      await expectToBeTheOnlyFocusable(component, testId)
   }
   await component.unmount()

   const requiredComponent = await mount(<App isRequired />)

   for await (const testId of childTestIds) {
      await requiredComponent.locator(testId).click()
      await expectToBeTheOnlyChecked(requiredComponent, testId)
      await expectToBeTheOnlyFocusable(requiredComponent, testId)
   }
})

test('If rating is not required, should check/uncheck the target if clicking multiple times on it', async ({
   mount,
}) => {
   const component = await mount(<App />)

   for await (const testId of childTestIds) {
      await component.locator(testId).click()
      await expectToBeTheOnlyChecked(component, testId)
      await expectToBeTheOnlyFocusable(component, testId)

      await component.locator(testId).click()
      await expectNoneToBeChecked(component)
      await expectToBeTheOnlyFocusable(component, resetTestId)
   }
})

test('If rating is required, should never uncheck the target if clicking multiple times on it', async ({
   mount,
}) => {
   const component = await mount(<App isRequired />)

   for await (const testId of childTestIds) {
      await component.locator(testId).click({ clickCount: getRandomInt(20, 100) })
      await expectToBeTheOnlyChecked(component, testId)
      await expectToBeTheOnlyFocusable(component, testId)
   }
})
