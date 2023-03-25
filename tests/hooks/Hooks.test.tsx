import { useRef } from 'react'
import { describe, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import { fireEvent, renderHook } from '@testing-library/react'
import { render, screen, CHILD_ID_3, CHILD_ID_4, CHILD_ID_5, useOnChange } from '../dom/testUtils'
import { Rating } from '../../src/Rating'

describe('User hooks are updated correctly', () => {
   test('User ref is injected correctly', () => {
      const { result } = renderHook(() => useRef(null))

      render(<Rating ref={result.current} value={0} onChange={() => null} />)

      expect(result.current.current).not.toBe(null)
   })

   describe('Mouse click events', () => {
      test('Rating value is updated correctly', () => {
         const { result } = renderHook(() => useOnChange(1))

         const Component = () => (
            <Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
         )
         const { rerender } = render(Component())
         const rerenderWithLatest = () => rerender(Component())

         fireEvent.click(screen.getByTestId(CHILD_ID_4))
         expect(result.current.ratingValue).toBe(4)

         rerenderWithLatest()
         fireEvent.click(screen.getByTestId(CHILD_ID_5))
         expect(result.current.ratingValue).toBe(5)

         rerenderWithLatest()
         fireEvent.click(screen.getByTestId(CHILD_ID_3))
         expect(result.current.ratingValue).toBe(3)
      })

      test('Rating value is reset correctly if clicking again on the current rating', () => {
         const { result } = renderHook(() => useOnChange(3))

         const Component = () => (
            <Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
         )
         const { rerender } = render(Component())
         const rerenderWithLatest = () => rerender(Component())

         fireEvent.click(screen.getByTestId(CHILD_ID_3))
         expect(result.current.ratingValue).toBe(0)

         rerenderWithLatest()
         fireEvent.click(screen.getByTestId(CHILD_ID_3))
         expect(result.current.ratingValue).toBe(3)
      })
   })

   describe('Mouse hover events', () => {
      test('Hovered rating value is updated correctly and does not interfere with selected value', () => {
         const { result } = renderHook(() => useOnChange(1))
         const { result: hoveredResult } = renderHook(() => useOnChange(0))

         const Component = () => (
            <Rating
               value={result.current.ratingValue}
               onChange={() => null}
               onHoverChange={hoveredResult.current.setRatingValue}
            />
         )
         const { rerender } = render(Component())
         const rerenderWithLatest = () => rerender(Component())

         fireEvent.mouseOver(screen.getByTestId(CHILD_ID_5))
         expect(hoveredResult.current.ratingValue).toBe(5)

         rerenderWithLatest()
         fireEvent.mouseOver(screen.getByTestId(CHILD_ID_3))
         expect(hoveredResult.current.ratingValue).toBe(3)

         rerenderWithLatest()
         expect(result.current.ratingValue).toBe(1)
      })
   })

   describe('Keyboard events', () => {
      test('Rating value is updated correctly', async () => {
         const { result } = renderHook(() => useOnChange(1))

         const Component = () => (
            <Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
         )
         render(Component())

         await userEvent.keyboard('[Tab][ArrowRight][ArrowRight][Enter]')
         expect(result.current.ratingValue).toBe(3)
      })

      test('Rating value is reset correctly', async () => {
         const { result } = renderHook(() => useOnChange(1))

         render(
            <Rating value={result.current.ratingValue} onChange={result.current.setRatingValue} />
         )

         await userEvent.keyboard('[Tab][ArrowRight][ArrowRight][Enter]')
         expect(result.current.ratingValue).toBe(3)

         await userEvent.keyboard('[ArrowRight][ArrowRight][ArrowRight][Enter]')
         expect(result.current.ratingValue).toBe(0)
      })

      test('Hovered value is set correctly on focus, blur or arrow navigation', async () => {
         const initialValue = 2
         const { result: hoveredResult } = renderHook(() => useOnChange(0))

         render(
            <Rating
               value={initialValue}
               onChange={() => null}
               onHoverChange={hoveredResult.current.setRatingValue}
            />
         )

         // Focus
         await userEvent.keyboard('[Tab]')
         expect(hoveredResult.current.ratingValue).toBe(initialValue)

         // Navigate
         await userEvent.keyboard('[ArrowRight]')
         expect(hoveredResult.current.ratingValue).toBe(initialValue + 1)
         await userEvent.keyboard('[ArrowLeft]')
         expect(hoveredResult.current.ratingValue).toBe(initialValue)

         // Blur
         await userEvent.keyboard('[Tab]')
         expect(hoveredResult.current.ratingValue).toBe(0)
      })
   })
})
