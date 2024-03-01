import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql, useLazyQuery } from '@apollo/client'

export const QUERY_PROJECTS = gql`
  query Projects($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        id
        title
        name
        description
        balance
        createdAt
        status
        image
      }
    }
  }
`

export const QUERY_COUNTRIES = gql`
  query ProjectCountriesGet {
    projectCountriesGet {
      count
      country {
        code
        name
      }
    }
  }
`

export const FRAGMENT_EXTERNAL_ACCOUNT = gql`
  fragment ExternalAccount on ExternalAccount {
    id
    accountType
    externalUsername
    externalId
    public
  }
`

export const FRAGMENT_USER_ME = gql`
  ${FRAGMENT_EXTERNAL_ACCOUNT}
  fragment UserMe on User {
    id
    username
    imageUrl
    email
    ranking
    isEmailVerified
    externalAccounts {
      ...ExternalAccount
    }
    ownerOf {
      project {
        id
        name
        image
        thumbnailImage
        title
        status
      }
    }
  }
`

export const QUERY_ME = gql`
  ${FRAGMENT_USER_ME}
  query Me {
    me {
      ...UserMe
    }
  }
`


function App() {
  const [count, setCount] = useState(0)

  const [queryProjects] = useLazyQuery(QUERY_PROJECTS)
  const [queryCountries] = useLazyQuery(QUERY_COUNTRIES)
  const [queryMe] = useLazyQuery(QUERY_ME)

  useEffect(() => {
    for(let i = 0; i < 40; i++) {
      queryProjects()
      queryCountries()
      queryMe()
    }
  }, [])
  

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
