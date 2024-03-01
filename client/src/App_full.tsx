import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql, useLazyQuery } from '@apollo/client'

export const QUERY_PROJECTS_MOST_FUNDED = gql`
  query ProjectsMostFundedOfTheWeekGet(
  $projectsMostFundedOfTheWeekGetInput: GetProjectsMostFundedOfTheWeekInput
) {
  projectsMostFundedOfTheWeekGet(input: $projectsMostFundedOfTheWeekGetInput) {
    project {
      ...ProjectForLandingPage
      __typename
    }
    __typename
  }
}

fragment ProjectForLandingPage on Project {
  id
  name
  balance
  fundersCount
  thumbnailImage
  shortDescription
  title
  owners {
    id
    user {
      id
      username
      imageUrl
      __typename
    }
    __typename
  }
  __typename
}
`

function App() {
  const [count, setCount] = useState(0)

  const [queryProjects] = useLazyQuery(QUERY_PROJECTS_MOST_FUNDED)

  useEffect(() => {
    const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    for(let i = 0; i < 15; i++) {
      const tagId = tags[Math.floor(Math.random() * tags.length)]

      queryProjects({
        variables: {
          projectsMostFundedOfTheWeekGetInput: {
            "tagIds": [
              tagId
            ],
            "take": 3
          }
        }
      })
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
