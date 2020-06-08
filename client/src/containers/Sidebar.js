import React, { useState } from 'react'

// GraphQL
import { useQuery } from 'react-apollo'
import { ALL_TEAMS } from '../graphql/team'

import findIndex from 'lodash.findindex'
import decode from 'jwt-decode'

import Channels from '../components/Channels'
import Teams from '../components/Teams'
import AddChannelModal from '../components/AddChannelModal'

const SideBar = ({ currentTeamId }) => {
  const [addChannelOpen, setAddChannelOpen] = useState(false)

  const handleModal = () => {
    setAddChannelOpen(!addChannelOpen)
  }

  const { loading, error, data = {} } = useQuery(ALL_TEAMS)

  const allTeams = data.allTeams

  if (loading) return null
  if (error) return `Error: ${error.message}`

  const teamIndex = currentTeamId
    ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)])
    : 0
  const team = allTeams[teamIndex]

  let username = ''
  try {
    const token = localStorage.getItem('token')
    const { user } = decode(token)
    username = user.username
  } catch (err) {}

  return (
    <>
      <Teams
        key='team-sidebar'
        teams={allTeams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase(),
        }))}
      >
        Teams
      </Teams>
      <Channels
        key='channels-sidebar'
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
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
        teamId={team.id}
      />
    </>
  )
}

export default SideBar
