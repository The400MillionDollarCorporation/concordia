import dynamic from 'next/dynamic'
import { createContext, useContext, useEffect, useState } from 'react'
import tunnel from 'tunnel-rat'
import { useDeviceDetection } from '~/shared/device-detection'
import { isBooleanAndFalse, isBooleanAndTrue } from '~/libs/utils'
import { create } from 'zustand'

const WebGLCanvas = dynamic(
  () => import('./webgl').then(({ WebGLCanvas }) => WebGLCanvas),
  {
    ssr: false,
  }
)

const useRoot = create(() => ({}))

export const CanvasContext = createContext({})

export function Canvas({ children, className = '', root = false }) {
  const [WebGLTunnel] = useState(() => tunnel())
  const [DOMTunnel] = useState(() => tunnel())

  const { isWebGL, isTablet } = useDeviceDetection()

  const isOrtho = false

  useEffect(() => {
    if (root) {
      useRoot.setState(isWebGL ? { WebGLTunnel, DOMTunnel } : {})
    }

    return () => {
      useRoot.setState({})
    }
  }, [root, isWebGL, WebGLTunnel, DOMTunnel])

  return (
    <CanvasContext.Provider
      value={isWebGL ? { WebGLTunnel, DOMTunnel, isOrtho } : {}}
    >
      {isBooleanAndTrue(isWebGL) && isBooleanAndFalse(isTablet) && (
        <WebGLCanvas className={className} />
      )}
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas: any = () => {
  const local = useContext(CanvasContext)
  const root = useRoot()

  const isLocalDefined = Object.keys(local).length > 0

  return isLocalDefined ? local : root
}
