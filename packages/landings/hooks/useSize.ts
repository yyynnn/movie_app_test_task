import { useCallback, useEffect, useState } from 'react'
import { getDocument, getWindow } from 'ssr-window'

const window = getWindow()

export const useResize = (myRef) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [inited, setInited] = useState(false)

  const handleResize = useCallback(() => {
    setWidth(myRef?.current?.offsetWidth)
    setHeight(myRef?.current?.offsetHeight)
  }, [myRef])

  useEffect(() => {
    if (!inited) {
      if (myRef.current?.offsetWidth) {
        setWidth(myRef.current.offsetWidth)
        setInited(true)
      }
      if (myRef.current?.offsetHeight) {
        setHeight(myRef.current.offsetHeight)
      }
    }
  }, [myRef])

  useEffect(() => {
    window.addEventListener('load', handleResize)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [myRef, handleResize])

  return { width, height }
}
