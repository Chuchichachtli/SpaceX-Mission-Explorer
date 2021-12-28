import { gql } from "@apollo/client";

export const GET_MISSIONS_QUERY = gql`
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

export const GET_LAUNCH_QUERY = gql`
query GetLaunch ($id : ID!)
{
  launch(id: $id) {
    id
    launch_date_utc
    launch_site {
      site_name_long
    }
    launch_success
    links {
      flickr_images
      article_link
      video_link
    }
    mission_name
    rocket {
      rocket_name
    }
  }
}
`;
