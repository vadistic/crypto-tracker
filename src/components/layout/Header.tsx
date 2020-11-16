import React from 'react'
import styled, { css } from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${p => p.theme.spacing.md};

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    align-items: center;
  }
`

export const StyledTitle = styled.h1(
  p => css`
    color: ${p.theme.text.color.inverted};
    font-size: ${p.theme.heading.size.xl};
    margin: 0;
  `,
)

export const StyledSubtitle = styled.p`
  color: ${p => p.theme.text.color.inverted};
  font-size: ${p => p.theme.text.size.lg};
  font-style: italic;
  margin: 0;
`

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledTitle>Cryto Currency Tracker</StyledTitle>
      <StyledSubtitle>Track crypto currencies in real time</StyledSubtitle>
    </StyledHeader>
  )
}
