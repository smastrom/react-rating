import { vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

import '@testing-library/jest-dom'

expect.extend(matchers)

beforeEach(() => {
   vi.spyOn(console, 'error').mockImplementation(() => undefined)
   // @ts-expect-error - getBBox
   window.SVGElement.prototype.getBBox = () => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
   })
})

afterEach(() => {
   // @ts-expect-error - getBBox
   delete window.SVGElement.prototype.getBBox
   cleanup()
})
