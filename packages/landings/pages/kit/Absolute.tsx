import styled from 'styled-components'

import { Flex } from './Flex'

export const Absolute = styled<any>(Flex)`
  height: ${({ height }) => height ?? '100%'};
  width: ${({ width }) => width ?? '100%'};
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  right: ${({ right }) => right}px;
  bottom: ${({ bottom }) => bottom}px;
`
