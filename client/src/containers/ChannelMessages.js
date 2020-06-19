import React from 'react'

// Semantic UI
import { Comment } from 'semantic-ui-react'

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

  console.log('🔥', messagesArr)

  return (
    <Messages channelId={channelId}>
      <Comment.Group>
        {messagesArr.map(message => (
          <Comment id='channel-comment' key={`${message.id}-message`}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{message.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{message.createdAt}</div>
              </Comment.Metadata>
              <Comment.Text>{message.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
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
