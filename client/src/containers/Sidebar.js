import React, { useState } from 'react'
// import decode from 'jwt-decode'

// Components
import Channels from '../components/Channels'
import Teams from '../components/Teams'
import AddChannelModal from '../components/AddChannelModal'
import AddTeamMemberModal from '../components/AddTeamMemberModal'

const SideBar = ({ teams, currentTeam, username, isOwner }) => {
  const [addChannelOpen, setAddChannelOpen] = useState(false)
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false)

  const handleChannelModal = () => {
    setAddChannelOpen(!addChannelOpen)
  }

  const handleTeamMemberModal = () => {
    setAddTeamMemberOpen(!addTeamMemberOpen)
  }

  return (
    <>
      <Teams key='team-sidebar' teams={teams} currentTeam={currentTeam} />
      <Channels
        key='channels-sidebar'
        teamName={currentTeam.name}
        username={username}
        teamId={currentTeam.id}
        channels={currentTeam.channels}
        handleTeamMemberModal={handleTeamMemberModal}
        isOwner={isOwner}
        users={[
          { id: 1, name: 'connor' },
          { id: 2, name: 'slackbot' },
        ]}
        handleChannelModal={handleChannelModal}
      />
      <AddChannelModal
        key='sidebar-add-channel-modal'
        open={addChannelOpen}
        close={handleChannelModal}
        teamId={currentTeam.id}
      />
      <AddTeamMemberModal
        key='sidebar-add-team-member-modal'
        teamId={currentTeam.id}
        open={addTeamMemberOpen}
        close={handleTeamMemberModal}
        teamName={currentTeam.name}
      />
    </>
  )
}

export default SideBar
