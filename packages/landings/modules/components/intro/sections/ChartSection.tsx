import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { MathUtils, Matrix4, Vector3 } from 'three'

import { oscillator, randArrayGenerator } from '../../../../utils'
import { Mouse3D } from '../../../../utils/Mouse3D'
import { Absolute } from '../../../kit/Absolute'
import { Max } from '../../../kit/Max'
import { Text } from '../../../kit/Text'
import { ZIndex } from '../../../kit/ZIndex'
import { BarAnimated } from '../../common/BarAnimated'
import { GradientEdge } from '../../common/GradientEdge'
import { Scene } from '../../common/Scene'
import { Text3dAnimation } from '../../common/Text3dAnimation'

const chartData = randArrayGenerator(40)
let intensityTransition1 = 0
let intensityTransition2 = 0

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export const ChartSection = () => {
  return (
    <Wrapper>
      <div>
        <Absolute justifyContent="center" alignItems="center" style={{ zIndex: 1, margin: 'auto' }}>
          <Max maxWidth={900} justifyContent="center" alignItems="center">
            <Text size={44} center spacing={'0px'}>
              Quality, Health&Safety and Environment related statistics from your operations is
              being analyzed by HEQS in a quick and reliable way.
            </Text>
          </Max>
        </Absolute>
        <div style={{ opacity: 0.9 }}>
          <Scene zoom={20} camPosition={[10, 100, 1000]}>
            <InnerScene />
          </Scene>
        </div>
      </div>
      <GradientEdge toTop />
    </Wrapper>
  )
}

const InnerScene: any = () => {
  const lightRect1Ref = useRef(null)
  const lightRect2Ref = useRef(null)
  const lightsRef = useRef(null)

  useFrame(({ clock, camera }) => {
    const time = +clock.elapsedTime.toFixed(2)
    const speed = 0.1
    const movement = Math.cos(time * speed) * 0.07
    const angle = 360 * movement
    const camera_speed = 0.01

    const goX = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 0.9,
      offset: -0.7,
      phase: 0.9,
      funcType: 'cos'
    })
    const goZ = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 0.19,
      offset: -0.7,
      phase: 0.1,
      funcType: 'sin'
    })
    const target = { x: 5, y: 0, z: 0 }
    const camera_offset = { x: 10, y: 0.2, z: 10 }

    camera.position.x = target.x + goX
    camera.position.z = target.z + goZ
    camera.position.y = target.y + camera_offset.y
    camera.lookAt(target.x, target.y, target.z)
    const zoomMult = window.innerWidth / 1280
    camera.zoom = MathUtils.lerp(camera.zoom, zoomMult * 30, 0.01)
    camera.updateProjectionMatrix()

    if (lightRect1Ref.current) {
      if (intensityTransition1 < 30) {
        intensityTransition1 = intensityTransition1 + time * 0.01
        lightRect1Ref.current.intensity = intensityTransition1
      }
    }

    if (lightRect2Ref.current) {
      if (intensityTransition2 < 30) {
        intensityTransition2 = intensityTransition2 + time * 0.01
        lightRect2Ref.current.intensity = intensityTransition2
      }
    }
  })

  return (
    <>
      <group position={[-chartData.length / 2, -2, 0]} name="chart_red">
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
              color="#fff"
            />
          )
        })}
      </group>

      <group>
        <rectAreaLight
          visible
          ref={lightRect1Ref}
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[20, 0, -40]}
          intensity={30}
          color="#ff0044"
        />
        <rectAreaLight
          visible
          ref={lightRect2Ref}
          rotation={[0, (Math.PI / 180) * 0, 0]}
          position={[-20, 0, 10]}
          intensity={50}
          color="#0022ff"
        />
      </group>

      <group position={[0, -2.1, -249.5]} rotation={[0, 0, 0]}>
        <Box args={[500, 0.01, 500]}>
          <meshStandardMaterial
            roughness={0}
            metalness={0}
            color="white"
            transparent
            opacity={0.8}
          />
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
