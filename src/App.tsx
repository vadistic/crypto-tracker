import React from 'react'

import { Layout } from './components/layout/Layout'
import { TrackerBoundary } from './components/tracker/Boundary'
import { Tracker } from './components/tracker/Tracker'

export class App extends React.Component {
  render() {
    return (
      <Layout>
        <TrackerBoundary>
          <Tracker />
        </TrackerBoundary>
      </Layout>
    )
  }
}
