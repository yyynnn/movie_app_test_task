import styled from '@emotion/styled'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Box, Breadcrumbs, capitalize, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Pagination, PaginationItem, Select, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useDemoData } from '@mui/x-data-grid-generator'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { Tickets } from '../../types/api'
import { useGetPaginatedTicketList } from '../api/generated/endpoints'
import { Flex, Spacer } from '../primitives'
import { Max } from '../primitives/Max'

const createCols = (object: any): { field: string; headerName: string; editable: boolean; selected: boolean; width?: number; minWidth?: number }[] | [] => {
  const result = !object
    ? []
    : Object.keys(object).map((key) => {
        return { field: key, headerName: capitalize(key.replaceAll('_', ' ')), editable: true, selected: true, minWidth: 140 }
      })
  return result
}

export const AllTicketsPage = () => {
  const navigate = useNavigate()
  const [searchAttrib, setSearchAttrib] = useState('')
  const [searchString, setSearchString] = useState('')
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState<any>(1)
  const [count, setCount] = useState(10)

  const { data: ticketsData, isLoading } = useGetPaginatedTicketList({ per_page: pageSize, page })
  const { data: tickets }: any = ticketsData || {}

  useEffect(() => {
    if (tickets?.last_page) {
      setCount(tickets.last_page)
    }
  }, [tickets?.last_page])

  const cols = createCols(tickets?.data[0])

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
            {[...cols, { field: 'any', selected: false, headerName: 'Any' }].map((col, idx) => {
              return (
                <MenuItem key={idx} value={col.field} selected={!!col.selected}>
                  {col.headerName}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Max>

      <Spacer />

      <Wrapper flexDirection="column">
        <DataGrid
          density="comfortable"
          hideFooter
          onRowClick={(row) => {
            navigate(ROUTES.TICKET.replace(':id', String(row.id)))
          }}
          headerHeight={70}
          rows={tickets?.data || []}
          columns={cols}
          loading={isLoading}
        />
        <Spacer />
        <Stack spacing={2}>
          <Pagination
            shape="rounded"
            page={page}
            count={count}
            renderItem={(item) => {
              return <PaginationItem {...item} onClick={() => setPage(item?.page)} />
            }}
          />
        </Stack>
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
