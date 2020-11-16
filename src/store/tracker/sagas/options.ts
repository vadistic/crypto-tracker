import { call, put } from 'redux-saga/effects'

import { api, AvailibleCoinListResponse, ApiResult } from '../../../api'
import { trackerSlice } from '../tracker'

export function* fetchTrackerOptions() {
  const response: ApiResult<AvailibleCoinListResponse> = yield call(() => api.availibleCoinList())

  if (response.error) {
    yield call(fetchTrackerOptionsErr, response.error)
  }

  if (response.value) {
    yield call(fetchTrackerOptionsOk, response.value)
  }
}

export function* fetchTrackerOptionsOk(value: AvailibleCoinListResponse) {
  const options = Object.keys(value)

  yield put(trackerSlice.actions.setOptions(options))
}

export function* fetchTrackerOptionsErr(_error: string) {
  yield put(trackerSlice.actions.setWarning('Could not fetch coin list'))
}
