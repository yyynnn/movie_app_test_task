/* eslint-disable prefer-const */
export interface IPoint {
  // readonly описывает поля которые нельзя менять
  readonly x: number
  readonly y: number
  // ? описывает необязательные поля
  name?: string
  time?: string
  id?: string
}

let p1: IPoint = { x: 10, y: 20 }
// @ts-ignore
p1.x = 5 // error!

// индекс интерфейс
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

const myStr: string = myArray[0]

// хорошо для спреда хз каких значений
// например в пропах компонента
// если финальный набор пропов неизвестен
interface ISomeComponentProps {
  someProp: string
  [index: string]: any
}

const SomeComponent = (props: ISomeComponentProps) => {
  return <div>{props.someProp}</div>
}

const App = () => {
  return (
    <div>
      <SomeComponent someProp={'someProp'} juja={true} />
    </div>
  )
}

// ----------------------------------------
// EXTENDS

// пропы можно расширять
interface ISomeOtherProps {
  isLALA: boolean
}

interface IProps extends ISomeOtherProps {
  someProp: string
}

// ----------------------------------------
// FUNCTION INTERFACE
interface Sum {
  (x: number, y: number): number
}
