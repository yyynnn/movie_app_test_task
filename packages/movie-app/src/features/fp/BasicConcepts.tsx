// Чистая функция
//
// всегда возвращает одинаковый результат при одинаковых аргументах
// не иммеет побочных эффектов (не мутирует данные снаружи)
export const pureFunction = (a: number, b: number): number => a + b

// примеры не чистых функций:
// 1. не всегда возвращает одинаковый результат при одинаковых аргументах
export const impureFunction = (a: number, b: number): number => {
  return a + b + Math.random()
}
// 2. иммеет побочные эффекты (мутирует данные снаружи)
let mutation = 'im pure'
export const impureFunction2 = (a: number, b: number): number => {
  const c = a + b
  console.log(c)
  mutation = 'mutant!'
  return c
}
// 3. процедура (создана чтобы мутировать)
export const impureFunction3 = (): void => {
  mutation = 'mutant!'
}

//---------------------------------------------------------------------//

// Композиция функций

// можно делать так
// @ts-ignore
const discount = normalizePrice(divide100(multiply20(200))) // 40.00

// можно делать так
const compose =
  (...fns: any) =>
  (x: any) =>
    fns.reduceRight((res: any, fn: any) => fn(res), x)
// @ts-ignore
const discountWithPrefix = compose(addPrefix, normalizePrice, divide100, multiply20)
discountWithPrefix(200.0) // '$40.00'

// а можно так через pipe operator
// const finalSentence = sentence
//   |> exclaim(%)
//   |> addIntroGreeting(%)
//   |> %.trim()
//   |> console.log(%);

// ---------------------------------------------------------------------//
// Карирование - лучше вообще не трогать
// Потому что ужасный синтаксис

const sum = (x: number) => (y: number) => x + y
// returns the number 3
sum(2)(1)
// returns a function y => 2 + y
sum(2)

// нечитаемо
// @ts-ignore
const curry = (x) => (y) => (z) => (a) => (b) => (c) => x + y + z + a + b + c
