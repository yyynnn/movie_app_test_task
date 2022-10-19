import styled from '@emotion/styled'

import { Flex } from './Flex'

export const Absolute = styled<any>(Flex)`
  height: ${({ height }) => height ?? '100%'};
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  right: ${({ right }) => right}px;
  bottom: ${({ bottom }) => bottom}px;
`
