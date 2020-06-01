import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import './index.css'
import Routes from './routes'

// BLUEPRINTJS IMPORTS
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:9999/graphql',
})

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'))

serviceWorker.unregister()
