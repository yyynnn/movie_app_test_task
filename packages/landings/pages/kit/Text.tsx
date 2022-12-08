/* eslint-disable react/display-name */
import React, { forwardRef, useRef } from 'react'
import { getDocument, getWindow } from 'ssr-window'
import styled from 'styled-components'
import Typograf from 'typograf'

import { BREAKPOINTS } from '../consts'

const window = getWindow()
const document = getDocument()

const lhcalc = (size) => {
  return Math.log(size) * 4 + size
}

const tp = new Typograf({ locale: ['ru', 'en-US'] })

export const Text: any = forwardRef(
  (
    {
      text = '',
      size,
      minSize,
      center,
      breakWord = false,
      color = '#fff',
      bold = false,
      adaptive = true,
      opacity = 1,
      children,
      ...rest
    }: any,
    fRef
  ) => {
    return (
      <Wrapper
        ref={fRef}
        opacity={opacity}
        size={size}
        minSize={minSize}
        adaptive={adaptive}
        bold={bold}
        center={center}
        color={color}
        breakWord={breakWord}
        {...rest}
      >
        {children ? children : typeof text === 'string' ? tp.execute(text) : text}
      </Wrapper>
    )
  }
)

const fontsMedia = (size, _minSize, adaptive) =>
  BREAKPOINTS.map((breakpoint, idx) => {
    const multi = adaptive ? 1 : breakpoint / BREAKPOINTS[4]
    const isLast = idx === BREAKPOINTS.length - 1
    const minSize =
      breakpoint === BREAKPOINTS[0] ||
      breakpoint === BREAKPOINTS[1] ||
      breakpoint === BREAKPOINTS[2]
        ? _minSize
        : 0
    return isLast
      ? ''
      : `@media (max-width: ${breakpoint}px) {
    font-size: ${minSize ? minSize : (size * multi < 16 ? 16 : size * multi || 0) || 16}px;
  };
`
  })
    .reverse()
    .join(' ')

const Wrapper = styled.div<{
  adaptive: boolean
  size: number
  minSize: number
  bold: boolean
  opacity: number
  color: string
  breakWord: boolean
  center: string
}>`
  font-size: ${({ size }) => size || 16}px;
  text-align: ${({ center }) => (center ? 'center' : '')};
  letter-spacing: -0.03em;
  /* letter-spacing: ${({ size }) => size / -70 || 0}px; */
  /* line-height: ${({ size }) => (size ? lhcalc(size) + 'px' : 'initial')}; */
  opacity: ${({ opacity }) => opacity};
  color: ${({ color }) => color};
  font-weight: ${({ bold }) => (typeof bold === 'string' ? bold : bold ? '600' : '400')};
  font-feature-settings: 'kern';

  @media (max-width: 900px) {
    word-break: ${({ breakWord }) => (breakWord ? 'break-word' : 'normal')};
  }

  ${({ size, minSize, adaptive }) => (adaptive ? fontsMedia(size, minSize, adaptive) : '')};
`
