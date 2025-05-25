import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PostProcessing } from '../postprocessing'
import { Preload } from '../preload'
import { RAF } from '../raf'
import s from './webgl.module.scss'
import cn from '~/libs/cn'
import { useCanvas } from '.'

export function WebGLCanvas({ className = '', render = true, _ref = null }) {
  const { WebGLTunnel, DOMTunnel, isOrtho } = useCanvas()

  return (
    <div id="gl" className={cn(className, s.webgl)}>
      <Canvas
        gl={{
          precision: 'highp',
          powerPreference: 'high-performance',
          antialias: false,
          alpha: true,
        }}
        dpr={[1, 2]}
        orthographic={isOrtho}
        camera={
          isOrtho
            ? {}
            : {
                fov: 90,
                near: 0.1,
                far: 1000,
                position: [0, 0, 1],
                aspect: window.innerWidth / window.innerHeight,
              }
        }
        frameloop="never"
        linear
        flat
        eventSource={document.documentElement}
        eventPrefix="client"
        ref={_ref}
      >
        <Suspense>
          {isOrtho && (
            <OrthographicCamera
              makeDefault
              position={[0, 0, 5000]}
              near={0.001}
              far={10000}
              zoom={1}
            />
          )}
          <RAF render={render} />
          <PostProcessing />
          <WebGLTunnel.Out />
          <Preload />
        </Suspense>
      </Canvas>
      <DOMTunnel.Out />
    </div>
  )
}
