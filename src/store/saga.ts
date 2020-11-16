import { call } from 'redux-saga/effects'

import { initTracker, watchTracker } from './tracker/saga/root'

export function* rootSaga() {
  yield call(initTracker)
  yield call(watchTracker)
}
