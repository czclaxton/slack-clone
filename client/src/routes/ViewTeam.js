import React from 'react'
import findIndex from 'lodash.findindex'
import { Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

// GraphQL
import { useQuery } from 'react-apollo'
import { ALL_TEAMS } from '../graphql/team'

// Components
import Header from '../components/Header'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'
import SideBar from '../containers/Sidebar'
import ChannelMessages from '../containers/ChannelMessages'

const ViewTeam = ({
  match: {
    params: { teamId, channelId },
  },
}) => {
  const { loading, error, data = {} } = useQuery(ALL_TEAMS)

  if (loading) return null
  if (error) return `Error: ${error.message}`

  const allTeams = data.allTeams

  if (allTeams.length === 0) return <Redirect to='/create-team' />

  const teamIdInt = parseInt(teamId, 10)

  const teamIndex = teamIdInt ? findIndex(allTeams, ['id', teamIdInt]) : 0
  const currentTeam = teamIndex === -1 ? allTeams[0] : allTeams[teamIndex]

  const channelIdInt = parseInt(channelId, 10)
  const channelIndex = channelIdInt
    ? findIndex(currentTeam.channels, ['id', channelIdInt])
    : 0
  const currentChannel =
    channelIndex === -1
      ? currentTeam.channels[0]
      : currentTeam.channels[channelIndex]

  let username = ''
  let isOwner = false
  try {
    const token = localStorage.getItem('token')

    const { user } = decode(token)
    username = user.username
    isOwner = user.id === currentTeam.owner
  } catch (err) {}

  return (
    <AppLayout>
      <SideBar
        teams={allTeams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase(),
        }))}
        currentTeam={currentTeam}
        username={username}
        isOwner={isOwner}
      />
      {currentChannel && <Header channelName={currentChannel.name} />}
      {currentChannel && (
        <ChannelMessages channelId={currentChannel.id} username={username} />
      )}
      {currentChannel && <SendMessage channel={currentChannel} />}
    </AppLayout>
  )
}

export default ViewTeam
