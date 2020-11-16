import { call, put, select, takeEvery } from 'redux-saga/effects'

import { RootState } from '../../store'
import { TrackerItemInfo, trackerSlice, TrackerState } from '../tracker'

export const STORAGE_TRACKER_ITEMS = 'trackerStorage'

export function* watchLocalStorage() {
  yield takeEvery(trackerSlice.actions.addItem.type, writeLocalStorage)
  yield takeEvery(trackerSlice.actions.removeItem.type, writeLocalStorage)
}

export function* loadLocalStorage() {
  const str = localStorage.getItem(STORAGE_TRACKER_ITEMS)

  if (str) {
    try {
      const items = JSON.parse(str)

      if (Array.isArray(items)) {
        yield put(trackerSlice.actions.setItems(items))
      } else if (items !== null) {
        throw Error('Invalid storage shape')
      }
    } catch (e) {
      yield call(clearLocalStorage)
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
