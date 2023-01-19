import styled from '@emotion/styled'
import { Paper, TextField, Typography, useTheme } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Bar } from '@nivo/bar'
import { BasicTooltip } from '@nivo/tooltip'
import { isEqual } from 'date-fns'
import { useState } from 'react'

import { API } from '../../consts/api'
import { Workcenters } from '../../types/api'
import { useWorkcentersStat } from '../api/generated/endpoints'
import { useBasicQuery } from '../hooks/useBasicQuery'
import { Flex, Pad, Spacer } from '../primitives'
import { fakeData } from './fakeData'
import { WorkcenterGraph } from './WorkcenterGraph'

export const WorkcentersPage = (props: any) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const { data } = useWorkcentersStat(1)
  const { data: workcenters } = data || {}
  console.log('🐸 Pepe said => WorkcentersPage => workcenters', workcenters)

  const [ohsDate, setOhsDate] = useState<Date>(new Date('2007-12-17T03:24:00'))
  const [qDate, setQDate] = useState<Date>(new Date())

  const ohsData = fakeData.filter((workstation) => {
    const equalYear =
      !!new Date(workstation.date) &&
      new Date(workstation.date)?.getFullYear() === ohsDate?.getFullYear()
    const equalMonth =
      !!new Date(workstation.date) && new Date(workstation.date)?.getMonth() === ohsDate?.getMonth()
    return equalYear && equalMonth
  })

  return (
    <div>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          <b>OHS</b>
        </Typography>
        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          minDate={new Date('2006-03-01')}
          maxDate={new Date('2010-06-01')}
          value={ohsDate}
          onChange={(newValue: any) => {
            setOhsDate(newValue)
          }}
          renderInput={(params: any) => <TextField {...params} error={false} helperText={null} />}
        />
      </Flex>
      <Spacer />
      <WorkcenterGraph data={ohsData} />

      <Spacer space={100} />

      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          <b>Quality</b>
        </Typography>

        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          minDate={new Date('2012-03-01')}
          maxDate={new Date('2023-06-01')}
          value={qDate}
          onChange={(newValue: any) => {
            setQDate(newValue)
          }}
          renderInput={(params: any) => <TextField {...params} error={false} helperText={null} />}
        />
      </Flex>
      <Spacer />

      <WorkcenterGraph data={fakeData} />
    </div>
  )
}
