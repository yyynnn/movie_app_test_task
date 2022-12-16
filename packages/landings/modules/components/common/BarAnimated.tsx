import { Box, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'

import { oscillator } from '../../../utils'

export const BarAnimated = ({ width = 1, value = 1, index = 0, positionX = 0, color }) => {
  const barRef = useRef(null)
  const textRef = useRef(null)
  const [count, setCount] = useState(Math.random())

  const funcType = Math.random() > 0.5 ? 'cos' : 'sin'

  useFrame(({ clock }) => {
    const time = +clock.elapsedTime.toFixed(2)

    const speed = 0.006

    const goY = oscillator({
      time,
      frequency: speed,
      amplitude: 1.39 * index,
      offset: 0.1 / index,
      phase: 0.9,
      funcType
    })

    const scale = Math.abs(goY) / 10

    if (barRef.current) {
      barRef.current.scale.y = scale
      //   barRef.current.scale.z = Math.abs(Math.sin(time)) * 0.2
    }

    // if (textRef.current) {
    //   textRef.current.position.y = scale * 6
    // }
  })

  return (
    <group position={[index === 0 ? 0 : positionX, 0, 0]}>
      <Box ref={barRef} args={[width, value * 10, width]} castShadow receiveShadow>
        <meshStandardMaterial roughness={0} metalness={0} color={color} />
      </Box>
    </group>
  )
}
