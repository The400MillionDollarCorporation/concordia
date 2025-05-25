import { ReactLenis } from 'lenis/react'
import s from './scrollable-box.module.scss'
import { ReactNode } from 'react'
import cn from '~/libs/cn'

export function ScrollableBox({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <ReactLenis
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.8,
        // smoothTouch: false,
      }}
      className={cn(className, s.hi, 'scrollable-box')}
    >
      {children}
    </ReactLenis>
  )
}
