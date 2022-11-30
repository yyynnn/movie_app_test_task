/* eslint-disable no-extra-boolean-cast */
import styled from '@emotion/styled'
import CloseRounded from '@mui/icons-material/CloseRounded'
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import { Badge, Button, Drawer, IconButton, Link as MLink, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Link, useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'
import { FixedSizeList } from 'react-window'

import { ROUTES } from '../../consts/routes'
import { useGetPaginatedCorretciveActionList } from '../api/generated/endpoints'
import { CorrectiveAction } from '../api/generated/models'
import { WorkerPositions } from '../api/mocks'
import { useAuth } from '../auth/AuthProvider'
import { useDictionaries } from '../dictionaries/DictionariesProvider'
import { Absolute, Flex, Max, Pad, Spacer } from '../primitives'
import { Visibility } from '../primitives/Visibility'
import { ThemeSwitcher } from '../themingAndStyling/ThemeSwitcher'
import { Logo } from './Logo'

const workersKeys = Object.keys(WorkerPositions)
  .filter((key, idx) => idx > 4)
  .map((key) => {
    return key
  })

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
  const { factories } = useDictionaries()
  const navigate = useNavigate()
  const [drawerOpen, toggleDrawer] = useState(false)

  // requests
  const { data: corretciveActionsResponse } = useGetPaginatedCorretciveActionList()
  const { data: corretciveActionsData }: any = corretciveActionsResponse || {}
  const { data: corretciveActions = [] }: { data: CorrectiveAction[] } = corretciveActionsData || {}
  console.log('🐸 Pepe said => Navbar => data', corretciveActions)

  const factory = factories?.find((factory) => factory.id === auth.user.factory_id)
  const totalCorretciveActions = corretciveActionsData?.total
  console.log('🐸 Pepe said => Navbar => totalCorretciveActions', totalCorretciveActions)

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
                    <Flex>
                      <Typography>
                        <b>
                          {auth?.user?.name} {auth?.user.surname}
                        </b>
                      </Typography>
                      <Spacer width={4} />
                      <Typography>|</Typography>
                      <Spacer width={4} />
                      <Typography>{factory?.title}</Typography>
                    </Flex>
                  </Visibility>
                  <Spacer width={20} />
                  <ThemeSwitcher />
                  <Spacer width={20} />
                  {!!auth.token && (
                    <Badge badgeContent={totalCorretciveActions} color="error">
                      <IconButton onClick={() => toggleDrawer(true)} size="large" aria-label="menu" sx={{ p: 0 }}>
                        <MenuIcon />
                      </IconButton>
                    </Badge>
                  )}
                </Flex>
              </Pad>
            </Col>
          </Row>
        </Container>

        <Drawer
          PaperProps={{
            sx: { maxWidth: '100vw', width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }
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

            <Row>
              <Col lg={6}>
                <Flex alignItems="center">
                  <Badge component="div" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} max={10000} badgeContent={totalCorretciveActions} color="error">
                    <Typography variant="h4">
                      <b>Your assigned actions</b>
                    </Typography>
                  </Badge>
                </Flex>
                <Spacer />
                <WidgetBlock>
                  <Max maxHeight={600}>
                    <Scrollbar style={{ width: '100%', height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {corretciveActions.map((action, idx) => {
                        return (
                          <Button
                            key={idx}
                            onClick={() => {
                              toggleDrawer(false)
                              return navigate(ROUTES.TICKET.replace(':id', String(action.ticket_id)))
                            }}
                          >
                            <Typography>{action.corrective_action}</Typography>
                            <Typography>{action.corrective_action_due_date}</Typography>
                            <Typography>{action.ca_status_id}</Typography>
                          </Button>
                        )
                      })}
                    </Scrollbar>
                  </Max>
                </WidgetBlock>
              </Col>
              <Col lg={6}>
                <Typography variant="h4">
                  <b>Info</b>
                </Typography>
                <Spacer />
                <WidgetBlock>
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
                </WidgetBlock>

                <Spacer />

                <WidgetBlock>
                  <Typography variant="h4">
                    <b>Compound</b>
                  </Typography>
                  <Spacer space={4} />
                  <Typography>{factory?.title}</Typography>
                </WidgetBlock>

                <Spacer />

                <Link to={ROUTES.SYSTEM_PREFERENCE}>
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
                      <SettingsRoundedIcon />
                      <Typography variant="h6">System preferences</Typography>
                    </Flex>
                  </Button>
                </Link>

                <Spacer />

                <Button
                  variant="contained"
                  color="error"
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
              </Col>
            </Row>
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

const WidgetBlock = styled.div`
  padding: 30px;
  background-color: #07101ae7;
  border-radius: 30px;
  width: 100%;
`
