import CloseIcon from '@mui/icons-material/CloseRounded'
import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
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
    console.log('🐸 Pepe said => requestHeaders => config', config.url)
    const lstoken = localStorage.getItem('token')?.replaceAll('"', '')

    if (lstoken && config && config?.url !== API.MUTATE.LOGIN && config?.url !== API.MUTATE.REGISTER) {
      console.log('🐸 Pepe said => requestHeaders => lstoken', lstoken)

      config.headers.Authorization = `Bearer ${lstoken}`
    }

    return config
  }

  const responseHeaders = (config: any) => {
    const newResponseToken = config?.headers?.AccessToken?.replace('Bearer ', '')

    if (newResponseToken && config && config?.url !== API.MUTATE.LOGIN && config?.url !== API.MUTATE.REGISTER) {
      localStorage.setItem('token', newResponseToken)
      config.headers.AccessToken = `${newResponseToken}`
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
  const [user, setUser] = useLocalStorage('user')
  const [token, setToken] = useLocalStorage('token')
  const [loginName, setLoginName] = useLocalStorage('loginName')
  const [isOnetimeAuth, setOnetimeAuth] = useState(false)
  const navigate = useNavigate()

  const signin = (newUser: { token: string; loginName: string; rememberMe: boolean }, callback: VoidFunction) => {
    if (newUser.rememberMe) {
      setToken(newUser.token)
    } else {
      setOnetimeAuth(true)
    }
    setUser({ loginName })
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

  const value = { user, signin, signout, token, loginName, isOnetimeAuth }

  useEffect(() => {
    return () => {
      // remove all intercepts when done
      axios.interceptors.request.eject(reqInterceptor)
      axios.interceptors.response.eject(resInterceptor)
    }
  }, [])

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
