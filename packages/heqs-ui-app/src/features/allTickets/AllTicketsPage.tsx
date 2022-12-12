import { capitalize } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { CogentQuery } from '../../utils/cogent'
import { useGetPaginatedTicketList } from '../api/generated/endpoints'
import { TableConstructor } from '../tableConstructor/TableConstructor'

export const AllTicketsPage = () => {
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState<any>(1)
  const [filters, setFilters] = useState<{ category: string; string: string }>({
    category: '',
    string: ''
  })
  const [sorting, setSorting] = useState<{ field: string; sort: string }[]>([
    {
      field: '',
      sort: ''
    }
  ])

  const currentFilter = filters.category
    ? {
        [`filter[tickets.${filters.category}]`]: filters.string
      }
    : {}

  const currentSorting: any = sorting.length
    ? sorting.map((field) => {
        return `${field.sort === 'asc' ? '' : '-'}${field.field}`
      })
    : []

  const {
    data: ticketsData,
    isLoading,
    ...rest
  } = useGetPaginatedTicketList({
    'page[size]': pageSize,
    'page[number]': page,
    sort: currentSorting,
    ...currentFilter
  })
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
      sorting={sorting}
      setSorting={setSorting}
      rowId="id"
    />
  )
}
