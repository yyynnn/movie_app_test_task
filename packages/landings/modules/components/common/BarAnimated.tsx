import { Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

import { oscillator } from '../../../utils'

export const BarAnimated = ({ width = 1, value = 1, index = 0, positionX = 0, color }) => {
  const barRef = useRef(null)

  const funcType = Math.random() > 0.5 ? 'cos' : 'sin'

  useFrame(({ clock }) => {
    const time = +clock.elapsedTime.toFixed(2)

    const speed = 0.01

    const goY = oscillator({
      time,
      frequency: speed,
      amplitude: 1.39 * index,
      offset: 0.1 / index,
      phase: 0.9,
      funcType
    })

    if (barRef.current) {
      const scale = Math.abs(goY) / 10
      barRef.current.scale.y = scale
    }
  })
  return (
    <Box
      ref={barRef}
      args={[width, value * 10, width]}
      position={[index === 0 ? 0 : positionX, 0, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial roughness={0} metalness={0} color={color} />
    </Box>
  )
}
