import styled from '@emotion/styled'
import { Flex, Spacer } from '@heqs/uikit'
import { Alert, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { useAuth } from '../auth/AuthProvider'
import { Logo } from '../navigation/Logo'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const [formError, setFormError] = useState(false)

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (username && password) {
      auth.signin(username, () => {
        navigate(from, { replace: true })
      })
    } else {
      setFormError(true)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {auth.token ? (
        <Flex flexDirection="column">
          <Typography variant="h3">
            <b>Already logged in</b>
          </Typography>
          <Spacer />
          <Link to={ROUTES.HOME}>
            <Button variant="contained">HOME</Button>
          </Link>
        </Flex>
      ) : (
        <Flex flexDirection="column" alignItems="center" justifyContent="center">
          <Logo />
          <Spacer />
          <Typography variant="h2" textAlign="center">
            <b>Hi there!</b>
            <br />
            <b>Sign in to your account</b>
          </Typography>
          <Spacer />

          <TextField name="username" label="Username/login" variant="outlined" fullWidth autoComplete="username" required />
          <Spacer />
          <TextField name="password" label="Password" variant="outlined" type="password" autoComplete="current-password" fullWidth required />
          <Spacer space={4} />
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
            <Link to={ROUTES.FORGOT_PASSWORD}>I forgot password</Link>
          </Flex>
          <Spacer space={20} />
          <Button variant="contained" fullWidth size="large" type="submit">
            LOGIN
          </Button>
          <Spacer />
          <Flex>
            {formError && (
              <Alert variant="filled" severity="error">
                Wrong login and/or password
              </Alert>
            )}
          </Flex>
        </Flex>
      )}
    </Form>
  )
}

const Form = styled.form`
  max-width: 380px;
  width: 100%;
  margin: 0 auto;
`
