import styled from '@emotion/styled'
import { CircularProgress, Paper, Typography, useTheme } from '@mui/material'
import { Bar } from '@nivo/bar'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom'

import { ROUTES } from '../../consts/routes'
import { Flex, Pad } from '../primitives'

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

export const WorkcenterGraph = ({ data }: { data?: any }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const isEmpty = data?.length === 0
  const navigate = useNavigate()

  return (
    <div>
      <Paper variant="outlined">
        <Wrapper justifyContent="center" alignItems="center">
          {!data ? (
            <CircularProgress />
          ) : isEmpty ? (
            <Flex justifyContent="center" alignItems="center">
              <Typography>No data for selected month</Typography>
            </Flex>
          ) : (
            <Scrollbar
              style={{
                width: '100%',
                height: 550,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Bar
                data={data}
                animate={false}
                keys={['bar_part1', 'bar_part2', 'bar_part3']}
                indexBy="workcenter"
                margin={{ top: 0, right: 130, bottom: 30, left: 40 }}
                padding={0.3}
                innerPadding={3}
                valueScale={{ type: 'linear' }}
                colors={['#CC0101', '#FF8A00', '#013ecc']}
                axisTop={null}
                axisRight={null}
                axisLeft={{ tickSize: 0 }}
                onClick={(_data) => {
                  console.log('🐸 Pepe said => WorkcenterGraph => _data', _data)
                  return navigate(ROUTES.ALL_TICKETS)
                }}
                axisBottom={{
                  tickSize: 0,
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
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 10,
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
                width={1100}
                height={500}
                enableGridX={false}
                enableGridY={false}
                barAriaLabel={function (e) {
                  return e.id + ': ' + e.formattedValue + ' in workcenter: ' + e.indexValue
                }}
                theme={{ textColor: isDark ? '#fff' : '#000' }}
              />
            </Scrollbar>
          )}
        </Wrapper>
      </Paper>
    </div>
  )
}

const Wrapper = styled(Pad)`
  max-width: 100%;
  width: 100%;
  overflow: auto;

  rect {
    cursor: pointer;
    rx: 5px;
  }

  .ScrollbarsCustom-Wrapper .ScrollbarsCustom-Content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
