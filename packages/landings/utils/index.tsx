type Func = {
  time?: number
  frequency?: number
  amplitude?: number
  phase?: number
  offset?: number
  funcType?: 'sin' | 'cos'
}

export const oscillator = ({
  time = 1,
  frequency = 1,
  amplitude = 1,
  phase = 0,
  offset = 0,
  funcType = 'sin'
}: Func): number => {
  return Math[funcType](time * frequency * Math.PI * 2 + phase * Math.PI * 2) * amplitude + offset
}

export const randArrayGenerator = (size = 13, init = Math.round(Math.random() * 100)) =>
  Array(size)
    .fill(0)
    .map(() => ({ value: Math.random() }))
