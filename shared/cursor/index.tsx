/* eslint-disable quotes */
import cn from '~/libs/cn'
import { gsap } from '~/libs/gsap'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import s from './cursor.module.scss'
import { useEventListener } from '@studio-lumio/hooks'

function Cursor() {
  const cursor = useRef(null)
  const [isGrab, setIsGrab] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  const onPointerMove = useCallback(({ clientX, clientY }: any) => {
    const quickSetterX = gsap.quickSetter(cursor.current, 'x', 'px')
    const quickSetterY = gsap.quickSetter(cursor.current, 'y', 'px')
    quickSetterX(clientX)
    quickSetterY(clientY)
    setHasMoved(true)
  }, [])

  useEventListener('pointermove', onPointerMove)
  const cursorTypes = useMemo(
    () => [
      {
        selector: "button,a,label,*[data-cursor='pointer'],*[role='button']",
        setter: setIsPointer,
      },
      { selector: "*[data-cursor='grab']", setter: setIsGrab },
    ],
    []
  )

  useEffect(() => {
    const cleanupFns = []

    cursorTypes.forEach(({ selector, setter }) => {
      const setTrue = () => setter(true)
      const setFalse = () => setter(false)

      const elements = gsap.utils.toArray(selector)
      elements.forEach((element: HTMLElement) => {
        element.addEventListener('mouseenter', setTrue)
        element.addEventListener('mouseleave', setFalse)

        cleanupFns.push(() => {
          element.removeEventListener('mouseenter', setTrue)
          element.removeEventListener('mouseleave', setFalse)
        })
      })
    })

    return () => {
      cleanupFns.forEach((cleanupFn) => cleanupFn())
    }
  }, [cursorTypes])

  return (
    <div style={{ opacity: hasMoved ? 1 : 0 }} className={s.container}>
      <div ref={cursor}>
        <div
          className={cn(s.cursor, isGrab && s.grab, isPointer && s.pointer)}
        />
      </div>
    </div>
  )
}

export { Cursor }
