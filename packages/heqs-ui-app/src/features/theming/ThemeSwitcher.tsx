import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { PaletteMode, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'

import { ColorModeContext } from './BrandingProvider'

export const ThemeSwitcher = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
