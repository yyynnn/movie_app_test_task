import styled from '@emotion/styled'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import {
  Button,
  Divider,
  IconButton,
  List,
  Paper,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { RFCC } from '../../types/react'
import { useReadCorrectiveActionsByTicketId } from '../api/generated/endpoints'
import { CorrectiveAction } from '../api/generated/models'
import { useDictionaries } from '../dictionaries/DictionariesProvider'
import { Flex, Pad, Spacer } from '../primitives'
import { StatusBulb } from '../primitives/StatusBulb'

export const CorrectiveActions: RFCC<{ id?: string; readOnly?: boolean; ticketId: number }> = ({
  id,
  readOnly,
  ticketId
}) => {
  const [actions, setActions] = useState<CorrectiveAction[]>([])
  const { control, register, getValues, formState, trigger, watch } = useForm()
  const { corrective_action_statuses } = useDictionaries()
  const { data, isLoading } = useReadCorrectiveActionsByTicketId(ticketId)
  const { data: ca } = data || {}

  const errors = formState.errors
  const isEditMode = readOnly

  const addItem = async () => {
    trigger()
    // @ts-ignore
    const newAction: CorrectiveAction = getValues()
    if (newAction.corrective_action && newAction.user_id && newAction.corrective_action_due_date) {
      // @ts-ignore
      setActions([
        ...actions,
        {
          ...newAction,
          corrective_action_due_date:
            typeof newAction.corrective_action_due_date === 'object'
              ? newAction.corrective_action_due_date
              : newAction.corrective_action_due_date
        }
      ])
    }
  }

  const removeItem = (id: number) => {
    setActions(actions.filter((action, idx) => idx !== id))
  }

  useEffect(() => {
    if (!readOnly) {
      watch()
    }
  }, [])

  const cols: {
    field: string
    headerName: string
    editable: boolean
    resizable: boolean
    width?: number
    minWidth?: number
    renderCell?: any
  }[] = [
    // { field: 'id', headerName: 'Id', editable: true, resizable: true },
    {
      field: 'corrective_action',
      minWidth: 300,
      headerName: 'Corrective action',
      editable: true,
      resizable: true,
      renderCell: (params: any) => {
        return (
          <Tooltip title={params.value}>
            <span>{params.value}</span>
          </Tooltip>
        )
      }
    },
    {
      field: 'corrective_action_due_date',
      headerName: 'corrective_action_due_date',
      editable: true,
      resizable: true,
      minWidth: 300,
      renderCell: (params: any) => {
        const date = format(new Date(params.value), 'EEEE dd MMMM HH:mm:ss')
        return (
          <Tooltip title={date}>
            <span>{date}</span>
          </Tooltip>
        )
      }
    },
    {
      field: 'ca_status_id',
      headerName: 'ca_status_id',
      editable: true,
      resizable: true,
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Tooltip title={corrective_action_statuses[params.value - 1].ca_status_name}>
            <StatusBulb
              statusId={params.value}
              type="ca"
              statusText={corrective_action_statuses[params.value - 1].ca_status_name}
            />
          </Tooltip>
        )
      }
    },
    {
      field: 'button',
      headerName: '',
      editable: true,
      resizable: true,
      renderCell: (params: any) => {
        console.log('🐸 Pepe said => params', params)

        return (
          <IconButton>
            <DeleteForeverRoundedIcon />
          </IconButton>
        )
      }
    }
  ]

  return (
    <Wrapper>
      <DataGridPremium
        // density="compact"
        hideFooter
        rows={ca || []}
        columns={cols}
        loading={isLoading}
        disableColumnMenu
      />

      {!readOnly && (
        <div>
          <Spacer />

          <Flex gap={6}>
            <Controller
              control={control}
              name="user_id"
              rules={readOnly ? {} : { required: readOnly ? false : 'Enter text' }}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    error={readOnly ? false : !value}
                    onChange={(v) => {
                      trigger()
                      onChange(v)
                    }}
                    value={value}
                    label="Correction text"
                    fullWidth
                  />
                )
              }}
            />

            <Controller
              control={control}
              name="responsible"
              rules={readOnly ? {} : { required: readOnly ? false : 'Enter name' }}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    error={readOnly ? false : !value}
                    onChange={(v) => {
                      trigger()
                      onChange(v)
                    }}
                    value={value}
                    fullWidth
                    label="Responsible"
                  />
                )
              }}
            />

            <Controller
              control={control}
              name="corrective_action_due_date"
              rules={{ required: readOnly ? false : 'Enter date' }}
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    views={['year', 'month', 'day']}
                    label="Due date"
                    minDate={new Date('2001-09-11')}
                    maxDate={new Date()}
                    inputFormat="MM.dd.yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        {...register('corrective_action_due_date')}
                        fullWidth
                        error={false}
                        helperText={null}
                      />
                    )}
                  />
                )
              }}
            />
          </Flex>

          <Spacer />
          <Button onClick={addItem} fullWidth variant="contained">
            <AddRoundedIcon /> ADD NEW ACTION
          </Button>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* padding: 20px; */
  /* border: 1px solid #ffffff36;
  border-radius: 30px; */
  height: 400px;
`
