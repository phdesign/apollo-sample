import React from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import LaunchTile from "../components/launch-tile";

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface LauncesProps extends RouteComponentProps {}

const Launches: React.FC<LauncesProps> = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const loadMore = (event) => {};

  const launchList = data.launches.launches.map((launch: any) => (
    <div key={launch.id}>
      <LaunchTile launch={launch}></LaunchTile>
    </div>
  ));

  return (
    <div>
      {launchList}
      <button onClick={loadMore}>Load more</button>
    </div>
  );
};

export default Launches;
