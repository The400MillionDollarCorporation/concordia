import { useThree } from '@react-three/fiber'
import { useFrame } from '@studio-lumio/hooks'

export function RAF({ render = true }: { render?: boolean }) {
	const { advance } = useThree()

	useFrame((time) => {
		if (render) {
			advance(time / 1000)
		}
	}, 1)

	return null
}
