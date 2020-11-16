import { call } from 'redux-saga/effects'

import { resetTracker, watchTracker } from './tracker/sagas'

export function* rootSaga() {
  try {
    yield call(watchTracker)
  } catch (e) {
    yield call(resetTracker)
  }
}
