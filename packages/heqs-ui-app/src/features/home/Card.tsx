import styled from '@emotion/styled'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Button, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import Tilt from 'react-parallax-tilt'
import { useNavigate } from 'react-router-dom'

import { RFCC } from '../../types/react'
import { Pad, Spacer } from '../primitives'

interface CardProps {
  bgColor?: string
  bgColorDark?: string
  heading?: string
  link?: string
  linkText?: string
  text?: string
  fillHeight?: boolean
}

export const Card: RFCC<CardProps> = ({
  fillHeight = true,
  heading,
  bgColor,
  bgColorDark,
  children,
  text,
  link,
  linkText
}) => {
  const navigate = useNavigate()

  return (
    <OuterWrapper fillHeight={fillHeight}>
      <Wrapper
        fillHeight={fillHeight}
        flexDirection="column"
        bgColor={bgColor}
        bgColorDark={bgColorDark}
        justifyContent="space-between"
      >
        <Typography variant="h4">
          <b>{heading}</b>
        </Typography>
        <Spacer space={30} />
        {text && (
          <div>
            <Typography variant="h4">
              <b>{text}</b>
            </Typography>
            <Spacer space={30} />
          </div>
        )}
        {children || (
          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate(link || '/')}
          >
            {linkText || 'Go'}
          </Button>
        )}
      </Wrapper>

      <Spacer />
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div<any>`
  height: ${({ fillHeight }) => fillHeight && '100%'};
`

const Wrapper = styled(Pad)<any>`
  background-color: ${({ theme, bgColor, bgColorDark }) =>
    theme.palette.mode === 'light' ? bgColor : bgColorDark};
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  border: 1px solid #0000001a;
  height: ${({ fillHeight }) => fillHeight && 'calc(100% - 20px)'};

  button {
    background-color: ${({ theme, bgColor, bgColorDark }) =>
      theme.palette.mode !== 'light' ? '#ffffff46' : '#0000003c'} !important;
  }

  &:hover {
    box-shadow: 0px 7px 20px -7px #0009;
  }
`
