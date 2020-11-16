import styled from 'styled-components'

export const StyledGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  justify-content: center;

  @media (min-width: ${p => p.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, 256px);
  }

  grid-auto-rows: 256px;
  grid-gap: 16px;
`
