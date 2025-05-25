import { useEffect, useRef, useState } from 'react'
import {
  DefaultLoadingManager,
  TextureLoader,
  Texture,
  VideoTexture,
  LinearFilter,
} from 'three'
import { useThree } from '@react-three/fiber'
import { checkMediaType } from '~/libs/mediaLoader'

const textureLoader = new TextureLoader()

export function useTextureLoader(src: string, isVideo = false) {
  const [texture, setTexture] = useState<Texture | VideoTexture | null>(null)
  const [textureLoaded, setTextureLoaded] = useState(false)

  useEffect(() => {
    const loadImageTexture = (image: HTMLImageElement) => {
      const loadedTexture = new Texture(image)
      loadedTexture.needsUpdate = true
      loadedTexture.magFilter = loadedTexture.minFilter = LinearFilter
      loadedTexture.generateMipmaps = false
      setTexture(loadedTexture)
      setTextureLoaded(true)
    }

    const loadVideoTexture = async (video: HTMLVideoElement) => {
      video.loop = true
      video.muted = true
      video.autoplay = true
      video.crossOrigin = 'anonymous'
      video.src = src
      video.preload = 'auto'

      await video.play()

      const loadedTexture = new VideoTexture(video)
      loadedTexture.magFilter = loadedTexture.minFilter = LinearFilter
      loadedTexture.generateMipmaps = false
      setTexture(loadedTexture)
      setTextureLoaded(true)
    }

    const loadTexture = () => {
      if (!isVideo) {
        const image = new Image()
        image.crossOrigin = ''
        image.onload = () => loadImageTexture(image)
        image.src = src
      } else {
        const video = document.createElement('video')
        loadVideoTexture(video).catch((error) => {
          console.error('Error playing video:', error)
        })
      }
    }

    loadTexture()
  }, [src, isVideo])

  useEffect(() => {
    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [texture])

  return { texture, textureLoaded }
}

export function useTexturesLoader(src) {
  const gl = useThree(({ gl }) => gl)
  const isArray = Array.isArray(src)
  const [textures, setTextures] = useState(isArray ? [] : undefined)
  const [texturesLoaded, setTexturesLoaded] = useState(false)
  const textureRefs = useRef([])

  const handleTextureLoad = (texture, index, srcs) => {
    textureRefs.current[index] = texture
    const loadedTextures = textureRefs.current.filter(
      (v) => v.isTexture || v instanceof VideoTexture
    )
    if (loadedTextures.length === srcs.length) {
      setTextures(loadedTextures)
      setTexturesLoaded(true)
      loadedTextures.forEach((texture) => {
        gl.initTexture(texture)
        DefaultLoadingManager.itemEnd(srcs[index])
      })
    }
  }

  useEffect(() => {
    if (!src) return

    const srcs = [src].flat()

    srcs.forEach((src, i) => {
      DefaultLoadingManager.itemStart(src)

      if (checkMediaType(src) === 'image') {
        textureLoader.load(src, (texture) => {
          handleTextureLoad(texture, i, srcs)
        })
      } else {
        const video = document.createElement('video')
        video.loop = true
        video.muted = true
        video.autoplay = true
        video.crossOrigin = 'anonymous'
        video.src = src
        video.preload = 'auto'

        video.play()

        const videoTexture = new VideoTexture(video)
        videoTexture.magFilter = videoTexture.minFilter = LinearFilter
        videoTexture.generateMipmaps = false

        handleTextureLoad(videoTexture, i, srcs)
      }
    })
  }, [src])

  useEffect(() => {
    return () => {
      textures.forEach((texture) => {
        texture.dispose()
      })
    }
  }, [textures])

  return { textures, texturesLoaded }
}
