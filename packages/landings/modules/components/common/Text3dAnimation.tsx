import { Center, Decal, MeshDistortMaterial, MeshWobbleMaterial, Text3D } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

import { RFCC } from '../../../types/react'
import { Scene } from './Scene'

const IS_SERVER = typeof window === 'undefined'

let opacityTransition = 0

export const Text3dAnimation: RFCC<{
  text?: string
  color?: string
  position?: any
  width?: any
  noLights?: boolean
  wobble?: boolean
  dist?: boolean
  scale?: boolean
  maxZ?: number
  shiftWidth?: true
}> = ({
  text,
  color,
  position,
  width,
  maxZ = 1,
  noLights = false,
  wobble = false,
  dist = false,
  scale = false,
  shiftWidth
}) => {
  const textRef = useRef(null)
  const matRef = useRef(null)

  useFrame(({ clock }) => {
    const time = +clock.elapsedTime.toFixed(2)
    const speed = 0.1

    const movement = Math.abs(Math.sin(time * speed)) * 0.1

    if (textRef.current && shiftWidth) {
      textRef.current.scale.z = -100 * movement
      textRef.current.position.z = 1
    }
    if (textRef.current && scale) {
      textRef.current.scale.x = 1 + 1 * movement
      textRef.current.scale.y = 1 + 1 * movement
    }
    if (matRef.current && opacityTransition <= 1) {
      opacityTransition = opacityTransition + time * 0.003
      matRef.current.opacity = opacityTransition
    }
  })

  return IS_SERVER ? null : (
    <Text3D
      ref={textRef}
      height={width || 1}
      letterSpacing={-0.23}
      font={'/ocra.json'}
      castShadow
      receiveShadow
      scale={1}
      position={position || [0, 0, 0]}
    >
      {text || 'text'}

      {wobble ? (
        <MeshWobbleMaterial
          ref={matRef}
          color={color || 'white'}
          emissive={noLights ? color : null}
          speed={1}
          factor={0.2}
          transparent
        />
      ) : (
        <meshStandardMaterial
          ref={matRef}
          attach="material"
          color={color || 'white'}
          emissive={noLights ? color : null}
          roughness={0}
          metalness={0}
          transparent
          opacity={1}
        />
      )}
    </Text3D>
  )
}
