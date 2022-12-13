/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import styled from 'styled-components'

export const Button = forwardRef(
  ({ text, variant = 'small', color = 'regular', ...rest }: any, fRef) => {
    return (
      <Wrapper ref={fRef} color={color} variant={variant} {...rest}>
        {text || 'Ок'}
      </Wrapper>
    )
  }
)

const Wrapper = styled.button<any>`
  cursor: pointer;
  width: 100%;
  background: transparent;

  color: ${({ color }) => (color !== 'inverted' ? 'white' : '#fff;')};
  border: none;
  align-items: center;
  text-align: center;
  font-size: ${({ variant }) => (variant === 'big' ? 28 : 16)}px;
  padding: ${({ variant }) => (variant !== 'big' ? '10px 15px' : '26px 30px')};
  border-width: 1px;
  border-color: ${({ color }) => (color === 'inverted' ? 'white' : '#fff;')};
  border-radius: ${({ variant }) => (variant === 'big' ? '56px' : '25px')};
  border-style: solid;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ color }) => (color === 'inverted' ? 'white' : '#fff;')};
    color: #000;
  }

  & p,
  div {
    color: ${({ color }) => (color !== 'inverted' ? 'white' : '#fff;')};

    &:hover {
      color: ${({ color }) => (color === 'regular' ? 'white' : '#005fff;')};
    }
  }
`
