import React, { useState } from 'react'
import decode from 'jwt-decode'

// Components
import Channels from '../components/Channels'
import Teams from '../components/Teams'
import AddChannelModal from '../components/AddChannelModal'

const SideBar = ({ teams, currentTeam }) => {
  const [addChannelOpen, setAddChannelOpen] = useState(false)

  const handleModal = () => {
    setAddChannelOpen(!addChannelOpen)
  }

  let username = ''
  try {
    const token = localStorage.getItem('token')
    const { user } = decode(token)
    username = user.username
  } catch (err) {}

  return (
    <>
      <Teams key='team-sidebar' teams={teams} />
      <Channels
        key='channels-sidebar'
        teamName={currentTeam.name}
        username={username}
        teamId={currentTeam.id}
        channels={currentTeam.channels}
        users={[
          { id: 1, name: 'connor' },
          { id: 2, name: 'slackbot' },
        ]}
        handleModal={handleModal}
      />
      <AddChannelModal
        key='sidebar-add-channel-modal'
        open={addChannelOpen}
        close={handleModal}
        teamId={currentTeam.id}
      />
    </>
  )
}

export default SideBar
