import React, { useState } from 'react'

// GraphQL
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

// BLUEPRINTJS
import {
  Tooltip,
  Intent,
  Button,
  Card,
  Elevation,
  InputGroup,
} from '@blueprintjs/core'

const CreateTeam = props => {
  const [team, setTeam] = useState({
    name: '',
    errors: {},
  })

  const { name, errors } = team

  const [createTeamMutation] = useMutation(CREATE_TEAM, {
    variables: { ...team },
  })

  const onChange = e => {
    const { name, value } = e.target
    setTeam({
      ...team,
      [name]: value,
    })
  }

  const onSubmit = async () => {
    const response = await createTeamMutation()
    const { errors } = response.data.createTeam

    if (errors) {
      // if any errors, set them to state
      const errObj = {}

      errors.forEach(({ path, message }) => {
        errObj[path] = message
      })

      setTeam({
        ...team,
        errors: errObj,
      })
    } else {
      props.history.push('/')
    }
  }

  return (
    <div className='Form-Wrapper'>
      <Card elevation={Elevation.TWO}>
        <h1>Create a team</h1>
        <div className='bp3-input-group .modifier'>
          <Tooltip
            content={errors.name ? errors.name : null}
            hoverCloseDelay='750'
            position='right'
          >
            <InputGroup
              placeholder='Name'
              type='text'
              name='name'
              onChange={onChange}
              value={name}
              large='true'
              intent={errors.name ? 'danger' : null}
            />
          </Tooltip>
        </div>
        <button
          type='button'
          onClick={onSubmit}
          className='bp3-button bp3-intent-primary'
        >
          Submit
        </button>
      </Card>
    </div>
  )
}

const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default CreateTeam
