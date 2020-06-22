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
import { ApolloProvider } from 'react-apollo'
import client from './apollo'

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'))

serviceWorker.unregister()
