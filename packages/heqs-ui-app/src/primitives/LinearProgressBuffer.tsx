import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

let timer: any

export const LinearProgressBuffer = () => {
  const [progress, setProgress] = React.useState(0)
  const [buffer, setBuffer] = React.useState(10)
  const [loaded, setLoaded] = React.useState(false)

  const progressRef: any = React.useRef(() => {
    return null
  })

  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 70) {
        clearInterval(timer)
        setLoaded(true)
      } else {
        const diff = Math.random() * 100
        const diff2 = Math.random() * 100
        setProgress(progress + diff)
        setBuffer(progress + diff + diff2)
      }
    }
  })

  React.useEffect(() => {
    timer = setInterval(() => {
      progressRef.current()
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return loaded ? null : (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} />
    </Box>
  )
}
