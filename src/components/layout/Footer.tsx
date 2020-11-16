import React from 'react'
import styled from 'styled-components'

import { StyledText } from './Text'

export const StyledFooter = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${p => p.theme.spacing.md};

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    align-items: center;
  }
`

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <StyledText color="inverted">
        <strong>Cryto Currency Tracker</strong> by <a href="http://github.com/vadistic">vadistic</a>{' '}
        | source on <a href="http://github.com/vadistic/crypto-tracker">github</a>
      </StyledText>
    </StyledFooter>
  )
}
