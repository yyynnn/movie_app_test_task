import { OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import styled from 'styled-components'
import { MathUtils } from 'three'

import { oscillator } from '../../../utils'

export function Scene({ children, orbit = false, zoom = 100, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Wrapper>
      <Canvas
        orthographic
        shadows
        camera={{
          zoom,
          near: -100,
          far: 2000,
          position: [-45, 9, 100]
        }}
      >
        <InnerScene orbit={orbit}>
          {children}
          <Preload all />
          {orbit && <OrbitControls />}
        </InnerScene>
      </Canvas>
    </Wrapper>
  )
}

const InnerScene: any = ({ children, orbit }) => {
  useFrame(({ clock, camera }) => {
    const time = +clock.elapsedTime.toFixed(2)
    const target = { x: 0, y: 0, z: 0 }
    const camera_offset = { x: 1, y: 0.05, z: 1 }
    const camera_speed = 0.05

    const goX = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 0.39,
      offset: 0.1,
      phase: 0.9,
      funcType: 'sin'
    })
    const goZ = oscillator({
      time,
      frequency: camera_speed,
      amplitude: 0.39,
      offset: 2,
      phase: 0.1,
      funcType: 'cos'
    })

    if (!orbit) {
      const zoomMult = window.innerWidth / 1280
      camera.zoom = MathUtils.lerp(camera.zoom, zoomMult * 80, 0.1)
      camera.updateProjectionMatrix()

      camera.position.x = target.x + goX
      camera.position.z = target.z + goZ
      camera.position.y = target.y + camera_offset.y
      camera.lookAt(target.x, target.y, target.z)
    }
  })
  return children
}

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(var(--1svh, 1vh) * 100 - 40px);

  * > div {
    height: calc(var(--1svh, 1vh) * 100 - 40px) !important;
  }
`
