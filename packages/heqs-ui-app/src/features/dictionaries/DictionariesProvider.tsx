import React, { useEffect, useState } from 'react'

import {
  useGetFactoriesDictionary,
  useGetTicketClassesDictionary,
  useGetTicketStatusesDictionary,
  useGetUserPositionsDictionary
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

type ContextType = {
  factories: Factory[] | undefined
  userPositions: UserPosition[] | undefined
  ticket_status_id: TicketStatus[]
  ticket_class_id: TicketClass[]
}

const Context = React.createContext<ContextType>(null!)

export const DictionariesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: factoriesResponse } = useGetFactoriesDictionary()
  const { data: userPositionsResponse } = useGetUserPositionsDictionary()
  const { data: ticketStatusesResponse } = useGetTicketStatusesDictionary()
  const { data: classesResponse } = useGetTicketClassesDictionary()

  const { data: factories }: any = factoriesResponse || {}
  const { data: userPositions }: any = userPositionsResponse || {}
  const { data: ticketStatuses }: any = ticketStatusesResponse || {}
  const { data: classes }: any = classesResponse || {}

  const contextData: ContextType = {
    factories: factories,
    userPositions: userPositions,
    ticket_status_id: ticketStatuses,
    ticket_class_id: classes
  }

  return <Context.Provider value={contextData}>{children}</Context.Provider>
}

export const useDictionaries = () => {
  return React.useContext(Context)
}
