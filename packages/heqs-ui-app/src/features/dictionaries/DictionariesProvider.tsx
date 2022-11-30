import React, { useEffect, useState } from 'react'

import { useGetFactoriesDictionary, useGetUserPositionsDictionary } from '../api/generated/endpoints'
import { Factory, UserPosition } from '../api/generated/models'

type ContextType = {
  factories: Factory[] | undefined
  userPositions: UserPosition[] | undefined
}

const Context = React.createContext<ContextType>(null!)

export const DictionariesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: factoriesResponse } = useGetFactoriesDictionary()
  const { data: userPositionsResponse } = useGetUserPositionsDictionary()
  const { data: factoriesData }: any = factoriesResponse || {}
  const { data: userPositionsData }: any = userPositionsResponse || {}

  const contextData = {
    factories: factoriesData,
    userPositions: userPositionsData
  }

  return <Context.Provider value={contextData}>{children}</Context.Provider>
}

export const useDictionaries = () => {
  return React.useContext(Context)
}
