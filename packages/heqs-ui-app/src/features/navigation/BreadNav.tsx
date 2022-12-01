import styled from '@emotion/styled'
import { Breadcrumbs, Container, Typography } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-grid-system'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { extractNumber } from '../../utils'
import { Spacer } from '../primitives'

export const BreadNav = () => {
  const location = useLocation()
  const isTicket = location.pathname.includes('/ticket/')
  const ticketId = extractNumber(location.pathname)

  const heading = isTicket
    ? `Ticket ${ticketId}`
    : Object.keys(ROUTES)
        .find((routeKey) => {
          // @ts-ignore
          return ROUTES[routeKey] === location.pathname
        })
        ?.replaceAll('_', ' ')

  return (
    <Wrapper>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={ROUTES.HOME}>
          Home
        </Link>
        <Typography color="text.primary">{heading}</Typography>
      </Breadcrumbs>
      <Spacer space={50} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & p,
  & h4 {
    text-transform: lowercase;

    ::first-letter {
      text-transform: uppercase;
    }
  }
`
