import React from 'react'
import styled from 'styled-components'

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 15px;
`

export default ({ channelName }) => (
  <SendMessageWrapper>
    <input
      type='text'
      class='bp3-input bp3-fill'
      placeholder={`Message #${channelName}`}
    />
  </SendMessageWrapper>
)
