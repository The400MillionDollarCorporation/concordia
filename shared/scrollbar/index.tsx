'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useWindowSize, useRect } from '@studio-lumio/hooks'

import s from './scrollbar.module.scss'
import { clamp } from '~/libs/math'

export function Scrollbar() {
  const thumb = useRef<any>(null)
  const { height: windowHeight } = useWindowSize()
  const innerRectRef = useRef(null)
  const thumbRectRef = useRef<any>(null)
  const { height: innerHeight } = useRect(innerRectRef)
  const { height: thumbHeight } = useRect(thumbRectRef)

  const lenis = useLenis(({ progress }) => {
    thumb.current.style.transform = `translate3d(0,${
      progress * (innerHeight - thumbHeight)
    }px,0)`
  })

  const [clicked, setClicked] = useState(false)
  const [startPoint, setStartPoint] = useState({
    progress: 0,
    y: 0,
  })

  const onPointerMove = useCallback(
    (e: any) => {
      if (!clicked) return

      e.preventDefault()

      const startProgress = startPoint.progress
      const startY = startPoint.y
      const deltaY = e.clientY - startY

      const progress = clamp(0, startProgress + deltaY / innerHeight, 1)
      lenis.scrollTo(progress * lenis.limit, { immediate: true })
      lenis.reset()
    },
    [lenis, clicked, windowHeight, innerHeight, startPoint]
  )

  const onPointerUp = useCallback(() => {
    setClicked(false)
  }, [])

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove, false)
    window.addEventListener('pointerup', onPointerUp, false)

    return () => {
      window.removeEventListener('pointermove', onPointerMove, false)
      window.removeEventListener('pointerup', onPointerUp, false)
    }
  }, [onPointerMove, onPointerUp])

  return (
    <div className={s.scrollbar}>
      <div ref={innerRectRef} className={s.inner}>
        <div
          className={s.thumb}
          ref={(node) => {
            thumb.current = node
            thumbRectRef.current = node
          }}
          onPointerDown={(e) => {
            setClicked(true)
            setStartPoint({ progress: lenis.progress, y: e.clientY })
          }}
        />
      </div>
    </div>
  )
}

export default Scrollbar
