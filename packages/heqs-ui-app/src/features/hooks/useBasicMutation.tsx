/* eslint-disable @typescript-eslint/no-empty-function */
import { QueryFunction, useMutation, UseMutationResult } from '@tanstack/react-query'
import axios from 'axios'

interface IProps {
  apiPath: string
  params?: any
  options?: any
  enabled?: boolean
  [x: string]: any
}

export const useBasicMutation = <T,>({
  apiPath,
  method = 'POST',
  params = {},
  options = {},
  mutationKey,
  axiosOptions,
  onError = (val: any) => val,
  onSuccess = (val: any) => val
}: IProps): UseMutationResult<T, unknown> => {
  const { data: queryDataResp, ...queryRest } = useMutation(
    (props: { data: any; params: any }) => {
      return axios({
        url: apiPath,
        data: props?.data,
        params: props?.params,
        method,
        ...axiosOptions
      })
    },
    {
      onSuccess,
      onError
    }
  )
  const { data } = queryDataResp || {}
  // @ts-ignore
  return { data, ...queryRest }
}
