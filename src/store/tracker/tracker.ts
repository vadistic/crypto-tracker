import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  areTrackerItemsEqual,
  CryptoCurrency,
  TrackerItem,
  TrackerItemInfo,
  TradingCurrency,
} from './types'

export interface TrackerState {
  warning?: string
  isModalOpen: boolean
  options: CryptoCurrency[]
  defaultTrading: TradingCurrency
  items: TrackerItem[]
}

const trackerStateInit: TrackerState = {
  warning: undefined,
  isModalOpen: false,
  options: [],
  items: [],
  defaultTrading: 'EUR',
}

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState: trackerStateInit,
  reducers: {
    reset: () => {
      return trackerStateInit
    },

    setState: (state, action: PayloadAction<Partial<TrackerState>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },

    setWarning: (state, action: PayloadAction<string>) => {
      state.warning = action.payload
    },

    clearWarning: state => {
      state.warning = undefined
    },

    toggleModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isModalOpen = action.payload ?? !!state.isModalOpen
    },

    setOptions: (state, action: PayloadAction<CryptoCurrency[]>) => {
      state.options = action.payload
    },

    setItem: (state, { payload: next }: PayloadAction<TrackerItem>) => {
      const index = state.items.findIndex(el => areTrackerItemsEqual(next, el))

      if (index === -1) return

      state.items[index] = {
        ...state.items[index],
        ...next,
      }
    },

    setItems: (state, action: PayloadAction<TrackerItem[]>) => {
      state.items = action.payload
    },

    addItem: (state, { payload: nextItem }: PayloadAction<TrackerItemInfo>) => {
      const prev = state.items.find(item => areTrackerItemsEqual(item, nextItem))

      // already present
      if (prev) return

      state.items.push(nextItem)

      state.defaultTrading = nextItem.trading
    },

    removeItem: (state, { payload: removedItem }: PayloadAction<TrackerItemInfo>) => {
      state.items = state.items.filter(item => !areTrackerItemsEqual(item, removedItem))
    },
  },
})
