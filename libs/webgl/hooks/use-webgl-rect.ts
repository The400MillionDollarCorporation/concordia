import { useFrame, useThree } from '@react-three/fiber'
import { useLenis } from 'lenis/react'
import { useEventListener } from '@studio-lumio/hooks'
import { useCallback, useRef } from 'react'
import { PerspectiveCamera } from 'three'

interface IRect {
  x: number
  y: number
  width: number
  height: number
}

export function useOrthoRect(el: HTMLElement) {
  const DOMRect = el.getBoundingClientRect()
  const rect = useRef<IRect>(null)
  const { size } = useThree()

  useLenis(
    ({ scroll }) => {
      const x = -size.width / 2 + (DOMRect.left + DOMRect.width / 2)
      const y = size.height / 2 - (DOMRect.top + DOMRect.height / 2) + scroll
      const width = DOMRect.width
      const height = DOMRect.height
      rect.current = { x, y, width, height }
    },
    [DOMRect, size],
    -1
  )

  return () => rect.current
}

export function usePerspectiveRect(el: HTMLElement) {
  const rect = useRef<IRect>(null)
  const DOMRect = useRef(null)

  const { size, camera } = useThree()
  const getSize = useCallback(() => {
    DOMRect.current = el.getBoundingClientRect()
    if (camera instanceof PerspectiveCamera) {
      const aspect = size.width / size.height

      const fov = camera.fov * (Math.PI / 180)
      const height = 2 * Math.tan(fov / 2) * camera.position.z
      const width = height * aspect

      const x =
        ((DOMRect.current?.left + DOMRect.current?.width / 2) / size.width) *
          width -
        width / 2
      const y =
        (-(DOMRect.current?.top + DOMRect.current?.height / 2) / size.height) *
          height +
        height / 2

      rect.current = {
        x,
        y,
        width: (DOMRect.current?.width / size.width) * width,
        height: (DOMRect.current?.height / size.height) * height,
      }
    }
  }, [camera, el, size.height, size.width])

  useFrame(() => {
    getSize()
  })

  useEventListener('resize', getSize)

  return () => rect.current
}
