import React from 'react'
import styled from 'styled-components'

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  padding: 1.7rem 1.3rem 1.7rem 1.3rem;
`

export default ({ channelName }) => (
  <SendMessageWrapper>
    <input
      type='text'
      className='bp3-input bp3-fill'
      placeholder={`Message #${channelName}`}
    />
  </SendMessageWrapper>
)
