import {
  combineReducers,
  configureStore,
  ActionFromReducersMapObject,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga'
import { trackerSlice } from './tracker/tracker'

export const reducerMap = {
  tracker: trackerSlice.reducer,
}

const rootReducer = combineReducers(reducerMap)

export type RootState = StateFromReducersMapObject<typeof reducerMap>
export type ActionUnion = ActionFromReducersMapObject<typeof reducerMap>

export const sagas = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagas] as const,
  devTools: true,
})

sagas.run(rootSaga)
