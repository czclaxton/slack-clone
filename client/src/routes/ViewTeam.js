import React from 'react'
import findIndex from 'lodash.findindex'
import { Redirect } from 'react-router-dom'

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
  console.log('allTeams', allTeams)

  if (!allTeams) return <Redirect to='/create-team' />

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

  return (
    <AppLayout>
      <SideBar
        teams={allTeams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase(),
        }))}
        currentTeam={currentTeam}
      />
      {currentChannel && <Header channelName={currentChannel.name} />}
      {currentChannel && <ChannelMessages channelId={currentChannel.id} />}
      {currentChannel && <SendMessage channel={currentChannel} />}
    </AppLayout>
  )
}

export default ViewTeam
