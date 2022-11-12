import styled from '@emotion/styled'
import { useState } from 'react'
import { Paper, Typography, useTheme, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useBasicQuery } from '../hooks/useBasicQuery'
import { Tickets } from '../../types/api'
import { Bar } from '@nivo/bar'
import { BasicTooltip } from '@nivo/tooltip'
import { KpiGraph } from './KpiGraph'
import { Flex, Pad, Spacer } from '../primitives'
import { API } from '../../consts/api'
import { tickets } from './fakeData'

export const KpiPage = (props: any) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  // const { data: tickets } = useBasicQuery<{ data: Tickets }>({
  //   apiPath: API.GET.TICKETS_LIST
  // })
  const [date, setDate] = useState<Date>(new Date('2008-01-17T03:24:00'))

  const ticketData = tickets.filter((t) => {
    const equalYear = new Date(t.date_created)?.getFullYear() === date?.getFullYear()
    return equalYear
  })

  return (
    <div>
      <Flex width="100%" justifyContent="space-between">
        <Typography variant="h4">
          <b>Key Perfomance Indicators</b>
        </Typography>
        <DatePicker
          views={['year']}
          label="Year"
          minDate={new Date('2006-03-01')}
          maxDate={new Date('2010-06-01')}
          value={date}
          onChange={(newValue: any) => {
            setDate(newValue)
          }}
          renderInput={(params: any) => <TextField {...params} error={false} helperText={null} />}
        />
      </Flex>
      <Spacer />
      <KpiGraph data={ticketData} />
    </div>
  )
}
