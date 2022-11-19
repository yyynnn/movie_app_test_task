import styled from '@emotion/styled'
import { Box, Breadcrumbs, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { Link } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { Tickets } from '../../types/api'
import { AllTicketsPage } from '../allTickets/AllTicketsPage'
import { useBasicQuery } from '../hooks/useBasicQuery'
import { Flex, Spacer } from '../primitives'

export const AllCorrectiveActionsPage = () => {
  return <AllTicketsPage />
}

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
