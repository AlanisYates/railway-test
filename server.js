import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World",
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
  const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true, });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at ${server.graphqlPath}`)
  );
}

startServer();
