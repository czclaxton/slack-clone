import React, { useState } from 'react'

// Utility
import normalizeErrors from '../utils/normalizeErrors'

// GraphQL
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
// import { ALL_TEAMS } from '../graphql/team'

// BLUEPRINTJS
import { Tooltip, Dialog, InputGroup } from '@blueprintjs/core'

const AddTeamMemberModal = ({ open, close, teamId, teamName }) => {
  const [invite, setInvite] = useState({
    email: '',
    errors: {},
  })

  const { email, errors } = invite

  const [addTeamMemberMutation] = useMutation(ADD_TEAM_MEMBER, {
    variables: { teamId, email },
    // update(cache, { data: { createChannel } }) {
    //   const { ok, channel } = createChannel

    //   if (!ok) {
    //     return
    //   }

    //   const data = cache.readQuery({
    //     query: ALL_TEAMS,
    //   })

    //   const teamIndex = findIndex(data.allTeams, ['id', teamId])

    //   data.allTeams[teamIndex].channels.push(channel)

    //   cache.writeQuery({
    //     query: ALL_TEAMS,
    //     data,
    //   })
    // },
  })

  const onChange = e => {
    const { name, value } = e.target
    setInvite({
      ...invite,
      [name]: value,
    })
  }

  const onSubmit = async () => {
    const response = await addTeamMemberMutation()
    console.log('new team member response', response)
    const { errors } = response.data.addTeamMember

    if (errors) {
      setInvite({
        ...invite,
        errors: normalizeErrors(errors),
      })

      return
    }

    close()
  }

  return (
    <div className='bp3-dialog-container'>
      <Dialog className='bp3-dialog' isOpen={open} onClose={close}>
        <div className='bp3-dialog-header'>
          <span className='bp3-icon-large bp3-icon-annotation'></span>
          <h4 className='bp3-heading'>Invite people to join {teamName}!</h4>
          <button
            aria-label='Close'
            onClick={close}
            className='bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross'
          ></button>
        </div>
        <div className='bp3-dialog-body'>
          <Tooltip
            content={errors.email ? errors.email : null}
            hoverCloseDelay='750'
            position='right'
            intent='danger'
          >
            <InputGroup
              placeholder="User's Email"
              type='text'
              name='email'
              onChange={onChange}
              value={email}
              large='true'
              intent={errors.email ? 'danger' : null}
            />
          </Tooltip>
        </div>

        <div className='bp3-dialog-footer'>
          <div className='bp3-dialog-footer-actions'>
            <button
              type='submit'
              onClick={onSubmit}
              className='bp3-button bp3-intent-success'
            >
              Send Invite
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

const ADD_TEAM_MEMBER = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default AddTeamMemberModal
