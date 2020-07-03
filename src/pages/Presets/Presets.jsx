import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addPreset, removePreset } from '../../store/Presets'
import { selectPresetBlocks, selectPresetTimeshift, selectPresetSchedules, selectPresetLoading, selectPresetErrors } from '../../store/selectors/presets'
import { ErrorText } from '../../components/ErrorText'
import { LoadingContainer } from '../../components/LoadingContainer'

export const Presets = ({
  blocks,
  timeshift,
  schedule,
  loading,
  errors,
  addPreset,
  removePreset,
}) => {

  // Needs a way to sort between types of preset... Maybe a top sorting bar?

  return (
    <StyledPresets>
      <header className="page-header">
        <h3>Presets</h3>
        {errors && (
          <ErrorText message={errors} />
        )}
      </header>
      <div className="presets-inner">
        <div className="custom-blocks">
          <h5>Your Time Blocks</h5>
          {loading && (
            <LoadingContainer />
          )}
        </div>
      </div>
    </StyledPresets>
  )
}

const mapStateToProps = (state) => ({
  blocks: selectPresetBlocks(state),
  timeshift: selectPresetTimeshift(state),
  schedule: selectPresetSchedules(state),
  loading: selectPresetLoading(state),
  errors: selectPresetErrors(state),
})

export const ConnectedPresets = connect(
  mapStateToProps,
  { addPreset, removePreset }
)(Presets)

const StyledPresets = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;

  
`