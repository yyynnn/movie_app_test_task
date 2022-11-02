import styled from '@emotion/styled'
import React from 'react'

export const Error: React.FC<any> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div<any>`
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
