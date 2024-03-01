import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { 
  ApolloClient, InMemoryCache, ApolloProvider, ApolloClientOptions, createHttpLink, from, NormalizedCacheObject
} from '@apollo/client'

const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/graphql',
  uri: 'http://localhost:4001/graphql',
  credentials: 'include',
})

const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: from([ httpLink ]),
  cache: new InMemoryCache(),
  queryDeduplication: false
}

export const client = new ApolloClient(clientConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
