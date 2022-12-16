import React from 'react'
import styled from 'styled-components'

import { INPUT_HEIGHT } from '../../../consts'

export const Input = (props) => {
  return <Wrapper {...props} />
}

const Wrapper = styled.input`
  width: 100%;
  background: transparent;
  color: ${({ color }) => (color !== 'inverted' ? 'white' : '#fff;')};
  border: none;
  align-items: center;
  font-size: ${({ variant }) => (variant === 'big' ? 28 : 16)}px;
  padding: ${({ variant }) => (variant !== 'big' ? '10px 15px' : '26px 30px')};
  border-width: 1px;
  border-color: ${({ color }) => (color === 'inverted' ? 'white' : '#fff;')};
  border-radius: ${({ variant }) => (variant === 'big' ? '56px' : '25px')};
  border-style: solid;
  transition: all 0.2s ease-in-out;
  height: ${INPUT_HEIGHT}px;
`
