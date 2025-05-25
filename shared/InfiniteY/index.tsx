import NormalizeWheel from 'normalize-wheel'
import { each, getOffset } from '~/libs/animations/dom'
import { lerp } from '~/libs/math'
import { useRef, ReactNode, useEffect, useCallback, FC } from 'react'
import { useEventListener, useFrame } from '@studio-lumio/hooks'
import { gsap } from '~/libs/gsap'

interface InfiniteYProps {
  className?: string
  children: ReactNode
  speed?: number
  autoScroll?: boolean
  disabled?: boolean
  setScrollVelocity: any
}
interface ElementData {
  extra: number
  height: number
  offset: number
  position: number
  isBefore?: boolean
  isAfter?: boolean
}

interface ScrollData {
  ease: number
  position: number
  current: number
  target: number
  last: number
}

export const InfiniteY: FC<InfiniteYProps> = ({
  className,
  children,
  speed = 2,
  autoScroll = true,
  disabled = false,
  setScrollVelocity,
  ...props
}) => {
  const transform = useCallback((element: HTMLElement, y: number) => {
    gsap.set(element, {
      y: Math.floor(y),
    })
  }, [])
  const elRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLElement[] | Element[]>([])
  const scroll = useRef<ScrollData>({
    ease: 0.1,
    position: 0,
    current: 0,
    target: 0,
    last: 0,
  })

  const isEnabled = useRef<boolean>(false)
  const isDown = useRef<boolean>(false)
  const heightTotal = useRef<number | null>(null)
  const start = useRef<number | null>(null)
  const velocity = useRef<number>(speed)
  const direction = useRef<'down' | 'up'>('down')

  useEffect(() => {
    const elements = elRef.current?.querySelectorAll(
      '[data-animation="draggable-child"]'
    )
    if (elements) {
      elementsRef.current = Array.from(elements)
      each(elementsRef.current, (element: HTMLElement & ElementData) => {
        const offset = getOffset(element)
        element.extra = 0
        element.height = offset.height
        element.offset = offset.top
        element.position = 0
      })
    }
  }, [])

  const setHeightTotal = () => {
    const elements = elRef.current?.querySelectorAll(
      '[data-animation="draggable-child"]'
    )
    if (elements) {
      elementsRef.current = Array.from(elements)
      let totalHeight = 0
      elementsRef.current.forEach((element: HTMLElement & ElementData) => {
        const styles = getComputedStyle(element)
        const margin =
          parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)
        const offset = getOffset(element)
        element.extra = 0
        element.height = offset.height + margin
        element.offset = offset.top
        element.position = 0
        totalHeight += offset.height + margin
      })
      heightTotal.current = totalHeight
    }
  }

  useEffect(() => {
    setHeightTotal()
  }, [])

  const onTouchDown = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isEnabled.current) return
    isDown.current = true
    scroll.current.position = scroll.current.current
    start.current =
      'touches' in event ? event.touches[0].clientY : event.clientY
  }, [])

  const onTouchMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDown.current || !isEnabled.current) return
    const x = 'touches' in event ? event.touches[0].clientY : event.clientY
    const distance = (start.current - x) * 2
    scroll.current.target = scroll.current.position + distance
  }, [])

  const onTouchUp = useCallback(() => {
    if (!isEnabled.current) return
    isDown.current = false
  }, [])

  const onWheel = useCallback((event: WheelEvent) => {
    if (!isEnabled.current) return
    const normalized = NormalizeWheel(event)
    scroll.current.target += (normalized.pixelY + normalized.pixelX) * 0.5
  }, [])

  const onResize = useCallback(() => {
    each(elementsRef.current, (element: HTMLElement & ElementData) => {
      transform(element, 0)
      const offset = getOffset(element)
      element.extra = 0
      element.height = offset.height
      element.offset = offset.top
      element.position = 0
    })
    setHeightTotal()
    scroll.current = {
      ease: 0.5,
      position: 0,
      current: 0,
      target: 0,
      last: 0,
    }
  }, [transform])

  const update = useCallback(() => {
    if (!isEnabled.current) return
    if (autoScroll) {
      scroll.current.target += velocity.current
    }

    scroll.current.current = lerp(
      scroll.current.current,
      scroll.current.target,
      scroll.current.ease
    )

    if (scroll.current.current < scroll.current.last) {
      direction.current = 'down'
      velocity.current = -speed
    } else {
      direction.current = 'up'
      velocity.current = speed
    }
    const elementPositions = []
    each(elementsRef.current, (element: HTMLElement & ElementData) => {
      element.position = -scroll.current.current - element.extra

      const offset = element.position + element.offset + element.height

      element.isBefore = offset < 0
      element.isAfter = offset > heightTotal.current

      if (direction.current === 'up' && element.isBefore) {
        element.extra = element.extra - heightTotal.current

        element.isBefore = false
        element.isAfter = false
      }

      if (direction.current === 'down' && element.isAfter) {
        element.extra = element.extra + heightTotal.current

        element.isBefore = false
        element.isAfter = false
      }
      setScrollVelocity(
        (scroll.current.current - scroll.current.last) / screen.height
      )
      elementPositions.push(element.position)
      transform(element, element.position)
    })

    scroll.current.last = scroll.current.current
  }, [autoScroll, transform])

  useFrame(() => {
    update()
  })

  const disable = useCallback(() => {
    isEnabled.current = false
  }, [])

  const enable = useCallback(() => {
    isEnabled.current = true
  }, [])

  useEffect(() => {
    if (disabled) {
      disable()
    } else {
      enable()
    }
  }, [disabled, enable, disable])

  useEventListener('resize', onResize, null, { passive: true })
  useEventListener('wheel', onWheel, null, { passive: true })
  useEventListener('mousedown', onTouchDown, elRef, { passive: true })
  useEventListener('mousemove', onTouchMove, elRef, { passive: true })
  useEventListener('mouseup', onTouchUp, elRef, { passive: true })
  useEventListener('touchstart', onTouchDown, elRef, { passive: true })
  useEventListener('touchmove', onTouchMove, elRef, { passive: true })
  useEventListener('touchend', onTouchUp, elRef, { passive: true })

  return (
    <div
      {...props}
      ref={elRef}
      className={className}
      data-cursor="grab"
      data-animation="draggable"
    >
      {children}
    </div>
  )
}

export default InfiniteY
