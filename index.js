require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import jwt from "jsonwebtoken";
import cors from "cors";

import models from "./models";
import { refreshTokens } from "./auth";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const addUser = async (req, res, next) => {
  // if valid token, add user to req obj otherwise refresh the tokens
  const token = req.headers["token"];
  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers["refreshToken"];
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    models,
    user: req.user,
    SECRET: process.env.SECRET,
    SECRET2: process.env.SECRET2,
  }),
});

server.applyMiddleware({ app }, cors("*"), addUser);

// app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({}).then(() => {
  app.listen({ port: 9999 });
});
