import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { pure } from 'recompose'
import styled from 'styled-components'
import { ErrorNotification } from '../../components/ErrorText'
import { LoadingContainer } from '../../components/LoadingContainer'
import { AddForm } from './AddForm'
import { PresetItem } from './Item'
// redux
import { addTask } from '../../store/Tasks'
import { applyTimeshift, updateSettingsSection } from '../../store/Settings'
import { getPresets, addPreset, updatePreset, removePreset, clearErrors, } from '../../store/Presets'
import { selectPresets, selectPresetLoading, selectPresetErrors } from '../../store/Presets/selectors'
import { selectAuthToken } from '../../store/Auth/selectors'
import { bulmaColors } from '../../styles/bulma.colors'

const colorCodes = {
  task: bulmaColors.primary,
  timeshift: bulmaColors.link,
  schedule: bulmaColors.warning,
  default: bulmaColors.light,
}

const Presets = ({
  token,
  presets,
  loading,
  errors,
  getPresets,
  addPreset,
  updatePreset,
  removePreset,
  clearErrors
}) => {
  const [filterCategory, setFilterCategory] = useState("task") // or default
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null) // null or string
  const [uiError, setUIError] = useState(null)

  useEffect(() => {
    getPresets(token);
  }, [])

  const handleSortCategory = (category) => {
    // sort by category
    setFilterCategory(category)
  }

  const submitForm = (title, category) => {
    console.log('submitted new preset with data:', title, category)
    // TODO: add task data
    addPreset(token, { title, category })
    setShowAddForm(false)
  }

  const handleAddForm = () => {
    if(editingId) setEditingId(null)
    setShowAddForm(true)
  }

  const handleCancel = () => setShowAddForm(false)

  const togglePresetEditing = (id) => {
    if(editingId === id) {
      setEditingId(null)
    }
    else
      setEditingId(id)
  }

  const handleUsePreset = (presetData) => {
    // note: how to handle "project" or "combined" presets?
    //  Answer: I won't
    // a preset with specific timeshift, schedule, and task settings
    // well, a schedule and task preset wouldn't make sense to go together
    //  since a schedule is an array of tasks
    // but timeshift could go with either... or could it?
    //  timeshift would only go with schedule, or by itself. not with an individual task
    // Task: by itself (only)
    // Timeshift: by itself, or with schedule/project
    // Schedule: by itself or with timeshift

    // another note: the problem with schedule presets
    // when applied, they should clear out the existing tasks, like Kati said, a "tab",
    // and they should have a "blank slate" to start from
    // this implies encapsulation, which I'm not ready for yet.
    // so, will hold off on the schedule preset for now
    switch(presetData.category) {
      case "task":
        if(presetData.taskData) {
          let toast = true;
          addTask(token, presetData.taskData, toast)
          // and redirect user, or at least show the toast mechanism

        }
        else setUIError("task data does not exist yet for this preset")
      case "timeshift":
        if(presetData.timeshiftData) {
          applyTimeshift(presetData.timeshiftData) // ui-only, still redux
          updateSettingsSection(token, presetData.timeshiftData, "timeshift")
        }
        else setUIError("timeshift data does not exist yet for this preset")
      case "schedule":
        if(presetData.scheduleData) {
          console.log('your schedule data:', presetData.scheduleData)
          // applySchedule(presetData.scheduleData) // ui-only??
          // updateTasksWithScheudle(token, presetData.scheduleData) // will bulk-update the user's tasks
        }
        else setUIError("schedule data does not exist yet for this preset")
      case "default":
        setUIError("default tasks must be assigned a category before being used")
      default:
        setUIError("not sure what you meant by that")
    }
  }
  const handleSavePreset = (presetData) => {
    updatePreset(presetData)
  }
  const handleDeletePreset = (presetId) => {
    removePreset(token, presetId)
  }

  const handleCheckChange = e => {
    console.log('check change, value:', e.target.checked)

  }

  return (
    <StyledPresets className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3">Presets</h3>
        {errors && <div style={{marginBottom:"1rem"}}><ErrorNotification message={errors} clearErrors={clearErrors} /></div> }
      </header>

      {/* <section style={{padding: "2rem"}}>
        <div className="control">
          <label className="radio">
            <input type="radio" name="all" defaultChecked value={filterCategory==="all"} onChange={handleCheckChange} />
            All
          </label>
          <label className="radio">
            <input type="radio" name="tasks" value={filterCategory==="tasks"} onChange={handleCheckChange} />
            Tasks
          </label>
          <label className="radio">
            <input type="radio" name="timeshift" value={filterCategory==="timeshift"} onChange={handleCheckChange} />
            Timeshift
          </label>
          <label className="radio">
            <input type="radio" name="schedule" value={filterCategory==="schedule"} onChange={handleCheckChange} />
            Schedule
          </label>
        </div>
      </section> */}

      <div className="presets-inner">
        <div className="custom-blocks container">
          <h5 className="is-size-5" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.4rem'}}>
            <span>Your Time Blocks</span>
            <button className="button is-link" onClick={handleAddForm} style={{margin:0}}>Add Preset</button>
          </h5>

          {loading && <LoadingContainer />}

          {uiError && <ErrorNotification message={uiError} clearErrors={() => setUIError(null)} /> }

          {/* Add Left Column for: "All", "Tasks", "Timeshift", "Schedule" */}
          {/* Either Checkboxes (All would toggle all else off), or Radio Buttons */}
          {/* Default Value? "task"? */}

          {showAddForm && (
            <AddForm submitForm={submitForm} handleCancel={handleCancel} defaultCategory={filterCategory}/>
          )}

          <ul style={{marginLeft:0,paddingLeft:0,listStyle:"none"}}>
            {/* Preset._id should not be connected or related to its original task/schedule/timeshift._id */}
            {/* When creating a new item from preset, it should be created and generated with NEW ._id */}
            {presets.length > 0 ? presets.map(preset => (
              <PresetItem
                key={preset._id}
                color={colorCodes[preset.category] || bulmaColors.light}
                preset={preset}
                handleAdd={handleUsePreset}
                handleEdit={handleSavePreset}
                handleDelete={handleDeletePreset}
                isEditing={preset._id === editingId}
                setIsEditing={togglePresetEditing}
              />
            )) : <div style={{padding:".7rem"}}>You haven't created any presets yet.<br/>Click 'Add Preset' to begin!</div>}
          </ul>
        </div>
      </div>
    </StyledPresets>
  )
}

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  presets: selectPresets(state),
  loading: selectPresetLoading(state),
  errors: selectPresetErrors(state),
})

export const ConnectedPresets = connect(
  mapStateToProps,
  { getPresets, addPreset, updatePreset, removePreset, clearErrors, applyTimeshift, updateSettingsSection }
)(Presets)

export const PurePresets = pure(ConnectedPresets)

const StyledPresets = styled.div`
    
`