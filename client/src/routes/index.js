import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import decode from 'jwt-decode'

// Components
import Home from './Home'
import Register from './Register'
import Login from './Login'
import CreateTeam from './CreateTeam'
import ViewTeam from './ViewTeam'

const isAuthenicated = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    decode(token)
    decode(refreshToken)
  } catch (err) {
    return false
  }

  return true
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenicated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
)

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/view-team' component={ViewTeam} />
        <PrivateRoute path='/create-team' exact component={CreateTeam} />
      </Switch>
    </Router>
  )
}

export default App
