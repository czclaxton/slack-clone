import React from 'react'
import styled from 'styled-components'

const SettingsPopover = ({
  teamName,
  username,
  handleTeamMemberModal,
  isOwner,
}) => {
  return (
    <PopoverWrapper
      className='bp3-popover-wrapper bp3-menu bp3-elevation-1'
      position='bottom_left'
    >
      <li className='bp3-menu-header'>
        <h3 className='bp3-heading' id='team-popover-header-title'>
          Settings
        </h3>
      </li>
      {isOwner && (
        <li>
          <button
            type='button'
            className='bp3-menu-item bp3-icon-standard bp3-icon-new-person'
            onClick={handleTeamMemberModal}
          >
            Invite to team
          </button>
        </li>
      )}
      <li>
        <button type='button' className='bp3-menu-item bp3-icon-layout-circle'>
          Circle
        </button>
      </li>
      <li>
        <button type='button' className='bp3-menu-item bp3-icon-layout-grid'>
          Grid
        </button>
      </li>

      <li>
        <button type='button' className='bp3-menu-item bp3-icon-edit'>
          Edit Profile
        </button>
      </li>
      <li>
        <button type='button' className='bp3-menu-item bp3-icon-star'>
          Favorites
        </button>
      </li>
      <li>
        <button type='button' className='bp3-menu-item bp3-icon-envelope'>
          Messages
        </button>
      </li>
    </PopoverWrapper>
  )
}

const PopoverWrapper = styled.ul`
  color: #fff;
  background-color: #15202b;
  font-size: 1.4rem;
  border-radius: 0;
  border: 0.01px solid rgba(171, 178, 191, 0.2);
`

export default SettingsPopover
