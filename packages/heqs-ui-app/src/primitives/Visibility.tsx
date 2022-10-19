import styled from '@emotion/styled'

import { BREAKPOINTS, BREAKPOINTS_NAMES } from '../consts/common'
import { RFCC } from '../types/react'
import { Flex } from './Flex'

export const Visibility: RFCC = ({ children, visibleAt = ['md', 'lg', 'xl', 'xxl'], hiddenAt = [''], ...rest }) => {
  return (
    <Wrapper alignItems="center" justifyContent="center" visibleAt={visibleAt} hiddenAt={hiddenAt} {...rest}>
      {children}
    </Wrapper>
  )
}

const fontsMedia = (visibleAt: any) =>
  BREAKPOINTS.map((breakpoint, idx) => {
    const breakpointName = BREAKPOINTS_NAMES[idx]
    const isLast = idx === BREAKPOINTS.length - 1
    const isVisible = visibleAt.includes(breakpointName)

    return isLast
      ? `@media (max-width: ${breakpoint - 1}px) {
        display: ${isVisible ? 'initial' : 'none'};
  };
  @media (min-width: ${breakpoint}px) {
    display: ${isVisible ? 'initial' : 'none'};
};
  `
      : `@media (max-width: ${breakpoint - 1}px) {
        display: ${isVisible ? 'initial' : 'none'};
  };
`
  })
    .reverse()
    .join(' ')

const Wrapper = styled(Flex)<any>`
  display: initial;
  ${({ visibleAt }) => fontsMedia(visibleAt)};
`
