import { Button, Input, Paper, Typography } from '@mui/material'
import { RFCC } from 'packages/movie-app/src/types/react'
import React, { useCallback, useState } from 'react'

import { Pad, Spacer } from '../../primitives'
import { TCard } from './types'

const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const Card: RFCC<{ card: TCard }> = React.memo(({ card }) => {
  return (
    <Paper>
      <Pad>
        <div>
          <Typography variant="h4">{card.name}</Typography>
          <Spacer />
          <div>{card.time}</div>
        </div>
      </Pad>
    </Paper>
  )
})

export const Cards: RFCC<{ cards: TCard[] }> = React.memo(({ cards }) => {
  console.log('🐸 Pepe said => cards', cards)

  return (
    <div>
      {cards.map((card) => {
        const key = uuid4()

        return (
          <Pad key={key}>
            <Card card={card} />
          </Pad>
        )
      })}
    </div>
  )
})
