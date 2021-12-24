import React, { useState } from 'react';
import styles from './index.css';
import { Input, Card, Row, Col } from 'antd';
const { Search } = Input;
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

export default function () {

  const client = new ApolloClient({
    uri: 'https://api.SpaceX.land/graphql',
    cache: new InMemoryCache()
  });

  const defaultResultCount: number = 10;
  const [resultCount, setResultCount] = useState(defaultResultCount);
  const [missionName, setMissionName] = useState("");
  // const [results, SetResults]
  const [showResults, SetShowResults] = useState(false);

  const onSearch = () => {
    client.query({
      query: gql`
      {
        launchesPast(limit: 10, find: {mission_name: "${missionName}"}) {
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
    }).then(result => console.log(result));
  }
  const onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMissionName(e.currentTarget.value);
  }

  const onCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    val = val.replace(/[a-z][A-Z]\s/, "");
    if (val !== "") {
      console.log(val, typeof (val), val.length, parseInt(val));

      let newValue = parseInt(val);
      console.log(newValue);
      setResultCount(newValue);
    } else {
      setResultCount(0)
    }
  }
  const renderResults = () => {
    if (showResults) {
      return <></>
    } else {
      return <Card className={styles.resultCard} title="Results">123 </Card>
    }
  }

  return (
    <div className={styles.normal}>
      <Row gutter={8} align='top'>
        <Col span={4} pull={20}>
          <Card bordered={true}
            className={styles.searchCard}
            title={<span style={{ position: "relative", marginLeft: "20px", fontSize: "20px" }}>Search</span>} >
            <br />
            <form onSubmit={onSearch}>
              <Search className={styles.searchInput}
                enterButton
                onSearch={onSearch}
                placeholder='Mission Name'
                value={missionName}
                onChange={onTextChange}
              />
              <Input className={styles.numberInput} defaultValue={defaultResultCount} value={resultCount}
                onChange={onCountChange}></Input>
            </form>
          </Card>
          sadsad
        </Col>


        <Col span={16} >
          {/* {renderResults()} */}
          sadasd
        </Col>

      </Row>
    </div>
  );
}
