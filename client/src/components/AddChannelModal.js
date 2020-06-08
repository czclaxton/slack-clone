import React, { useState } from 'react'

// GraphQL
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

// BLUEPRINTJS
import { Tooltip, Dialog, Intent, InputGroup, Switch } from '@blueprintjs/core'

const AddChannelModal = ({ open, close, teamId }) => {
  const [newChannel, setNewChannel] = useState({
    name: '',
  })

  const [createChannelMutation] = useMutation(CREATE_CHANNEL, {
    variables: { teamId: parseInt(teamId), name: newChannel.name },
  })

  const { name } = newChannel

  const onChange = e => {
    const { name, value } = e.target
    setNewChannel({
      ...newChannel,
      [name]: value,
    })
  }

  const onSubmit = async () => {
    const response = await createChannelMutation()
    close()
    console.log('response', response)
  }

  return (
    <div className='bp3-dialog-container'>
      <Dialog className='bp3-dialog' isOpen={open} onClose={close}>
        <div className='bp3-dialog-header'>
          <span className='bp3-icon-large bp3-icon-inbox'></span>
          <h4 className='bp3-heading'>Create a new channel</h4>
          <button
            aria-label='Close'
            className='bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross'
          ></button>
        </div>
        <div className='bp3-dialog-body'>
          <InputGroup
            placeholder='Channel Name'
            // rightElement={lockButton}
            type='text'
            name='name'
            onChange={onChange}
            value={name}
            large='true'
            // intent={errors.password ? 'danger' : null}
          />
          <Switch label='Public Group' />
        </div>

        <div className='bp3-dialog-footer'>
          <div className='bp3-dialog-footer-actions'>
            <button type='button' onClick={close} className='bp3-button'>
              Cancel
            </button>
            <button
              type='submit'
              onClick={onSubmit}
              className='bp3-button bp3-intent-primary'
            >
              Create
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

const CREATE_CHANNEL = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`

export default AddChannelModal
