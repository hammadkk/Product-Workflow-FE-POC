import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';

const client = new ApolloClient({
  uri: 'http://localhost:3500/product/graphql', 
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)