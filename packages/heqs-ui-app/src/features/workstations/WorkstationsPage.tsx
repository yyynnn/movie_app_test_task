import styled from '@emotion/styled'
import { Paper, Typography, useTheme } from '@mui/material'
import { Bar } from '@nivo/bar'
import { BasicTooltip } from '@nivo/tooltip'

import { Flex, Pad, Spacer } from '../../primitives'
import { data } from './fakeData'
import { WorkstationGraph } from './WorkstationGraph'

// {
//     "index": 8,
//     "x": 423,
//     "y": 21,
//     "absX": 463,
//     "absY": 21,
//     "width": 35,
//     "height": 158,
//     "color": "#FF8A00",
//     "label": "bar_part2 - C198",
//     "id": "bar_part2",
//     "value": 2966.02,
//     "formattedValue": "2966.02",
//     "hidden": false,
//     "indexValue": "C198",
//     "data": {
//         "bar_part1": 2469.29,
//         "bar_part2": 2966.02,
//         "bar_part3": 404.05,
//         "workstation": "C198"
//     }
// }

export const WorkstationsPage = (props: any) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div>
      <Flex width="100%" justifyContent="space-between">
        <Typography variant="h6">
          <b>OHS</b>
        </Typography>

        <Typography variant="h6">08.08.1991</Typography>
      </Flex>
      <Spacer />
      <WorkstationGraph />
    </div>
  )
}
