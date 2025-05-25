/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Mesh, Group } from 'three'

export const ImageLoader = ({ mesh }) => {
  const dots = useRef<Group>()
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current && mesh.current && dots.current) {
      meshRef.current.position.copy(mesh.current.position)
      meshRef.current.scale.copy(mesh.current.scale)
      dots.current.position.copy(mesh.current.position)
    }
  })

  return (
    <Suspense fallback={null}>
      <group>
        <group ref={dots}>
          <Dot position={[-0.02, 0, 0]} delay={0} />
          <Dot position={[0, 0, 0]} delay={0.2} />
          <Dot position={[0.02, 0, 0]} delay={0.4} />
        </group>

        <mesh ref={meshRef}>
          <planeGeometry args={[1, 1, 1, 1]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>
      </group>
    </Suspense>
  )
}

const Dot = ({ position, delay }) => {
  const dotRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (dotRef.current) {
      const time = clock.elapsedTime * 1.5 + delay
      dotRef.current.material['opacity'] =
        (Math.sin(time * 2 + (Math.PI * position[0]) / 3) + 1) / 2
    }
  })

  return (
    <mesh ref={dotRef} position={position}>
      <sphereGeometry args={[0.005, 10, 10]} />
      <meshBasicMaterial color={0xffffff} transparent opacity={0} />
    </mesh>
  )
}
