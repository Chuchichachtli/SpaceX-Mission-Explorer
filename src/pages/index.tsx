import React, { useState } from 'react';
import styles from './index.css';
import { Input, Card, Row, Col, Button } from 'antd';
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
      }
      launch_date_utc
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
  const [results, setResults] = useState({ launchesPast: [] });

  const showResults = () => { return results.launchesPast.length !== 0; }

  const { loading, error, data, refetch } = useQuery(GET_MISSIONS, {
    variables: { limit: resultCount, mission_name: missionName },
    skip: skipRefetch,
    onCompleted: setResults
  });
  if (data) { setSkipRefetch(true); }

  const onSearch = () => {
    setSkipRefetch(false);
    refetch();
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

  const renderSearch = () => {
    return (<Card bordered={true}
      className={styles.searchCard}
      title={<span style={{ position: "relative", marginLeft: "20px", fontSize: "20px" }}>Search</span>} >
      <form onSubmit={onSearch}>
        <Search className={styles.searchInput}
          enterButton
          onSearch={onSearch}
          placeholder='Mission Name'
          value={missionName}
          onChange={onTextChange}
        />
        <p style={{marginTop:"10px"}}>
        <Input addonBefore="Limit" className={styles.numberInput} defaultValue={defaultResultCount} value={resultCount}
          onChange={onCountChange}></Input>
        <Button type='primary' style={{float:'right'}} onClick={onSearch} >Search</Button>
        </p>
      </form>
    </Card>)
  }

  const renderResults = () => {
    return (showResults() ?
      (<Card size="small" title="Results">
        <Row>
          {results.launchesPast.map((launchData: IMission) => {
            return <LaunchCard launchData={launchData} />
          })}
        </Row>
      </Card>)
      :
      <>Loading...</>
    );
  }

  return (
    <div style={{ width: "100%" }} className={styles.normal}>
      <Row gutter={8} align='top'>
        <Col span={6}>
          {renderSearch()}
        </Col>
        <Col span={16} >
          {renderResults()}
        </Col>

      </Row>
    </div>
  )
}

interface IMission {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  launch_success: boolean;
  launch_site: ILaunchSite;
}
interface ILaunchSite {
  site_name_long: string;
}
type LaunchCardProps = {
  launchData: IMission
}
const LaunchCard: React.FC<LaunchCardProps> = ({ launchData }) => {
  const { id, mission_name, launch_date_utc, launch_success, launch_site } = launchData;
  const date = new Date(launch_date_utc);
  date.toString()
  return (
    <Col span={12} style={{ width: 300 }}>
      <Card size='small' bordered={true} className={styles.resultCard} title={mission_name}>
        <p> {date.toString()} </p>
        <p> {launch_success ? <span style={{ color: "green" }}>Successful</span> : <span style={{ color: "red" }}>Failed</span>} </p>
        <p> {launch_site.site_name_long} </p>
        <Button>More</Button>
      </Card>
    </Col>);

}
