import React from 'react';
import styles from './index.css';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
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
        <Link to="/">
          <h1 className={styles.title}>SpaceX Launch Explorer</h1>
        </Link>
        {props.children}
      </div>
    </ApolloProvider>
  );
};

export default BasicLayout;
