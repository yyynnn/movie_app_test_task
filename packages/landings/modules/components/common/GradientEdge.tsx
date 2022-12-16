import React from 'react'
import styled from 'styled-components'

export const GradientEdge = ({ toTop = false }) => {
  return (
    <Wrapper>
      <Grad toTop={toTop} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Grad = styled.div`
  position: absolute;
  ${({ toTop }) => toTop && 'bottom: 0'};
  ${({ toTop }) => !toTop && 'top: 0'};
  display: block;
  width: 100%;
  height: 100px;
  background-image: ${({ toTop }) =>
    toTop
      ? 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);'
      : 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);'};
`
