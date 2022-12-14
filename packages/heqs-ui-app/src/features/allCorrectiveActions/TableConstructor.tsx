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

// Allowed filter(s) are `corrective_actions.user_id, corrective_actions.ticket_id, corrective_actions.ca_status_id, corrective_actions.corrective_action, corrective_actions.corrective_action_due_date_after, corrective_actions.corrective_action_due_date_before, corrective_actions.corrective_action_due_date_between, corrective_actions.created_at_after, corrective_actions.created_at_before, corrective_actions.created_at_between, corrective_actions.updated_at_after, corrective_actions.updated_at_before, corrective_actions.updated_at_between, tickets.ticket_class_id, tickets.ticket_category_id, tickets.ticket_status_id, tickets.created_user_id, tickets.responsible_user_id, tickets.root_cause_id, tickets.workcenter_id, tickets.correction, tickets.damaged_item, tickets.created_at_after, tickets.created_at_before, tickets.created_at_between, tickets.updated_at_after, tickets.updated_at_before, tickets.updated_at_between, tickets.date_time_created_after, tickets.date_time_created_before, tickets.date_time_created_between, workcenters.workcenter_group_id, workcenters.factory_id, workcenters.workcenter_number, workcenters.workcenter_name`."

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
            key === 'ticket_id'
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
            minWidth: minWidth + 30,
            renderCell: (params: GridRenderCellParams<any>) => {
              const isDate = isValid(parseISO(params.value))
              const isClass = params?.field?.includes('class')
              const isCategory = params?.field?.includes('categor')
              const isWorkcenter = params?.field?.includes('workcenter')
              const isStatus = params?.field?.includes('status')
              const isRootCause = params?.field?.includes('root')
              const isId = params?.field === 'ticket_id'

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
                    <StatusBulb
                      statusId={params.value}
                      type="ca"
                      statusText={
                        dictionaries.corrective_action_statuses[params.value - 1].ca_status_name
                      }
                    />
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
          : undefined,
      'filter[tickets.ticket_class_id]': formValues.ticket_class_id,
      'filter[corrective_actions.ticket_category_id]': formValues.ticket_category_id,
      'filter[corrective_actions.workcenter_id]': formValues.workcenter_id,
      'filter[corrective_actions.ca_status_id]': formValues.ca_status_id
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
