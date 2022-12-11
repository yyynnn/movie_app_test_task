import { CircularProgress } from '@mui/material'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { useReadTicketByID } from '../api/generated/endpoints'
import { TicketConstructor } from './TicketConstructor'

export const TicketReadOnly = () => {
  const params: any = useParams()

  const { data } = useReadTicketByID(params?.id)

  const { data: ticket } = data || {}

  return (
    <div>
      {ticket ? (
        <TicketConstructor readOnly initialData={ticket} hasCorrectiveActions />
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}
