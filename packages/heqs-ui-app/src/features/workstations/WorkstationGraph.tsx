import styled from '@emotion/styled'
import { Paper, Typography, useTheme } from '@mui/material'
import { Bar } from '@nivo/bar'
import { BasicTooltip } from '@nivo/tooltip'

import { Pad } from '../../primitives'
import { data } from './fakeData'

const BarTooltip: React.FunctionComponent<any> = (props, idx) => {
  return (
    <Paper>
      <Pad>
        <div>
          <Typography>
            <b>{props.label}</b>
          </Typography>
          <Typography>{props.value}</Typography>
        </div>
      </Pad>
    </Paper>
  )
}

export const WorkstationGraph = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div>
      <Paper variant="outlined">
        <Wrapper>
          <Bar
            data={data}
            keys={['bar_part1', 'bar_part2', 'bar_part3']}
            indexBy="workstation"
            margin={{ top: 0, right: 130, bottom: 30, left: 40 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            colors={['#CC0101', '#FF8A00', '#013ecc']}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            enableLabel={false}
            tooltip={BarTooltip}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            role="application"
            borderRadius={6}
            width={1200}
            height={350}
            enableGridX={false}
            enableGridY={false}
            barAriaLabel={function (e) {
              return e.id + ': ' + e.formattedValue + ' in workstation: ' + e.indexValue
            }}
            theme={{ textColor: isDark ? '#fff' : '#000' }}
          />
        </Wrapper>
      </Paper>
    </div>
  )
}

const Wrapper = styled(Pad)`
  height: 400px;
  max-width: 100%;
  width: 100%;
  overflow: auto;
`
