import styled from '@emotion/styled'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { Button, Divider, IconButton, List, Paper, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { RFCC } from '../../types/react'
import { useReadCorrectveActionsByTicketId } from '../api/generated/endpoints'
import { CorrectiveAction } from '../api/generated/models'
import { Flex, Pad, Spacer } from '../primitives'

export const CorrectiveActions: RFCC<{ id?: string; readOnly?: boolean; ticketId: number }> = ({ id, readOnly, ticketId }) => {
  const [actions, setActions] = useState<CorrectiveAction[]>([])
  const { control, register, getValues, formState, trigger, watch } = useForm()
  const { data } = useReadCorrectveActionsByTicketId(ticketId)
  const { data: ca } = data || {}
  console.log('🐸 Pepe said => ca', ca)

  const errors = formState.errors
  const isEditMode = readOnly

  const addItem = async () => {
    trigger()
    // @ts-ignore
    const newAction: CorrectiveAction = getValues()
    if (newAction.corrective_action && newAction.user_id && newAction.corrective_action_due_date) {
      // @ts-ignore
      setActions([...actions, { ...newAction, due_date: typeof newAction.due_date === 'object' ? newAction.due_date.toDateString() : newAction.due_date }])
    }
  }

  const removeItem = (id: number) => {
    setActions(actions.filter((action, idx) => idx !== id))
  }

  useEffect(() => {
    if (ca) {
      setActions(ca)
    }
  }, [ca?.length && JSON.stringify(data)])

  useEffect(() => {
    if (!readOnly) {
      watch()
    }
  }, [])

  return (
    <Wrapper>
      <List dense={false}>
        {actions.length ? (
          actions.map((action, idx) => {
            return (
              <div key={idx}>
                <Flex gap={6} justifyContent="space-between" alignItems="center">
                  <div>
                    <Typography variant="h5">
                      <b>
                        {idx + 1}. {action.corrective_action}
                      </b>
                    </Typography>
                    <Flex>
                      <Typography>
                        Responsible: <b>{action.user_id}</b>
                      </Typography>
                      <Spacer width={4} />
                      <Spacer width={4} />
                      <Typography>
                        Due: <b>{action.corrective_action_due_date}</b>
                      </Typography>
                    </Flex>
                  </div>
                  <IconButton onClick={() => removeItem(idx)}>
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Flex>
                {isEditMode && (
                  <div>
                    <Spacer space={4} />
                    <Divider />
                    <Spacer space={4} />
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <Paper>
            <Pad>
              <Typography>No items</Typography>
            </Pad>
          </Paper>
        )}
      </List>

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
                    renderInput={(params: any) => <TextField {...params} {...register('due_date')} fullWidth error={false} helperText={null} />}
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
  padding: 20px;
  border: 1px solid #ffffff36;
  border-radius: 30px;
`
