import CloseIcon from '@mui/icons-material/CloseRounded'
import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { Login200User } from '../api/generated/models'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Absolute, Flex, Pointer, Spacer } from '../primitives'

axios.defaults.baseURL = 'https://dev.heqsapp.com/api/'

interface AuthContextType {
  user: any
  token: string | null
  loginName: string
  isOnetimeAuth: boolean
  signin: (userData: any, callback: VoidFunction) => void
  signout: (callback?: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

const interceptorsInit = () => {
  const requestHeaders = (config: any) => {
    const lstoken = localStorage.getItem('token')?.replaceAll('"', '')

    if (lstoken && config && !config?.url.includes(API.MUTATE.LOGIN) && !config?.url.includes(API.MUTATE.REGISTER)) {
      config.headers.Authorization = `Bearer ${lstoken}`
    }

    return config
  }

  const responseHeaders = (config: any) => {
    const newResponseToken = config?.headers?.AccessToken?.replace('Bearer ', '')

    if (newResponseToken && config && !config?.url.includes(API.MUTATE.LOGIN) && !config?.url.includes(API.MUTATE.REGISTER)) {
      localStorage.setItem('token', newResponseToken)
      config.headers.AccessToken = `Bearer ${newResponseToken}`
    }
    return config
  }

  const errors = (error: any) => {
    const whatError =
      error?.response?.status === 401
        ? 'Ошибка авторизации'
        : error?.response?.status === 404
        ? 'Ошибка ui'
        : error?.response?.status === 400
        ? 'Ошибка авторизации'
        : error?.response?.status === 504
        ? 'Ошибка сети'
        : 'Возможная ошибка сервиса'

    if (!(error?.response?.status === 400) && !(error?.response?.status === 401)) {
      toast.error((t) => (
        <div>
          <Typography>
            <>{error?.response?.data?.errorCode}</>
          </Typography>
          <div>
            <Typography>
              <>{whatError}</>
            </Typography>
          </div>
          <div>
            <Typography variant="caption">Сервис: {error?.request?.responseURL?.replace('http://localhost:9999/', '')}</Typography>
          </div>
          <Flex>
            <Typography variant="caption">Статус:</Typography>
            <Spacer width={4} />
            <Typography variant="caption">{error?.response?.status}</Typography>
          </Flex>
          {error?.response?.data?.errorMessage && (
            <div>
              <Typography variant="caption">Сообщение: {error?.response?.data?.errorMessage}</Typography>
            </div>
          )}
          <Absolute right={2} top={2}>
            <Pointer onClick={() => toast.dismiss(t.id)}>
              <CloseIcon />
            </Pointer>
          </Absolute>
        </div>
      ))
    }

    const lstoken = localStorage.getItem('token')?.replaceAll('"', '')

    // if (error?.response?.status === STATUS_CODES.UNAUTHORIZED && lstoken) {
    //   localStorage.clear()
    //   window.location.reload()
    // }

    // if (lstoken) {
    //   const { exp } = parseJwt(lstoken)

    //   if (exp && exp < Date.now() / 1000) {
    //     localStorage.clear()
    //     window.location.reload()
    //   }
    // }

    return Promise.reject(error)
  }

  return {
    request: (config: any) => (requestHeaders(config), config),
    errors: (config: any) => errors(config),
    response: (config: any) => (responseHeaders(config), config)
  }
}

// add request interceptors
const reqInterceptor = axios.interceptors.request.use(interceptorsInit().request)
// add response interceptors
const resInterceptor = axios.interceptors.response.use(interceptorsInit().response, interceptorsInit().errors)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const [_user, setUser] = useLocalStorage('user')
  const [token, setToken] = useLocalStorage('token')
  const [loginName, setLoginName] = useLocalStorage('loginName')
  const [isOnetimeAuth, setOnetimeAuth] = useState(false)
  const navigate = useNavigate()
  const user = typeof _user === 'string' ? JSON.parse(_user) : _user
  console.log('🐸 Pepe said => AuthProvider => user', user)

  const signin = (newUser: { token: string; loginName: string; rememberMe: ConstrainBooleanParameters; user: Login200User }, callback: VoidFunction) => {
    if (newUser.rememberMe) {
      setToken(newUser.token)
    } else {
      setOnetimeAuth(true)
    }
    setUser(typeof newUser.user === 'string' ? JSON.stringify(newUser.user) : newUser.user)
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

  useEffect(() => {
    return () => {
      // remove all intercepts when done
      axios.interceptors.request.eject(reqInterceptor)
      axios.interceptors.response.eject(resInterceptor)
    }
  }, [])

  const value = { user, signin, signout, token, loginName, isOnetimeAuth }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.token && !auth.isOnetimeAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return children
}
