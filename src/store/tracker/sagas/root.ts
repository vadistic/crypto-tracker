import { all, call, put, takeLatest } from 'redux-saga/effects'

import { trackerSlice } from '../tracker'

import { clearLocalStorage, loadLocalStorage, watchLocalStorage } from './local-storage'
import { watchMultipleTrackerItems } from './multiple-items'
import { updateTrackerOptions } from './tracker-options'

export function* initTracker() {
  yield call(loadLocalStorage)
}

export function* resetTracker() {
  yield call(clearLocalStorage)
  yield put(trackerSlice.actions.reset())
}

export function* watchTracker() {
  yield all([
    updateTrackerOptions(),
    watchMultipleTrackerItems(),
    watchLocalStorage(),
    takeLatest(trackerSlice.actions.reset, resetTracker),
  ])
}
