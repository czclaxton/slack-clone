import { gql } from "apollo-server-express";

export default gql`
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
  }

  type ChannelResponse {
    ok: Boolean!
    channel: Channel
    errors: [Error!]
  }

  type Mutation {
    createChannel(
      name: String!
      teamId: Int!
      public: Boolean = false
    ): ChannelResponse!
  }
`;
