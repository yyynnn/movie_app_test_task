/* eslint-disable @typescript-eslint/no-empty-function */
import { CssBaseline, GlobalStyles, PaletteMode } from '@mui/material'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import React from 'react'

import { getDesignTokens, getThemedComponents } from './themes'

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

interface BrandingProviderProps {
  children: React.ReactNode
  /**
   * If not `undefined`, the provider is considered nesting and does not render NextNProgressBar & CssBaseline
   */
  mode?: 'light' | 'dark'
}

export default function BrandingProvider({ children, mode: modeProp }: BrandingProviderProps) {
  const themeModeFromLF: 'light' | 'dark' = (localStorage.getItem('themeMode') as any) || 'dark'
  const [mode, setMode] = React.useState<PaletteMode>(modeProp || themeModeFromLF)

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          localStorage.setItem('themeMode', prevMode === 'light' ? 'dark' : 'light')
          return prevMode === 'light' ? 'dark' : 'light'
        })
      }
    }),
    []
  )

  const theme = React.useMemo(() => {
    const designTokens = getDesignTokens(mode)
    let newTheme = createTheme(designTokens)
    newTheme = deepmerge(newTheme, getThemedComponents(newTheme))
    return newTheme
  }, [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <GlobalStyles
        styles={{
          html: {
            backgroundColor: mode === 'light' ? 'white' : '#001e3c',
            color: mode === 'light' ? '#001e3c' : 'white'
          }
        }}
      />
      <ThemeProvider theme={modeProp ? () => theme : theme}>{children}</ThemeProvider>
      <CssBaseline enableColorScheme />
    </ColorModeContext.Provider>
  )
}

// color-scheme
