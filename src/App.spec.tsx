import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { App } from './App'
import { store } from './store/store'
import { theme } from './theme'

describe('App', () => {
  const Fixture: React.FC = () => {
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    )
  }

  it('renders', () => {
    render(<Fixture />)

    expect(screen.getAllByText('Cryto Currency Tracker').length).toBeGreaterThan(0)
  })
})
