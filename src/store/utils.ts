import { retry } from 'redux-saga/effects'

import { ApiResult, ApiResultErr } from '../api'

/**
 * helper to abstract api call retry in case of error
 */
export function* callApiWithRetry<T>(fn: () => Promise<ApiResult<T>>) {
  try {
    return retry(3, 250, unwrapResultError(fn))
  } catch (e) {
    const errRes: ApiResultErr = { error: e.message, value: undefined }

    yield errRes
  }
}

export const unwrapResultError = <T>(fn: () => Promise<ApiResult<T>>) => async () => {
  const response = await fn()

  if (response.error) throw new Error(response.error)

  return response
}
