import { useEffect } from 'react'
import { shuffle } from 'txt-shuffle'

export const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// eslint-disable-next-line no-unused-vars
export function useHoverShuffle(setText: (text: string) => void): void {
  useEffect(() => {
    const shuffleElement = document.querySelectorAll<Element>(
      '[data-custom-shuffle]'
    )

    shuffleElement.forEach((item: Element) => {
      const text = item.getAttribute('data-custom-shuffle')

      const handleMouseEnter = (): void => {
        if (text) {
          shuffle({
            text,
            glyphs: alphabets,
            direction: 'right',
            onUpdate: (output: string) => {
              setText(output)
            },
          })
        }
      }

      const handleMouseLeave = (): void => {
        shuffle({
          text: text,
          glyphs: alphabets,
          direction: 'left',
          animation: 'hide',
          onUpdate: (output: string) => {
            setText(output)
          },
        })
      }

      item.addEventListener('mouseenter', handleMouseEnter)
      item.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter)
        item.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [setText])
}
