import styled from '@emotion/styled'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Button,
  capitalize,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { format, isValid, parse, parseISO } from 'date-fns'
import { number } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { RFCC } from '../../types/react'
import { useAuth } from '../auth/AuthProvider'
import { useDictionaries } from '../dictionaries/DictionariesProvider'
import { Flex, Spacer } from '../primitives'
import { Max } from '../primitives/Max'
import { StatusBulb } from '../primitives/StatusBulb'
import { TableFiltersCA } from './TableFiltersCA'

export const TableConstructor: RFCC<{
  data: any
  isLoading?: boolean
  filters?: any
  setFilters?: any
  page: number
  pageSize: number
  setPageSize: any
  setSorting: any
  sorting: any
  setPage: any
  rowId?: string
  refetch?: any
  type: 'ca' | 'tickets'
}> = ({
  data,
  isLoading,
  page,
  pageSize,
  setPageSize,
  rowId = 'id',
  setPage,
  filters,
  setFilters,
  sorting,
  setSorting,
  type,
  refetch,
  ...rest
}) => {
  const navigate = useNavigate()
  const dictionaries = useDictionaries()
  const { user } = useAuth()
  const [searchString, setSearchString] = useState('')
  const [cols, setCols] = useState<any>([])
  const [count, setCount] = useState(10)
  const methods = useForm({
    reValidateMode: 'onChange'
  })
  const { handleSubmit, control, formState, getValues, watch } = methods
  const createCols = (
    object: any
  ):
    | {
        field: string
        headerName: string
        editable: boolean
        resizable: boolean
        width?: number
        minWidth?: number
      }[]
    | [] => {
    const result = !object
      ? []
      : Object.keys(object).map((key) => {
          const letterWidth = 10
          const value = object[key]
          const valueWidth = value?.length ? value?.length * letterWidth : 1
          const minWidth =
            key === 'id'
              ? 200
              : valueWidth < key.length * letterWidth
              ? key.length * 10
              : valueWidth

          return {
            field: key,
            headerName: capitalize(key.replaceAll('_', ' ')),
            sortable: key !== 'id',
            editable: false,
            resizable: true,
            minWidth: minWidth,
            renderCell: (params: GridRenderCellParams<any>) => {
              const isDate = isValid(parseISO(params.value))
              const isClass = params?.field?.includes('class')
              const isCategory = params?.field?.includes('categor')
              const isWorkcenter = params?.field?.includes('workcenter')
              const isStatus = params?.field?.includes('status')
              const isRootCause = params?.field?.includes('root')
              const isId = params?.field === 'id'
              // console.log('🐸 Pepe said => :Object.keys => isClass', isClass)

              if (isId) {
                return (
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(ROUTES.TICKET.replace(':id', String(params.value)))
                    }}
                  >
                    Open ticket #{params.value}
                  </Button>
                )
              }

              if (isWorkcenter) {
                return (
                  <Tooltip title={dictionaries.workcenters[params.value - 1].workcenter_name}>
                    <span>{dictionaries.workcenters[params.value - 1].workcenter_name}</span>
                  </Tooltip>
                )
              }

              if (isRootCause) {
                return (
                  <Tooltip title={dictionaries.root_causes[params.value - 1].root_cause_name}>
                    <span>{dictionaries.root_causes[params.value - 1].root_cause_name}</span>
                  </Tooltip>
                )
              }

              if (isStatus) {
                return (
                  <Tooltip title={dictionaries.ticket_status[params.value - 1].ticket_status}>
                    {/* <span>{dictionaries.ticket_status[params.value - 1].ticket_status}</span> */}
                    <StatusBulb statusId={params.value} />
                  </Tooltip>
                )
              }

              if (isCategory) {
                return (
                  <Tooltip title={dictionaries.ticket_categories[params.value - 1].ticket_category}>
                    <span>{dictionaries.ticket_categories[params.value - 1].ticket_category}</span>
                  </Tooltip>
                )
              }

              if (isClass) {
                return (
                  <Tooltip title={dictionaries.ticket_class[params.value - 1].ticket_class}>
                    <span>{dictionaries.ticket_class[params.value - 1].ticket_class}</span>
                  </Tooltip>
                )
              }

              if (isDate) {
                const date = format(new Date(params.value), 'EEEE dd MMMM HH:mm:ss')
                return (
                  <Tooltip title={date}>
                    <span>{date}</span>
                  </Tooltip>
                )
              }

              return (
                <Tooltip title={params.value}>
                  <span>{params.value}</span>
                </Tooltip>
              )
            }
          }
        })
    return result
  }
  const formValues = getValues()

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      refetch()
      return console.log(value, name, type)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (data?.meta.last_page) {
      setCount(data.meta.last_page)
    }
  }, [data?.meta.last_page])

  useEffect(() => {
    if (data?.data[0]) {
      setCols(createCols(data?.data[0]))
    }
  }, [data?.data[0]])

  useEffect(() => {
    // по классу тикета
    // по сроку выполнения корр. действия
    // по категории тикета
    // по рабочему центру
    // по статусу корр. действия
    setFilters({
      ...filters,
      'filter[workcenters.factory_id]': user.factory_id,
      'filter[corrective_actions.corrective_action_due_date_between]':
        formValues?.corrective_action_due_date_between
          ? `${formValues?.corrective_action_due_date_between[0]?.toISOString()},${formValues?.corrective_action_due_date_between[1]?.toISOString()}`
          : '',
      'filter[corrective_actions.ticket_class_id]': formValues.ticket_class_id,
      'filter[corrective_actions.ticket_category_id]': formValues.ticket_category_id,
      'filter[corrective_actions.workcenter_id]': formValues.workcenter_id,
      'filter[corrective_actions.corrective_action_status_id]':
        formValues.corrective_action_status_id
    })
  }, [JSON.stringify(formValues)])

  return (
    <FormProvider {...methods}>
      {/* <Typography>Fast search</Typography>
      <Spacer space={10} />
    */}
      {/* <Spacer />
      <Divider />
      <Spacer />
      <Typography>Detailed search</Typography> */}
      <Spacer space={10} />
      <form>
        <TableFiltersCA />
      </form>

      <Spacer />

      <Wrapper flexDirection="column">
        <DataGrid
          density="comfortable"
          hideFooter
          getRowId={(row) => row[rowId]}
          rows={data?.data || []}
          columns={cols}
          loading={isLoading}
          disableVirtualization
          disableColumnMenu
          scrollbarSize={1}
          sortModel={sorting}
          onSortModelChange={(newSortModel) => {
            return setSorting(newSortModel)
          }}
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
    </FormProvider>
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
