import { call, put, retry } from 'redux-saga/effects'

import { api } from '../../../api/api'
import { AvailibleCoinListResponse } from '../../../api/types'
import { ApiResult } from '../../../api/utils'
import { CryptoCurrency, trackerSlice } from '../tracker'

export function* updateTrackerOptions() {
  try {
    const options: CryptoCurrency[] = yield retry(5, 100, fetchTrackerOptions)
    yield put(trackerSlice.actions.setOptions(options))
  } catch (e) {
    yield put(trackerSlice.actions.setWarning('Could not fetch coin list'))
  }
}

export function* fetchTrackerOptions() {
  const response: ApiResult<AvailibleCoinListResponse> = yield call(() => api.availibleCoinList())

  if (!response.value) throw new Error(response.error)

  const options: CryptoCurrency[] = Object.keys(response.value)

  return options
}
