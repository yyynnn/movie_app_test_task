import { AppBar } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import { useAuth } from '../auth/AuthProvider'
import { ThemeSwitcher } from '../theming/ThemeSwitcher'

export const GlobalLayout = () => {
  const auth = useAuth()
  return (
    <div>
      <ThemeSwitcher />
      {!!auth.user && <AppBar />}
      <Outlet />
    </div>
  )
}
