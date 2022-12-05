import React, { useEffect, useState } from 'react'

import { useGetFactoriesDictionary, useGetTicketStatusesDictionary, useGetUserPositionsDictionary } from '../api/generated/endpoints'
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

type ContextType = {
  factories: Factory[] | undefined
  userPositions: UserPosition[] | undefined
  ticketStatuses: TicketStatus[]
}

const Context = React.createContext<ContextType>(null!)

export const DictionariesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: factoriesResponse } = useGetFactoriesDictionary()
  const { data: userPositionsResponse } = useGetUserPositionsDictionary()
  const { data: ticketStatusesResponse } = useGetTicketStatusesDictionary()
  const { data: factoriesData }: any = factoriesResponse || {}
  const { data: userPositionsData }: any = userPositionsResponse || {}
  const { data: ticketStatuses }: any = ticketStatusesResponse || {}

  const contextData = {
    factories: factoriesData,
    userPositions: userPositionsData,
    ticketStatuses
  }

  return <Context.Provider value={contextData}>{children}</Context.Provider>
}

export const useDictionaries = () => {
  return React.useContext(Context)
}
