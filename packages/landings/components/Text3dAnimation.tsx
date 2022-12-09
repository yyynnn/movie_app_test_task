import {
  Center,
  Decal,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  Text3D,
  useGLTF,
  useTexture
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

import { RFCC } from '../types/react'
import { Scene } from './Scene'

const IS_SERVER = typeof window === 'undefined'

export const Text3dAnimation: RFCC<{
  text?: string
  color?: string
  position?: any
  width?: any
  noLights?: boolean
  wobble?: boolean
  dist?: boolean
  shiftWidth?: true
}> = ({
  text,
  color,
  position,
  width,
  noLights = false,
  wobble = false,
  dist = false,
  shiftWidth
}) => {
  const textRef = useRef(null)

  useFrame(({ clock, camera }) => {
    const time = +clock.elapsedTime.toFixed(2)
    const speed = 1

    const movement = Math.sin(time * speed) * 0.1

    if (textRef.current && shiftWidth) {
      textRef.current.position.z = (textRef.current.position.z + 1) * movement
      // textRef.current.scale.z = textRef.current.scale.z * movement
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
          color={color || 'white'}
          emissive={noLights ? color : null}
          speed={1}
          factor={0.2}
        />
      ) : dist ? (
        <MeshDistortMaterial
          color={color || 'white'}
          emissive={noLights ? color : null}
          speed={1}
          distort={0.3}
          radius={1}
        />
      ) : (
        <meshStandardMaterial
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
