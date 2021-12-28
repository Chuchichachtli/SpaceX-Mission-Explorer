import React, { FC } from "react"
import styles from './index.css';
import { Card } from "antd";
import { ILaunchData } from "@/interfaces/interfaces";
import { useQuery } from "@apollo/client";
import { GET_LAUNCH_QUERY } from "@/queries/queries";

export default function () {
  const id = window.location.pathname.split("/")[2];
  const { loading, error, data } = useQuery(GET_LAUNCH_QUERY, {
    variables: { id: id }
  });

  if (loading) { return <p className={styles.errorLoad}>Loading...</p> }
  if (error) { return  <p className={styles.errorLoad}>ERROR!</p> }
  if (data && data.launch) {
    return (
      <div>
        <MissionCard
          launchData={data.launch}
        />
      </div>);
  }else { return <p className={styles.errorLoad} >ERROR!</p> }
}

type launchProps = {
  launchData: ILaunchData
}

const MissionCard: React.FC<launchProps> = ({ launchData }) => {
  const { mission_name, launch_date_utc, launch_success,
    launch_site, rocket: { rocket_name }, links: { flickr_images, article_link, video_link } } = launchData;
  const date = new Date(launch_date_utc);
  const date_time = String(date).split("GMT")[0];
  console.log(article_link)
  return (
    <Card size='small'
      bordered={true}
      className={styles.missionCard}
      title={<p style={{ fontSize: "24px", color: "#1A374D" }}> {mission_name}<span style={{ float: 'right', fontSize: "16px" }}> {date_time} </span>
      </p>}
    >
      <p>Rocket Name : {rocket_name}</p>
      <p>Launch Site : {launch_site.site_name_long} </p>

      <p> Mission Status : {launch_success ? <span style={{ color: "green", fontWeight: "600" }}>Successful</span>
        :
        <span style={{ color: "red", fontWeight: "600" }}>Failed</span>} </p>
      {flickr_images[0] ? <img src={flickr_images[0]} alt={rocket_name} />
        :
        <></>
      }
      {article_link ?
        <p> More detauls about this mission can be found <a target="_blank" href={article_link}>here</a>. </p>
        :
        <></>}
      {video_link ?
        <p>The video of the launch can be watched <a href={video_link} target="_blank">here.</a></p>
        :
        <></>}

    </Card>);
}
