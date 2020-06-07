import React from 'react'

import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import findIndex from 'lodash.findindex'
import decode from 'jwt-decode'

import Channels from '../components/Channels'
import Teams from '../components/Teams'

const SideBar = ({ currentTeamId }) => {
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
        channels={team.channels}
        users={[
          { id: 1, name: 'connor' },
          { id: 2, name: 'slackbot' },
        ]}
      />
    </>
  )
}

const ALL_TEAMS = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`

export default SideBar
