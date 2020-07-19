import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ErrorNotification } from '../../components/ErrorText'
import { LoadingContainer } from '../../components/LoadingContainer'
import { getSettings, getSettingsSection, updateAllSettings, updateSettingsSection, clearErrors } from '../../store/Settings'
import { selectWorkSettings, selectTimetrackingSettings, selectTimeshiftSettings, selectGeneralSettings, selectUISettings } from '../../store/Settings/selectors.js'
import { selectAuthToken } from '../../store/Auth/selectors'


const Settings = ({
  // ready,
  token,
  workSettings,
  timetrackingSettings,
  timeshiftSettings,
  generalSettings,
  uiSettings,
  loading,
  errors,
  getSettings,
  getSettingsSection,
  updateAllSettings,
  updateSettingsSection,
  clearErrors
}) => {
  const sections = ["work", "timetracking", "timeshift", "general", "ui"];

  // const [settingsChanges, setSettingsChanges] = useState() // array of objects, where each object is a settings section
  const [work, setWork] = useState(null)
  const [timetracking, setTimetracking] = useState(null)
  const [timeshift, setTimeshift] = useState(null)
  const [general, setGeneral] = useState(null)
  const [ui, setUI] = useState(null)

  const [activeChanges, setActiveChanges] = useState(false)
  const [formErrors, setFormErrors] = useState(null)
  
  useEffect(() => {
    getSettings(token);
  }, [])

  useEffect(() => setWork(workSettings), [workSettings])
  useEffect(() => setTimetracking(timetrackingSettings), [timetrackingSettings])
  useEffect(() => setTimeshift(timeshiftSettings), [timeshiftSettings])
  useEffect(() => setGeneral(generalSettings), [generalSettings])
  useEffect(() => setUI(uiSettings), [uiSettings])

  const handleChange = (name, value, cb) => {
    if(!activeChanges) setActiveChanges(true)
    cb(name, value)
  }
  
  const handleWorkChange = (name, value) => setWork({...work, [name]: value})
  const handleTimetrackingChange = (name, value) => setTimetracking({ ...timetracking, [name]: value })
  const handleTimeshiftChange = (name, value) => setTimeshift({ ...timeshift, [name]: value })
  const handleGeneralChange = (name, value) => setGeneral({ ...general, [name]: value })
  const handleUIChange = (name, value) => setUI({ ...ui, [name]: value })

  const saveSettings = (e, sectionName=undefined) => {
    e.preventDefault()

    if(!sectionName) {
      // save all changes
      if(activeChanges)
        console.log('user wants to save all settings')
    }
    else {
      // find the right data
      let settingsData;
      switch(sectionName) {
        case "general":
          settingsData = general; break;
        case "work":
          settingsData = work; break;
        case "ui":
          settingsData = ui; break;
        case "timetracking":
          settingsData = timetracking; break;
        case "timeshift":
          settingsData = timeshift; break;
        default:
          setFormErrors("error. attempting to update a settings field that doesn't exist")
      }
      if(!settingsData) console.log('settings data is undefined')
      else updateSettingsSection(token, settingsData, sectionName)
    }
  }

  const resetSettingsPage = () => {
    setWork(null)
    setTimetracking(null)
    setTimeshift(null)
    setGeneral(null)
    setUI(null)
    setActiveChanges(false)
  }
  
  return (
    <StyledSettings className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3">Settings</h3>
        {activeChanges && (
          <div className="header-right">
            <button className="button is-small is-ghost is-link" onClick={resetSettingsPage}>Cancel</button>
            <button className="button is-small is-link" onClick={saveSettings}>Save</button>
          </div>
        )}
      </header>

      {loading ? <LoadingContainer />
      : (
        <div className="columns" style={{flexDirection:'column',overflowY:"auto"}}>

          {errors && <ErrorNotification message={errors} clearErrors={clearErrors} />}

          {general && <div className="column is-full">
            <form className="form settings-form" onSubmit={(e) => saveSettings(e, "general")}>
              <div className="field settings-form-item show-time">
                {/* Note: Replace with Bulma Toggle */}
                <p className="item-text">Show Time: {general.showTime ? "yes" : "no"}</p>
                {/* <label htmlFor="showTime">Show Time: </label>
                <input id="switchRoundedSuccess" type="checkbox" name="showTime" className="switch is-rtl is-rounded is-success" checked={"checked"} /> */}
              </div>
              <div className="field settings-form-item timeshift-active">
                <p className="item-text">Timeshift Active: {general.timeshiftActive ? "yes" : "no"}</p>
              </div>
              <div className="field settings-form-item alarms-active">
                <p className="item-text">Alarms Active: {general.alarmsActive ? "yes" : "no"}</p>
              </div>
              {activeChanges && (
                <div className="header-right">
                  <button className="button is-small is-ghost" onClick={resetSettingsPage}>Cancel</button>
                  <button className="button is-small is-info" type="submit" onClick={saveSettings}>Save</button>
                </div>
              )}
            </form>
          </div>}

          {work && <div className="column is-full">
            <form className="form settings-form" onSubmit={(e) => saveSettings(e, "work")}>
              <div className="field settings-form-item show-time">
                {/* Note: Replace with Bulma Toggle */}
                <p className="item-text">Show Time: {general.showTime ? "yes" : "no"}</p>
                {/* <label htmlFor="showTime">Show Time: </label>
                <input id="switchRoundedSuccess" type="checkbox" name="showTime" className="switch is-rtl is-rounded is-success" checked={"checked"} /> */}
              </div>
              <div className="field settings-form-item timeshift-active">
                <p className="item-text">Timeshift Active: {general.timeshiftActive ? "yes" : "no"}</p>
              </div>
              <div className="field settings-form-item alarms-active">
                <p className="item-text">Alarms Active: {general.alarmsActive ? "yes" : "no"}</p>
              </div>
              {activeChanges && (
                <div className="header-right">
                  <button className="button is-small is-ghost" onClick={resetSettingsPage}>Cancel</button>
                  <button className="button is-small is-info" type="submit" onClick={saveSettings}>Save</button>
                </div>
              )}
            </form>
          </div>}

          {timetracking && <div className="column is-full">
            <form className="form settings-form" onSubmit={(e) => saveSettings(e, "timetracking")}>
              <div className="field settings-form-item show-time">
                {/* Note: Replace with Bulma Toggle */}
                <p className="item-text">Show Time: {general.showTime ? "yes" : "no"}</p>
                {/* <label htmlFor="showTime">Show Time: </label>
                <input id="switchRoundedSuccess" type="checkbox" name="showTime" className="switch is-rtl is-rounded is-success" checked={"checked"} /> */}
              </div>
              <div className="field settings-form-item timeshift-active">
                <p className="item-text">Timeshift Active: {general.timeshiftActive ? "yes" : "no"}</p>
              </div>
              <div className="field settings-form-item alarms-active">
                <p className="item-text">Alarms Active: {general.alarmsActive ? "yes" : "no"}</p>
              </div>
              {activeChanges && (
                <div className="header-right">
                  <button className="button is-small is-ghost" onClick={resetSettingsPage}>Cancel</button>
                  <button className="button is-small is-info" type="submit" onClick={saveSettings}>Save</button>
                </div>
              )}
            </form>
          </div>}

          {timeshift && <div className="column is-full">
            <form className="form settings-form" onSubmit={(e) => saveSettings(e, "timeshift")}>
              <div className="field settings-form-item show-time">
                {/* Note: Replace with Bulma Toggle */}
                <p className="item-text">Show Time: {general.showTime ? "yes" : "no"}</p>
                {/* <label htmlFor="showTime">Show Time: </label>
                <input id="switchRoundedSuccess" type="checkbox" name="showTime" className="switch is-rtl is-rounded is-success" checked={"checked"} /> */}
              </div>
              <div className="field settings-form-item timeshift-active">
                <p className="item-text">Timeshift Active: {general.timeshiftActive ? "yes" : "no"}</p>
              </div>
              <div className="field settings-form-item alarms-active">
                <p className="item-text">Alarms Active: {general.alarmsActive ? "yes" : "no"}</p>
              </div>
              {activeChanges && (
                <div className="header-right">
                  <button className="button is-small is-ghost" onClick={resetSettingsPage}>Cancel</button>
                  <button className="button is-small is-info" type="submit" onClick={saveSettings}>Save</button>
                </div>
              )}
            </form>
          </div>}

          {ui && <div className="column is-full">
            <form className="form settings-form" onSubmit={(e) => saveSettings(e, "ui")}>
              <div className="field settings-form-item show-time">
                {/* Note: Replace with Bulma Toggle */}
                <p className="item-text">Show Time: {general.showTime ? "yes" : "no"}</p>
                {/* <label htmlFor="showTime">Show Time: </label>
                <input id="switchRoundedSuccess" type="checkbox" name="showTime" className="switch is-rtl is-rounded is-success" checked={"checked"} /> */}
              </div>
              <div className="field settings-form-item timeshift-active">
                <p className="item-text">Timeshift Active: {general.timeshiftActive ? "yes" : "no"}</p>
              </div>
              <div className="field settings-form-item alarms-active">
                <p className="item-text">Alarms Active: {general.alarmsActive ? "yes" : "no"}</p>
              </div>
              {activeChanges && (
                <div className="header-right">
                  <button className="button is-small is-ghost" onClick={resetSettingsPage}>Cancel</button>
                  <button className="button is-small is-info" type="submit" onClick={saveSettings}>Save</button>
                </div>
              )}
            </form>
          </div>}
        </div>
      )}
    </StyledSettings>
  )
}

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  workSettings: selectWorkSettings(state),
  timetrackingSettings: selectTimetrackingSettings(state),
  timeshiftSettings: selectTimeshiftSettings(state),
  generalSettings: selectGeneralSettings(state),
  uiSettings: selectUISettings(state),
  loading: state.settings.loading,
  errors: state.settings.errors,
  // ready: selectSettingsReady(state)
})

export const ConnectedSettings = connect(
  mapStateToProps,
  { getSettings, getSettingsSection, updateSettingsSection, updateAllSettings, clearErrors }
)(Settings)

const StyledSettings = styled.div`
  .section-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .header-text { flex: 1; }
    .header-right {
      // display: flex;


    }
  }

  .settings-form {

    .settings-form-item {
      padding: 1rem 2rem;

      .item-text {
        margin: 0;
      }
    }
  }
`