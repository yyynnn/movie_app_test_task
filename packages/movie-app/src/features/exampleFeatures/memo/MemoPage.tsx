import { Button, Input, Paper, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

import { Pad, Spacer } from '../../primitives'
import { Cards } from './Cards'
import { TCard } from './types'

// export type TCard = { name: string; time: string | Date }

export const MemoPage = () => {
  //state
  const [inputValue, setInputValue] = React.useState<TCard>({ name: '', time: '' })

  const [cards, setCards] = useState<TCard[]>([])

  // handlers
  const inputChangeHandler = useCallback(
    (event: any) => {
      // нереальный пример,
      // важно не как, а где (композиция) и откуда (провайдер данных)
      const time = new Date().toLocaleString()
      setInputValue({ name: event.target.value, time })
    },
    [inputValue]
  )

  const addHandler = useCallback(() => {
    setCards([...cards, inputValue])
  }, [inputValue])

  return (
    <div>
      <Pad>
        <div>
          <Input value={inputValue.name} onChange={inputChangeHandler} />
          <Button onClick={addHandler}>Add</Button>
          <Spacer />
          <Cards cards={cards} />
        </div>
      </Pad>
    </div>
  )
}
