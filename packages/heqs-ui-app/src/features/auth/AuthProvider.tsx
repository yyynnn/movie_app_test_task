import axios from 'axios'
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { useLocalStorage } from '../hooks/useLocalStorage'

axios.defaults.baseURL = ''

interface AuthContextType {
  user: any
  token: string | null
  signin: (user: string, callback: VoidFunction) => void
  signout: (callback?: VoidFunction) => void
}

export const fakeAuthData = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthData.isAuthenticated = true
    setTimeout(callback, 100) // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthData.isAuthenticated = false
    setTimeout(callback, 100)
  }
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage('')
  const [token, setToken] = useLocalStorage('token')
  const navigate = useNavigate()

  const signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthData.signin(() => {
      setUser(newUser)
      setToken('faketoken')
      callback()
    })
  }

  const signout = (callback?: VoidFunction) => {
    return fakeAuthData.signout(() => {
      setUser(null)
      setToken('')
      navigate(ROUTES.LOGIN)
      callback?.()
    })
  }

  const value = { user, signin, signout, token }

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
