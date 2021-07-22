import React from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import LaunchTile from "../components/launch-tile";
import Header from "../components/header";
import Loading from "../components/loading";
import ActionButton from "../containers/action-button";
import { LAUNCH_TILE_DATA } from "./launches";
import {
  LaunchDetails,
  LaunchDetailsVariables,
} from "./__generated__/LaunchDetails";

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface LaunchProps extends RouteComponentProps {
  launchId?: any;
}

const Launch: React.FC<LaunchProps> = ({ launchId }) => {
  const { loading, error, data } = useQuery<
    LaunchDetails,
    LaunchDetailsVariables
  >(GET_LAUNCH_DETAILS, {
    variables: { launchId },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <Header
        image={
          data.launch && data.launch.mission && data.launch.mission.missionPatch
        }
      >
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchTile launch={data.launch} />
      <ActionButton {...data.launch} />
    </>
  );
};

export default Launch;
