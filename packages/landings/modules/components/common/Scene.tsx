import { AdaptiveDpr, AdaptiveEvents, OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import styled from 'styled-components'
import { MathUtils, WebGLBufferRenderer, WebGLRenderer } from 'three'

import { oscillator } from '../../../utils'

export function Scene({
  children,
  orbit = false,
  zoom = 100,
  orthographic = true,
  camPosition,
  ...props
}) {
  return (
    <Wrapper>
      <Canvas
        orthographic={orthographic}
        shadows
        // frameloop="demand"
        gl={(canvas) => new WebGLRenderer({ canvas, antialias: false })}
        dpr={[1, 2]}
        camera={{
          zoom,
          near: -100,
          far: 2000,
          position: camPosition
        }}
      >
        <InnerScene orbit={orbit}>
          {children}
          <Preload all />
          {orbit && <OrbitControls />}
        </InnerScene>
        <AdaptiveDpr />
        <AdaptiveEvents />
      </Canvas>
    </Wrapper>
  )
}

const InnerScene: any = ({ children, orbit }) => {
  // useFrame(({ clock, camera }) => {
  //   const time = +clock.elapsedTime.toFixed(2)

  //   if (!orbit) {
  //     const zoomMult = window.innerWidth / 1280
  //     camera.zoom = MathUtils.lerp(camera.zoom, zoomMult * 80, 0.1)
  //     camera.updateProjectionMatrix()
  //   }
  // })
  return children
}

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(var(--1svh, 1vh) * 100 - 40px);

  * > div {
    height: calc(var(--1svh, 1vh) * 100 - 40px) !important;
  }
`
