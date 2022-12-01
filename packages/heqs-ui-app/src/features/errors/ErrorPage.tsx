import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { AppErrorPic } from '../illustrations/AppErrorPic'
import { Flex, Spacer } from '../primitives'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h3">
        <b>Error</b>
      </Typography>
      <Spacer />
      <Typography>Sorry! App has crashed :( We are working on a fix</Typography>
      <Spacer space={60} />
      <AppErrorPic />
      <Spacer />
      <Button size="large" variant="contained" onClick={() => navigate(ROUTES.HOME)}>
        Refresh
      </Button>
    </Flex>
  )
}
