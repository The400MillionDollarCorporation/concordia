'use client'

import { MouseEvent, ReactNode, useRef } from 'react'

import {
  useFrame,
  useIntersectionObserver,
  useResizeObserver,
} from '@studio-lumio/hooks'
import { useLenis } from 'lenis/react'

import cn from '~/libs/cn'
import { modulo } from '~/libs/math'

import s from './marquee.module.scss'

interface MarqueeProps {
  children: ReactNode
  repeat?: number
  speed?: number
  scrollVelocity?: boolean
  reversed?: boolean
  pauseOnHover?: boolean
  // eslint-disable-next-line no-unused-vars
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void
  // eslint-disable-next-line no-unused-vars
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void
  className?: string
  classNameInner?: string
  [key: string]: any
}

export function Marquee({
  children,
  repeat = 2,
  speed = 1,
  scrollVelocity = true,
  reversed = false,
  pauseOnHover = false,
  onMouseEnter,
  onMouseLeave,
  className,
  classNameInner,
  ...props
}: MarqueeProps) {
  // @ts-ignore
  const [setRectRef, { contentRect: rect }] = useResizeObserver()
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const transformRef = useRef(Math.random() * 1000)
  const isHovered = useRef(false)

  const [setIntersectionRef, intersection] = useIntersectionObserver()
  const lenis = useLenis()

  useFrame((_, deltaTime) => {
    if (
      intersection instanceof IntersectionObserverEntry &&
      !intersection.isIntersecting
    )
      return
    if (pauseOnHover && isHovered.current) return

    if (!rect || !rect.width) return

    let velocity = lenis?.velocity ?? 0
    if (!scrollVelocity) {
      velocity = 0
    }
    velocity = 1 + Math.abs(velocity / 5)

    const offset = deltaTime * (speed * 0.1 * velocity)

    if (reversed) {
      transformRef.current -= offset
    } else {
      transformRef.current += offset
    }

    transformRef.current = modulo(transformRef.current, rect.width)

    elementsRef.current.forEach((node) => {
      if (node) {
        node.style.transform = `translate3d(${-transformRef.current}px,0,0)`
      }
    })
  })

  return (
    <div
      ref={setIntersectionRef}
      className={cn(className, s.marquee)}
      onMouseEnter={(e) => {
        isHovered.current = true
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        isHovered.current = false
        onMouseLeave?.(e)
      }}
      {...props}
    >
      {new Array(repeat).fill(children).map((_, i) => (
        <div
          key={i}
          className={cn(classNameInner, s.inner)}
          aria-hidden={i !== 0 ?? undefined}
          data-nosnippet={i !== 0 ? '' : undefined}
          ref={(node) => {
            elementsRef.current[i] = node

            if (i === 0) setRectRef(node)
          }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export function MarqueeHz({
  children,
  repeat = 2,
  speed = 1,
  scrollVelocity = true,
  reversed = false,
  pauseOnHover = false,
  onMouseEnter,
  onMouseLeave,
  className,
  classNameInner,
  ...props
}: MarqueeProps) {
  // @ts-ignore
  const [setRectRef, { contentRect: rect }] = useResizeObserver()
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const transformRef = useRef(Math.random() * 1000)
  const isHovered = useRef(false)

  const [setIntersectionRef, intersection] = useIntersectionObserver()
  const lenis = useLenis()

  useFrame((_, deltaTime) => {
    if (
      intersection instanceof IntersectionObserverEntry &&
      !intersection.isIntersecting
    )
      return
    if (pauseOnHover && isHovered.current) return

    if (!rect || !rect.height) return

    let velocity = lenis?.velocity ?? 0
    if (!scrollVelocity) {
      velocity = 0
    }
    velocity = 1 + Math.abs(velocity / 5)

    const offset = deltaTime * (speed * 0.1 * velocity)

    if (reversed) {
      transformRef.current -= offset
    } else {
      transformRef.current += offset
    }

    transformRef.current = modulo(transformRef.current, rect.height)

    elementsRef.current.forEach((node) => {
      if (node) {
        node.style.transform = `translate3d(0, ${-transformRef.current}px,0)`
      }
    })
  })

  return (
    <div
      ref={setIntersectionRef}
      className={cn(className, s.marqueehz)}
      onMouseEnter={(e) => {
        isHovered.current = true
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        isHovered.current = false
        onMouseLeave?.(e)
      }}
      {...props}
    >
      {new Array(repeat).fill(children).map((_, i) => (
        <div
          key={i}
          className={cn(classNameInner, s.inner)}
          aria-hidden={i !== 0 ?? undefined}
          data-nosnippet={i !== 0 ? '' : undefined}
          ref={(node) => {
            elementsRef.current[i] = node

            if (i === 0) setRectRef(node)
          }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
