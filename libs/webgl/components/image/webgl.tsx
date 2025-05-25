/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber'
import { useTexture } from 'libs/webgl/hooks/use-texture'
import { usePerspectiveRect } from 'libs/webgl/hooks/use-webgl-rect'
import { useMemo, useRef } from 'react'
import { LinearFilter, Mesh, MeshBasicMaterial, Vector2 } from 'three'

export function WebGLImage({ src, el }: { el: HTMLElement; src: string }) {
	const mesh = useRef<Mesh>(null)
	const bounds = useRef(el.getBoundingClientRect())
	const material = useMemo(() => new MeshBasicMaterial(), [])

	const texture = useTexture(src, (texture) => {
		texture.magFilter = texture.minFilter = LinearFilter
		texture.generateMipmaps = false

		material.map = texture
		material.needsUpdate = true
	})

	const getWebGLRect = usePerspectiveRect(el)

	useFrame(() => {
		bounds.current = el.getBoundingClientRect()
		const { x, y, width, height } = getWebGLRect()

		mesh.current.scale.set(width, height, 1)

		mesh.current.position.y = y
		mesh.current.position.x = x

		// Calculate aspect ratios
		const parentAspectRatio = width / height
		const imageAspectRatio = texture?.image
			? texture.image.width / texture.image.height
			: 1

		let scaleX, scaleY

		if (parentAspectRatio > imageAspectRatio) {
			// Parent is wider than the image
			scaleX = 1
			scaleY = imageAspectRatio / parentAspectRatio
		} else {
			// Parent is taller than the image
			scaleX = parentAspectRatio / imageAspectRatio
			scaleY = 1
		}

		if (material.map) {
			// Adjust the texture's repeat property to match the aspect ratio of the image
			material.map.repeat = new Vector2(scaleX, scaleY)

			// Center the texture by adjusting the offset property
			material.map.offset = new Vector2((1 - scaleX) / 2, (1 - scaleY) / 2)
		}
	})

	return (
		<mesh ref={mesh}>
			<planeGeometry />
			<primitive object={material} />
		</mesh>
	)
}
