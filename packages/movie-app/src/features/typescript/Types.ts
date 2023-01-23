/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

// база
// string - тип примитивного JavaScript string. Например, 'pupa'.
const someString: string = 'pupa'
// number - тип примитивного JavaScript number. Например, 666.
const someNumber: number = 666
// boolean - тип примитивного JavaScript boolean. Например, true.
const someBool: boolean = true
// any - универсальный тип, который может быть любым типом.
const someAnyVal: any =
  'Spasibo gospodi' +
  function () {
    return 'pupa'
  }
// any[] - тип массива, который может быть любым типом.
// string[] - тип массива, который может быть только строками.
// TSomeType[] - тип массива, который может быть только TSomeType.
const someAnyTSomeTypeValue: TSomeType[] = [
  { name: 'pupa', bananaType: 'lupa' },
  { name: 'lupa', bananaType: 'pupa' }
]

// void - undefined
const someVoid: void = undefined
// () => any - тип функции, которая ничего не принимает и возвращает any
const someAnyFn: () => any = () => {
  return null
}
// () => void - тип функции, которая ничего не принимает и возвращает ничего
const someVoidFn: () => void = () => undefined
export type TSomeType = {
  name: string
  bananaType: string
}

// функции
type Sum = (x: number, y: number) => number

// юнион
// позволяет объединить несколько типов в один
// например, тип Fruit может быть либо 'apple', либо 'pear', либо 'orange' - прямая фильтрация
type Fruit = 'apple' | 'pear' | 'orange'
type Vegetable = 'broccoli' | 'carrot' | 'lettuce'
// 'apple' | 'pear' | 'orange' | 'broccoli' | 'carrot' | 'lettuce';
type HealthyFoods = Fruit | Vegetable
