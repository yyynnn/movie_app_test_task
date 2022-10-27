import styled from '@emotion/styled'
import { Box, Breadcrumbs, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { Link } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { useBasicQuery } from '../../hooks/useBasicQuery'
import { Flex, Spacer } from '../../primitives'
import { Tickets } from '../../types/api'

export const AllTicketsPage = () => {
  const { data: ticketList, isLoading } = useBasicQuery<{ data: Tickets }>({
    apiPath: API.GET.TICKETS_LIST
  })
  // @ts-ignore
  const { data: tickets } = ticketList || {}
  console.log('🐸 Pepe said => AllTicketsPage => tickets', tickets)

  return (
    <div>
      <Typography variant="h4">
        <b>All tickets</b>
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={ROUTES.HOME}>
          Home
        </Link>
        <Typography color="text.primary">All tickets</Typography>
      </Breadcrumbs>

      <Spacer space={50} />

      <Wrapper>
        {tickets?.length ? (
          <DataGrid rows={tickets} columns={columns} pageSize={50} checkboxSelection disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} />
        ) : (
          <Flex width="100%" height="100%" flexDirection="column" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Flex>
        )}
      </Wrapper>
    </div>
  )
}

const Wrapper = styled(Flex)`
  height: 666px;

  div.MuiDataGrid-root {
    border-radius: 10px !important;
  }
`

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'date_created',
    headerName: 'Creation Date',
    width: 150,
    editable: true
  },
  {
    field: 'time_created',
    headerName: 'Creation Time',
    width: 150,
    editable: true
  },
  {
    field: 'correction',
    headerName: 'Correction',
    width: 150,
    editable: true
  },
  {
    field: 'extension',
    headerName: 'Extension',
    width: 150,
    editable: true
  },
  {
    field: 'class',
    headerName: 'Class',
    width: 150,
    editable: true
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    editable: true
  },
  {
    field: 'workcenter',
    headerName: 'Workcenter',
    width: 150,
    editable: true
  }
]

// {
//   "id": 32,
//   "date_created": "2022-05-14",
//   "time_created": "22:12:00",
//   "correction": "Использовали сыпучие средства для предотрв.1234",
//   "extension": "jpg",
//   "class": "Health&Safety",
//   "category": "Nearmiss",
//   "workcenter": "C201"
// }
