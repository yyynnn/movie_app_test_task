import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { MathUtils, Matrix4, Vector3 } from 'three'

import { oscillator, randArrayGenerator } from '../../../../utils'
import { Mouse3D } from '../../../../utils/Mouse3D'
import { BarAnimated } from '../../common/BarAnimated'
import { Scene } from '../../common/Scene'
import { Text3dAnimation } from '../../common/Text3dAnimation'

const chartData = randArrayGenerator(20)

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export const ChartSection = () => {
  return (
    <Wrapper>
      <Hero>
        <Scene zoom={20} camPosition={[10, 100, 1000]}>
          <InnerScene />
        </Scene>
      </Hero>
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
    const camera_speed = 0.05

    const goX = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 0.9,
      offset: 0.1,
      phase: 0.9,
      funcType: 'cos'
    })
    const goZ = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 0.19,
      offset: 1,
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
    camera.zoom = MathUtils.lerp(camera.zoom, zoomMult * 40, 0.01)
    camera.updateProjectionMatrix()

    // if (lightsRef.current) {
    //   lightsRef.current.position.x = (Math.PI / 180) * angle * goX
    // }
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
              color="#ff0044"
            />
          )
        })}
      </group>

      <group position={[-chartData.length / 2 + 0.5, -2, 1]} name="chart_blue">
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
              color="#0022ff"
            />
          )
        })}
      </group>

      {/* <mesh ref={lightsRef}>
        <pointLight position={[-3.5, 0, 0]} intensity={0.5} distance={100} color="#ff0000" />
        <pointLight position={[3.5, 0, 0]} intensity={0.5} distance={100} color="#2200ff" />
      </mesh> */}

      <group>
        <rectAreaLight
          visible
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[5, 0, -10]}
          intensity={20}
          color="#ff0044"
        />
        <rectAreaLight
          visible
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[-5, 0, -10]}
          intensity={20}
          color="#0022ff"
        />
      </group>

      <group position={[0, -2.1, 25]} rotation={[(Math.PI / 180) * 0, 0, 0]}>
        <Box args={[500, 0.01, 50]}>
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

const Hero = styled.div``
