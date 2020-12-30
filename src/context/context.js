import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

// actual context api saved to variable
const GithubContext = React.createContext()

// separate component that contains state and functional logic for entire app. Returns GithubContext.Provider
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  )
}

// export the GithubProvider, which Provides access to context to whole app, and GithubContext which is used in compents to grab the piece of context that we want in a specific component
export { GithubProvider, GithubContext }
