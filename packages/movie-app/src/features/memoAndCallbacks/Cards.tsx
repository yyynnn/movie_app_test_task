import { Button, Paper, Typography } from '@mui/material'
import { RFCC } from 'packages/movie-app/src/types/react'
import React, { memo, useMemo } from 'react'

import { Pad, Spacer } from '../primitives'
import { TCard } from './types'

// юзаем React.memo (HOC) чтобы не перерисовывать карточки, которые не изменились
// не нужен если правильно описать композицию компонентов
// либо использовать children
export const Cards: RFCC<{ cards: TCard[]; removeHandler: any }> = memo(
  ({ cards, removeHandler }) => {
    // будет ре-рендер при каждом рендере родителя
    const somePatialData = 'alalala'
    const someDataRerednder = {}
    // оправдано для передачи данных в дочерние компоненты
    const someMemoData = useMemo(() => {
      return somePatialData
    }, [])

    // итог: useMemo - для ПЕРЕДАЧИ данных в дочерние компоненты
    // да и то если расчет данных долгий
    // если есть видимые тормоза - начинается оптимизация
    // в остальных случаях - не нужно
    // можно забыть зависимости и получить баги/ничего ;)

    return (
      <div>
        {cards.map((card, idx) => {
          return (
            <Pad key={card.id}>
              <Card card={card} removeHandler={removeHandler} />
            </Pad>
          )
        })}
      </div>
    )
  }
)

const Card: RFCC<{ card: TCard; removeHandler: any }> = memo(({ card, removeHandler }) => {
  const onClick = () => removeHandler(card.name)

  return (
    <Paper>
      <Pad>
        <div>
          <Typography variant="h4">{card.name}</Typography>
          <Spacer />
          <div>{card.time}</div>
          <Button onClick={onClick}>X</Button>
        </div>
      </Pad>
    </Paper>
  )
})

// https://habr.com/ru/post/551804/
