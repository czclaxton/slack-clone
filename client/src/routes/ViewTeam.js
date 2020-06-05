import React from 'react'

import Channels from '../components/Channels'
import Teams from '../components/Teams'
import Header from '../components/Header'
import Messages from '../components/Messages'
import Input from '../components/Input'
import AppLayout from '../components/AppLayout'

export default () => (
  <AppLayout>
    <Teams>Teams</Teams>
    <Channels />
    <Header>Header</Header>
    <Messages>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <Input>
      <input type='text' placeholder='Placeholder' />
    </Input>
  </AppLayout>
)
