import React from 'react'

// GraphQL
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

// Components
import Messages from '../components/Messages'

const ChannelMessages = ({ channelId }) => {
  const { loading, error, data = {} } = useQuery(CHANNEL_MESSAGES, {
    variables: { channelId },
  })

  if (loading) return null
  if (error) return `Error: ${error.message}`

  const messagesArr = data.channelMessages

  return (
    <Messages channelId={channelId}>
      <ul>
        <li>{messagesArr}</li>
        <li></li>
      </ul>
    </Messages>
  )
}

const CHANNEL_MESSAGES = gql`
  query($channelId: Int!) {
    channelMessages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`

export default ChannelMessages
