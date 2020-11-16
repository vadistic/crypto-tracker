import { call, delay, put, select } from 'redux-saga/effects'

import { MultiSymbolPriceResponse, api, ApiResult, ApiResultErr, ApiResultOk } from '../../../api'
import { RootState } from '../../types'
import { trackerSlice } from '../tracker'
import { TrackerItem } from '../types'

export function* fetchMultipleTrackerItems() {
  const items: TrackerItem[] = yield select((state: RootState) => state.tracker.items)

  if (items.length === 0) return

  const tsyms = items.filter(({ error }) => !error).map(({ trading }) => trading)
  const fsyms = items.filter(({ error }) => !error).map(({ crypto }) => crypto)

  const response: ApiResult<MultiSymbolPriceResponse> = yield call(() =>
    api.multipleSymbolPrice({
      tsyms: tsyms,
      fsyms: fsyms,
    }),
  )

  if (response.value) {
    yield call(fetchMultipleTrackerItemsOk, response)
  }

  if (response.error) {
    yield call(fetchMultipleTrackerItemsErr, response)
  }
}

export function* fetchMultipleTrackerItemsOk(res: ApiResultOk<MultiSymbolPriceResponse>) {
  const items: TrackerItem[] = yield select((state: RootState) => state.tracker.items)
  const prevWarning = yield select((state: RootState) => state.tracker.warning)

  const nextItems = items.map(item => {
    const price: number | undefined = res.value[item.crypto]?.[item.trading]

    const diff = price !== undefined && item.price !== undefined ? price - item.price : item.price

    return {
      ...item,
      price,
      diff,
      error: price === undefined ? 'No data' : undefined,
    }
  })

  yield put(trackerSlice.actions.setItems(nextItems))

  if (prevWarning) {
    yield put(trackerSlice.actions.clearWarning())
  }
}

export function* fetchMultipleTrackerItemsErr(res: ApiResultErr) {
  yield put(trackerSlice.actions.setWarning(res.error))
}

export function* watchMultipleTrackerItems() {
  while (true) {
    yield call(fetchMultipleTrackerItems)

    yield delay(10000)
  }
}
