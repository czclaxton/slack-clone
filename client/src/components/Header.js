import React, { useState } from 'react'
import styled from 'styled-components'

import { Icon } from '@blueprintjs/core'

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  padding-bottom: 0.35rem;
  padding-top: 0.3rem;
  background: #1a1d23;
  color: #abb2bf;
  border-bottom: 0.01px solid rgba(171, 178, 191, 0.2);
`
const H5 = styled.h5`
  position: relative;
  left: 1.5rem;
  color: #abb2bf;
  margin-top: 0.3rem;
`

const MembersWrapper = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  bottom: 0.5rem;
  left: 1.5rem;
  background: transparent;
  border: none;
  padding: 0;
  color: #abb2bf;
  cursor: pointer;
  :hover {
    color: #99cb3f;
  }
`
const NumberWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-left: 0.25rem;
  padding-top: 0.1rem;
`

const Header = ({ channelName }) => {
  return (
    <HeaderWrapper>
      <H5 className='bp3-heading'>{`${channelName}`}</H5>
      <MembersWrapper>
        <Icon icon='person' iconSize='12' />
        <NumberWrapper>12</NumberWrapper>
      </MembersWrapper>
    </HeaderWrapper>
  )
}

export default Header
