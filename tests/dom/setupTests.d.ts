import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

interface SVGElement {
   getBBox?: () => void
}

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Vi {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type Assertion<T = any> = TestingLibraryMatchers<T, void>
   }
}
