import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TradingCurrency = string
export type CryptoCurrency = string

export interface TrackerItemInfo {
  crypto: CryptoCurrency
  trading: TradingCurrency
}

export interface TrackerItem extends TrackerItemInfo {
  price?: number
  diff?: number
  error?: string
}

export interface TrackerState {
  error?: string
  lastUpdate?: number
  isModalOpen: boolean

  options: CryptoCurrency[]
  defaultCurrency: TradingCurrency

  items: TrackerItem[]
}
const areItemsEqual = (a: TrackerItem, b: TrackerItem) =>
  a.crypto === b.crypto && a.trading === b.trading

const trackerStateInit: TrackerState = {
  error: undefined,
  isModalOpen: false,
  lastUpdate: undefined,
  options: [],
  items: [],
  defaultCurrency: 'EUR',
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

    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload
    },

    setOptions: (state, action: PayloadAction<CryptoCurrency[]>) => {
      state.options = action.payload
    },

    setItems: (state, action: PayloadAction<TrackerItem[]>) => {
      state.items = action.payload
    },

    setDefaultCurrency: (state, action: PayloadAction<CryptoCurrency>) => {
      if (state.options.includes(action.payload)) {
        state.defaultCurrency = action.payload
      }
    },

    addItem: (state, { payload: nextItem }: PayloadAction<TrackerItemInfo>) => {
      const prev = state.items.find(item => areItemsEqual(item, nextItem))

      if (prev) return

      state.items.push(nextItem)
    },

    removeItem: (state, { payload: removedItem }: PayloadAction<TrackerItemInfo>) => {
      state.items = state.items.filter(item => !areItemsEqual(item, removedItem))
    },

    popItem: state => {
      if (state.items.length > 0) {
        console.log('pop item')
        state.items.splice(-1)
      }
    },

    setLastUpdate: state => {
      state.lastUpdate = new Date().getTime()
    },

    toggleModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isModalOpen = action.payload ?? !!state.isModalOpen
    },
  },
})
