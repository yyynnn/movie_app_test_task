import styled from '@emotion/styled'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  capitalize,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker'
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker'
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker'
import { number } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useDictionaries } from '../dictionaries/DictionariesProvider'
import { Flex, Spacer } from '../primitives'

// ca
// по классу тикета
// по сроку выполнения корр. действия
// по категории тикета
// по рабочему центру
// по статусу корр. действия

export const TableFiltersCA = () => {
  const dictionaries = useDictionaries()
  const { ticket_class, ticket_categories, workcenters, corrective_action_statuses } = dictionaries

  const { control, getValues } = useFormContext()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Row>
        <Col lg={6}>
          <Controller
            control={control}
            name="ticket_class_id"
            rules={{ required: 'Ошибка' }}
            render={({ field: { onChange, ref, value, name } }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="ticket_class-label">Ticket class</InputLabel>
                  <Select
                    value={value || ''}
                    onChange={onChange}
                    labelId="ticket_class-label"
                    label="ticket_class"
                  >
                    {ticket_class?.map((ticketClass) => {
                      return (
                        //@ts-ignore - necessary to load object into value
                        <MenuItem key={ticketClass.id} value={ticketClass.id}>
                          {ticketClass.ticket_class_name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )
            }}
          />
          <Spacer />
        </Col>

        <Col lg={6}>
          <Controller
            control={control}
            name="corrective_action_due_date_between"
            rules={{ required: 'Ошибка' }}
            render={({ field: { onChange, ref, value, name } }) => {
              return (
                <MobileDateRangePicker
                  ref={ref}
                  value={value || [null, null]}
                  onChange={(newValue) => {
                    onChange(newValue)
                  }}
                  renderInput={(startProps, endProps) => (
                    <Flex justifyContent="space-between" alignItems="center" width="100%" gap={10}>
                      <TextField {...startProps} label="Create at start date" fullWidth />
                      <Typography>to</Typography>
                      <TextField {...endProps} fullWidth label="Create at end date" />
                    </Flex>
                  )}
                />
              )
            }}
          />
          <Spacer />
        </Col>

        <Col lg={4}>
          <Controller
            control={control}
            name="ticket_category"
            rules={{ required: 'Ошибка' }}
            render={({ field: { onChange, ref, value, name } }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="ticket_category-label">Ticket category</InputLabel>
                  <Select
                    value={value || ''}
                    onChange={onChange}
                    labelId="ticket_category-label"
                    label="ticket_category"
                  >
                    {ticket_categories?.map((ticketCategory) => {
                      return (
                        <MenuItem key={ticketCategory.id} value={ticketCategory.id}>
                          {ticketCategory.ticket_category}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )
            }}
          />
          <Spacer />
        </Col>

        <Col lg={4}>
          <Controller
            control={control}
            name="workcenter_id"
            rules={{ required: 'Ошибка' }}
            render={({ field: { onChange, ref, value, name } }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="workcenters-label">Workcenter</InputLabel>
                  <Select
                    value={value || ''}
                    onChange={onChange}
                    labelId="workcenters-label"
                    label="workcenters"
                  >
                    {workcenters?.map((workcenter) => {
                      return (
                        <MenuItem key={workcenter.id} value={workcenter.id}>
                          {workcenter.workcenter_name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )
            }}
          />
          <Spacer />
        </Col>

        <Col lg={4}>
          <Controller
            control={control}
            name="corrective_action_status_id"
            rules={{ required: 'Ошибка' }}
            render={({ field: { onChange, ref, value, name } }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="workcenters-label">CA status</InputLabel>
                  <Select
                    value={value || ''}
                    onChange={onChange}
                    labelId="corrective_action_status_id-label"
                    label="corrective_action_status_id"
                  >
                    {corrective_action_statuses?.map((castatus) => {
                      return (
                        <MenuItem key={castatus.id} value={castatus.id}>
                          {castatus.ca_status_name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )
            }}
          />
          <Spacer />
        </Col>
      </Row>
    </LocalizationProvider>
  )
}
