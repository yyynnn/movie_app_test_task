import styled from '@emotion/styled'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { capitalize, FormControl, InputAdornment, InputLabel, MenuItem, Pagination, PaginationItem, Select, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'

import { ROUTES } from '../../consts/routes'
import { RFCC } from '../../types/react'
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

export const TableConstructor: RFCC<{ data: any; isLoading?: boolean; page: number; pageSize: number; setPageSize: any; setPage: any }> = ({
  data,
  isLoading,
  page,
  pageSize,
  setPageSize,
  setPage
}) => {
  const navigate = useNavigate()
  const [searchAttrib, setSearchAttrib] = useState('')
  const [searchString, setSearchString] = useState('')
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (data?.last_page) {
      setCount(data.last_page)
    }
  }, [data?.last_page])

  const cols = createCols(data?.data[0])

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
          rows={data?.data || []}
          columns={cols}
          loading={isLoading}
          disableVirtualization
          scrollbarSize={1}
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

  .div::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 5px solid transparent;
    background-clip: content-box;
    background-color: #8070d4;
  }
`
