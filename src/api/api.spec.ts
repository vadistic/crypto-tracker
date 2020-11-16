import { api } from './api'

describe('CryptoApi', () => {
  describe('single symbol price', () => {
    test('ok', async () => {
      const res = await api.singleSymbolPrice({ fsym: 'BTC', tsyms: ['EUR', 'PLN'] })

      expect(res.status).toBe(200)
      expect(res.error).toBeFalsy()
      expect(typeof res.value?.['EUR']).toBe('number')
    })

    test('err', async () => {
      const res = await api.singleSymbolPrice({ fsym: 'unknown', tsyms: ['EUR', 'PLN'] })

      expect(res.status).toBe(400)
      expect(res.value).toBeFalsy()
      expect(typeof res.error).toBe('string')
    })
  })

  describe('multi symbol price', () => {
    test('ok', async () => {
      const res = await api.multipleSymbolPrice({ fsyms: ['BTC'], tsyms: ['EUR', 'PLN'] })

      expect(res.status).toBe(200)
      expect(res.error).toBeFalsy()
      expect(res.value?.['BTC']['EUR']).toBeGreaterThan(0)
    })

    test('err', async () => {
      const res = await api.singleSymbolPrice({ fsym: 'unknown', tsyms: ['EUR', 'PLN'] })

      expect(res.status).toBe(400)
      expect(res.value).toBeFalsy()
      expect(typeof res.error).toBe('string')
    })
  })

  describe('availible coin list', () => {
    test('ok', async () => {
      const res = await api.availibleCoinList()

      expect(res.status).toBe(200)
      expect(res.error).toBeFalsy()
      expect(res.value?.['BTC'].symbol).toBe('BTC')
    })
  })
})
