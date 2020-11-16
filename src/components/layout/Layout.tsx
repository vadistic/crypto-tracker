import React from 'react'
import styled from 'styled-components'

import { Footer } from './Footer'
import { Header } from './Header'

const StyledLayout = styled.div`
  background-color: ${p => p.theme.bg.brand};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  min-height: 100vh;
  width: 100%;
  flex: 1 1 auto;

  width: 100%;
  margin: auto;

  padding: ${p => p.theme.spacing.md};

  @media (min-width: ${p => p.theme.breakpoints.lg}) {
    padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.xl};
  }
`

const StyledMain = styled.main`
  padding: ${p => p.theme.spacing.md};
  flex: 1 1 auto;
  width: 100%;
`

export const Layout: React.FC = ({ children }) => {
  return (
    <StyledLayout>
      <Header />

      <StyledMain>{children}</StyledMain>

      <Footer />
    </StyledLayout>
  )
}
