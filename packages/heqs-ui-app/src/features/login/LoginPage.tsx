import styled from '@emotion/styled'
import { Alert, Button, Checkbox, CircularProgress, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { useLogin } from '../api/generated/endpoints'
import { useAuth } from '../auth/AuthProvider'
import { Flex, Spacer } from '../primitives'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const methods = useForm({ reValidateMode: 'onSubmit' })
  const { handleSubmit, setError, formState, getValues, register, control, clearErrors, trigger } = methods
  const formValues = getValues()
  const errors = formState.errors

  const { mutate, isLoading } = useLogin({
    mutation: {
      onSuccess: ({ data }) => {
        const formValues = getValues()
        auth.signin({ token: data.token, rememberMe: formValues.rememberMe, user: data.user }, () => {
          navigate(from, { replace: true })
        })
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.errors?.[0]

        if (error.response?.status === 422) {
          setError('network', {
            type: 'server',
            message: errorMessage || 'Networ error'
          })
        } else {
          setError('email', {
            type: 'server',
            message: 'Wrong email'
          })
          setError('password', {
            type: 'server',
            message: 'Wrong password'
          })
        }
      }
    }
  })

  const from = location.state?.from?.pathname || '/'

  function onSubmit(data: FieldValues) {
    mutate({
      data
    })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onChange={(e) => {
        console.log('🐸 Pepe said => LoginPage => e', e)
        clearErrors()
      }}
      onBlur={(e) => {
        console.log('🐸 Pepe said => LoginPage => e', e)
        clearErrors()
      }}
    >
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
          <Spacer />
          <Typography variant="h2" textAlign="center">
            <b>Hi there!</b>
            <br />
            <b>Sign in to your account</b>
          </Typography>
          <Spacer />

          <TextField {...register('email', { required: 'Fill out email' })} label="E-mail" variant="outlined" fullWidth autoComplete="email" error={!!errors.email} />
          <Spacer />
          <TextField
            {...register('password', { required: 'Fill out password' })}
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            fullWidth
            error={!!errors.password}
          />
          <Spacer space={4} />
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Controller
              control={control}
              name="rememberMe"
              defaultValue={true}
              render={({ field: { onChange, onBlur, value } }) => <FormControlLabel label="Remember me" control={<Checkbox onBlur={onBlur} checked={value} onChange={onChange} />} />}
            />
            {/* <Link to={ROUTES.FORGOT_PASSWORD}>I forgot password</Link> */}
          </Flex>

          <Spacer space={20} />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant="contained" fullWidth size="large" type="submit" onClick={() => clearErrors()}>
                LOGIN
              </Button>
              <Spacer />
              <Button variant="outlined" fullWidth size="large" onClick={() => navigate(ROUTES.REG)}>
                REGISTER
              </Button>
              <Spacer />
              <Flex>
                {(errors.email || errors.password || errors.network) && (
                  <Alert variant="filled" severity="error">
                    <div>{errors?.network?.message?.toString() || 'Wrong login and/or password'}</div>
                  </Alert>
                )}
              </Flex>
            </>
          )}
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
