import React from 'react';
import styles from './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.SpaceX.land/graphql',
  cache: new InMemoryCache()
});

const BasicLayout: React.FC = props => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1 className={styles.title}>Welcome to SpaceX Launch Searcher!</h1>
        {props.children}
      </div>
    </ApolloProvider>
  );
};

export default BasicLayout;
