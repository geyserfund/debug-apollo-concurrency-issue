import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql, useLazyQuery } from '@apollo/client'

export const QUERY_USERS_GET = gql`
  query GetUsers($userId: ID!) {
  getUsers(userId: $userId) {
    id
  }
}
`

function App() {
  const [count, setCount] = useState(0)

  const [queryUser] = useLazyQuery(QUERY_USERS_GET)

  useEffect(() => {    
    for(let i = 0; i < 30; i++) {
      const userId = Math.floor(Math.random() * 30)

      queryUser({ variables: { userId } })
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
