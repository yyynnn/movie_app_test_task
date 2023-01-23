// так же как и с identity

import axios from 'axios'

// возвращем тип Т который приняли (по умолчанию везде пишут Т)
// в ФП такое называют identity
export function identity<T>(arg: T): T {
  return arg
}

// примерчик простой
export const arrLength: <T>(_: T[]) => number = (arr) => arr.length

arrLength([1, 2, 3]) // 3
arrLength<string>(['1', '2']) // 2
// @ts-ignore
arrLength<number>(['1', '2', '3']) // Error: Type 'string' is not assignable to type 'number'.

type NonEmpty<T> = {
  head: T
  tail: T[]
}

// примерчик более реальный
// пробрасываем тип туда куда нужно
// для того чтобы например указать тип возвращаемых данных от какого нибудь бекенда

type TResponseData = {
  id: number
  name: string
  time: Date
}

const someApiCall = <T>(url: string): Promise<T> => {
  return axios
    .get(url)
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

someApiCall<TResponseData>(
  'https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0'
).then((data) => {
  console.log(data)
})
