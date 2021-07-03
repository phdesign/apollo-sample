import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Launches from "./launches";
import PageContainer from "../components/page-container";
import Footer from "../components/footer";

const Pages = () => {
  return (
    <>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
        </Router>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Pages;
