import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/store'
import { trackerSlice } from '../../store/tracker/tracker'
import { IconPlus } from '../icons/Icon'
import { Card } from '../layout/Card'
import { StyledGrid } from '../layout/Grid'
import { StyledText } from '../layout/Text'

import { TrackerModal } from './Modal'
import { TrackerWidget } from './Widget'

export interface TrackerProps extends ConnectedProps<typeof connector> {}

const StyledErrorBox = styled.div`
  text-align: center;
  margin: 32px;
`

export class TrackerBase extends React.Component<TrackerProps> {
  renderPlusCard() {
    const bottom = <StyledText>Add tracker</StyledText>

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
              ERROR: {error}
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
    error: state.tracker.error,
  }
}

const mapDispatch = {
  reset: trackerSlice.actions.reset,
  addItem: trackerSlice.actions.addItem,
  toggleModal: trackerSlice.actions.toggleModal,
}

const connector = connect(mapState, mapDispatch)

export const Tracker = connector(TrackerBase)
