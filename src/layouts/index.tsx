import React from 'react';
import styles from './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.SpaceX.land/graphql',
  cache: new InMemoryCache()
});

const GET_MISSIONS = gql`
  {
    launchesPast($limit: Number!, find: {$mission_name: String!}) {
      mission_name
      launch_site {
        site_name_long
        site_name
      }
      links {
        article_link
      }
      launch_date_local
      launch_date_unix
      launch_success
    }
  }
`

// const GET_MISSIONS_QUERY = client.query({
//   query: gql`
//   {
//     launchesPast($limit: Number!, find: {$mission_name: String!}) {
//       mission_name
//       launch_site {
//         site_name_long
//         site_name
//       }
//       links {
//         article_link
//       }
//       launch_date_local
//       launch_date_unix
//       launch_success
//     }
//   }
// `
// }).then((result) => console.log(result.data))

export function getMissions(limit: number , mission_name: string){
  const { loading, error, data } = useQuery(GET_MISSIONS, {
    variables: { limit, mission_name },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return data;
}


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
