/* eslint-disable no-extra-boolean-cast */
import styled from '@emotion/styled'
import CloseRounded from '@mui/icons-material/CloseRounded'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Drawer, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { useAuth } from '../auth/AuthProvider'
import { Flex, Pad, Spacer } from '../primitives'
import { Visibility } from '../primitives/Visibility'
import { ThemeSwitcher } from '../themingAndStyling/ThemeSwitcher'
import { Logo } from './Logo'

export const Navbar = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [drawerOpen, toggleDrawer] = useState(false)

  return (
    <Wrapper id="main_navbar">
      <Row>
        <Col>
          <Pad padding={'40px 0'} alignItems="center" justifyContent="space-between">
            {!!auth.token ? (
              <button onClick={() => navigate(ROUTES.HOME)}>
                <Logo />
              </button>
            ) : (
              <Logo />
            )}
            <Flex alignItems="center">
              <Spacer width={10} />
              <Visibility visibleAt={['md', 'lg', 'xl', 'xxl']}>
                <Typography>
                  <b>{auth.loginName}</b>
                </Typography>
              </Visibility>
              <Spacer width={20} />
              <ThemeSwitcher />
              <Spacer width={20} />
              {!!auth.token && (
                <IconButton onClick={() => toggleDrawer(true)} size="large" aria-label="menu" sx={{ p: 0 }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Flex>
          </Pad>
        </Col>
      </Row>

      <Drawer
        PaperProps={{
          sx: { maxWidth: '666px', width: '100%' }
        }}
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Pad flexDirection="column" justifyContent="center">
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              <b>{auth.loginName}</b>
            </Typography>
            <IconButton onClick={() => toggleDrawer(false)} size="large" aria-label="menu" sx={{ p: 0 }}>
              <CloseRounded />
            </IconButton>
          </Flex>
          <Spacer />

          <Spacer />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              toggleDrawer(false)
              return auth.signout()
            }}
          >
            LOGOUT
          </Button>
        </Pad>
      </Drawer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;

  & button {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`
