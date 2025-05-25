import { useEffectOnce } from '@studio-lumio/hooks'
import { useState } from 'react'

export const useAvif = ({ setState }: any) => {
	const [avifSupport, setAvifSupport] = useState(true)

	const checkAvifSupport = async () => {
		const avifImage = new Image()
		avifImage.src =
			'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
		const supported: boolean = await new Promise((resolve) => {
			avifImage.onload = () => resolve(true)
			avifImage.onerror = () => resolve(false)
		})
		setState(supported)
		setAvifSupport(supported)
	}

	useEffectOnce(() => {
		checkAvifSupport()
	})

	return { avifSupport }
}
