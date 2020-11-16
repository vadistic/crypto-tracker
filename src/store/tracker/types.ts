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

export const areTrackerItemsEqual = (a: TrackerItem, b: TrackerItem) =>
  a.crypto === b.crypto && a.trading === b.trading
