import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import notificationSound from '../utils/notificationSound'

// Semantic UI
import { Comment } from 'semantic-ui-react'

// GraphQL
import { useQuery, useSubscription } from 'react-apollo'
import gql from 'graphql-tag'

// Components
import Messages from '../components/Messages'

const ChannelMessages = ({ channelId, username }) => {
  const { loading, error, data = {} } = useQuery(CHANNEL_MESSAGES, {
    variables: { channelId },
  })

  const { data: newData } = useSubscription(CHANNEL_MESSAGE_SUBSCRIPTION, {
    variables: { channelId },
  })

  if (loading) return null
  if (error) return `Error: ${error.message}`

  const messagesArr = data.channelMessages

  if (newData) {
    messagesArr.push(newData.newChannelMessage)

    if (newData.newChannelMessage.user.username !== username)
      notificationSound()
  }

  return (
    <Messages channelId={channelId}>
      <Comment.Group>
        {messagesArr.map(message => (
          <Comment id='channel-comment' key={`${message.id}-message`}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{message.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{dayjs(message.createdAt).format('h:mm a')}</div>
              </Comment.Metadata>
              <Comment.Text>{message.text}</Comment.Text>
              {/* <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions> */}
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

const CHANNEL_MESSAGE_SUBSCRIPTION = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
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
