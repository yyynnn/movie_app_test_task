import styled from '@emotion/styled'
import { Alert, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Flex, Spacer } from '../primitives'
import { useAuth } from '../auth/AuthProvider'
import { Logo } from '../navigation/Logo'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const [formError, setFormError] = useState(false)

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string

    if (username) {
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
            <b>That is unfortunate :(</b>
            <br />
            <b>Let&apos;s reset your password</b>
          </Typography>
          <Spacer />

          <TextField name="username" label="Username/login" variant="outlined" fullWidth autoComplete="username" required />

          <Spacer space={20} />
          <Button variant="contained" fullWidth size="large" type="submit">
            RESET PASSWORD
          </Button>
          <Spacer />
          <Button color="secondary" variant="contained" fullWidth size="large" type="submit" onClick={() => navigate(ROUTES.LOGIN)}>
            GO BACK
          </Button>
          <Flex>
            {formError && (
              <Alert variant="filled" severity="error">
                Wrong login
              </Alert>
            )}
          </Flex>
        </Flex>
      )}
    </Form>
  )
}

const Form = styled.form`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
`
