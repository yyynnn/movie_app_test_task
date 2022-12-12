import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Matrix4, Vector3 } from 'three'

import { oscillator } from '../../../utils'
import { Mouse3D } from '../../../utils/Mouse3D'
import { Scene } from '../../common/Scene'
import { Text3dAnimation } from '../../common/Text3dAnimation'

let intensityTransition1 = 0
let intensityTransition2 = 0

const MouseLight = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  const { camera } = useThree()
  const mouse = useMemo(() => new Mouse3D(camera), [camera])

  useEffect(() => {
    return () => mouse.dispose()
  }, [mouse])

  useFrame(({ clock }) => {
    meshRef.current.position.copy(mouse.position.multiplyScalar(1100))

    const time = +clock.elapsedTime.toFixed(2)
    const speed = 1

    const movement = Math.cos(time * speed) * 0.2

    const angle = 360 * movement

    if (meshRef.current) {
      meshRef.current.rotation.z = (Math.PI / 180) * angle
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <meshBasicMaterial />
        <pointLight
          position={[-3.5, 0, 0]}
          intensity={0.5}
          distance={10}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          color="#ff0000"
        />
        <pointLight
          position={[3.5, 0, 0]}
          intensity={0.5}
          distance={10}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          color="#2200ff"
        />
      </mesh>
    </>
  )
}

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

function Dots({ wave: waveValue = 20 }) {
  const ref: any = useRef()

  const { vec, transform, positions, distances } = useMemo(() => {
    const vec = new Vector3()
    const transform = new Matrix4()
    const positions = [...Array(10000)].map((_, i) => {
      const position = new Vector3()
      position.x = (i % 100) - 50
      position.y = Math.floor(i / 100) - 50
      // position.y += (i % 2) * 0.5
      // position.x += Math.random() * 0.3
      // position.y += Math.random() * 0.3
      // position.z += Math.random() * 0.3
      return position
    })

    const right = new Vector3(1, 0, 0)
    const distances = positions.map((pos) => pos.length() + Math.sin(pos.angleTo(right) * 8) * 0.5)
    return { vec, transform, positions, distances }
  }, [])

  useFrame(({ clock }) => {
    for (let i = 0; i < 10000; ++i) {
      const dist = distances[i]
      const t = clock.elapsedTime - dist / 25
      const wave = roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.4, 1 / waveValue)
      vec.copy(positions[i]).multiplyScalar(wave + 0.5)
      transform.setPosition(vec)
      // @ts-nocheck
      if (ref?.current?.setMatrixAt) {
        // @ts-nocheck
        ref.current.setMatrixAt(i, transform)
      }
    }

    if (ref.current.instanceMatrix) {
      ref.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={ref} args={[null, null, 10000]} rotation={[0, 0, (Math.PI / 180) * -45]}>
      <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial attach="material" color={'white'} roughness={0} metalness={0} />
    </instancedMesh>
  )
}

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
      // lightRect1Ref.current.position.x = target.x + goX
      // lightRect1Ref.current.position.z = target.z + goZ

      if (intensityTransition1 < 1) {
        intensityTransition1 = intensityTransition1 + time * 0.001
        lightRect1Ref.current.intensity = intensityTransition1
      }
    }

    if (lightRect2Ref.current) {
      // lightRect2Ref.current.position.x = target.x + goX
      // lightRect2Ref.current.position.z = target.z + goZ

      if (intensityTransition2 < 1) {
        intensityTransition2 = intensityTransition2 + time * 0.007
        lightRect2Ref.current.intensity = intensityTransition2
      }
    }
  })

  return (
    <>
      <group position={[0, 0, -10]}>
        <MouseLight />
        <Dots />
      </group>
      <group position={[-3, 0, 0]}>
        <Text3dAnimation text="Build the" position={[-3, 0, 0]} />
        <Text3dAnimation
          text="statistics"
          color="#1515ff"
          position={[3.4, 0, 0]}
          //  wobble
        />
        <Text3dAnimation
          text="Improve"
          color="#610017"
          position={[-3.7, -1, 0]}
          maxZ={10}
          noLights
        />
        <Text3dAnimation text="your business" position={[1.3, -1, 0]} />
      </group>

      <group position={[-3, 0, 1]} name="thin_text_group">
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
          // wobble
        />
        <Text3dAnimation
          text="Improve"
          color="#FF154D"
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
      {/* 
      <group ref={lightRect1Ref}>
        <rectAreaLight
          visible
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[-5, 0, -10]}
          intensity={1}
          color="#ff0044"
        />
      </group>

      <group ref={lightRect2Ref}>
        <rectAreaLight
          visible={true}
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[5, 0, -10]}
          intensity={1}
          color="#1e00ff"
        />
      </group> */}

      <group>
        <rectAreaLight
          ref={lightRect1Ref}
          visible
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[-10, 0, 0]}
          color="#ff0044"
        />
      </group>

      <group>
        <rectAreaLight
          ref={lightRect2Ref}
          visible={true}
          rotation={[0, (Math.PI / 180) * 180, 0]}
          position={[10, 0, 0]}
          color="#1e00ff"
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
