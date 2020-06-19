import React, { useState } from 'react'
import styled from 'styled-components'

// GraphQL
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

// BLUEPRINTJS
import { Tooltip, Intent, Button, InputGroup } from '@blueprintjs/core'

const SendMessage = ({ channel: { id, name } }) => {
  const [message, setMessage] = useState({
    text: '',
  })

  const [createChannelMessageMutation] = useMutation(CREATE_CHANNEL_MESSAGE, {
    variables: { channelId: parseInt(id), text: message.text },
  })

  const onChange = e => {
    const { name, value } = e.target
    setMessage({
      [name]: value,
    })
  }

  const onSubmit = async () => {
    if (message.text === '') return

    await createChannelMessageMutation()
    setMessage({ text: '' })
  }

  const sendButton = (
    <ButtonWrapper>
      <Tooltip content={`Send`}>
        <Button
          icon={'direction-right'}
          intent={Intent.SUCCESS}
          minimal={true}
          onClick={onSubmit}
        />
      </Tooltip>
    </ButtonWrapper>
  )

  return (
    <SendMessageWrapper>
      <InputGroup
        name='text'
        type='text'
        large='true'
        rightElement={sendButton}
        placeholder={`Message #${name}`}
        onChange={onChange}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            onSubmit(e)
          }
        }}
      />
    </SendMessageWrapper>
  )
}

const CREATE_CHANNEL_MESSAGE = gql`
  mutation($channelId: Int!, $text: String!) {
    createChannelMessage(channelId: $channelId, text: $text)
  }
`

export default SendMessage

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  padding: 1rem 1rem 1rem 1rem;
`

const ButtonWrapper = styled.div`
  margin-right: 0.3rem;
`
