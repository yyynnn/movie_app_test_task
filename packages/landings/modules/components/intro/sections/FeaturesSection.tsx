import React from 'react'
import styled from 'styled-components'

import { RFCC } from '../../../../types/react'

export const FeaturesSection: RFCC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  min-height: 1000px;
  background-color: #000000;
`
