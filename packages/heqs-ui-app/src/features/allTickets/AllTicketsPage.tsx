import styled from '@emotion/styled'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Box, Breadcrumbs, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { Tickets } from '../../types/api'
import { useReadTicketsList } from '../api/generated/endpoints'
import { useBasicQuery } from '../hooks/useBasicQuery'
import { Flex, Spacer } from '../primitives'
import { Max } from '../primitives/Max'

export const AllTicketsPage = () => {
  const navigate = useNavigate()
  const [searchAttrib, setSearchAttrib] = useState('')
  const [searchString, setSearchString] = useState('')

  const {
    data: ticketList,
    isLoading,
    refetch
  } = useReadTicketsList({
    axios: {
      params: {
        searchAttrib,
        searchString
      }
    }
  })
  const { data: tickets } = ticketList || {}

  useEffect(() => {
    refetch()
  }, [searchString, searchAttrib])

  return (
    <div>
      <Max maxWidth={600}>
        <TextField
          variant="outlined"
          fullWidth
          label="Search query"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            )
          }}
        />
        <Spacer width={10} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Col attribute</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={searchAttrib} displayEmpty label="Col attribute" onChange={(e) => setSearchAttrib(e.target.value)}>
            {[...columns, { field: 'any', selected: false }].map((col, idx) => {
              return (
                <MenuItem key={idx} value={col.field} selected={!!col.selected}>
                  {col.field}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Max>

      <Spacer />

      <Wrapper>
        <DataGrid
          autoPageSize
          density="comfortable"
          onRowClick={(row) => {
            // @ts-ignore
            navigate(ROUTES.TICKET.replace(':id', row.id))
          }}
          headerHeight={70}
          // @ts-ignore
          rows={tickets?.data || []}
          columns={columns}
          pageSize={50}
          loading={isLoading}
          experimentalFeatures={{ newEditingApi: true }}
        />
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

const columns: {
  field: string
  headerName: string
  editable: boolean
  selected: boolean
  width?: number
  minWidth?: number
}[] = [
  {
    field: 'status',
    headerName: 'Status',
    editable: true,
    selected: false
  },
  {
    field: 'due_date',
    headerName: 'Due Date',
    editable: true,
    selected: false
  },
  {
    field: 'description',
    headerName: 'Description',
    editable: true,
    selected: false
  },
  {
    field: 'responsible',
    headerName: 'Responsible',
    editable: true,
    selected: false
  },
  { field: 'id', headerName: 'ID', width: 90, minWidth: 90, editable: true, selected: false },
  {
    field: 'date_created',
    headerName: 'Creation Date',
    minWidth: 150,
    editable: true,
    selected: false
  },
  {
    field: 'time_created',
    headerName: 'Creation Time',
    minWidth: 150,
    editable: true,
    selected: false
  },
  {
    field: 'correction',
    headerName: 'Correction',
    minWidth: 150,
    editable: true,
    selected: false
  },
  {
    field: 'extension',
    headerName: 'Extension',
    minWidth: 150,
    editable: true,
    selected: false
  },
  {
    field: 'class',
    headerName: 'Class',
    minWidth: 150,
    editable: true,
    selected: false
  },
  {
    field: 'category',
    headerName: 'Category',
    minWidth: 150,
    editable: true,
    selected: false
  },
  {
    field: 'workcenter',
    headerName: 'Workcenter',
    editable: true,
    selected: false
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
