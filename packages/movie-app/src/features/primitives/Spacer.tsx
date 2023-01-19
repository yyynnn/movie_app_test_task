import styled from '@emotion/styled'
import React from 'react'

const DEFAULT_SPACE = 20
const DEFAULT_WIDTH = 10

interface IProps {
  space?: number
  mobSpace?: number
  width?: number
  isMobile?: boolean
}

export const Spacer: React.FC<IProps> = ({
  space = DEFAULT_SPACE,
  width = DEFAULT_WIDTH,
  mobSpace = DEFAULT_SPACE,
  isMobile = false,
  ...rest
}) => (
  <InnerSpacer
    data-test-id="spacer"
    space={space}
    width={width}
    mobSpace={isMobile ? mobSpace : space}
    {...rest}
  />
)

const InnerSpacer = styled.div<IProps>`
  height: ${({ space }) => space}px;
  min-width: ${({ width }) => width}px;
  max-height: ${({ space }) => space}px;
  min-height: ${({ space }) => space}px;

  width: ${({ width }) => width}px;

  &:before {
    content: '${({ space }) => space}';
    display: none;
  }

  @media (max-width: 991px) {
    height: ${({ mobSpace }) => mobSpace}px;
    min-height: ${({ mobSpace }) => mobSpace}px;
    max-height: ${({ mobSpace }) => mobSpace}px;
  }
`
