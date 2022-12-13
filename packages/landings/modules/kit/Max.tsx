import styled from 'styled-components'

import { Flex } from './Flex'

interface Props {
  height?: number
  width?: number
  maxWidth?: number
  maxHeight?: number
}

// @ts-ignore
export const Max = styled<any>(Flex)`
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight + 'px' : '100%')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth + 'px' : '100%')};
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  width: ${({ width }) => (width ? width + 'px' : '100%')};
  display: ${({ display }) => display};
`
