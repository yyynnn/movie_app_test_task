import { Box } from '@mui/material'
import React from 'react'

import { RFCC } from '../../types/react'

export const ZIndex: RFCC<{ zIndex: number | string; position?: any }> = ({ zIndex, children, position }) => {
  return (
    <Box sx={{ zIndex }} style={{ position: position || 'relative' }}>
      {children}
    </Box>
  )
}
