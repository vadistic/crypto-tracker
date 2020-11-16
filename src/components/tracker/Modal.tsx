import React, { FormEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { trackerSlice } from '../../store/tracker/tracker'
import { RootState } from '../../store/types'
import { StyledButton } from '../layout/Button'
import { StyledForm, StyledFormError, StyledFormLabel, StyledFormRow } from '../layout/Form'
import { Modal } from '../layout/Modal'
import { Select } from '../layout/Select'

import { TRADING_CURRENCIES } from './symbols'

export interface TrackerModalProps extends ConnectedProps<typeof connector> {}

export interface TrackerModelState {
  errors: {
    crypto?: string
    trading?: string
  }
}

export class TrackerModalBase extends React.Component<TrackerModalProps, TrackerModelState> {
  state: TrackerModelState = {
    errors: {},
  }

  selectCryptoOptions = this.props.options.map(value => ({ label: value, value }))

  selectTradingOptions = TRADING_CURRENCIES.map(value => ({ label: value, value }))

  getSelectOptions() {
    return this.props.options.map(value => ({ label: value, value }))
  }

  getTradingOptions() {
    return TRADING_CURRENCIES.map(value => ({ label: value, value }))
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { items } = this.props

    e.preventDefault()

    const crypto = (e.target as any).elements.crypto.value
    const trading = (e.target as any).elements.trading.value

    const isDuplicate = items.some(item => item.crypto === crypto && item.trading === trading)

    if (!crypto || !trading || isDuplicate) {
      this.setState(prev => ({
        ...prev,
        errors: {
          crypto: !crypto
            ? 'Selection required'
            : isDuplicate
            ? 'Pair is already tracked'
            : undefined,
          trading: !trading ? 'Selection required' : undefined,
        },
      }))

      return
    }

    this.props.addItem({ crypto, trading })
    this.props.toggleModal(false)
  }

  render() {
    const { toggleModal, defaultTrading } = this.props

    const { errors } = this.state

    return (
      <Modal onClose={() => toggleModal(false)}>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledFormRow>
            <StyledFormLabel htmlFor="crypto">Crypto Currency</StyledFormLabel>
            <Select
              id="crypto"
              name="crypto"
              options={this.selectCryptoOptions}
              search={true}
              placeholder="Select crypto currency"
            />
            {errors.crypto && <StyledFormError>{errors.crypto}</StyledFormError>}
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormLabel htmlFor="trading">Trading Currency</StyledFormLabel>
            <Select
              id="trading"
              name="trading"
              options={this.selectTradingOptions}
              search={true}
              defaultValue={{ label: defaultTrading, value: defaultTrading }}
              placeholder="Select trading currency"
            />
            {errors.trading && <StyledFormError>{errors.trading}</StyledFormError>}
          </StyledFormRow>
          <StyledButton type="submit">Add tracker</StyledButton>
        </StyledForm>
      </Modal>
    )
  }
}

const mapState = (state: RootState) => {
  return {
    options: state.tracker.options,
    items: state.tracker.items,
    defaultTrading: state.tracker.defaultTrading,
  }
}

const mapDispatch = {
  toggleModal: trackerSlice.actions.toggleModal,
  addItem: trackerSlice.actions.addItem,
}

const connector = connect(mapState, mapDispatch)

export const TrackerModal = connector(TrackerModalBase)
