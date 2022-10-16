import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'
import styled from '@emotion/styled'
import { MacScrollbar } from 'mac-scrollbar'
import { animated } from '@react-spring/web'
import { useSpring } from '@react-spring/core'

import { Pad } from './Pad'

const Fade: any = React.forwardRef((props, ref) => {
  const { in: open, children, onEnter, onExited, ...other }: any = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

export const BasicModal = ({ setOpen, open, children, mobileOnly }: any) => {
  const handleClose = () => setOpen(false)

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <StyledPaper>
          <MacScrollbarWrapper suppressScrollX={!mobileOnly} mobileOnly={mobileOnly}>
            <Pad pad="40px" flexDirection="column">
              {children}
            </Pad>
          </MacScrollbarWrapper>
        </StyledPaper>
      </Fade>
    </Modal>
  )
}

const MacScrollbarWrapper = styled<any>(MacScrollbar)`
  max-width: ${({ mobileOnly }: { mobileOnly: any }) => (mobileOnly ? 300 : 800)}px;
  max-height: 90vh;
  height: 100%;
`

const StyledPaper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
