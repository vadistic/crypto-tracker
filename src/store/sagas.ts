import { call } from 'redux-saga/effects'

import { initTracker, watchTracker } from './tracker/sagas/root'

export function* rootSaga() {
  yield call(initTracker)
  yield call(watchTracker)
}
