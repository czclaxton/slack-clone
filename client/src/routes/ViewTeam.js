import React from 'react'
import findIndex from 'lodash.findindex'

// GraphQL
import { useQuery } from 'react-apollo'
import { ALL_TEAMS } from '../graphql/team'

// Components
import Header from '../components/Header'
import Messages from '../components/Messages'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'
import SideBar from '../containers/Sidebar'

const ViewTeam = ({
  match: {
    params: { teamId, channelId },
  },
}) => {
  const { loading, error, data = {} } = useQuery(ALL_TEAMS)

  const allTeams = data.allTeams

  if (loading) return null
  if (error) return `Error: ${error.message}`

  const teamIndex = teamId
    ? findIndex(allTeams, ['id', parseInt(teamId, 10)])
    : 0
  const currentTeam = allTeams[teamIndex]

  const channelIndex = channelId
    ? findIndex(currentTeam.channels, ['id', parseInt(channelId, 10)])
    : 0
  const currentChannel = currentTeam.channels[channelIndex]

  return (
    <AppLayout>
      <SideBar
        teams={allTeams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase(),
        }))}
        currentTeam={currentTeam}
      />
      <Header channelName={currentChannel.name} />
      <Messages channelId={currentChannel.id}>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName={currentChannel.name} />
    </AppLayout>
  )
}

export default ViewTeam
