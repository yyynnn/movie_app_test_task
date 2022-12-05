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
import { TableConstructor } from '../tableConstructor/TableConstructor'

const createCols = (object: any): { field: string; headerName: string; editable: boolean; selected: boolean; width?: number; minWidth?: number }[] | [] => {
  const result = !object
    ? []
    : Object.keys(object).map((key) => {
        return { field: key, headerName: capitalize(key.replaceAll('_', ' ')), editable: true, selected: true, minWidth: 140 }
      })
  return result
}

export const AllTicketsPage = () => {
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState<any>(1)

  const { data: ticketsData, isLoading, ...rest } = useGetPaginatedTicketList({ per_page: pageSize, page })
  const { data: tickets }: any = ticketsData || {}

  return <TableConstructor {...rest} data={tickets} isLoading={isLoading} page={page} pageSize={pageSize} setPageSize={setPageSize} setPage={setPage} />
}
