import styled from '@emotion/styled'
import { Box, Breadcrumbs, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { Tickets } from '../../types/api'
import { useBasicQuery } from '../hooks/useBasicQuery'
import { Flex, Spacer } from '../primitives'

export const AllTicketsPage = () => {
  const { data: ticketList, isLoading } = useBasicQuery<{ data: Tickets }>({
    apiPath: API.GET.TICKETS_LIST
  })
  const navigate = useNavigate()

  const { data: tickets } = ticketList || {}

  return (
    <div>
      <Wrapper>
        {tickets?.length ? (
          <DataGrid
            autoPageSize
            density="comfortable"
            onRowClick={(row) => {
              // @ts-ignore
              navigate(ROUTES.TICKET.replace(':id', row.id))
            }}
            headerHeight={70}
            rows={tickets}
            columns={columns}
            pageSize={50}
            experimentalFeatures={{ newEditingApi: true }}
          />
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
  {
    field: 'status',
    headerName: 'Status',
    editable: true
  },
  {
    field: 'due_date',
    headerName: 'Due Date',
    editable: true
  },
  {
    field: 'description',
    headerName: 'Description',
    editable: true
  },
  {
    field: 'responsible',
    headerName: 'Responsible',
    editable: true
  },
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'date_created',
    headerName: 'Creation Date',
    minWidth: 150,
    editable: true
  },
  {
    field: 'time_created',
    headerName: 'Creation Time',
    minWidth: 150,
    editable: true
  },
  {
    field: 'correction',
    headerName: 'Correction',
    minWidth: 150,
    editable: true
  },
  {
    field: 'extension',
    headerName: 'Extension',
    minWidth: 150,
    editable: true
  },
  {
    field: 'class',
    headerName: 'Class',
    minWidth: 150,
    editable: true
  },
  {
    field: 'category',
    headerName: 'Category',
    minWidth: 150,
    editable: true
  },
  {
    field: 'workcenter',
    headerName: 'Workcenter',
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
