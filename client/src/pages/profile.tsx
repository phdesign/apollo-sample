import React from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import Header from "../components/header";
import { LAUNCH_TILE_DATA } from "./launches";
import { GetMyTrips } from "./__generated__/GetMyTrips";
import Loading from "../components/loading";
import LaunchTile from "../components/launch-tile";

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { error, loading, data } = useQuery<GetMyTrips>(GET_MY_TRIPS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You don't have any trips booked</p>
      )}
    </>
  );
};

export default Profile;
