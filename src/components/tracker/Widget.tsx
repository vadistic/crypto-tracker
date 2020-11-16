import numeral from 'numeral'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/store'
import { TrackerItem, trackerSlice } from '../../store/tracker/tracker'
import { IconArrowDown, IconArrowUp, IconTrash } from '../icons/Icon'
import { Card } from '../layout/Card'
import { Spinner } from '../layout/Spinner'
import { StyledHeading, StyledText } from '../layout/Text'

import { getCryptoSymbol, getTradingSymbol } from './symbols'

export const StyledDiff = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 0 4px;
  }
`

export const WidgetDiff: React.FC<TrackerItem> = ({ diff, price, trading }) => {
  // ! cannot format smaller than 10e-6 with numeral.js ?
  // https://github.com/adamwdraper/Numeral-js/issues/563
  const isChanged = !!diff && Math.abs(diff) >= 0.000001

  if (price === undefined || diff === undefined || !isChanged) {
    return (
      <StyledDiff>
        <StyledText size="lg">—</StyledText>
      </StyledDiff>
    )
  }

  const tradingSymbol = getTradingSymbol(trading)
  const diffString = numeral(diff).format('+0,0.00[00000]')

  const arrowIcon =
    diff > 0 ? <IconArrowUp size="lg" color="success" /> : <IconArrowDown size="lg" color="error" />

  return (
    <StyledDiff>
      {arrowIcon}
      <StyledText size="lg">
        {diffString} {tradingSymbol}
      </StyledText>
    </StyledDiff>
  )
}

export const WidgetHeading: React.FC<TrackerItem> = ({ crypto }) => {
  const cryptoSymbol = getCryptoSymbol(crypto)

  return (
    <StyledHeading>
      {crypto}
      {cryptoSymbol && <> ({cryptoSymbol})</>}
    </StyledHeading>
  )
}

export const WidgetBody: React.FC<TrackerItem> = ({ price, trading, error }) => {
  if (error)
    return (
      <StyledText size="lg" align="center">
        {error}
      </StyledText>
    )

  if (price === undefined) return <Spinner />

  const priceString = numeral(price).format('0,0.00[00000]')

  return (
    <StyledText size="xl" align="center">
      {priceString} {getTradingSymbol(trading)}
    </StyledText>
  )
}

// ────────────────────────────────────────────────────────────────────────────────

export interface WidgetOwnProps {
  index: number
}

export type WidgetProps = WidgetOwnProps & ConnectedProps<typeof connector>

export class WidgetBase extends React.Component<WidgetProps> {
  render() {
    const { item, close } = this.props

    const heading = <WidgetHeading {...item} />
    const price = <WidgetBody {...item} />
    const diff = <WidgetDiff {...item} />

    return (
      <Card top={heading} bottom={diff} onClose={() => close(item)} closeIcon={IconTrash}>
        {price}
      </Card>
    )
  }
}

const mapState = (state: RootState, { index }: WidgetOwnProps) => {
  return {
    item: state.tracker.items[index],
    lastUpdate: state.tracker.lastUpdate,
  }
}

const mapDispatch = {
  close: trackerSlice.actions.removeItem,
}

const connector = connect(mapState, mapDispatch)

export const TrackerWidget = connector(WidgetBase)
