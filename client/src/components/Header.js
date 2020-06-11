import React from 'react'
import styled from 'styled-components'

import { Icon } from '@blueprintjs/core'

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  margin: 1rem 0rem 0rem 1rem;
  background
`

const MembersWrapper = styled.div`
  display: flex;
  align-items: center;
`
const NumberWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Header = ({ channelName }) => {
  return (
    <HeaderWrapper>
      <h5 className='bp3-heading'>{`#${channelName}`}</h5>
      <MembersWrapper>
        <Icon icon='person' iconSize='14' />
        <NumberWrapper>12</NumberWrapper>
      </MembersWrapper>
    </HeaderWrapper>
  )
}

export default Header
