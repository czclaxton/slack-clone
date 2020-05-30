import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_USERS = gql`
  {
    allUsers {
      email
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>...loading</p>;
  if (error) return <p>Error</p>;

  return data.allUsers.map((user, i) => (
    <div key={i}>
      <p>{user.email}</p>
    </div>
  ));
};

export default Home;
