import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

import { useAuth } from '../auth/AuthProvider'

interface IProps {
  apiPath: string
  params?: any
  options?: any
  enabled?: boolean
  [x: string]: any
}

export const useBasicQuery = <T,>({ apiPath, params = {}, options = {}, enabled, ...rest }: IProps): UseQueryResult<T, unknown> => {
  const { token } = useAuth()
  const { data: queryDataResp, ...queryRest } = useQuery(
    [apiPath],
    async () => {
      const resp = await axios({ method: 'GET', url: apiPath, params, ...rest })
      return resp
    },
    { enabled: typeof enabled === 'boolean' ? enabled : !!token, ...options }
  )
  const { data } = queryDataResp || {}
  // @ts-ignore
  return { data, ...queryRest }
}
