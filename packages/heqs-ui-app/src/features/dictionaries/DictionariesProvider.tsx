import React, { useEffect, useState } from 'react'

type ContextType = any

const Context = React.createContext<ContextType>(null!)

export const DictionariesProvider = ({ children }: { children: React.ReactNode }) => {
  const contextData = {}

  return <Context.Provider value={contextData}>{children}</Context.Provider>
}

export const useDictionariess = () => {
  return React.useContext(Context)
}
