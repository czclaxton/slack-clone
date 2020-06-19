import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import 'semantic-ui-css/semantic.min.css'
import Routes from './routes'
import * as serviceWorker from './serviceWorker'

// BLUEPRINTJS IMPORTS
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

// APOLLO STUFF
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'

const httpLink = createHttpLink({ uri: 'http://localhost:9999/graphql' })

const middlewareLink = setContext(() => ({
  headers: {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
  },
}))

const afterWareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext()

  if (headers) {
    const token = headers.get('token')
    const refreshToken = headers.get('refreshToken')

    if (token) {
      localStorage.setItem('token', token)
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  return forward(operation)
})

const link = afterWareLink.concat(middlewareLink.concat(httpLink))

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'))

serviceWorker.unregister()
