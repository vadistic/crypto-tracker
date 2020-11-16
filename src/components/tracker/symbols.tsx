import { CryptoCurrency, TradingCurrency } from '../../store/tracker/types'

export const tradingSymbolMap: Record<TradingCurrency, string> = {
  EUR: '€',
  USD: '$',
  PLN: 'zł',
}

export const cryptoSymbolMap: Record<CryptoCurrency, string> = {
  BTC: '฿',
}

export const getTradingSymbol = (key: string) => {
  return tradingSymbolMap[key]
}

export const getCryptoSymbol = (key: string) => {
  return cryptoSymbolMap[key]
}

export const TRADING_CURRENCIES = ['EUR', 'USD', 'PLN']

export const SUGGESTED_CRYPTO = ['BTC', 'BCH', 'LTC', 'ETH', 'BNB', 'TRX', 'LINK', 'BNB']
