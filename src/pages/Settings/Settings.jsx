import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'


const Settings = ({
  //settings,
}) => {
  
  
  return (
    <StyledSettings className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3">Settings</h3>
      </header>
    </StyledSettings>
  )
}

const mapStateToProps = (state) => ({
  //settings: state.settings
})

export const ConnectedSettings = connect(
  mapStateToProps,
  {  }
)(Settings)

const StyledSettings = styled.div`

`