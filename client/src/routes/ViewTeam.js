import React from 'react'
import findIndex from 'lodash.findindex'
import { Redirect } from 'react-router-dom'

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

  // if (!allTeams) return <Redirect to='/create-team' />

  if (loading) return null
  if (error) return `Error: ${error.message}`

  const teamIdInt = parseInt(teamId, 10)
  const teamIndex = teamIdInt ? findIndex(allTeams, ['id', teamIdInt]) : 0
  const currentTeam = allTeams[teamIndex]

  const channelIdInt = parseInt(teamId, 10)
  const channelIndex = channelIdInt
    ? findIndex(currentTeam.channels, ['id', channelIdInt])
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
      {currentChannel && <Header channelName={currentChannel.name} />}
      {currentChannel && (
        <Messages channelId={currentChannel.id}>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </Messages>
      )}
      {currentChannel && <SendMessage channelName={currentChannel.name} />}
    </AppLayout>
  )
}

export default ViewTeam
