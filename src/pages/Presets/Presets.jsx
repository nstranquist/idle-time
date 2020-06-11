import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

export const Presets = ({

}) => {
  return (
    <StyledPresets>
      <header className="page-header">
        <h3>Presets</h3>
      </header>
      <div className="presets-inner">
        <div className="custom-blocks">
          <h5>Your Time Blocks</h5>
        </div>
      </div>
    </StyledPresets>
  )
}

// const mapStateToProps = (state) => ({
  
// })

// export const ConnectedPresets = connect(
//   mapStateToProps,
//   {  }
// )(Presets)

const StyledPresets = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;

  
`