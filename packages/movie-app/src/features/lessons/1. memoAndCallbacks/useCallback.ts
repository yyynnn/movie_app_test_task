const prevState = {
  callback: null,
  deps: null
}

export function useCallback(callback: any, deps: any) {
  if (!prevState.deps || !deps) {
    prevState.callback = callback
    prevState.deps = deps

    return callback
  }

  if (shallowEqual(deps, prevState.deps)) {
    return prevState.callback
  }

  prevState.callback = callback
  prevState.deps = deps

  return callback
}

const shallowEqual = (a: any, b: any) => {
  if (a === b) {
    return true
  }

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(b, keysA[i]) || a[keysA[i]] !== b[keysA[i]]) {
      return false
    }
  }

  return true
}

const deepEqual = (a: any, b: any) => {
  if (a === b) {
    return true
  }

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(b, keysA[i]) ||
      !deepEqual(a[keysA[i]], b[keysA[i]])
    ) {
      return false
    }
  }

  return true
}
