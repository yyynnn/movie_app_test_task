import React from 'react'
import styled from 'styled-components'

import { Flex } from './Flex'

export const ZIndex: React.FC<{
  children?: any
  zIndex: number
  position?: any
}> = ({ zIndex, children, position }) => {
  return (
    <Wrapper zIndex={zIndex} style={{ position: position || 'relative' }}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled<any>(Flex)`
  z-index: ${({ zIndex }) => zIndex || 0};
`
