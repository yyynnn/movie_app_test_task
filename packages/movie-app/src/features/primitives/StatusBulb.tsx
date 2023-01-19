import styled from '@emotion/styled'
import { Chip, Typography } from '@mui/material'
import React from 'react'

import { RFCC } from '../../types/react'
import { TicketStatusEnum } from '../dictionaries/DictionariesProvider'
import { Flex, TFlexProps } from './Flex'
import { Spacer } from './Spacer'

interface Props extends TFlexProps {
  statusId?: number
  statusColor?: string
  statusText?: string
  type?: 'tickets' | 'ca'
}

export const StatusBulb: RFCC<Props> = ({
  statusId = 666,
  statusText,
  type = 'tickets',
  ...rest
}) => {
  const statusColor =
    type === 'ca'
      ? statusId === 1
        ? '#ffb300'
        : statusId === 2
        ? '#3bff48'
        : 'gray'
      : statusId === 1
      ? '#ffb300'
      : statusId === 2
      ? '#0055ff'
      : statusId === 3
      ? '#3bff48'
      : 'gray'
  const status = Object.keys(TicketStatusEnum)[statusId + 2]

  return (
    <Chip
      label={
        <Flex alignItems="center">
          <Status {...rest} statusColor={statusColor} />
          <Spacer />
          <Typography>{statusText || status}</Typography>
        </Flex>
      }
    />
  )
}

const Status = styled(Flex)<Props>`
  height: 10px;
  min-height: 10px;
  min-width: 10px;
  width: 10px;
  border-radius: 50px;
  background-color: ${({ statusColor }) => statusColor};
`
