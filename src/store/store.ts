import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './sagas'
import { trackerSlice } from './tracker/tracker'

export const reducerMap = {
  tracker: trackerSlice.reducer,
}

const rootReducer = combineReducers(reducerMap)

export const sagas = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagas] as const,
  devTools: true,
})

sagas.run(rootSaga)
