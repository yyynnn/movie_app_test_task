import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { NotFoundPic } from '../illustrations/NotFoundPic'
import { Flex, Spacer } from '../primitives'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h3">
        <b>Page not found</b>
      </Typography>
      <Spacer space={60} />
      <NotFoundPic />
      <Spacer />
      <Button size="large" variant="contained" onClick={() => navigate(ROUTES.HOME)}>
        Go home
      </Button>
    </Flex>
  )
}
