const { ApolloServer } = require("apollo-server-express");
const express = require('express');
const http = require("http");
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const server = new ApolloServer({ typeDefs, resolvers,  });
const app = express();

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ host: "0.0.0.0", port: 8080 }, () =>
  console.log(`🚀 Server ready at http://0.0.0.0:8080${server.graphqlPath}`)
);