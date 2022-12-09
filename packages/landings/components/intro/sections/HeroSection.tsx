import { Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import styled from 'styled-components'

import { oscillator } from '../../../utils'
import { Scene } from '../../common/Scene'
import { Text3dAnimation } from '../../common/Text3dAnimation'

export const HeroSection = () => {
  return (
    <Wrapper>
      <Hero>
        <Scene>
          <InnerScene />
        </Scene>
      </Hero>
    </Wrapper>
  )
}

const InnerScene: any = () => {
  const lightRect1Ref = useRef(null)
  const lightRect2Ref = useRef(null)

  useFrame(({ clock, camera }) => {
    const time = +clock.elapsedTime.toFixed(2)
    const target = { x: 0, y: 0, z: 0 }
    const camera_offset = { x: 1, y: 0.03, z: 1 }
    const camera_speed = 0.05

    const goX = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 1.39,
      offset: 0.1,
      phase: 0.9,
      funcType: 'sin'
    })
    const goZ = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 1.39,
      offset: 2,
      phase: 0.1,
      funcType: 'cos'
    })

    // if (lightRect1Ref.current) {
    //   lightRect1Ref.current.position.x = target.x + goX
    //   lightRect1Ref.current.position.z = target.z + goZ
    // }

    // if (lightRect2Ref.current) {
    //   lightRect2Ref.current.position.x = target.x + goX
    //   lightRect2Ref.current.position.z = target.z + goZ
    // }
  })

  return (
    <>
      <group position={[-3, 0, 0]}>
        <Text3dAnimation text="Build the" position={[-3, 0, 0]} />
        <Text3dAnimation text="statistics" color="#1515ff" position={[3.4, 0, 0]} wobble />
        <Text3dAnimation text="Improve" color="#FF154D" position={[-3.7, -1, 0]} shiftWidth />
        <Text3dAnimation text="your business" position={[1.3, -1, 0]} />
      </group>

      <group position={[-3, 0, 1]}>
        <Text3dAnimation
          text="Build the"
          color="#fff"
          position={[-3, 0, 0]}
          width={0.01}
          noLights
        />
        <Text3dAnimation
          text="statistics"
          color="#4015ff"
          position={[3.4, 0, 0]}
          width={0.01}
          noLights
          wobble
        />
        <Text3dAnimation
          text="Improve"
          color="#FF154D"
          shiftWidth
          position={[-3.7, -1, 0]}
          width={0.01}
          noLights
        />
        <Text3dAnimation
          text="your business"
          color="#fff"
          position={[1.3, -1, 0]}
          width={0.01}
          noLights
        />
      </group>

      <group ref={lightRect2Ref}>
        <rectAreaLight
          visible
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[-5, 0, -5]}
          intensity={1}
          color="#ff0044"
        />
      </group>

      <group ref={lightRect2Ref}>
        <rectAreaLight
          visible={true}
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[5, 0, 0]}
          intensity={1}
          color="#1e00ff"
        />
      </group>

      <group position={[0, -3, -5]}>
        <Box args={[2000, 0.1, 2000]}>
          <meshStandardMaterial roughness={0.1} metalness={0} color="0x808080" />
        </Box>
      </group>

      {/* <spotLight
        position={[-10, 0, 20]}
        power={1}
        intensity={0.55}
        distance={0}
        angle={0.4}
        color={'#ff002f'}
      /> */}
      {/* <spotLight
        position={[10, 0, 20]}
        power={1}
        intensity={0.55}
        distance={0}
        angle={0.4}
        color={'#1500ff'}
      /> */}
    </>
  )
}

const Wrapper = styled.div`
  min-height: calc(var(--1svh, 1vh) * 100 - 40px); /* This is the "polyfill" */
  position: relative;
  padding: 0px;
`

const Hero = styled.div``
