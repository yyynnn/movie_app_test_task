import styled from '@emotion/styled'
import { Box, Breadcrumbs, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { useGetPaginatedCorrectiveActionList } from '../api/generated/endpoints'
import { TableConstructor } from '../tableConstructor/TableConstructor'

export const AllCorrectiveActionsPage = () => {
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState<any>(1)

  const {
    data: caData,
    isLoading,
    ...rest
  } = useGetPaginatedCorrectiveActionList({ 'page[size]': pageSize, 'page[number]': page })
  const { data: ca }: any = caData || {}

  return (
    <TableConstructor
      {...rest}
      data={ca}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setPage={setPage}
    />
  )
}
