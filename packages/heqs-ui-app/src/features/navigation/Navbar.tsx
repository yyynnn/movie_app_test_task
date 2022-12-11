/* eslint-disable no-extra-boolean-cast */
import styled from '@emotion/styled'
import CloseRounded from '@mui/icons-material/CloseRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import {
  Badge,
  Button,
  Chip,
  Divider,
  IconButton,
  Link as MLink,
  List,
  ListItem,
  ListItemButton,
  Paper,
  SwipeableDrawer,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Link, useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'

import { ROUTES } from '../../consts/routes'
import { useGetPaginatedCorrectiveActionList } from '../api/generated/endpoints'
import { CorrectiveAction } from '../api/generated/models'
import { WorkerPositions } from '../api/mocks'
import { useAuth } from '../auth/AuthProvider'
import { useDictionaries } from '../dictionaries/DictionariesProvider'
import { Absolute, Flex, Max, Pad, Pointer, Spacer, ZIndex } from '../primitives'
import { StatusBulb } from '../primitives/StatusBulb'
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
  const { data: corretciveActionsResponse } = useGetPaginatedCorrectiveActionList()
  const { data: corretciveActionsData }: any = corretciveActionsResponse || {}
  const { data: corretciveActions = [] }: { data: CorrectiveAction[] } = corretciveActionsData || {}

  // some data
  const factory: any = factories?.find((factory) => factory.id === auth?.user?.factory_id)
  const totalCorretciveActions = corretciveActionsData?.meta.total
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

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
                    {!!auth.token ? (
                      <Flex>
                        <Typography>
                          <b>
                            {auth?.user?.name} {auth?.user?.surname}
                          </b>
                        </Typography>
                        <Spacer width={4} />
                        <Typography>|</Typography>
                        <Spacer width={4} />
                        <Typography>{factory?.title}</Typography>
                      </Flex>
                    ) : null}
                  </Visibility>
                  <Spacer width={20} />
                  <ThemeSwitcher />
                  <Spacer width={20} />
                  {!!auth.token && (
                    <Badge badgeContent={totalCorretciveActions} color="error">
                      <IconButton
                        onClick={() => toggleDrawer(true)}
                        size="large"
                        aria-label="menu"
                        sx={{ p: 0 }}
                      >
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
            sx: {
              maxWidth: '100vw',
              width: '100%',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }
          }}
          anchor="right"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <Row>
            <Col>
              <Flex justifyContent="flex-end">
                <IconButton onClick={() => toggleDrawer(false)}>
                  <Pad pad={1}>
                    <CloseRounded />
                  </Pad>
                </IconButton>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Flex alignItems="center">
                <Typography variant="h4">
                  <b>Your assigned actions</b>
                </Typography>
                <Spacer />
                <Chip size="small" label={totalCorretciveActions} color="error" variant="filled" />
              </Flex>
              <Spacer />
              <WidgetBlock>
                <Max maxHeight={600} justifyContent="center" alignItems="center">
                  <Scrollbar
                    style={{
                      width: '100%',
                      height: 350,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <List>
                      {corretciveActions.map((action, idx) => {
                        return (
                          <ListItemButton
                            key={idx}
                            onClick={() => {
                              toggleDrawer(false)
                              return navigate(
                                ROUTES.TICKET.replace(':id', String(action.ticket_id))
                              )
                            }}
                          >
                            <Flex width="100%" alignItems="center" justifyContent="space-between">
                              <Flex>
                                <Typography>
                                  <b>{idx + 1}.</b>
                                </Typography>
                                <Spacer />
                                <Typography>{action.corrective_action}</Typography>
                              </Flex>
                              <Spacer />
                              <StatusBulb
                                statusId={
                                  action.ca_status_id === 2
                                    ? action.ca_status_id + 1
                                    : action.ca_status_id
                                }
                              />
                            </Flex>
                          </ListItemButton>
                        )
                      })}
                      {totalCorretciveActions > corretciveActions.length && (
                        <ListItemButton disabled>...</ListItemButton>
                      )}
                    </List>
                  </Scrollbar>
                </Max>
                <Spacer />
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    toggleDrawer(false)
                    navigate(ROUTES.ALL_CORRECTIVE_ACTIONS)
                  }}
                >
                  All corrective actions
                </Button>
              </WidgetBlock>
              <Spacer />
            </Col>
            <Col lg={4}>
              <Flex flexDirection="column">
                <Typography variant="h4">
                  <b>Info</b>
                </Typography>

                <Spacer />

                <WidgetBlock>
                  <Flex gap={14} alignItems="center">
                    <Avatar
                      {...stringAvatar(
                        `${capitalize(auth?.user?.name)} ${capitalize(auth?.user?.surname)}`
                      )}
                    />

                    <div>
                      <Typography variant="h4">
                        <b>
                          {capitalize(auth?.user?.name)} {capitalize(auth?.user?.surname)}
                        </b>
                      </Typography>
                      <Spacer space={4} />
                      <Typography>
                        {workersKeys[auth?.user?.user_position_id]?.replaceAll('_', ' ')}
                      </Typography>
                    </div>
                  </Flex>

                  <Spacer />

                  <Typography variant="h4">
                    <b>Location</b>
                  </Typography>

                  <Spacer space={4} />

                  <Typography>
                    {factory?.title}. Timezone: {factory?.timezone || '0.00 UTC'}
                  </Typography>

                  <Typography>Your time zone: {timezone}</Typography>
                </WidgetBlock>

                <Spacer />

                <Row>
                  <Col>
                    <Button
                      size="large"
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        toggleDrawer(false)
                        navigate(ROUTES.SYSTEM_PREFERENCES)
                      }}
                    >
                      <SettingsRoundedIcon />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      size="large"
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => {
                        toggleDrawer(false)
                        return auth.signout()
                      }}
                    >
                      <ExitToAppRoundedIcon />
                    </Button>
                  </Col>
                </Row>

                <Spacer />
              </Flex>
            </Col>
          </Row>
        </Drawer>
      </Wrapper>
      <Spacer space={80} />
    </div>
  )
}

const Drawer = styled(SwipeableDrawer)``

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

  & div {
    /* padding-left: 0 !important; */
    /* padding-right: 0 !important; */
  }
`

const WidgetBlock = styled(Paper)`
  padding: 2vw;
  width: 100%;
`
