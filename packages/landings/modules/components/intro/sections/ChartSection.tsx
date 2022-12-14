import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Matrix4, Vector3 } from 'three'

import { oscillator, randArrayGenerator } from '../../../../utils'
import { Mouse3D } from '../../../../utils/Mouse3D'
import { BarAnimated } from '../../common/BarAnimated'
import { Scene } from '../../common/Scene'
import { Text3dAnimation } from '../../common/Text3dAnimation'

let intensityTransition1 = 0
let intensityTransition2 = 0

const chartData = randArrayGenerator(20)

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export const ChartSection = () => {
  return (
    <Wrapper>
      <Hero>
        <Scene orbit zoom={50}>
          <InnerScene />
        </Scene>
      </Hero>
    </Wrapper>
  )
}

const InnerScene: any = () => {
  const lightRect1Ref = useRef(null)
  const lightRect2Ref = useRef(null)

  useFrame(({ clock }) => {
    const time = +clock.elapsedTime.toFixed(2)
    const target = { x: 0, y: 0, z: 0 }
    const camera_speed = 0.1

    const goX = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 10.39,
      offset: 0.1,
      phase: 0.9,
      funcType: 'sin'
    })
    const goZ = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 10.39,
      offset: 2,
      phase: 0.1,
      funcType: 'cos'
    })

    if (lightRect1Ref.current) {
      if (intensityTransition1 < 1) {
        intensityTransition1 = intensityTransition1 + time * 0.001
        lightRect1Ref.current.intensity = intensityTransition1
      }
    }

    if (lightRect2Ref.current) {
      if (intensityTransition2 < 1) {
        intensityTransition2 = intensityTransition2 + time * 0.007
        lightRect2Ref.current.intensity = intensityTransition2
      }
    }
  })

  return (
    <>
      <group position={[-chartData.length / 2, -2, 0]} name="chart">
        {chartData.map((bar, idx) => {
          const width = 1
          const padding = 0.5
          const positionX = idx + padding * idx

          return (
            <BarAnimated
              key={idx}
              width={width}
              index={idx}
              positionX={positionX}
              value={bar.value}
              color="black"
            />
          )
        })}
      </group>

      <group ref={lightRect1Ref}>
        <rectAreaLight
          visible
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[5, 0, -12]}
          intensity={10}
          castShadow
          color="#ff0044"
        />
      </group>

      <group ref={lightRect2Ref}>
        <rectAreaLight
          visible
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[-5, 0, -12]}
          intensity={20}
          color="#0022ff"
        />
      </group>

      <group position={[0, -3, 25]} rotation={[(Math.PI / 180) * 2, 0, 0]}>
        <Box args={[500, 0.1, 50]}>
          <meshStandardMaterial roughness={0.1} metalness={0} color="white" />
        </Box>
      </group>

      <group position={[0, -255, 0]} rotation={[(Math.PI / 180) * 2, 0, 0]}>
        <Box args={[500, 500, 50]}>
          <meshBasicMaterial color="black" />
        </Box>
      </group>
    </>
  )
}

const Wrapper = styled.div`
  min-height: calc(var(--1svh, 1vh) * 100 - 40px); /* This is the "polyfill" */
  position: relative;
  padding: 0px;
`

const Hero = styled.div``
