// Энамы - это простые перечисления
// полезны для всяких справочников
// наборы констант
// например направления движения
// или дни недели
// или виды вина
// обычно должны быть сгенерены на бекенде
export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// без определения значений
// будет сгенерированы индексы
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

const directionsArr = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// in generated code will become

const directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]
