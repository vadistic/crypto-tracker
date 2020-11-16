export interface ErrorResponse {
  Response: 'Error'
  Message: string
  HasWarning: boolean
  Type: number
  RateLimit: any
  Data: any
  ParamWithError: string
}

export interface SuccessResponse<T> {
  Response: 'Success'
  Message: ''
  HasWarning: boolean
  Type: number
  RateLimit: any
  ParamWithError: string
  Data: T
}

export interface SharedParams {
  /**
   * The name of your application (we recommend you send it)
   *
   * max-length: 2000
   */
  extraParams?: string
  /**
   * If set to true, the server will sign the requests (by default we don't sign them),
   * this is useful for usage in smart contracts
   *
   * @default false
   */
  sign?: boolean
}

export interface SingleSymbolPriceParams {
  /** The cryptocurrency symbol of interest */
  fsym: string
  /** Cryptocurrency symbols list to convert into */
  tsyms: string[]
}

export interface SingleSymbolPriceResponse {
  [tsym: string]: number
}

export interface MultiSymbolPriceParams {
  /** Cryptocurrency symbols list */
  fsyms: string[]
  /** Cryptocurrency symbols list to convert into */
  tsyms: string[]
}

export interface MultiSymbolPriceResponse {
  [fsym: string]: { [tsym: string]: number }
}

export interface AvailibleCoinListResponse {
  [fsym: string]: CoinSpec
}

export interface CoinSpec {
  id: number
  symbol: string
  partner_symbol: string
  data_available_from: number
}
