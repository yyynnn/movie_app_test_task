import { capitalize } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { CogentQuery } from '../../utils/cogent'
import { useGetPaginatedTicketList } from '../api/generated/endpoints'
import { TableConstructor } from '../tableConstructor/TableConstructor'

export const AllTicketsPage = () => {
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState<any>(1)
  const [filters, setFilters] = useState<{ filter: string; string: string }>({
    filter: '',
    string: ''
  })

  const currentFilter = filters.filter
    ? {
        [`filter[tickets.${filters.filter}]`]: filters.string
      }
    : {}

  const {
    data: ticketsData,
    isLoading,
    ...rest
  } = useGetPaginatedTicketList({ 'page[size]': pageSize, 'page[number]': page, ...currentFilter })
  const { data: tickets }: any = ticketsData || {}

  return (
    <TableConstructor
      {...rest}
      data={tickets}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setPage={setPage}
      filters={filters}
      setFilters={setFilters}
      rowId="id"
    />
  )
}
