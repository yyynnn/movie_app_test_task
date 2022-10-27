import styled from '@emotion/styled'
import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Spacer } from '../../primitives'
import { extractNumber } from '../../utils'

export const BreadNav = () => {
  const location = useLocation()
  console.log('🐸 Pepe said => BreadNav => location', location)
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
      <Typography variant="h4">
        <b>{heading}</b>
      </Typography>
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
