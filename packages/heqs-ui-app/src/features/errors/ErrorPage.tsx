import { Alert, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-grid-system'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { AppErrorPic } from '../illustrations/AppErrorPic'
import { Absolute, Flex, Max, Pad, Spacer } from '../primitives'

export const ErrorPage = (props: any) => {
  const navigate = useNavigate()

  return (
    <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h3">
        <b>Critical Error</b>
      </Typography>
      <Spacer />
      <Typography>Sorry! App has crashed :(</Typography>
      <Typography>We are working on a fix.</Typography>

      <Typography color="text">Error stack:</Typography>
      <Spacer />

      <Row>
        <Col>
          <Alert severity="error">{props?.error?.stack}</Alert>
        </Col>
      </Row>

      <Spacer />
      <Button
        size="large"
        variant="contained"
        onClick={() => {
          props?.resetErrorBoundary()
        }}
      >
        Refresh
      </Button>
    </Flex>
  )
}
