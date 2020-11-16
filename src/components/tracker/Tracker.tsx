import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../../store/store'
import { trackerSlice } from '../../store/tracker/tracker'
import { IconPlus } from '../icons/Icon'
import { Card } from '../layout/Card'
import { StyledGrid } from '../layout/Grid'
import { StyledText } from '../layout/Text'

import { StyledErrorBox } from './Boundary'
import { TrackerModal } from './Modal'
import { TrackerWidget } from './Widget'

export interface TrackerProps extends ConnectedProps<typeof connector> {}

export class TrackerBase extends React.Component<TrackerProps> {
  renderPlusCard() {
    const bottom = (
      <StyledText size="lg" align="center">
        add tracker
      </StyledText>
    )

    return (
      <Card bottom={bottom} key="new">
        <IconPlus size="xl" onClick={() => this.props.toggleModal(true)} />
      </Card>
    )
  }

  render() {
    const { itemsLength, isModalOpen, error } = this.props

    const cards = Array.from({ length: itemsLength }).map((noop, i) => (
      <TrackerWidget index={i} key={i} />
    ))

    const plusCard = itemsLength < 20 && this.renderPlusCard()

    return (
      <>
        {isModalOpen && <TrackerModal />}
        {error && (
          <StyledErrorBox>
            <StyledText color="inverted" size="lg">
              Something went wrong :(. {error}
            </StyledText>
          </StyledErrorBox>
        )}
        <StyledGrid>
          {plusCard}
          {cards}
        </StyledGrid>
      </>
    )
  }
}

const mapState = (state: RootState) => {
  return {
    itemsLength: state.tracker.items.length,
    isModalOpen: state.tracker.isModalOpen,
    error: state.tracker.warning,
  }
}

const mapDispatch = {
  reset: trackerSlice.actions.reset,
  addItem: trackerSlice.actions.addItem,
  toggleModal: trackerSlice.actions.toggleModal,
}

const connector = connect(mapState, mapDispatch)

export const Tracker = connector(TrackerBase)
