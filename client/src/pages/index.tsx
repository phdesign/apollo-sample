import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Launches from "./launches";
import Launch from "./launch";
import Profile from "./profile";
import Login from "./login";
import PageContainer from "../components/page-container";
import Footer from "../components/footer";

const Pages = () => {
  return (
    <>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="/launch/:launchId" />
          <Profile path="/profile" />
          <Login path="/login" />
        </Router>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Pages;
