import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectName, selectEmail } from '../../store/selectors/auth'
import { updateName } from '../../store/Auth'

const Profile = ({
  name,
  email,
  updateName,
  // updatePassword,
  // updateEmail
}) => {
  return (
    <StyledProfile className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3 text-center">Profile</h3>
      </header>
      <div className="content">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
    </StyledProfile>
  )
}

const mapStateToProps = (state) => ({
  name: selectName(state),
  email: selectEmail(state),
})

export const ConnectedProfile = connect(
  mapStateToProps,
  { updateName }
)(Profile)


const StyledProfile = styled.div`

`