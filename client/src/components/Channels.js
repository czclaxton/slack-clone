import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Icon, Popover, Button } from '@blueprintjs/core'

import TeamPopover from './TeamPopover'

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #181818;
  color: #ffffff;
`

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0.7rem;
`

const paddingLeft = 'padding-left: 0.7rem'

const SideBarListItem = styled.li`
  ${paddingLeft};
  &:hover {
    background: #202020;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  width: 100%;
`

const SideBarListHeader = styled.li`
  ${paddingLeft}
  display: flex !important;
`

const H3 = styled.h3`
  margin: 0 0 0.25rem 0;
`

const Green = styled.span`
  color: #99cb3f;
  margin-right: 0.25rem;
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
  handleChannelModal,
  teamId,
  handleTeamMemberModal,
}) => (
  <ChannelWrapper>
    <Popover
      content={
        <TeamPopover
          id='team-popover-content'
          teamName={teamName}
          username={username}
          handleTeamMemberModal={handleTeamMemberModal}
        />
      }
      minimal='true'
    >
      <Button
        id='team-popover'
        className='team-popover bp3-popover-target bp3-minimal bp3-large'
        fill
        outlined
        type='button'
        text={
          <FlexWrapper>
            <h3>{teamName}</h3>
            <Icon icon='chevron-down' id='team-popover-chevron-down' />
          </FlexWrapper>
        }
      >
        <div className='team-username'>
          <Bubble />
          {username}
        </div>
      </Button>
    </Popover>
    <div>
      <SideBarList>
        <SideBarListHeader
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <H3>Channels</H3>
          <Icon
            id='add-channel-icon'
            icon='plus'
            iconSize='20'
            style={{ cursor: 'pointer' }}
            onClick={handleChannelModal}
          />
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
