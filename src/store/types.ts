import { ActionFromReducersMapObject, StateFromReducersMapObject } from 'redux'

import { reducerMap } from './store'

export type RootState = StateFromReducersMapObject<typeof reducerMap>
export type ActionUnion = ActionFromReducersMapObject<typeof reducerMap>
