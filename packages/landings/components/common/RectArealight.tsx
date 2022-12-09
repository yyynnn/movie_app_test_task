import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { RectAreaLight } from 'three'
import { RectAreaLightHelper, RectAreaLightUniformsLib } from 'three-stdlib'

export const RectArealight = ({ position = [0, 0, 0], color = 'white', showHelper = false }) => {
  const { scene } = useThree()

  // This somehow changes the texture of the ground-plane and makes it more shiny? Very interesting
  RectAreaLightUniformsLib.init()

  const rectLight = new RectAreaLight(color, 1, 4, 6)

  rectLight.position.set(position[0], position[1], position[2])
  rectLight.rotation.set(0, (Math.PI / 180) * 180, 0)
  const helper = showHelper ? new RectAreaLightHelper(rectLight, color) : null

  useEffect(() => {
    scene.add(rectLight)
    showHelper && scene.add(helper)

    return () => {
      scene.remove(rectLight)
      showHelper && scene.remove(helper)
    }
  }, [])

  return null

  // ### BUG REPORT for using RectAreaLightHelper through useHelper ###
  // This is the way the drei docs would suggest using the RectAreaLightHelper, as I understand:
  //
  //    const rectAreaLight = useRef();
  //    useHelper(rectAreaLight, RectAreaLightHelper);
  //    return (
  //    <rectAreaLight
  //     ref={rectAreaLight}
  //     position={[-5, 5, 15]}
  //     width={4}
  //     height={10}
  //     color={"red"}
  //     intensity={5}
  // />
  // );

  // If I do it like this, Chrome throws an error:
  // > useHelper.js:24 Uncaught TypeError: helper.current.update is not a function
  //
  // This makes sense, as the RectAreaLightHelper class as defined in
  // Unfortunately, it doesn't map on to the actual the rectAreLight object and instead
  // seems to be stuck at around [0, 0, 0] in space.
  // (I wish I could fix this, but I don't even know where to start.)
}
