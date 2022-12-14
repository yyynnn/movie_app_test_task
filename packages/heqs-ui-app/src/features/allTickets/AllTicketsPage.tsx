import { capitalize } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { CogentQuery } from '../../utils/cogent'
import { useGetPaginatedTicketList } from '../api/generated/endpoints'
import { TableConstructor } from './TableConstructor'

export const AllTicketsPage = () => {
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState<any>(1)
  const [filters, setFilters] = useState({})
  const [sorting, setSorting] = useState<{ field: string; sort: string }[]>([
    {
      field: '',
      sort: 'asc'
    }
  ])

  const currentSorting: any = sorting.length
    ? sorting.map((field) => {
        return `${field.sort === 'asc' ? '' : '-'}${field.field}`
      })
    : []

  const {
    data: ticketsData,
    isLoading,
    refetch,
    ...rest
  } = useGetPaginatedTicketList({
    'page[size]': pageSize,
    'page[number]': page,
    sort: currentSorting,
    ...filters
  })
  const { data: tickets }: any = ticketsData || {}

  return (
    <TableConstructor
      {...rest}
      refetch={refetch}
      data={tickets}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setPage={setPage}
      filters={filters}
      setFilters={setFilters}
      sorting={sorting}
      setSorting={setSorting}
      rowId="id"
      type="tickets"
    />
  )
}
