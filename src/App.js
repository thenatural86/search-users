import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      {/* home route */}
      <Route exact path='/'>
        <Dashboard></Dashboard>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      {/* <Error /> */}
    </Router>
  )
}

export default App
