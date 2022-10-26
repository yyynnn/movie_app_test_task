import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { string } from 'prop-types'
import React, { useEffect, useState } from 'react'

// импорты путей из API -> ../../consts/api
import { API } from '../../consts/api'
// useBasicMutation для POST/PUT (враппер над useMutation https://tanstack.com/query/v4/docs/reference/useMutation)
import { useBasicMutation } from '../../hooks/useBasicMutation'
// useBasicQuery для GET (враппер над useQuery https://tanstack.com/query/v4/docs/reference/useQuery)
import { useBasicQuery } from '../../hooks/useBasicQuery'
// Flex - основной компонент для верстки, основа всех примитивов
// В осоновном достаточно трех пропов: flexDirection - row/column, justifyContent - центрирование по горизонтали (главная ось - row) alignItems - по вертикали (главная ось - row)
//
// Pad - для паддинга использует Flex внутри, так что пропы подходят
// по умолчанию 20px , подходит любой формат - 40, "40px", "40px 0"
//
// Spacer - для любых пробелов, теперь не нужно вкорячивать margin
// по уполчанию 20px в высоту, в ширь через width
import { Flex, Pad, Spacer } from '../../primitives'
import { Employees, Ticket, Tickets } from '../../types/api'

export const ExampleFeaturePage = () => {
  const [newTicket, setNewTicket] = useState({
    category: 'Nearmiss',
    class: 'Health&Safety',
    correction: 'new_app_ticket',
    extension: 'jpg',
    workcenter: 'C201',
    workcenter_id: 1,
    selectedFile: 'asd.js',
    foreman: 'Randy',
    ticket_class_id: 666,
    ticket_category_id: 1666,
    date_created: 'Wed Oct 21 2022',
    time_created: new Date().toTimeString(),
    foreman_id: 2666,
    damaged_item: 'item damaged',
    photo: 'The photo'
  })
  const {
    mutate: addTicket,
    isLoading: isAddingTicket,
    isError: ticketAdditionError
  } = useBasicMutation<any>({
    apiPath: API.MUTATE.ADD_TICKET
  })

  const { data: employees } = useBasicQuery<Employees>({
    apiPath: API.GET.EMPLOYEES
  })

  const { data: tickets } = useBasicQuery<{ data: Tickets }>({
    apiPath: API.GET.TICKETS_LIST
  })

  const { data: workcenters } = useBasicQuery<{ data: any }>({
    apiPath: API.GET.WORK_CENTERS
  })

  return (
    <Wrapper>
      <Pad padding={60} flexDirection="column">
        <div>
          {employees?.map((employee, idx) => {
            return <div key={idx}>{employee.name}</div>
          })}
        </div>
        <Spacer />
        <Flex wrap="wrap">
          {tickets?.data?.map((ticket, idx) => {
            return <Flex key={idx}>{ticket.correction}</Flex>
          })}
        </Flex>
        <Spacer space={30} />

        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <TextField fullWidth multiline rows={10} variant="outlined" onChange={(e) => setNewTicket(JSON.parse(e.target.value))} value={JSON.stringify(newTicket)} />
          <Spacer width={10} />
          <Button fullWidth variant="contained" size="large" onClick={() => addTicket({ data: newTicket })}>
            ADD TICKET
          </Button>
        </Flex>
      </Pad>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #ffffff1b;
  border-radius: 20px;
`
