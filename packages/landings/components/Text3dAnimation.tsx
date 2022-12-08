import { Center, Decal, OrbitControls, Text3D, useGLTF, useTexture } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import React from 'react'

import { Scene } from './Scene'

const IS_SERVER = typeof window === 'undefined'

export const Text3dAnimation = () => {
  return (
    <div>
      <Scene>
        {IS_SERVER ? null : (
          <Text3D font={'/ocra.json'}>
            Build the statistics Improve your business
            <meshNormalMaterial />
          </Text3D>
        )}
      </Scene>
    </div>
  )
}
