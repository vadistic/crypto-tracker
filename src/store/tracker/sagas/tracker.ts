import { all, call, put, takeLatest } from 'redux-saga/effects'

import { trackerSlice } from '../tracker'

import { clearLocalStorage, loadLocalStorage, watchLocalStorage } from './local-storage'
import { watchMultipleTrackerItems } from './multiple-items'
import { fetchTrackerOptions } from './options'
import { watchSingleTrackerItem } from './single-item'

export function* initTracker() {
  yield call(loadLocalStorage)
}

export function* resetTracker() {
  yield call(clearLocalStorage)
  yield put(trackerSlice.actions.reset())
}

export function* watchTracker() {
  yield all([
    fetchTrackerOptions(),
    watchMultipleTrackerItems(),
    watchSingleTrackerItem(),
    watchLocalStorage(),
    takeLatest(trackerSlice.actions.reset, resetTracker),
  ])
}
