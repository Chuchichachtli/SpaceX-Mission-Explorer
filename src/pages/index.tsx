import React, { useState } from 'react';
import styles from './index.css';
import { Input, Card, Row, Col, Button } from 'antd';
import { IMission } from "@/interfaces/interfaces";
import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import { GET_MISSIONS_QUERY } from '@/queries/queries';
const { Search } = Input;

export default function () {


  const defaultResultCount: number = 10;
  const [resultCount, setResultCount] = useState(defaultResultCount);
  const [missionName, setMissionName] = useState("");
  const [skipRefetch, setSkipRefetch] = useState(false);
  const [results, setResults] = useState({ launchesPast: [] });

  const showResults = () => { return results.launchesPast.length !== 0; }

  const { loading, error, data, refetch } = useQuery(GET_MISSIONS_QUERY, {
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
    return (
    <Card size="small" bordered={true}
      className={styles.searchCard}
      title={<span className={styles.header}>Search</span>} >
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
        {/* <Button type='primary' className={styles.floatRight} onClick={onSearch} >Search</Button> */}
        </p>
      </form>
    </Card>)
  }

  const renderResults = () => {
    return (showResults() ?
      (<Card size="small" title={<span className={styles.header}>Results</span>} >
        <Row>
          {results.launchesPast.map((launchData: IMission) => {
            return <LaunchCard launchData={launchData} />
          })}
        </Row>
      </Card>)
      : <>
      {loading ? <span> </span> : <span> </span> }
      </>
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

type LaunchCardProps = {
  launchData: IMission
}
const LaunchCard: React.FC<LaunchCardProps> = ({ launchData }) => {
  const { id, mission_name, launch_date_utc, launch_success, launch_site } = launchData;
  const date = new Date(launch_date_utc);
  date.toString()
  return (
    <Col span={12} style={{ width: 300 }}>
      <Card size='small'
        bordered={true}
        className={styles.resultCard}
        title={<Link to={"/launch/"+id} className={styles.resultCardTitle}> {mission_name} </Link>}
      >
        <p> {date.toString()} </p>
        <p> {launch_success ? <span style={{ color: "green", fontWeight:"600" }}>Successful</span>
        :
        <span style={{ color: "red", fontWeight:"600" }}>Failed</span>} </p>
        <p> {launch_site.site_name_long} </p>
        <Link to={"/launch/"+id}><Button className={styles.floatRight}>More</Button></Link>
      </Card>
    </Col>);
}
