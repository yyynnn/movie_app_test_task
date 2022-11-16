import axios from 'axios'
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { useLocalStorage } from '../hooks/useLocalStorage'

axios.defaults.baseURL = 'https://dev.heqsapp.com/api/'

interface AuthContextType {
  user: any
  token: string | null
  loginName: string
  signin: (userData: any, callback: VoidFunction) => void
  signout: (callback?: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const [user, setUser] = useLocalStorage('user')
  const [token, setToken] = useLocalStorage('token')
  const [loginName, setLoginName] = useLocalStorage('loginName')
  const navigate = useNavigate()

  const signin = (newUser: { token: string; loginName: string }, callback: VoidFunction) => {
    setUser(newUser)
    setToken(newUser.token)
    setLoginName(newUser.loginName)
    callback?.()
  }

  const signout = (callback?: VoidFunction) => {
    setUser(null)
    setToken('')
    setLoginName('')
    navigate(ROUTES.LOGIN)
    callback?.()
  }

  const value = { user, signin, signout, token, loginName }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return children
}
