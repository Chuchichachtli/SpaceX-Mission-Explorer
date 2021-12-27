import React, { FC, useState } from 'react';
import styles from './index.css';
import { Input, Card, Row, Col } from 'antd';
const { Search } = Input;
import {
  useQuery,
  useLazyQuery,
  gql
} from "@apollo/client";

const GET_MISSIONS = gql`
  query GetMissions ($limit : Number!, $mission_name : String!) {
    launchesPast(limit: $limit, find: { mission_name: $mission_name } ) {
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
  `;
export default function LandingPage () {

  const defaultResultCount: number = 10;
  const [resultCount, setResultCount] = useState(defaultResultCount);
  const [missionName, setMissionName] = useState("");
  // const [results, SetResults]
  const [showResults, setShowResults] = useState(false);

  const onSearch = () => {

    // client.query({
    //   query: gql`
    //   {
    //     launchesPast(limit: ${resultCount}, find: {mission_name: "Starlink"}) {
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
    // }).then(result => console.log(result));
      // const limit = resultCount;
      // const mission_name = missionName;
      // const [getMissionsCall, { loading, data }] = useLazyQuery(GET_MISSIONS, { variables : {limit:limit, mission_name:mission_name} } )
      //   if (!loading  && data){
      //     console.log(data);
      //     return <p>data</p>;
      // }

    // if (resultCount > 0) { setShowResults(true); }
  }
  const onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMissionName(e.currentTarget.value);
  }
  const renderForm = () => {
    return
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
    <div style={{ width: "100%" }} className={styles.normal}>
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
          <ResultCard
            limit={resultCount}
            missionName={missionName}
          />
          {/* {renderResults()} */}
          {/* {showResults ? ResultCard({limit: 0+resultCount, missionName: String(missionName) }) : <></> } */}

        </Col>

      </Row>
    </div>
  );
}

interface ResultCardProps {
  limit: number,
  missionName : string
}


const ResultCard : FC<ResultCardProps> = (props : ResultCardProps) : JSX.Element => {

    const limit = props.limit ? props.limit : 0;
    const mission_name = props.missionName ? props.missionName : "";
    const [getMission, {loading, error, data}] = useLazyQuery(GET_MISSIONS, {
      variables: { limit, mission_name },
    });

    if (loading) return <></>;
    if (error) return <p>{error}</p>;
    console.log(data);
    if (!data){
      return <button onClick={() => { getMission() }}></button>
    }else{
      return <p>{data}</p>
    }


}


    // client.query({
    //   query: gql`
    //   {
    //     launchesPast(limit: ${resultCount}, find: {mission_name: "Starlink"}) {
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
    // }).then(result => console.log(result));
    // const limit = resultCount;
    // const mission_name = missionName;
    // const [getMissionsCall, { loading, data }] = useLazyQuery(GET_MISSIONS, { variables : {limit:limit, mission_name:mission_name} } )
    //   if (!loading  && data){
    //     console.log(data);
    //     return <p>data</p>;
    // }