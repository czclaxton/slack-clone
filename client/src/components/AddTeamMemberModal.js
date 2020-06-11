import React, { useState } from 'react'

import findIndex from 'lodash.findindex'

// GraphQL
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_TEAMS } from '../graphql/team'

// BLUEPRINTJS
import { Tooltip, Dialog, InputGroup } from '@blueprintjs/core'

const AddTeamMemberModal = ({ open, close, teamId, teamName }) => {
  const [newMember, setNewMember] = useState({
    email: '',
  })

  // const [addToTeamMutation] = useMutation(CREATE_CHANNEL, {
  //   variables: { teamId: parseInt(teamId), name: newChannel.name },
  //   optimisticResponse: {
  //     __typename: 'Mutation',
  //     createChannel: {
  //       ok: true,
  //       channel: {
  //         __typename: 'Channel',
  //         id: -1,
  //         name: newChannel.name,
  //       },
  //       __typename: 'ChannelResponse',
  //     },
  //   },
  //   update(cache, { data: { createChannel } }) {
  //     const { ok, channel } = createChannel

  //     if (!ok) {
  //       return
  //     }

  //     const data = cache.readQuery({
  //       query: ALL_TEAMS,
  //     })

  //     const teamIndex = findIndex(data.allTeams, ['id', teamId])

  //     data.allTeams[teamIndex].channels.push(channel)

  //     cache.writeQuery({
  //       query: ALL_TEAMS,
  //       data,
  //     })
  //   },
  // })

  const { email } = newMember

  const onChange = e => {
    const { email, value } = e.target
    setNewMember({
      ...newMember,
      [email]: value,
    })
  }

  const onSubmit = async () => {
    // await createChannelMutation()
    close()
  }

  return (
    <div className='bp3-dialog-container'>
      <Dialog className='bp3-dialog' isOpen={open} onClose={close}>
        <div className='bp3-dialog-header'>
          <span className='bp3-icon-large bp3-icon-annotation'></span>
          <h4 className='bp3-heading'>Send an invite to join {teamName}!</h4>
          <button
            aria-label='Close'
            onClick={close}
            className='bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross'
          ></button>
        </div>
        <div className='bp3-dialog-body'>
          <InputGroup
            placeholder='Email'
            type='text'
            name='name'
            onChange={onChange}
            value={email}
            large='true'
          />
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
              Invite
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

// const CREATE_CHANNEL = gql`
//   mutation($teamId: Int!, $name: String!) {
//     createChannel(teamId: $teamId, name: $name) {
//       ok
//       channel {
//         id
//         name
//       }
//     }
//   }
// `

export default AddTeamMemberModal
