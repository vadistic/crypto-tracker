import axios from 'axios'

import { CRYTPO_APIKEY } from '../config'

import {
  AvailibleCoinListResponse,
  MultiSymbolPriceParams,
  MultiSymbolPriceResponse,
  SharedParams,
  SingleSymbolPriceParams,
  SingleSymbolPriceResponse,
} from './types'
import { ApiResult, toApiResult } from './utils'

export class CryptoApi {
  fetcher = axios.create({
    baseURL: `https://min-api.cryptocompare.com/data/`,
    timeout: 5000,
    // do not throw
    validateStatus: () => true,
    headers: {
      authorization: `Apikey ${CRYTPO_APIKEY}`,
    },
    params: {
      sign: false,
      extraParams: 'crypto-tracker',
      // api_key: CRYTPO_APIKEY,
    } as SharedParams,
  })

  async singleSymbolPrice({
    fsym = 'BTC',
    tsyms = ['EUR'],
  }: SingleSymbolPriceParams): Promise<ApiResult<SingleSymbolPriceResponse>> {
    const res = await this.fetcher.get('price', {
      params: { fsym, tsyms: tsyms.join(',') },
    })

    return toApiResult(res)
  }

  async multipleSymbolPrice({
    fsyms = ['BTC'],
    tsyms = ['EUR'],
  }: MultiSymbolPriceParams): Promise<ApiResult<MultiSymbolPriceResponse>> {
    const res = await this.fetcher.get('pricemulti', {
      params: { fsyms: fsyms.join(','), tsyms: tsyms.join(',') },
    })

    return toApiResult(res)
  }

  // ! api retruns wrapped response
  async availibleCoinList(): Promise<ApiResult<AvailibleCoinListResponse>> {
    const res = await this.fetcher.get('blockchain/list', { params: {} })

    return toApiResult(res)
  }
}

export const api = new CryptoApi()
