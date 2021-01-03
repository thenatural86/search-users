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
  // request, loading
  const [request, setRequest] = useState(0)
  const [loading, setIsLoading] = useState(false)
  // error
  const [error, setError] = useState({ show: false, msg: '' })

  const searchGithubUser = async (user) => {
    toggleError()
    // setLoading
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (response) {
      console.log(response)
      setGithubUser(response.data)
    } else {
      toggleError(true, 'there is no user with that username')
    }
  }

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequest(remaining)
        if (remaining === 0) {
          // throw error
          toggleError(true, 'sorry, you have excited your hourly rate limit!')
        }
      })
      .catch((err) => console.log(err))
  }

  // error
  const toggleError = (show = false, msg = '') => {
    setError({ show, msg })
  }

  useEffect(checkRequest, [])
  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, request, error, searchGithubUser }}
    >
      {children}
    </GithubContext.Provider>
  )
}

// export the GithubProvider, which Provides access to context to whole app, and GithubContext which is used in compents to grab the piece of context that we want in a specific component
export { GithubProvider, GithubContext }
