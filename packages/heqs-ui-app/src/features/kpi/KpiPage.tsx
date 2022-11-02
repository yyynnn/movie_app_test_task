import styled from '@emotion/styled'
import { Paper, Typography, useTheme } from '@mui/material'
import { Bar } from '@nivo/bar'
import { BasicTooltip } from '@nivo/tooltip'
import { KpiGraph } from './KpiGraph'
import { Flex, Pad, Spacer } from '../../primitives'

export const KpiPage = (props: any) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div>
      <Flex width="100%" justifyContent="space-between">
        <Typography variant="h6">
          <b>2019</b>
        </Typography>
      </Flex>
      <Spacer />
      <KpiGraph />
    </div>
  )
}
