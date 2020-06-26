// APOLLO STUFF
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

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

const httpLinkWithMiddleware = afterWareLink.concat(
  middlewareLink.concat(httpLink)
)

const wsLink = new WebSocketLink({
  uri: `ws://localhost:9999/subscriptions`,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLinkWithMiddleware
)

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
