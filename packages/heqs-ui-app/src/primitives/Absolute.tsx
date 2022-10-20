import styled from '@emotion/styled'

import { Flex } from './Flex'

export const Absolute = styled<any>(Flex)`
  height: ${({ height }) => height ?? '100%'};
  position: absolute;
  top: ${({ top }) => (top === 0 ? 0 : top)}px;
  left: ${({ left }) => (left === 0 ? 0 : left)}px;
  right: ${({ right }) => (right === 0 ? 0 : right)}px;
  bottom: ${({ bottom }) => (bottom === 0 ? 0 : bottom)}px;
`
