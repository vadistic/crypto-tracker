import React from 'react'

import { Layout } from './components/layout/Layout'
import { Tracker } from './components/tracker/Tracker'

export class App extends React.Component {
  render() {
    return (
      <Layout>
        <Tracker />
      </Layout>
    )
  }
}
