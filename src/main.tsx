import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { App } from './App'
import { store } from './store/store'
import { theme } from './theme'

import './index.css'

ReactDOM.render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root'),
)
