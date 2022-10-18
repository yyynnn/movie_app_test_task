import styled from '@emotion/styled'
import { Flex, Pad, Spacer } from '@heqs-ui/uikit'
import CloseRounded from '@mui/icons-material/CloseRounded'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Drawer, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { useAuth } from '../auth/AuthProvider'
import { ThemeSwitcher } from '../theming/ThemeSwitcher'
import { Logo } from './Logo'

export const Navbar = () => {
  const auth = useAuth()
  const [drawerOpen, toggleDrawer] = useState(false)

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <Pad padding={'40px 0'} alignItems="center" justifyContent="space-between">
              {auth.token ? <Logo /> : <div />}
              <Flex alignItems="center">
                <Typography>{auth.user}</Typography>
                <Spacer width={10} />
                <ThemeSwitcher />
                <Spacer width={10} />
                {!!auth.token && (
                  <IconButton onClick={() => toggleDrawer(true)} size="large" aria-label="menu" sx={{ p: 0 }}>
                    <MenuIcon />
                  </IconButton>
                )}
              </Flex>
            </Pad>
          </Col>
        </Row>
      </Container>
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
              <b>{auth.user}</b>
            </Typography>
            <IconButton onClick={() => toggleDrawer(false)} size="large" aria-label="menu" sx={{ p: 0 }}>
              <CloseRounded />
            </IconButton>
          </Flex>
          <Spacer />

          {Object.keys(ROUTES).map((key) => {
            const name = (ROUTES as any)[key]
            return (
              <Link key={key} to={name}>
                {name}
              </Link>
            )
          })}
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

const Wrapper = styled.div``
