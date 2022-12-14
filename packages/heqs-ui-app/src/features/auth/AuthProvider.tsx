import CloseIcon from '@mui/icons-material/CloseRounded'
import { Typography } from '@mui/material'
import axios from 'axios'
import { jwtDecode, jwtVerify, resignJwt } from 'jwt-js-decode'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { API } from '../../consts/api'
import { ROUTES } from '../../consts/routes'
import { parseJwt } from '../../utils'
import { Login200User } from '../api/generated/models'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Absolute, Flex, Pointer, Spacer } from '../primitives'

axios.defaults.baseURL = 'https://heqs-services-dev.onrender.com/api/'

interface AuthContextType {
  user: {
    name: string
    surname: string
    user_position_id: number
    factory_id: number
    email: string
  }
  token: string | null
  isOnetimeAuth: boolean
  signin: (userData: any, callback: VoidFunction) => void
  signout: (callback?: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

// add request interceptors
let reqInterceptor: any = null
// add response interceptors
let resInterceptor: any = null

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const [_user, setUser] = useLocalStorage('user', '')
  const [token, setToken] = useLocalStorage('token', '')
  const [isOnetimeAuth, setOnetimeAuth] = useState(false)
  const navigate = useNavigate()
  const user = typeof _user === 'string' && _user ? JSON.parse(_user) : _user

  const signin = (
    newUser: { token: string; rememberMe: ConstrainBooleanParameters; user: Login200User },
    callback: VoidFunction
  ) => {
    if (newUser.rememberMe) {
      setToken(newUser.token)
    } else {
      setOnetimeAuth(true)
    }
    setUser(typeof newUser.user === 'string' && _user ? JSON.stringify(newUser.user) : newUser.user)
    callback?.()
  }

  const signout = (callback?: VoidFunction) => {
    setUser(null)
    setToken('')
    navigate(ROUTES.LOGIN)
    callback?.()
  }

  const interceptorsInit = () => {
    const requestHeaders = (config: any) => {
      const lstoken = localStorage.getItem('token')?.replaceAll('"', '')

      if (
        lstoken &&
        config &&
        !config?.url.includes(API.MUTATE.LOGIN) &&
        !config?.url.includes(API.MUTATE.REGISTER)
      ) {
        config.headers.Authorization = `Bearer ${lstoken}`
      }

      return config
    }

    const responseHeaders = (config: any) => {
      const newResponseToken = config?.headers?.AccessToken?.replace('Bearer ', '')

      if (
        newResponseToken &&
        config &&
        !config?.url.includes(API.MUTATE.LOGIN) &&
        !config?.url.includes(API.MUTATE.REGISTER)
      ) {
        localStorage.setItem('token', newResponseToken)
        config.headers.AccessToken = `Bearer ${newResponseToken}`
      }
      return config
    }

    const errors = (error: any) => {
      if (error?.response?.status === 401) {
        signout()
      }

      const whatError =
        error?.response?.status === 401
          ? 'Auth error'
          : error?.response?.status === 404
          ? 'UI error'
          : error?.response?.status === 400
          ? 'Error'
          : error?.response?.status === 504
          ? 'Network error'
          : 'Posible service error'

      // if (!(error?.response?.status === 400) && !(error?.response?.status === 401)) {
      //   toast.error((t) => (
      //     <div>
      //       <Typography>
      //         <>{error?.response?.data?.errorCode}</>
      //       </Typography>
      //       <div>
      //         <Typography>
      //           <>{whatError}</>
      //         </Typography>
      //       </div>
      //       <div>
      //         <Typography variant="caption">Сервис: {error?.request?.responseURL?.replace('http://localhost:9999/', '')}</Typography>
      //       </div>
      //       <Flex>
      //         <Typography variant="caption">Статус:</Typography>
      //         <Spacer width={4} />
      //         <Typography variant="caption">{error?.response?.status}</Typography>
      //       </Flex>
      //       {error?.response?.data?.errorMessage && (
      //         <div>
      //           <Typography variant="caption">Сообщение: {error?.response?.data?.errorMessage}</Typography>
      //         </div>
      //       )}
      //       <Absolute right={2} top={2}>
      //         <Pointer onClick={() => toast.dismiss(t.id)}>
      //           <CloseIcon />
      //         </Pointer>
      //       </Absolute>
      //     </div>
      //   ))
      // }

      return Promise.reject(error)
    }

    return {
      request: (config: any) => (requestHeaders(config), config),
      errors: (config: any) => errors(config),
      response: (config: any) => (responseHeaders(config), config)
    }
  }

  useEffect(() => {
    if (token && token !== 'null') {
      const tokenData = jwtDecode(token)
      const isExpired = Date.now() >= (tokenData?.payload?.exp || 1) * 1000

      if (isExpired) {
        signout()
      }
    }

    // add request interceptors
    reqInterceptor = axios.interceptors.request.use(interceptorsInit().request)
    // add response interceptors
    resInterceptor = axios.interceptors.response.use(
      interceptorsInit().response,
      interceptorsInit().errors
    )

    return () => {
      // remove all intercepts when done
      axios.interceptors.request.eject(reqInterceptor)
      axios.interceptors.response.eject(resInterceptor)
    }
  }, [])

  const value = { user, signin, signout, token, isOnetimeAuth }

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
