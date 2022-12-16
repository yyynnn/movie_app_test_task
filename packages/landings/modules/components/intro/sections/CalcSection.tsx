import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { Max } from '../../../kit/Max'
import { Spacer } from '../../../kit/Spacer'
import { Text } from '../../../kit/Text'
import { Button } from '../../common/Button'
import { GradientEdge } from '../../common/GradientEdge'
import { Input } from '../../common/Input'
import NoSSR from '../../common/NoSSR'
import { Select } from '../../common/Select/src'

type Option = Readonly<{
  id: string
  label: string
}>

const options = [
  { id: 'manufacture', label: 'Manufacture' },
  { id: 'food', label: 'Food processing' },
  { id: 'heavy_machinary', label: 'Heavy machinary' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'construction', label: 'Construction' },
  { id: 'electric_power', label: 'Electric power' },
  { id: 'telecommunications', label: 'Telecommunications' }
]

export const CalcSection = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const getOptionValue = useCallback((opt: Option): string => opt.id, [])
  const onOptionChange = useCallback((opt: Option | null): void => setSelectedOption(opt), [])
  const getOptionLabel = useCallback((opt: Option): string => `${opt.label}`, [])

  return (
    <Wrapper>
      <GradientEdge />
      <Spacer space={100} />
      <Text size={40} bold center>
        Calculate your yearly fees for using HEQS features 365 days in a year
      </Text>
      <Spacer space={40} />
      <Form flexDirection="column" gap={30} maxWidth="700">
        <Input type="text" placeholder="Years" />

        <Select
          placeholder="Your industry"
          options={options}
          onOptionChange={onOptionChange}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
        />

        <Select
          placeholder="Your company size"
          options={options}
          onOptionChange={onOptionChange}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
        />

        <Button text="Get a quote" color="inverted" />
      </Form>
      <Spacer space={100} />
      <GradientEdge toTop />
    </Wrapper>
  )
}

const Form = styled(Max)`
  backdrop-filter: blur(3px);
  padding: 70px 4vw;
  margin: 0 auto;
  border: 1px solid #fff;
  border-radius: 10px;
`

const Wrapper = styled.div`
  background: #000;
  background-color: #000000;
  opacity: 1;
  background: radial-gradient(
      circle,
      transparent 20%,
      #000000 20%,
      #000000 80%,
      transparent 80%,
      transparent
    ),
    radial-gradient(circle, transparent 20%, #000000 20%, #000000 80%, transparent 80%, transparent)
      20px 20px,
    linear-gradient(#2a2a2a 1.6px, transparent 1.6px) 0 -0.8px,
    linear-gradient(90deg, #2a2a2a 1.6px, #000000 1.6px) -0.8px 0;
  background-size: 40px 40px, 40px 40px, 10px 10px, 10px 10px;
`
