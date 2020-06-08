import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Icon } from '@blueprintjs/core'

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #181818;
  color: #ffffff;
`

const TeamNameHeader = styled.h1`
  color: #ffffff;
  font-size: 1.4rem;
`

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0rem;
`

const paddingLeft = 'padding-left: 0.7rem'

const SideBarListItem = styled.li`
  ${paddingLeft};
  &:hover {
    background: #202020;
  }
`

const SideBarListHeader = styled.li`
  ${paddingLeft}
`
const PushRight = styled.div`
  ${paddingLeft}
`
const Green = styled.span`
  color: #99cb3f;
`

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○')

const channel = ({ id, name }, teamId) => (
  <Link to={`/view-team/${teamId}/${id}`} key={`channel-${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
)

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
)

export default ({
  teamName,
  username,
  channels,
  users,
  handleModal,
  teamId,
}) => (
  <ChannelWrapper>
    <PushRight>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushRight>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels
          <Icon icon='plus' onClick={handleModal} />
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
)
