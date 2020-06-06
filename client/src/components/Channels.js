import React from 'react'
import styled from 'styled-components'

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #121417;
  color: #abb2bf;
`

const TeamNameHeader = styled.h1`
  color: #abb2bf;
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
    background: #2f343d;
  }
`

const SideBarListHeader = styled.li`
  ${paddingLeft}
`
const PushRight = styled.div`
  ${paddingLeft}
`
const Green = styled.span`
  color: #98c379;
`

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○')

const channel = ({ id, name }) => (
  <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
)

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
)

export default ({ teamName, username, channels, users }) => (
  <ChannelWrapper>
    <PushRight>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushRight>
    <div>
      <SideBarList>
        <SideBarListHeader>Channels</SideBarListHeader>
        {channels.map(channel)}
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
