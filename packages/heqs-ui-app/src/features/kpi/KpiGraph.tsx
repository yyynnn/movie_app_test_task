import styled from '@emotion/styled'
import { Paper, Typography, useTheme } from '@mui/material'
import { Bar } from '@nivo/bar'
import { Pie } from '@nivo/pie'
import { BasicTooltip } from '@nivo/tooltip'
import { Tickets } from '../../types/api'
import _ from 'lodash'

import { Flex, Pad, Spacer } from '../primitives'

import { dataPieAFC } from './fakeData'

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

export const KpiGraph = ({ data }: { data?: Tickets }) => {
  const groupedByMonth = _.groupBy(data, ({ date_created }) => new Date(date_created).getMonth())
  let result: { month: string; OHS: number; QUAL: number; ENV: number }[] = []

  Object.entries(groupedByMonth).forEach(([key, array]) => {
    const month = new Date(array[0].date_created).toLocaleString('en-US', { month: 'long' })
    let OHS = 0
    let ENV = 0
    let QUAL = 0
    array.forEach((value, innerIndex) => {
      switch (value.category) {
        case 'OHS':
          OHS++
          break
        case 'ENV':
          ENV++
          break
        case 'QUAL':
          QUAL++
          break
        default:
          OHS = 0
          ENV = 0
          QUAL = 0
      }
    })

    result.push({ month: month, OHS: OHS, QUAL: QUAL, ENV: ENV })
  })
  // console.log(result)
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <div>
      <Paper variant="outlined">
        <Wrapper>
          <Bar
            data={result}
            keys={['OHS', 'ENV', 'QUAL']}
            indexBy="month"
            margin={{ top: 0, right: 130, bottom: 30, left: 40 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            colors={['#FF8A00', '#2ca02c', '#1f77b4']}
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
              return e.id + ': ' + e.formattedValue + ' in incidents: ' + e.indexValue
            }}
            theme={{ textColor: isDark ? '#fff' : '#000' }}
          />
        </Wrapper>
      </Paper>
      <Spacer />
      <Paper variant="outlined">
        <Wrapper>
          <Pie
            data={dataPieAFC}
            width={600}
            height={350}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            colors={['#CC0101', '#013ecc']}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            tooltip={({ datum: { id, value, color } }) => (
              <div
                style={{
                  padding: 8,
                  color,
                  background: isDark ? '#000' : '#fff'
                }}
              >
                <strong>
                  {id}: {value}
                </strong>
              </div>
            )}
            theme={{
              textColor: isDark ? '#fff' : '#000'
            }}
          />

          <Pie
            data={dataPieAFC}
            width={600}
            height={350}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            colors={['#CC0101', '#013ecc']}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            tooltip={({ datum: { id, value, color } }) => (
              <div
                style={{
                  padding: 8,
                  color,
                  background: isDark ? '#000' : '#fff'
                }}
              >
                <strong>
                  {id}: {value}
                </strong>
              </div>
            )}
            theme={{
              textColor: isDark ? '#fff' : '#000'
            }}
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
