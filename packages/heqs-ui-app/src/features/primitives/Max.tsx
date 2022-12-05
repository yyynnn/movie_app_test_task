import styled from '@emotion/styled'

import { Flex, TFlexProps } from './Flex'

interface Props extends TFlexProps {
  height?: number
  width?: number
  maxWidth?: number
  maxHeight?: number
  display?: string
}

export const Max = styled(Flex)<Props>`
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight + 'px' : '100%')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth + 'px' : '100%')};
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  width: ${({ width }) => (width ? width + 'px' : '100%')};
  display: ${({ display }) => display};
  overflow: auto;
`
