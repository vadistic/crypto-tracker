import { call, delay, put, race, select, take } from 'redux-saga/effects'

import { api } from '../../../api/api'
import { MultiSymbolPriceResponse } from '../../../api/types'
import { ApiResult } from '../../../api/utils'
import { RootState } from '../../store'
import { trackerSlice, TrackerItem } from '../tracker'

export function* updateMultipleTrackerData() {
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

  if (!response.value) {
    throw new Error(response.error)
  }

  yield put(trackerSlice.actions.updateItems(response.value))
}

export function* watchMultipleTrackerData() {
  while (true) {
    const prevWarning = yield select((state: RootState) => state.tracker.warning)

    if (prevWarning) {
      yield put(trackerSlice.actions.clearWarning())
    }

    try {
      yield call(updateMultipleTrackerData)
    } catch (e) {
      yield put(trackerSlice.actions.setWarning(e.message))
    }

    yield race([delay(10000), take(trackerSlice.actions.addItem.type)])
  }
}
