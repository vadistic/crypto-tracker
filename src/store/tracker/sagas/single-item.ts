import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'

import { api, ApiResult, SingleSymbolPriceResponse } from '../../../api'
import { trackerSlice } from '../tracker'
import { TrackerItem } from '../types'

export function* fetchSingleTrackerItem({ payload: item }: PayloadAction<TrackerItem>) {
  const response: ApiResult<SingleSymbolPriceResponse> = yield call(() =>
    api.singleSymbolPrice({
      tsyms: [item.trading],
      fsym: item.crypto,
    }),
  )

  if (response.error) {
    yield call(fetchSingleTrackerItemErr, { item, error: response.error })
  }

  if (response.value) {
    yield call(fetchSingleTrackerItemOk, { item, value: response.value })
  }
}

export function* fetchSingleTrackerItemOk({
  item,
  value,
}: {
  item: TrackerItem
  value: SingleSymbolPriceResponse
}) {
  const price: number | undefined = value?.[item.trading]
  const diff = price !== undefined && item.price !== undefined ? price - item.price : item.price

  yield put(
    trackerSlice.actions.setItem({
      ...item,
      price,
      diff,
      error: undefined,
    }),
  )
}

export function* fetchSingleTrackerItemErr({ item }: { item: TrackerItem; error: string }) {
  yield put(
    trackerSlice.actions.setItem({
      ...item,
      error: 'No data',
    }),
  )
}

export function* watchSingleTrackerItem() {
  yield takeLeading(trackerSlice.actions.addItem.type, fetchSingleTrackerItem)
}
