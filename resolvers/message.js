import requiresAuth from "../permissions";

export default {
  Query: {
    channelMessages: requiresAuth.createResolver(
      async (parent, { channelId }, { models, user }) =>
        models.Message.findAll({
          order: [["createdAt", "ASC"]],
          where: { channelId },
        })
    ),
  },
  Mutation: {
    createChannelMessage: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          await models.Message.create({ ...args, userId: user.id });
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    ),
  },
  Message: {
    user: ({ userId }, args, { models }) =>
      models.User.findOne({ where: { id: userId } }),
  },
};
