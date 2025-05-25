'use client'

import { useCanvas } from 'libs/webgl/components/canvas'
import { Fragment, useId } from 'react'

export function WebGLTunnel({ children }) {
  const { WebGLTunnel } = useCanvas()

  if (!WebGLTunnel) return

  return <WebGLTunnel.In>{children}</WebGLTunnel.In>
}

export function DOMTunnel({ children }) {
  const { DOMTunnel } = useCanvas()

  const uuid = useId()

  return (
    <DOMTunnel.In>
      <Fragment key={uuid}>{children}</Fragment>
    </DOMTunnel.In>
  )
}
