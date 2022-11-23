/* eslint-disable no-extra-boolean-cast */
import styled from '@emotion/styled'
import CloseRounded from '@mui/icons-material/CloseRounded'
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import { Button, Drawer, IconButton, Link as MLink, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Link, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { WorkerPositions } from '../api/mocks'
import { useAuth } from '../auth/AuthProvider'
import { Absolute, Flex, Pad, Spacer } from '../primitives'
import { Visibility } from '../primitives/Visibility'
import { ThemeSwitcher } from '../themingAndStyling/ThemeSwitcher'
import { Logo } from './Logo'

const workersKeys = Object.keys(WorkerPositions)
  .filter((key, idx) => idx > 4)
  .map((key) => {
    return key
  })
console.log('🐸 Pepe said => workersKeys => workersKeys', workersKeys)

const capitalize = (str: string) => str?.charAt(0)?.toUpperCase() + str?.slice(1)

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

export const Navbar = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [drawerOpen, toggleDrawer] = useState(false)

  return (
    <div>
      <Wrapper id="main_navbar">
        <Container>
          <Row>
            <Col>
              <Pad padding="20px 0" alignItems="center" justifyContent="space-between">
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
        </Container>

        <Drawer
          PaperProps={{
            sx: { maxWidth: '600px', width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }
          }}
          anchor="right"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <Pad pad="40px" width="100%" height="100%" flexDirection="column">
            <Absolute right={0} top={0} onClick={() => toggleDrawer(false)}>
              <div>
                <Pad pad={20}>
                  <CloseRounded />
                </Pad>
              </div>
            </Absolute>

            <AvatarBlock>
              <Flex gap={14} alignItems="center">
                <Avatar {...stringAvatar(`${capitalize(auth?.user?.name)} ${capitalize(auth?.user?.surname)}`)} />

                <div>
                  <Typography variant="h4">
                    <b>
                      {capitalize(auth?.user?.name)} {capitalize(auth?.user?.surname)}
                    </b>
                  </Typography>
                  <Spacer space={4} />
                  <Typography>{workersKeys[auth?.user?.user_position_id]?.replaceAll('_', ' ')}</Typography>
                </div>
              </Flex>
            </AvatarBlock>

            <Spacer />

            <AvatarBlock>
              <Typography variant="h4">
                <b>Factory</b>
              </Typography>
              <Spacer space={4} />
              <Typography>ID: {auth?.user?.factory_id}</Typography>
            </AvatarBlock>

            <Spacer />

            <AvatarBlock>
              <Link to={ROUTES.SYSTEM_PREFERENCE}>
                <Flex
                  gap={4}
                  alignItems="center"
                  onClick={() => {
                    toggleDrawer(false)
                  }}
                >
                  <SettingsRoundedIcon />
                  <Typography variant="h4">System preferences</Typography>
                </Flex>
              </Link>
            </AvatarBlock>

            <Spacer />

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => {
                toggleDrawer(false)
                return auth.signout()
              }}
            >
              <Flex gap={4} alignItems="center">
                <MeetingRoomRoundedIcon />
                <Typography variant="h6">Logout</Typography>
              </Flex>
            </Button>
          </Pad>
        </Drawer>
      </Wrapper>
      <Spacer space={120} />
    </div>
  )
}

const Avatar = styled.div`
  height: 100px;
  min-height: 100px;
  width: 100px;
  min-width: 100px;
  background-color: #3300ff;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  font-size: 40px;
`

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  left: 0;
  padding: 0 31px;
  backdrop-filter: blur(12px);
  /* border-radius: 30px; */

  & button {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`

const AvatarBlock = styled.div`
  padding: 30px;
  background-color: #07101ae7;
  border-radius: 30px;
  width: 100%;
`
