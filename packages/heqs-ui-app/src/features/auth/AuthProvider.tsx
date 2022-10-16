import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../consts/routes'

interface AuthContextType {
  user: any
  signin: (user: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
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

let AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null)

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthData.signin(() => {
      setUser(newUser)
      callback()
    })
  }

  let signout = (callback: VoidFunction) => {
    return fakeAuthData.signout(() => {
      setUser(null)
      callback()
    })
  }

  let value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return children
}
