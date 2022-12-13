import React, { useEffect, useState } from 'react'

import {
  useGetFactoriesDictionary,
  useGetRootCausesDictionary,
  useGetTicketCategoriesDictionary,
  useGetTicketClassesDictionary,
  useGetTicketStatusesDictionary,
  useGetUserPositionsDictionary,
  useGetWorkcentersDictionary
} from '../api/generated/endpoints'
import { Factory, UserPosition } from '../api/generated/models'

export enum TicketStatusEnum {
  'Created' = 1,
  'In progress' = 2,
  'Closed' = 3
}

type TicketStatus = {
  id: number
  ticket_status: TicketStatusEnum
  created_at: null
  updated_at: null
  deleted_at: null
}

type TicketClass = {
  id: number
  ticket_class: string
  ticket_class_name: string
}

type TicketCategories = {
  id: number
  ticket_category: string
  ticket_class_id: number
}

type RootCauses = {
  id: number
  root_cause_name: string
}

type Workcenters = {
  id: number
  workcenter_number: string
  workcenter_name: string
  workcenter_group_id: number
  factory_id: number
  created_at: null
  updated_at: null
  deleted_at: null
}

type ContextType = {
  factories: Factory[] | undefined
  user_position: UserPosition[] | undefined
  ticket_status: TicketStatus[]
  ticket_class: TicketClass[]
  ticket_categories: TicketCategories[]
  workcenters: Workcenters[]
  root_causes: RootCauses[]
}

const Context = React.createContext<ContextType>(null!)

export const DictionariesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: factoriesResponse } = useGetFactoriesDictionary()
  const { data: userPositionResponse } = useGetUserPositionsDictionary()
  const { data: ticketStatusesResponse } = useGetTicketStatusesDictionary()
  const { data: classesResponse } = useGetTicketClassesDictionary()
  const { data: categoriesResponse } = useGetTicketCategoriesDictionary()
  const { data: workcentersResponse } = useGetWorkcentersDictionary()
  const { data: rootCausesResponse } = useGetRootCausesDictionary()

  const { data: factories }: any = factoriesResponse || {}
  const { data: user_position }: any = userPositionResponse || {}
  const { data: ticket_status }: any = ticketStatusesResponse || {}
  const { data: ticket_class }: any = classesResponse || {}
  const { data: ticket_categories }: any = categoriesResponse || {}
  const { data: workcenters }: any = workcentersResponse || {}
  const { data: root_causes }: any = rootCausesResponse || {}

  const contextData: ContextType = {
    factories: factories,
    user_position: user_position,
    ticket_status,
    ticket_class,
    ticket_categories,
    root_causes,
    workcenters
  }

  return <Context.Provider value={contextData}>{children}</Context.Provider>
}

export const useDictionaries = () => {
  return React.useContext(Context)
}
