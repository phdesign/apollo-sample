import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import gql from "@apollo/client";

interface LauncesProps extends RouteComponentProps {}

const Launches: React.FC<LauncesProps> = () => {
  return <div>Got here</div>;
};

export default Launches;
