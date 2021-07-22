import React from "react";
import { gql, useMutation } from "@apollo/client";

import LoginForm from "../components/login-form";
import Loading from "../components/loading";
import * as LoginTypes from "./__generated__/Login";
import { RouteComponentProps } from "@reach/router";

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

interface LoginProps extends RouteComponentProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <>
      <Loading />
      <LoginForm login={console.log} />
    </>
  );
};

export default Login;
