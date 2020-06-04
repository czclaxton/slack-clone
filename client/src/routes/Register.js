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

const Register = props => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
    errors: {},
  })

  const { username, email, password, showPassword, errors } = newUser

  const [registerMutation] = useMutation(REGISTER_USER, {
    variables: { ...newUser },
  })

  const onChange = e => {
    const { name, value } = e.target
    setNewUser({
      ...newUser,
      [name]: value,
    })
  }

  const onSubmit = async () => {
    const response = await registerMutation()
    const { errors } = response.data.register

    if (errors) {
      // if any errors, set them to state
      const errObj = {}

      errors.forEach(({ path, message }) => {
        errObj[path] = message
      })

      setNewUser({
        ...newUser,
        errors: errObj,
      })
    } else {
      props.history.push('/')
    }
  }

  const handleLockClick = () =>
    setNewUser({ ...newUser, showPassword: !showPassword })

  const lockButton = (
    <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`}>
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        intent={Intent.WARNING}
        minimal={true}
        onClick={handleLockClick}
      />
    </Tooltip>
  )

  return (
    <div className='Form-Wrapper'>
      <Card elevation={Elevation.TWO}>
        <h1>Register</h1>
        <div className='bp3-input-group .modifier'>
          <Tooltip
            content={errors.username ? errors.username : null}
            hoverCloseDelay='750'
            position='right'
          >
            <InputGroup
              placeholder='Username'
              name='username'
              onChange={onChange}
              value={username}
              type='text'
              large='true'
              intent={errors.username ? 'danger' : null}
            />
          </Tooltip>
        </div>
        <div className='bp3-input-group .modifier'>
          <Tooltip
            content={errors.email ? errors.email : null}
            hoverCloseDelay='750'
            position='right'
          >
            <InputGroup
              placeholder='Email'
              name='email'
              onChange={onChange}
              value={email}
              type='text'
              large='true'
              intent={errors.email ? 'danger' : null}
            />
          </Tooltip>
        </div>
        <div className='bp3-input-group .modifier'>
          <Tooltip
            content={errors.password ? errors.password : null}
            hoverCloseDelay='750'
            position='right'
          >
            <InputGroup
              placeholder='Password'
              rightElement={lockButton}
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={onChange}
              value={password}
              large='true'
              intent={errors.password ? 'danger' : null}
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

const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default Register
