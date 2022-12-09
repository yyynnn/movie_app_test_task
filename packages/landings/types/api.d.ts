export type Employee = {
  factoryID: number
  id: number
  name: string
  position: string
  surname: string
  workcenter: string
}

export type Employees = Employee[]

export type Ticket = {
  category: string
  class: string
  correction: string
  date_created: string
  extension: string
  id: number
  time_created: string
  workcenter: string
}

export type Tickets = Ticket[]

export type Workcenter = {
  id: number
  name: string
  number: string
}

export type Workcenters = Workcenter[]
