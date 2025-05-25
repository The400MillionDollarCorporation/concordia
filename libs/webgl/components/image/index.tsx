import { Image as NextImage } from '~/shared'
import dynamic from 'next/dynamic'
import { useId, useRef, useState } from 'react'
import { useDeviceDetection } from '~/shared/device-detection'
import { useCanvas } from '../canvas'

const WebGLImage = dynamic(
  () => import('./webgl').then(({ WebGLImage }) => WebGLImage),
  {
    ssr: false,
  }
)

export function ThreeImage({ className, imgSrc, ...props }) {
  const [src, setSrc] = useState()
  const elRef = useRef(null)

  const { WebGLTunnel } = useCanvas()

  const { isWebGL } = useDeviceDetection()
  const uuid = useId()

  return (
    <>
      {elRef.current && (
        <WebGLTunnel.In>
          <WebGLImage key={uuid} el={elRef.current} src={src} />
        </WebGLTunnel.In>
      )}
      <div
        className={className}
        style={{
          opacity: src && isWebGL ? 0 : 1,
          position: 'relative',
          pointerEvents: 'none',
        }}
        ref={elRef}
      >
        <NextImage
          {...props}
          fill
          alt={props.alt || ''}
          src={imgSrc}
          onLoad={(img) => {
            setSrc(img.target.currentSrc)
          }}
        />
      </div>
    </>
  )
}
