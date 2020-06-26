require("dotenv").config();
import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import cors from "cors";

// Apollo GraphQL Stuff
import { ApolloServer } from "apollo-server-express";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";

import models from "./models";
import { refreshTokens } from "./auth";

const port = 9999;

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const addUser = async (req, res, next) => {
  // if valid token, add user to req obj otherwise refresh the tokens
  const token = req.headers["token"];

  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers["refreshtoken"];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        process.env.SECRET,
        process.env.SECRET2
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "token, refreshToken");
        res.set("token", newTokens.token);
        res.set("refreshToken", newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

const app = express();

app.use(cors("*"), addUser);

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, connection }) => ({
    models,
    user: connection ? connection.context : req.user,
    SECRET: process.env.SECRET,
    SECRET2: process.env.SECRET2,
  }),
  subscriptions: `ws://localhost:${port}/subscriptions`,
});

apolloServer.applyMiddleware({ app });

const server = createServer(app);

models.sequelize.sync({}).then(() => {
  server.listen(port, () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server,
        path: "/subscriptions",
      }
    );
  });
});
