import styled from '@emotion/styled'
import React from 'react'

export const PathSvg = styled.path<any>`
  fill: ${({ theme, c1, c2 }: any) => (theme.palette.mode === 'light' ? c1 || '#000' : c2 || '#fff')};
`
