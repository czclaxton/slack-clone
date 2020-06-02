import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import Home from './Home'
import Register from './Register'
import Login from './Login'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  )
}

export default App
