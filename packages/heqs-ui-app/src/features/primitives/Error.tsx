import styled from '@emotion/styled'
import * as React from 'react'
import { FieldError, FieldErrorsImpl, get, Merge, Message, useFormContext } from 'react-hook-form'

import { RFCC } from '../../types/react'
import { Spacer } from './Spacer'

interface Props {
  as?: any
  arbitError?: boolean
  name: string
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  render?: any
}

export const Error: RFCC<Props> = ({ as, arbitError = false, name, message = '', render, ...rest }) => {
  const methods = useFormContext()
  const errorByErrState = get(methods?.formState?.errors, name)
  const errorByEmptyValue = methods?.getValues()[name] === ''
  const error = errorByErrState || errorByEmptyValue

  const { message: messageFromRegister, types } = error || {}
  const props = Object.assign({}, rest, {
    children: messageFromRegister || message
  })

  return arbitError || error ? (
    <Wrapper>
      {React.isValidElement(as)
        ? React.cloneElement(as, props)
        : render
        ? render({
            message: messageFromRegister || message,
            messages: types
          })
        : React.createElement(as || React.Fragment, props)}
    </Wrapper>
  ) : (
    <Spacer />
  )
}

const Wrapper = styled.div`
  color: #ff8787;
  padding-left: 20px;
  padding-bottom: 10px;
`
