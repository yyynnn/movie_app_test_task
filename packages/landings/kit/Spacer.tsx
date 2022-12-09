import React from 'react'
import styled from 'styled-components'

import { BREAKPOINTS } from '../consts'

const DEFAULT_SPACE = 20
const DEFAULT_WIDTH = 0

interface IProps {
  id?: string
  space?: number
  mobSpace?: number
  width?: number
}

export const Spacer: React.FC<IProps> = ({
  space = DEFAULT_SPACE,
  width = DEFAULT_WIDTH,
  mobSpace = DEFAULT_SPACE,
  ...rest
}) => (
  <InnerSpacer data-test-id="spacer" space={space} width={width} mobSpace={mobSpace} {...rest} />
)

const InnerSpacer = styled.div<IProps>`
  height: ${({ space }) => space}px;
  min-width: ${({ width }) => width}px;
  width: ${({ width }) => width}px;
  &:before {
    content: '${({ space }) => space}';
    display: none;
  }

  @media (max-width: ${BREAKPOINTS[2]}px) {
    height: ${({ mobSpace }) => mobSpace}px;
  }
`
