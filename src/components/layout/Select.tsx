import React from 'react'
import ReactSelect, { Props } from 'react-select'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends Props<SelectOption> {}

export const Select: React.FC<SelectProps> = props => {
  return <ReactSelect {...props} />
}
