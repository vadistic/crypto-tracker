import { call } from 'redux-saga/effects'

import { initTracker, watchTracker } from './tracker/sagas/tracker'

export function* rootSaga() {
  yield call(initTracker)
  yield call(watchTracker)
}
