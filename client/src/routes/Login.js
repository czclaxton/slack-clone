import React, { useState } from 'react'
import styled from 'styled-components'

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

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    showPassword: false,
    errors: {},
  })

  const { email, password, showPassword, errors } = user

  const [loginMutation] = useMutation(LOGIN_USER, {
    variables: { ...user },
  })

  const onChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const onSubmit = async () => {
    const response = await loginMutation()
    const { errors, token, refreshToken } = response.data.login

    if (errors) {
      // if any errors, set them to state
      const errObj = {}

      errors.forEach(({ path, message }) => {
        errObj[path] = message
      })

      setUser({
        ...user,
        errors: errObj,
      })
    } else {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      props.history.push('/')
    }
  }

  const handleLockClick = () =>
    setUser({ ...user, showPassword: !showPassword })

  const lockButton = (
    <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`}>
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        intent={showPassword ? Intent.WARNING : Intent.SUCCESS}
        minimal={true}
        onClick={handleLockClick}
      />
    </Tooltip>
  )

  return (
    <div className='Form-Wrapper'>
      <Card elevation={Elevation.TWO}>
        <H1>Login</H1>
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
          className='bp3-button bp3-intent-success'
        >
          Submit
        </button>
      </Card>
    </div>
  )
}

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`

const H1 = styled.h1`
  color: #fff;
  background-color: #1a1d23;
  font-size: 1.4rem;
`

export default Login
