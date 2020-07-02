import {
  split,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import { withApollo } from "next-with-apollo";

/* const getLink = () => {
  if (typeof window === 'undefined') {
    return new HttpLink({
      uri: "https://demo-kpatel20538.cloud.okteto.net/graphql",
    });
  } else {
    const httpLink = new HttpLink({
      uri: "https://demo-kpatel20538.cloud.okteto.net/graphql",
    });
    const wsLink = new WebSocketLink({
      uri: `wss://demo-kpatel20538.cloud.okteto.net/graphql`,
      options: {
        reconnect: true,
      },
    });
    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    );
  }
}

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      link: getLink(),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
); */

const getLink = () => {
  const httpLink = new HttpLink({
    uri: "https://demo-kpatel20538.cloud.okteto.net/graphql",
  });
  const wsLink = new WebSocketLink({
    uri: `wss://demo-kpatel20538.cloud.okteto.net/graphql`,
    options: {
      reconnect: true,
    },
  });
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
};

const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: getLink(),
  });
};

export default (Page) => {
  if (typeof window === "undefined") {
    return () => <div />;
  } else {
    return () => (
      <ApolloProvider client={getClient()}>
        <Page />
      </ApolloProvider>
    );
  }
};
