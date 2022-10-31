// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import styled from '@emotion/styled'
import { ResponsiveBar } from '@nivo/bar'

import { data } from './fakeData'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const WorkstationsPage = (props: any) => {
  return (
    <Wrapper>
      <ResponsiveBar
        data={data}
        keys={['bar_part1', 'bar_part2', 'bar_part3']}
        indexBy="workstation"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={['#CC0101', '#FF8A00', '#013ecc']}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Workstation',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'OHS',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableLabel={false}
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
        enableGridX={false}
        enableGridY={false}
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in workstation: ' + e.indexValue
        }}
        theme={{ textColor: '#fff' }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 400px;
`
