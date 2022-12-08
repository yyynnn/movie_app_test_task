import React from 'react'
import styled from 'styled-components'

export const Error: React.FC<any> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  color: ${({ theme }) => 'red'}! important;
  fill: ${({ theme }) => 'red'}! important;

  div,
  p,
  span,
  * {
    color: ${({ theme }) => 'red'}! important;
    fill: ${({ theme }) => 'red'}! important;
  }
`
