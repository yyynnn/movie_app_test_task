import { Button, Input, Paper, Typography } from '@mui/material'
import React, { MouseEvent, useCallback, useState } from 'react'

import { uuid4 } from '../../utils'
import { Pad, Spacer } from '../primitives'
import { Cards } from './Cards'
import { TCard } from './types'

export const MemoCallBacksPage = (props: any) => {
  //state
  const [inputData, setInputData] = React.useState<TCard>({ name: '', time: '', id: '' })
  const [cards, setCards] = useState<TCard[]>([])

  // вот тут "оптимизация" вредит, т.к. при каждом рендере будет выпонятся код useCallback
  // колбек никуда не передаем, поэтому нет смысла его оптимизировать
  const addHandler = useCallback(() => {
    setCards([...cards, inputData])
  }, [inputData])

  // useCallback - для оптимизации, чтобы не пересоздавать функцию при каждом рендере
  // ! важно, что useCallback возвращает функцию, а не ее результат
  // ! при передаче функции как проп оптимизация полезна
  // ! но важно не забыть закинуть в зависимости все, что используется внутри функции
  const removeHandler = useCallback(
    (returnValue: string) => {
      console.log('🐸 Pepe said => removeHandler => val', returnValue)
      console.log('🐸 Pepe said => removeHandler => cards', cards)

      const newCards = cards.filter((card) => {
        return card.name !== returnValue
      })
      setCards(newCards)
    },
    // сюда
    [cards]
  )

  const inputHandler = useCallback((event: any) => {
    const id = uuid4()
    // time - нереальный пример,
    // важно не как, а где (композиция) и откуда (провайдер данных)
    const currentTime = new Date().toLocaleString()
    // этот пример уже приближен к реальности
    const someTime = props.someTimeFromApi + ' ' + currentTime

    setInputData({ name: event.target.value, time: currentTime, id })
  }, [])

  // итог: useCallback - для ПЕРЕДАЧИ функции(колбека) как проп, чтобы не пересоздавать функцию при каждом рендере в циклах
  // и только в больших наборах данных
  // и при тяжелой работе внутри функции

  return (
    <div>
      <Pad>
        <div>
          <Input value={inputData.name} onChange={inputHandler} />
          <Button onClick={addHandler}>Add</Button>
          <Spacer />
          <Cards cards={cards} removeHandler={removeHandler} />
        </div>
      </Pad>
    </div>
  )
}
