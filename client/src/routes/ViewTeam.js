import React from 'react'

import Channels from '../components/Channels'
import Teams from '../components/Teams'
import Header from '../components/Header'
import Messages from '../components/Messages'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'

export default () => (
  <AppLayout>
    <Teams
      teams={[
        { id: 1, letter: 'L' },
        { id: 2, letter: 'C' },
      ]}
    >
      Teams
    </Teams>
    <Channels
      teamName='Team 1'
      username='Username 1'
      channels={[
        { id: 1, name: 'general' },
        { id: 2, name: 'announcements' },
      ]}
      users={[
        { id: 1, name: 'connor' },
        { id: 2, name: 'slackbot' },
      ]}
    />
    <Header channelName='announcements' />
    <Messages>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <SendMessage channelName='announcements' />
  </AppLayout>
)
