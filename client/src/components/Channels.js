import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Icon, Popover, Button, Tooltip } from '@blueprintjs/core'

import SettingsPopover from './SettingsPopover'

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○')

const channel = ({ id, name }, teamId) => (
  <Link to={`/view-team/${teamId}/${id}`} key={`channel-${id}`}>
    <SideBarListItem>
      <ListItemText># {name}</ListItemText>
    </SideBarListItem>
  </Link>
)

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <ListItemText>
      <Bubble /> {name}
    </ListItemText>
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
  isOwner,
}) => (
  <ChannelWrapper>
    <Popover
      content={
        <SettingsPopover
          id='settings-popover-content'
          teamName={teamName}
          username={username}
          handleTeamMemberModal={handleTeamMemberModal}
          isOwner={isOwner}
        />
      }
      minimal='true'
    >
      <Button
        id='team-popover-button'
        className='team-popover bp3-popover-target bp3-minimal bp3-large'
        fill
        outlined
        type='button'
        text={
          <FlexWrapper>
            <H3>{teamName}</H3>
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
        <SideBarListHeader id='sidebar-list-header'>
          <H3>Channels</H3>
          {isOwner && (
            <Tooltip content='Add a new channel'>
              <Icon
                id='add-icon'
                icon='plus'
                iconSize='20'
                style={{ cursor: 'pointer' }}
                onClick={handleChannelModal}
              />
            </Tooltip>
          )}
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader id='sidebar-list-header'>
          <H3>Direct Messages</H3>
          <Tooltip content='Open a direct message'>
            <Icon
              id='add-icon'
              icon='plus'
              iconSize='20'
              style={{ cursor: 'pointer' }}
              onClick={handleChannelModal}
            />
          </Tooltip>
        </SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
)

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #1a1d23;
  color: #ffffff;
  border-right: 0.01px solid rgba(171, 178, 191, 0.2);
`

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0rem;
`

const ListItemText = styled.p`
  margin: 0;
  position: relative;
  left: 0.7rem;
`

const paddingLeft = 'padding-left: 0.7rem'

const SideBarListItem = styled.li`
  &:hover {
    background: #253341;
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
`

const H3 = styled.h3`
  margin: 0 0 0.25rem 0;
`

const Green = styled.span`
  color: #99cb3f;
  margin-right: 0.25rem;
`
