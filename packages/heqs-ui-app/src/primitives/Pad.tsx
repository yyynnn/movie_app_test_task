import styled from '@emotion/styled'

import { Flex, TFlexProps } from './Flex'

const neganteString = (str: string | undefined) =>
  str
    ? str
        .split('px')
        .filter((item) => item !== '')
        .map((item) => `${Number(item) / 2}px`)
        .join(' ')
    : null

export type TPadProps = {
  pad?: number | string
  useMobile?: boolean
  padMobile?: number | string
  padding?: number | string
  padLeft?: number | string
  padRight?: number | string
  padTop?: number | string
  padBottom?: number | string
}

export const Pad = styled(Flex)<TFlexProps & TPadProps>`
  ${({ pad, padding, padMobile, useMobile = false }) => {
    const data = pad || padding
    const padMobileFinal = padMobile || data
    return `
      padding: ${data ? (typeof data === 'number' ? `${data}px` : data) : '20px'};
      ${
        useMobile
          ? `@media (max-width: 991px) {
        padding: ${data ? (typeof padMobileFinal === 'number' ? `${padMobile || Number(data) / 2}px` : neganteString(padMobileFinal)) : '20px'};
      }`
          : null
      }
    `
  }};
`
