import { type DependencyList, type EffectCallback, useEffect, useRef } from 'react'

/**
 * `React.useEffect` that will not run on the first render.
 *
 * @param effect the effect to execute
 * @param deps the dependency list
 */
const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      return effect()
    }
  }, deps)
}

export default useUpdateEffect
