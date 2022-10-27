import styled from '@emotion/styled'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Badge, Breadcrumbs, Button, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import imageCompression from 'browser-image-compression'
import React, { MouseEventHandler, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Col, Row } from 'react-grid-system'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { useBasicMutation } from '../../hooks/useBasicMutation'
import { useBasicQuery } from '../../hooks/useBasicQuery'
import { Flex, Pad, Spacer } from '../../primitives'
import { LinearProgressBuffer } from '../../primitives/LinearProgressBuffer'
import { Employees, Ticket, Tickets, Workcenters } from '../../types/api'
import { RFCC } from '../../types/react'
import { convertToBase64 } from '../../utils'

type TicketConstructorType = {
  heading?: string | undefined
  ticketClass?: number | undefined
  ticketCategory?: number | undefined
  hasTime?: boolean | undefined
  hasDate?: boolean | undefined
  hasForeman?: boolean | undefined
  hasWorkscenter?: boolean | undefined
  hasDamagedItem?: boolean | undefined
  hasShortDescription?: boolean | undefined
  readOnly?: boolean | undefined
  initialData?: any
}

export const TicketConstructor: RFCC<TicketConstructorType> = ({
  heading = 'Ticket',
  ticketClass = 2,
  ticketCategory = 6,
  hasTime = true,
  hasDate = true,
  hasForeman = true,
  hasWorkscenter = true,
  hasDamagedItem = true,
  hasShortDescription = false,
  readOnly = false,
  initialData
}) => {
  const { mutate: addTicket, isLoading: isAddingTicket } = useBasicMutation<any>({
    apiPath: API.MUTATE.ADD_TICKET,
    onSuccess: () => {
      navigate(ROUTES.TICKET_SUCCESS)
    },
    onError: (error: any) => {
      console.log('🐸 Pepe said => error', error)
      toast.error(`Network error: ${error.response.data.message}`)
    }
  })

  const { data: employees } = useBasicQuery<Employees>({
    apiPath: API.GET.EMPLOYEES
  })

  const { data: workcenters } = useBasicQuery<Workcenters>({
    apiPath: API.GET.WORK_CENTERS
  })

  const { handleSubmit, control, formState, getValues, watch, setValue } = useForm({
    defaultValues: initialData
  })
  const navigate = useNavigate()
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: async (acceptedFiles: any) => {
      const compressedFile = await imageCompression(acceptedFiles[0], {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true
      })
      const pic = await convertToBase64(compressedFile)

      setValue('photo', pic, { shouldValidate: true })
      setValue('selectedFile', acceptedFiles[0].name, { shouldValidate: true })
    },
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
    disabled: false
  })

  const removeAllFiles: MouseEventHandler = (e) => {
    e.stopPropagation()
    setValue('photo', null, { shouldValidate: true })
  }

  const onSubmit = (data: any) => {
    addTicket({
      data: {
        ...data,
        ticket_class_id: ticketClass,
        ticket_category_id: ticketCategory,
        foreman: employees?.find((employee) => employee.id === data.foreman_id)?.name,
        workcenter: workcenters?.find((employee) => employee.id === data.workcenter_id)?.number
      }
    })
  }

  const errors = formState.errors
  const formValues = getValues()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Form $readOnly={readOnly}>
        <Stack direction={{ md: 'column', lg: 'row' }} divider={<Divider orientation="vertical" flexItem />} spacing={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
          {hasDate && (
            <Controller
              control={control}
              name="date_created"
              rules={{ required: 'Ошибка' }}
              render={({ field: { onChange, ref, value, name } }) => {
                return (
                  <DatePicker
                    ref={ref}
                    label="Date"
                    value={value && typeof value !== 'string' ? value.toISOString() : value || ''}
                    onChange={onChange}
                    renderInput={(params) => {
                      return <TextField {...params} error={!!errors[name]} fullWidth />
                    }}
                  />
                )
              }}
            />
          )}

          {hasTime && (
            <Controller
              control={control}
              name="time_created"
              rules={{ required: 'Ошибка' }}
              render={({ field: { onChange, ref, value, name } }) => {
                return (
                  <TimePicker
                    label="Time"
                    value={value && typeof value !== 'string' ? value.toISOString() : value || ''}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} error={!!errors[name]} fullWidth />}
                  />
                )
              }}
            />
          )}

          {hasForeman && (
            <Controller
              control={control}
              name="foreman_id"
              rules={{ required: 'Ошибка' }}
              render={({ field: { onChange, ref, value, name } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id="foreman-label">Foreman</InputLabel>
                    <Select value={value || ''} onChange={onChange} labelId="foreman-label" label="Foreman" error={!!errors[name]}>
                      {employees?.map((employee) => {
                        return (
                          //@ts-ignore - necessary to load object into value
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.name + ' ' + employee.surname}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                )
              }}
            />
          )}

          {hasWorkscenter && (
            <Controller
              control={control}
              name="workcenter_id"
              rules={{ required: 'Ошибка' }}
              render={({ field: { onChange, ref, value, name } }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id="workcenter-label">Workcenter</InputLabel>
                    <Select value={value || ''} onChange={onChange} labelId="workcenter-label" label="Workcenter" error={!!errors[name]}>
                      {workcenters?.map((workcenter) => {
                        return (
                          //@ts-ignore - necessary to load object into value
                          <MenuItem key={workcenter.id} value={workcenter.id}>
                            {workcenter.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                )
              }}
            />
          )}

          {hasDamagedItem && (
            <Controller
              control={control}
              name="damaged_item"
              rules={{ required: 'Ошибка' }}
              render={({ field: { onChange, ref, value, name } }) => {
                return <TextField onChange={onChange} value={value} fullWidth label="Damaged Item" error={!!errors[name]} />
              }}
            />
          )}

          {hasShortDescription && (
            <Controller
              control={control}
              name="correction"
              rules={{ required: 'Ошибка' }}
              render={({ field: { onChange, value, name } }) => {
                return <TextField onChange={onChange} value={value} fullWidth label="Short description" error={!!errors[name]} />
              }}
            />
          )}
        </Stack>
        <Spacer />

        <Row>
          <Col md={6}>
            {!readOnly && (
              <Controller
                name="photo"
                rules={{ required: 'Ошибка' }}
                control={control}
                defaultValue=""
                render={({ field: { name } }) => {
                  return (
                    <DropzoneWrapper variant="outlined" $haserrors={errors[name] ? 'true' : null}>
                      <Pad>
                        <Dropzone {...getRootProps()}>
                          <div>
                            <input type="text" {...getInputProps()} name={name} />
                            {formValues.photo ? (
                              <div>
                                <DropzoneThumb>
                                  <LinearProgressBuffer />
                                  <IconWrapper>
                                    <Button color="error" variant="contained" onClick={removeAllFiles}>
                                      <DeleteForeverRoundedIcon />
                                    </Button>
                                  </IconWrapper>
                                  <img src={formValues.photo} alt="thumb" />
                                </DropzoneThumb>
                              </div>
                            ) : (
                              <Flex justifyContent="center" alignItems="center">
                                <UploadFileRoundedIcon />
                                <Spacer width={10} />
                                <Typography variant="h6">Click or drag to upload</Typography>
                              </Flex>
                            )}
                          </div>
                        </Dropzone>
                      </Pad>
                    </DropzoneWrapper>
                  )
                }}
              />
            )}

            <Spacer />
          </Col>
          <Col md={readOnly ? 12 : 6}>
            {!hasShortDescription && (
              <Controller
                control={control}
                name="correction"
                rules={{ required: 'Ошибка' }}
                render={({ field: { onChange, value, name } }) => {
                  return <TextField onChange={onChange} value={value} fullWidth label="Correction" error={!!errors[name]} multiline rows={16} defaultValue="" />
                }}
              />
            )}
            <Spacer />
          </Col>
        </Row>

        {!!Object.keys(errors).length && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Please fill out these fields: {Object.keys(errors).join(', ')}
          </Alert>
        )}

        <Spacer />

        {!readOnly && (
          <LoadingButton loading={isAddingTicket} fullWidth size="large" variant="contained" onClick={handleSubmit((data) => onSubmit(data))}>
            SUBMIT
          </LoadingButton>
        )}
      </Form>
    </LocalizationProvider>
  )
}

const Form = styled.form<{ $readOnly: boolean }>`
  & * {
    pointer-events: ${({ $readOnly }) => ($readOnly ? 'none' : '')};
  }
`

const DropzoneWrapper = styled.div<any>`
  height: 400px;
  width: 100%;
  border: ${({ $haserrors }) => ($haserrors ? `1px solid #ff0000` : `1px solid #52729457`)};
  border-radius: 30px;
  :hover {
    border: 1px solid ${({ theme }) => (theme.palette.mode === 'light' ? '#000' : '#fff')};
  }

  & > * {
    height: 100%;
  }
`

const Dropzone = styled.div`
  border: 2px dashed #1b426a;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100%;
  cursor: pointer;
`

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DropzoneThumb = styled.div`
  position: relative;

  img {
    max-width: 300px;
    width: 100%;
    border-radius: 10px;
    box-shadow: -1px 9px 20px -11px #000;
  }
`
