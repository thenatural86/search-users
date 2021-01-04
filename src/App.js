import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        {/* home route */}
        <PrivateRoute exact={true} path='/'>
          <Dashboard></Dashboard>
        </PrivateRoute>
        <Route path='/login'>
          <Login />
        </Route>
        {/* wildcard for every other path */}
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
