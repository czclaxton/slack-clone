import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  margin: 1rem 0rem 0rem 1rem;
`

export default ({ channelName }) => (
  <HeaderWrapper>
    <h5 className='bp3-heading'>{`#${channelName}`}</h5>
  </HeaderWrapper>
)
