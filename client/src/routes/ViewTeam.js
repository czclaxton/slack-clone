import React from 'react'

import Header from '../components/Header'
import Messages from '../components/Messages'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'
import SideBar from '../containers/Sidebar'

const ViewTeam = ({ match: { params } }) => (
  <AppLayout>
    <SideBar currentTeamId={params.teamId} />
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

export default ViewTeam
