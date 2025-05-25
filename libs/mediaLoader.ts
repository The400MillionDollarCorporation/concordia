import * as THREE from 'three'

export function checkMediaType(url) {
  // Extract base URL (without query parameters)
  const baseUrl = url.split('?')[0]

  // Extract file extension from the base URL
  const fileExtension = baseUrl.split('.').pop().toLowerCase()

  // Define video and image extensions
  const videoExtensions = ['mp4', 'webm', 'ogg']
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']

  // Check if the file extension corresponds to video or image extensions
  if (videoExtensions.includes(fileExtension)) {
    return 'video'
  }

  if (imageExtensions.includes(fileExtension)) {
    return 'image'
  }

  return 'unknown'
}

export const preloadTexture = (url) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader()
    const mediaType = checkMediaType(url)

    if (mediaType === 'video') {
      const video = document.createElement('video')
      video.crossOrigin = 'anonymous'
      video.src = url
      video.onloadeddata = () => {
        resolve(new THREE.VideoTexture(video))
      }
      video.onerror = (error) => {
        reject(error)
      }
    } else {
      loader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error)
      )
    }
  })
}

export const preloadTextures = async (urls, progressCallback) => {
  const totalTextures = urls.length
  let loadedTextures = 0

  if (totalTextures === 0) {
    progressCallback(100)
    // No textures to load, resolve immediately
    return []
  }

  try {
    const loadedTexturesPromises = urls.map(async (url) => {
      const texture: THREE.Texture | any = await preloadTexture(url)
      loadedTextures++
      const overallProgress = (loadedTextures / totalTextures) * 100
      if (progressCallback) {
        progressCallback(overallProgress)
      }
      texture.magFilter = texture.minFilter = THREE.LinearFilter
      return texture
    })

    return Promise.all(loadedTexturesPromises)
  } catch (error) {
    // Handle any loading errors here
    console.error('Error loading textures:', error)
    throw error
  }
}

export const preloadMedia = (src, type) => {
  return new Promise((resolve, reject) => {
    const media =
      type === 'video' ? document.createElement('video') : new Image()

    type === 'video'
      ? (media.onloadeddata = () => resolve(media))
      : (media.onload = () => resolve(media))
    media.onerror = () => reject()

    if (type === 'video') {
      media.src = src
    } else {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', src, true)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        media.src = URL.createObjectURL(xhr.response)
      }
      xhr.onerror = () => reject()
      xhr.send()
    }
  })
}

export const preloadMedias = (resources, progressCallback) => {
  if (resources.length === 0) {
    return Promise.resolve([])
  }

  const totalMedia = resources.length
  let loadedMedia = 0

  const promises = resources.map((url) => {
    return new Promise((resolve, reject) => {
      const mediaType = checkMediaType(url)
      preloadMedia(url, mediaType)
        .then((media) => {
          loadedMedia++
          const overallProgress = (loadedMedia / totalMedia) * 100
          if (progressCallback) {
            progressCallback(overallProgress)
          }
          resolve(media)
        })
        .catch(() => reject())
    })
  })

  return Promise.all(promises)
}
