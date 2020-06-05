import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  margin: 15px 0px 0px 15px;
`

export default ({ channelName }) => (
  <HeaderWrapper>
    <h5 className='bp3-heading'>{`#${channelName}`}</h5>
  </HeaderWrapper>
)
