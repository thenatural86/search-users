import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-d7roptfs.us.auth0.com
// KQX6a2q2SiHYqSBXt6Dk3B79jDkM8IKx

// wrap app in GithubProvider
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-d7roptfs.us.auth0.com'
      clientId='KQX6a2q2SiHYqSBXt6Dk3B79jDkM8IKx'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
