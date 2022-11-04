import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import cors from "cors";
import http from "http";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World from alanis",
  },
};

// const server = new ApolloServer({ typeDefs, resolvers });

// const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// app.listen(port, () => {
//   console.log(`App running on port ${port}....`);
// });

async function startServer() {
  const app = express();
  app.use(cors());

  app.get("/", (req, res) => {
  res.send("Hello world");
});

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  httpServer.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
}

startServer();
