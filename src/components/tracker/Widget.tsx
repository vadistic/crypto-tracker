import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { trackerSlice } from '../../store/tracker/tracker'
import { RootState } from '../../store/types'
import { IconTrash } from '../icons/Icon'
import { Card } from '../layout/Card'

import { WidgetBody, WidgetDiff, WidgetHeading } from './WidgetDisplay'

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
  }
}

const mapDispatch = {
  close: trackerSlice.actions.removeItem,
}

const connector = connect(mapState, mapDispatch)

export const TrackerWidget = connector(WidgetBase)
