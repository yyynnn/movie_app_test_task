import React from 'react'
import styled from '@emotion/styled'

export const Error: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  color: ${({ theme }) => theme.palette.error.main};
  fill: ${({ theme }) => theme.palette.error.main};

  div,
  p,
  span,
  * {
    color: ${({ theme }) => theme.palette.error.main};
    fill: ${({ theme }) => theme.palette.error.main};
  }
`
