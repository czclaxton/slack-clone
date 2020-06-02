import bcrypt from "bcrypt";
import _ from "lodash";

import { tryLogin } from "../auth";

const formatErrors = (err, models) => {
  if (err instanceof models.Sequelize.ValidationError) {
    return err.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [{ path: "name", message: "Something went wrong" }];
};

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 8 || password.length > 100) {
          return {
            ok: false,
            errors: [
              {
                path: "password",
                message: "Password must be at least 8 characters",
              },
            ],
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({
          ...otherArgs,
          password: hashedPassword,
        });
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
