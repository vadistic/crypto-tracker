import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MultiSymbolPriceResponse } from '../../api/types'

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
  warning?: string

  lastUpdate?: number
  isModalOpen: boolean

  options: CryptoCurrency[]
  defaultTrading: TradingCurrency

  items: TrackerItem[]
}
const areItemsEqual = (a: TrackerItem, b: TrackerItem) =>
  a.crypto === b.crypto && a.trading === b.trading

const trackerStateInit: TrackerState = {
  warning: undefined,
  isModalOpen: false,
  lastUpdate: undefined,
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

    setOptions: (state, action: PayloadAction<CryptoCurrency[]>) => {
      state.options = action.payload
    },

    setItems: (state, action: PayloadAction<TrackerItem[]>) => {
      state.items = action.payload
    },

    updateItems: (state, { payload: response }: PayloadAction<MultiSymbolPriceResponse>) => {
      state.items = state.items.map(item => {
        const price: number | undefined = response[item.crypto]?.[item.trading]

        const diff =
          price !== undefined && item.price !== undefined ? price - item.price : item.price

        return {
          ...item,
          price,
          diff,
          error: price === undefined ? 'No price data :(' : undefined,
        }
      })

      state.lastUpdate = new Date().getTime()
    },

    addItem: (state, { payload: nextItem }: PayloadAction<TrackerItemInfo>) => {
      // already present
      if (state.items.find(item => areItemsEqual(item, nextItem))) return

      state.items.push(nextItem)
      state.defaultTrading = nextItem.trading
    },

    removeItem: (state, { payload: removedItem }: PayloadAction<TrackerItemInfo>) => {
      state.items = state.items.filter(item => !areItemsEqual(item, removedItem))
    },

    toggleModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.isModalOpen = action.payload ?? !!state.isModalOpen
    },
  },
})
