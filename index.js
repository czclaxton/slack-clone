import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:3000",
  },
});

app.listen({ port: 9999 }, () =>
  console.log(`🚀 Server ready at http://localhost:9999${server.graphqlPath}`)
);
