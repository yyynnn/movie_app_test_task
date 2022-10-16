import { Spacer } from '@heqs/uikit'
import { Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/AuthProvider'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string

    auth.signin(username, () => {
      navigate(from, { replace: true })
    })
  }

  return (
    <div>
      {from && <p>You must log in to view the page at {from}</p>}

      <Paper>
        <form onSubmit={handleSubmit}>
          <Typography variant="h2">
            <b>Sign in to your account</b>
          </Typography>
          <Spacer />
          <div>
            <TextField name="login" label="Login" variant="outlined" />
            <Spacer />
            <TextField name="password" label="Password" variant="outlined" type="password" autoComplete="current-password" />
          </div>
          {/* <label>
            Username: <input name="username" type="text" />
          </label>{' '}
          <button type="submit">Login</button> */}
        </form>
      </Paper>
    </div>
  )
}
