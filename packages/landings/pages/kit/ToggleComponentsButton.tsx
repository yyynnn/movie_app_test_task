import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Flex } from './Flex'

interface IProps {
  components: [ReactNode, ReactNode]
  toggleState?: boolean
  toggle?: (val?: any) => any
  tooltip?: string
}

export const ToggleComponentsButton: React.FC<IProps> = ({
  components,
  toggle,
  toggleState = false
}) => {
  const toggleHandler = (e: React.MouseEvent): any => {
    e.stopPropagation()
    if (toggle) {
      toggle(e)
    }
  }

  return (
    <Wrapper justifyContent="center" alignItems="center" onClick={toggleHandler}>
      {toggleState ? components[0] : components[1]}
    </Wrapper>
  )
}

const Wrapper = styled(Flex as any)`
  cursor: pointer;
`
