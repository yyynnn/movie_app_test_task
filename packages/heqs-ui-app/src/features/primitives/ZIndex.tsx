import { Box } from '@mui/material'
import React from 'react'

export const ZIndex: React.FC<{ zIndex: number | string; position?: any }> = ({
  zIndex,
  children,
  position
}) => {
  return (
    <Box sx={{ zIndex }} style={{ position: position || 'relative' }}>
      {children}
    </Box>
  )
}
