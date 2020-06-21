require("dotenv").config();
import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import cors from "cors";

import { ApolloServer } from "apollo-server-express";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PubSub } from "apollo-server-express";

import models from "./models";
import { refreshTokens } from "./auth";

const pubsub = new PubSub();

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

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    models,
    user: req.user,
    SECRET: process.env.SECRET,
    SECRET2: process.env.SECRET2,
    pubsub,
  }),
});

server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
  app.listen({ port: 9999 });
});
