import React from 'react'
import styled from 'styled-components'

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #2f343d;
  color: #abb2bf;
`

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0rem;
  list-style: none;
`

const TeamListItem = styled.li`
  height: 3.5rem;
  width: 3.5rem;
  background-color: #121417;
  color: #abb2bf;
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
    border-color: #abb2bf;
  }
`

const team = ({ id, letter }) => (
  <TeamListItem key={`team-${id}`}>{letter}</TeamListItem>
)

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
  </TeamWrapper>
)
