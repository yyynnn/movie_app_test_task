import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Flex, Spacer } from '../../primitives'
import { SuccessPic } from '../illustrations/SuccessPic'

export const TicketSuccess = () => {
  const navigate = useNavigate()

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h3">
        <b>Ticket successfully registred!</b>
      </Typography>
      <Spacer space={60} />
      <SuccessPic />
      <Spacer />
      <Button size="large" variant="contained" onClick={() => navigate(ROUTES.HOME)}>
        Go home
      </Button>
    </Flex>
  )
}
