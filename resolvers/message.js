import requiresAuth from "../permissions";

const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

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
      async (parent, args, { models, user, pubsub }) => {
        try {
          await models.Message.create({ ...args, userId: user.id });
          pubsub.publish(NEW_CHANNEL_MESSAGE, {
            newChannelMessage: {
              ...args,
              userId: user.id,
            },
          });
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    ),
  },
  Subscription: {
    newChannelMessage: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator([NEW_CHANNEL_MESSAGE]),
    },
  },
  Message: {
    user: ({ userId }, args, { models }) =>
      models.User.findOne({ where: { id: userId } }),
  },
};
