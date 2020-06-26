import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Icon } from '@blueprintjs/core'

const team = ({ id, letter }) => (
  <Link
    style={{ textDecoration: 'none' }}
    key={`team-${id}`}
    to={`/view-team/${id}/`}
  >
    <TeamListItem>{letter}</TeamListItem>
  </Link>
)

export default ({ teams, currentTeam }) => (
  <TeamWrapper>
    <TeamList>
      {teams.map(team)}
      <IconWrapper>
        <Icon
          id='add-team-icon'
          icon='plus'
          iconSize='20'
          // onClick={}
        />
      </IconWrapper>
    </TeamList>
  </TeamWrapper>
)

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #1a1d23;
  color: #ffffff;
  border-right: 0.01px solid rgba(171, 178, 191, 0.2);
`

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0rem;
  list-style: none;
`

const TeamListItem = styled.li`
  height: 3rem;
  width: 3rem;
  background-color: #253341;
  color: #ffffff;
  margin: auto;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  border-radius: 15%;
  &:hover {
    border-style: solid;
    border-width: 0.15rem;
    border-color: #abb2bf;
  }
`

const IconWrapper = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  cursor: pointer;
`
