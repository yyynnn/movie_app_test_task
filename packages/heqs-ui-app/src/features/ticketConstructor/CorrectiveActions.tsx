import styled from '@emotion/styled'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { Button, Divider, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Flex, Pad, Spacer } from '../primitives'

export type TCorrectiveAction = {
  text: string
  responsible: string
  due_date: any
}

export const CorrectiveActions = () => {
  const [actions, setActions] = useState<TCorrectiveAction[]>([])
  const { control, register, getValues, formState, trigger, watch } = useForm()
  const errors = formState.errors

  const addItem = async () => {
    trigger()
    // @ts-ignore
    const newAction: TCorrectiveAction = getValues()
    if (newAction.text && newAction.responsible && newAction.due_date) {
      console.log('🐸 Pepe said => addItem => newAction.due_date', typeof newAction.due_date)
      // @ts-ignore
      setActions([...actions, { ...newAction, due_date: typeof newAction.due_date === 'object' ? newAction.due_date.toDateString() : newAction.due_date }])
    }
  }

  const removeItem = (id: number) => {
    setActions(actions.filter((action, idx) => idx !== id))
  }

  useEffect(() => {
    watch()
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
                        {idx + 1}. {action.text}
                      </b>
                    </Typography>
                    <Flex>
                      <Typography>
                        Responsible: <b>{action.responsible}</b>
                      </Typography>
                      <Spacer width={4} />
                      <Spacer width={4} />
                      <Typography>
                        Due: <b>{action.due_date}</b>
                      </Typography>
                    </Flex>
                  </div>
                  <IconButton onClick={() => removeItem(idx)}>
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Flex>
                <Spacer />
                <Divider />
                <Spacer />
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

      <Spacer />

      <Flex gap={6}>
        <Controller
          control={control}
          name="text"
          rules={{ required: 'Enter text' }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextField
                error={!value}
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
          rules={{ required: 'Enter name' }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextField
                error={!value}
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
          name="due_date"
          rules={{ required: 'Enter date' }}
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #ffffff36;
  border-radius: 30px;
`
