import React, { FC, useState } from 'react';
import styles from './index.css';
import { Input, Card, Row, Col } from 'antd';
const { Search } = Input;
import {
  useQuery,
  gql
} from "@apollo/client";

const GET_MISSIONS = gql`
  query GetMissions ($limit : Int, $mission_name : String) {
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
      id
    }
  }
  `;
export default function () {


  const defaultResultCount: number = 10;
  const [resultCount, setResultCount] = useState(defaultResultCount);
  const [missionName, setMissionName] = useState("");
  const [skipRefetch, setSkipRefetch] = useState(false);
  const [results, setResults] = useState({launchesPast : []});

  const showResults = () => {  return results.launchesPast.length !== 0 ; }

  const { loading, error, data, refetch } = useQuery(GET_MISSIONS, {
    variables: {limit:resultCount , mission_name:missionName },
    skip: skipRefetch,
    onCompleted: setResults
  });
  if (data) { setSkipRefetch(true); }

  // if (loading) return null;
  // if (error) return `Error! ${error}`;

  const onSearch = () => {
    setSkipRefetch(false);
    refetch() ;

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
    if (true) {
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

          {showResults() ?
            <p>{results.launchesPast.toString()}</p>
            :
            <>Eror?</>
          }
          {/* <ResultCard
            limit={resultCount}
            missionName={missionName}
          /> */}
          {/* {renderResults()} */}
          {/* {showResults ? ResultCard({limit: 0+resultCount, missionName: String(missionName) }) : <></> } */}

        </Col>

      </Row>
    </div>
  )
}

interface ResultCardProps {
  limit: number,
  missionName: string
}
type Result = {

}

// const ResultCard : FC<ResultCardProps> = (props : ResultCardProps) : JSX.Element => {

//     const limit = props.limit ? props.limit : 0;
//     const mission_name = props.missionName ? props.missionName : "";
//     const [getMission, {loading, error, data}] = useLazyQuery(GET_MISSIONS, {
//       variables: { limit, mission_name },
//     });

//     if (loading) return <></>;
//     if (error) return <p>{error}</p>;
//     console.log(data);
//     if (!data){
//       return <button onClick={() => { getMission() }}></button>
//     }else{
//       return <p>{data}</p>
//     }


// }
