import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// const client = new ApolloClient({
//   uri: 'https://api.github.com/graphql',
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_CLIENT_TOKEN;
  //const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

// client ID 36ec0013ca3c4d9b0537
// Client secrets a804ca5039ad3e292d8220765e7566e80535934c
