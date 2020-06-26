import requiresAuth from "../permissions";
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

// Subscription Tags
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
      async (parent, { channelId, text }, { models, user }) => {
        try {
          const message = await models.Message.create({
            channelId,
            text,
            userId: user.id,
          });

          const asyncFunc = async () => {
            const currentUser = await models.User.findOne({
              where: {
                id: user.id,
              },
            });

            pubsub.publish(NEW_CHANNEL_MESSAGE, {
              channelId,
              newChannelMessage: {
                ...message.dataValues,
                user: currentUser.dataValues,
              },
              context: { models },
            });
          };

          asyncFunc();

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
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, { channelId }) => payload.channelId === channelId
      ),
    },
  },
  Message: {
    user: ({ user, userId }, args, { models }) => {
      if (user) return user;

      return models.User.findOne({ where: { id: userId } }, { raw: true });
    },
  },
};
