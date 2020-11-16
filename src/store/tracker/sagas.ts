import { call, delay, put, race, retry, select, take, takeEvery } from 'redux-saga/effects'

import { api } from '../../api/api'
import { AvailibleCoinListResponse, MultiSymbolPriceResponse } from '../../api/types'
import { ApiResult } from '../../api/utils'
import { RootState } from '../store'

import { trackerSlice, CryptoCurrency, TrackerState, TrackerItem, TrackerItemInfo } from './tracker'

export const STORAGE_TRACKER_ITEMS = 'trackerStorage'

export function* watchTracker() {
  yield call(loadLocalStorage)
  yield call(updateTrackerOptions)

  yield takeEvery(trackerSlice.actions.addItem.type, writeLocalStorage)
  yield takeEvery(trackerSlice.actions.removeItem.type, writeLocalStorage)

  yield call(watchTrackerData)
}

export function* resetTracker() {
  yield call(clearLocalStorage)
  yield put(trackerSlice.actions.reset())

  yield call(updateTrackerOptions)

  yield takeEvery(trackerSlice.actions.addItem.type, writeLocalStorage)
  yield takeEvery(trackerSlice.actions.removeItem.type, writeLocalStorage)

  yield call(watchTrackerData)
}

// ────────────────────────────────────────────────────────────────────────────────

export function* loadLocalStorage() {
  const str = localStorage.getItem(STORAGE_TRACKER_ITEMS)

  if (str) {
    try {
      const items = JSON.parse(str)

      if (Array.isArray(items)) {
        yield put(trackerSlice.actions.setItems(items))
      } else {
        yield call(clearLocalStorage)
      }
    } catch (e) {
      // noop
    }
  }
}

export function* writeLocalStorage() {
  const { items }: TrackerState = yield select((state: RootState) => state.tracker)

  const infos = items.map(({ crypto, trading }): TrackerItemInfo => ({ crypto, trading }))

  localStorage.setItem(STORAGE_TRACKER_ITEMS, JSON.stringify(infos))
}

// eslint-disable-next-line require-yield
export function* clearLocalStorage() {
  localStorage.removeItem(STORAGE_TRACKER_ITEMS)
}

// ────────────────────────────────────────────────────────────────────────────────

export function* updateTrackerOptions() {
  try {
    const options: CryptoCurrency[] = yield retry(5, 100, fetchTrackerOptions)
    yield put(trackerSlice.actions.setOptions(options))
  } catch (e) {
    console.log('error', e)
    // error state
  }
}

export function* fetchTrackerOptions() {
  const response: ApiResult<AvailibleCoinListResponse> = yield call(() => api.availibleCoinList())

  if (!response.value) throw new Error(response.error)

  const options: CryptoCurrency[] = Object.keys(response.value)

  return options
}

// ────────────────────────────────────────────────────────────────────────────────

export function* fetchAllTrackerData() {
  const items: TrackerItem[] = yield select((state: RootState) => state.tracker.items)

  if (items.length === 0) return

  const tsyms = items.map(({ trading }) => trading)

  const fsyms = items.map(({ crypto }) => crypto).filter(Boolean)

  const response: ApiResult<MultiSymbolPriceResponse> = yield call(() =>
    api.multipleSymbolPrice({
      tsyms: tsyms,
      fsyms: fsyms,
    }),
  )

  if (!response.value) {
    throw new Error(response.error)
  }

  return response.value
}

export function* updateAllTrackerData() {
  const response: MultiSymbolPriceResponse = yield call(fetchAllTrackerData)

  const items: TrackerItem[] = yield select((state: RootState) => state.tracker.items)

  console.log('res', response)

  const nextItems: TrackerItem[] = items.map(item => {
    const price: number | undefined = response[item.crypto]?.[item.trading]

    const diff = price !== undefined && item.price !== undefined ? price - item.price : item.price

    return {
      ...item,
      price,
      diff,
      error: price === undefined ? 'No price data :(' : undefined,
    }
  })

  yield put(trackerSlice.actions.setItems(nextItems))
  yield put(trackerSlice.actions.setLastUpdate())
}

export function* watchTrackerData() {
  while (true) {
    const prevError = yield select((state: RootState) => state.tracker.error)
    console.log('loop')

    try {
      yield call(updateAllTrackerData)

      if (prevError) {
        yield put(trackerSlice.actions.setError(undefined))
      }
    } catch (e) {
      // poping last added item is porobably the best way to recover
      yield put(trackerSlice.actions.popItem())
      yield put(trackerSlice.actions.setError(e.message))
    }

    yield race([delay(10000), take(trackerSlice.actions.addItem.type)])
  }
}
