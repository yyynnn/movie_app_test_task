import { CircularProgress } from '@mui/material'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { API } from '../../consts/api'
import { Ticket } from '../../types/api'
import { useBasicQuery } from '../hooks/useBasicQuery'
import { TicketConstructor } from './TicketConstructor'

export const TicketReadOnly = () => {
  const params: any = useParams()
  const location = useLocation()

  const {
    // @ts-ignore
    data
  } = useBasicQuery<{ data: Ticket }>({
    apiPath: API.GET.TICKET(params.id),
    enabled: !!params.id
  })
  const { data: ticket } = data || {}
  return <div>{ticket ? <TicketConstructor readOnly initialData={ticket} /> : <CircularProgress />}</div>
}
