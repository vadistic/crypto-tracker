import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'

import { trackerSlice } from '../../store/tracker/tracker'
import { RootState } from '../../store/types'
import { StyledInvertedEmptyButton } from '../layout/Button'
import { StyledText } from '../layout/Text'

export interface TrackerBoundary extends ConnectedProps<typeof connector> {
  children: React.ReactNode
}

export interface TrackerBoundaryState {
  error?: string
}

export const StyledErrorBox = styled.div`
  text-align: center;
  margin: 32px;

  button {
    margin-top: 16px;
  }
`

export class TrackerBoundaryBase extends React.Component<TrackerBoundary, TrackerBoundaryState> {
  readonly state: TrackerBoundaryState = {
    error: undefined,
  }

  static getDerivedStateFromError(error: Error): TrackerBoundaryState {
    return {
      error: error.message,
    }
  }

  handleReset = () => {
    this.props.reset()
    this.setState({ error: undefined })
  }

  renderError(error?: string | boolean) {
    return (
      <StyledErrorBox>
        <StyledText color="inverted" size="lg">
          Something went wrong. {typeof error === 'string' && error}
        </StyledText>
        <StyledInvertedEmptyButton onClick={this.handleReset}>Reset</StyledInvertedEmptyButton>
      </StyledErrorBox>
    )
  }

  render() {
    const { error } = this.state
    const { children, warning } = this.props

    if (error) {
      return this.renderError(error)
    }

    if (warning) {
      return (
        <>
          {this.renderError(warning)}
          {children}
        </>
      )
    }

    return children
  }
}

const mapState = (state: RootState) => {
  return {
    warning: state.tracker.warning,
  }
}

const mapDispatch = {
  reset: trackerSlice.actions.reset,
}

const connector = connect(mapState, mapDispatch)

export const TrackerBoundary = connector(TrackerBoundaryBase)
