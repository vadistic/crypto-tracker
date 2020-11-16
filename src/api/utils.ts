import { AxiosResponse } from 'axios'

import { ErrorResponse, SuccessResponse } from './types'

export const isWrappedData = <T>(
  data: T | ErrorResponse | SuccessResponse<T>,
): data is ErrorResponse | SuccessResponse<T> => {
  return typeof data === 'object' && typeof (data as any).Response === 'string'
}

export interface ApiResultOk<T> {
  error: undefined
  status: 200
  value: T
}

export interface ApiResultErr {
  error: string
  status: number
  value: undefined
}

export type ApiResult<T> = ApiResultOk<T> | ApiResultErr

export const toApiResult = <T>(res: AxiosResponse<T | ErrorResponse>): ApiResult<T> => {
  // handle http error
  if (res.status !== 200 || !res.data) {
    return {
      error: res.statusText,
      status: res.status,
      value: undefined,
    }
  }

  // strip response metadata
  if (isWrappedData(res.data)) {
    if (res.data.Response === 'Error') {
      return {
        error: res.data.Message,
        status: 400,
        value: undefined,
      }
    } else {
      return {
        status: 200,
        value: res.data.Data,
        error: undefined,
      }
    }
  }

  return {
    status: 200,
    value: res.data,
    error: undefined,
  }
}
