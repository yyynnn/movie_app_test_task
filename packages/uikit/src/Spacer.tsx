import styled from '@emotion/styled'
import React from 'react'

const DEFAULT_SPACE = 16
const DEFAULT_WIDTH = 0

interface IProps {
  space?: number
  mobSpace?: number
  width?: number
}

export const Spacer: React.FC<IProps> = ({ space = DEFAULT_SPACE, width = DEFAULT_WIDTH, mobSpace = DEFAULT_SPACE, ...rest }) => (
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

  @media (max-width: 991px) {
    height: ${({ mobSpace }) => mobSpace}px;
  }
`
