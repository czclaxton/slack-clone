import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #202020;
  color: #ffffff;
`

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0rem;
  list-style: none;
`

const TeamListItem = styled.li`
  height: 3.5rem;
  width: 3.5rem;
  background-color: #181818;
  color: #ffffff;
  margin: auto;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  border-radius: 7.5%;
  &:hover {
    border-style: solid;
    border-width: thin;
    border-color: #ffffff;
  }
`

const team = ({ id, letter }) => (
  <Link
    style={{ textDecoration: 'none' }}
    key={`team-${id}`}
    to={`/view-team/${id}/`}
  >
    <TeamListItem>{letter}</TeamListItem>
  </Link>
)

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
  </TeamWrapper>
)
