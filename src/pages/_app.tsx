import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import '../styles/globals.css';

const githubToken = process.env.NEXT_PUBLIC_REACT_APP_GITHUB_TOKEN;

// Create an Apollo Client instance for GraphQL communication
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql', // GitHub GraphQL API endpoint
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
