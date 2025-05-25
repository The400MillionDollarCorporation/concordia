'use client'

import NextImage from 'next/image'
import s from './Image.module.scss'
import { useState } from 'react'
import { useStore } from '~/libs/store'
import cn from '~/libs/cn'
import { getImageUrl } from '~/libs/contentful/api'

declare type SafeNumber = number | `${number}`
type imageType = {
  [x: string]: any
  className?: any
  style?: any
  priority?: boolean
  unoptimized?: boolean
  quality?: SafeNumber
  loading?: 'eager' | 'lazy'
  width?: SafeNumber
  height?: SafeNumber
  alt: string
  src: string
  preload?: boolean
}

export function Image({
  className,
  width,
  height,
  priority = false,
  preload = false,
  unoptimized = false,
  style = {},
  loading = 'lazy',
  quality = 100,
  alt = '',
  src,
  ...props
}: imageType) {
  const [loadingComplete, setLoadingComplete] = useState(false)

  const w = Math.floor(Number(width))
  const h = Math.floor(Number(height))
  const avifSupport = useStore(({ avifSupport }) => avifSupport)
  const url = src.includes('ctfassets')
    ? getImageUrl(src, avifSupport, w * 2, h * 2, Number(quality))
    : src

  return preload ? (
    <div
      className={cn(s.image, className)}
      style={{ ...style, '--width': width, '--height': height }}
    >
      {preload && !loadingComplete && (
        <div className={s['image-loading']}>
          <span></span>
        </div>
      )}

      <NextImage
        fill
        {...props}
        unoptimized={unoptimized}
        priority={priority}
        loading={priority ? 'eager' : loading}
        onLoad={() => setLoadingComplete(true)}
        draggable="false"
        quality={quality}
        alt={alt}
        src={url}
      />
    </div>
  ) : (
    <NextImage
      {...props}
      unoptimized={unoptimized}
      priority={priority}
      loading={priority ? 'eager' : loading}
      className={cn(s.img, className)}
      draggable="false"
      width={width}
      height={height}
      style={{ ...style, '--width': width, '--height': height }}
      quality={quality}
      alt={alt}
      src={url}
    />
  )
}
