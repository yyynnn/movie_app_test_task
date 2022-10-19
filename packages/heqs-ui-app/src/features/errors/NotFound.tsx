import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Spacer } from '../../primitives'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Typography variant="h3">
        <b>Page not found</b>
      </Typography>
      <Spacer />
      <Button variant="contained" onClick={() => navigate(ROUTES.HOME)}>
        Go home
      </Button>
    </div>
  )
}
