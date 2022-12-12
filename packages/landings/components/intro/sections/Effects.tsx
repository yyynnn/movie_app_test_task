import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

extend({ EffectComposer, ShaderPass, SavePass, RenderPass })

// Shader that composites the r,g,b channels of 3 textures, respectively
const triColorMix = {
  uniforms: {
    tDiffuse1: { value: null },
    tDiffuse2: { value: null },
    tDiffuse3: { value: null }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tDiffuse1;
    uniform sampler2D tDiffuse2;
    uniform sampler2D tDiffuse3;
    
    void main() {
      vec4 del0 = texture2D(tDiffuse1, vUv);
      vec4 del1 = texture2D(tDiffuse2, vUv);
      vec4 del2 = texture2D(tDiffuse3, vUv);
      float alpha = min(min(del0.a, del1.a), del2.a);
      gl_FragColor = vec4(del0.r, del1.g, del2.b, alpha);
    }
  `
}

export function Effects() {
  const composer = useRef()
  const savePass = useRef()
  const blendPass = useRef()
  const swap = useRef(false) // Whether to swap the delay buffers
  const { scene, gl, size, camera } = useThree()
  const { rtA, rtB } = useMemo(() => {
    const rtA = new THREE.WebGLRenderTarget(size.width, size.height)
    const rtB = new THREE.WebGLRenderTarget(size.width, size.height)
    return { rtA, rtB }
  }, [size])
  // eslint-disable-next-line no-void
  //   useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => {
    // Swap render targets and update dependencies
    const delay1 = swap.current ? rtB : rtA
    const delay2 = swap.current ? rtA : rtB
    // @ts-ignore
    if (savePass?.current?.renderTarget) {
      // @ts-ignore
      savePass.current.renderTarget = delay2
    }
    // @ts-ignore
    if (blendPass.current.uniforms) {
      // @ts-ignore
      blendPass.current.uniforms.tDiffuse2.value = delay1.texture
      // @ts-ignore
      blendPass.current.uniforms.tDiffuse3.value = delay2.texture
    }

    swap.current = !swap.current

    // @ts-ignore
    if (composer.current) {
      // @ts-ignore
      composer.current.render()
    }
  }, 1)
  const pixelRatio = gl.getPixelRatio()

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attach="passes" scene={scene} camera={camera} />
      <shaderPass
        attach="passes"
        ref={blendPass}
        args={[triColorMix, 'tDiffuse1']}
        needsSwap={false}
      />
      {/* <savePass attachArray="passes" ref={savePass} needsSwap={true} /> */}
      <shaderPass
        attach="passes"
        args={[FXAAShader]}
        uniforms-resolution-value-x={1 / (size.width * pixelRatio)}
        uniforms-resolution-value-y={1 / (size.height * pixelRatio)}
      />
      <shaderPass attach="passes" args={[CopyShader]} />
    </effectComposer>
  )
}
