import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import GlobalStyle from "./styles";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
    <GlobalStyle />
  </>,
  document.getElementById("root")
);
