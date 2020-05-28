require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

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

models.sequelize.sync({}).then(() => {
  app.listen({ port: 9999 });
});
