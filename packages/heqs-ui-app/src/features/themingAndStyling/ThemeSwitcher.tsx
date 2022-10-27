import { css, Global } from '@emotion/react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React, { useEffect } from 'react'

import { ColorModeContext } from './BrandingProvider'

export const ThemeSwitcher = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  // useEffect(() => {}, [theme.palette.mode])

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      <Global
        styles={css`
          body {
            color-scheme: ${theme.palette.mode};
          }
        `}
      />
    </IconButton>
  )
}

// color-scheme
