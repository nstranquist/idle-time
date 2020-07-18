import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ErrorNotification } from '../../components/ErrorText'
import { LoadingContainer } from '../../components/LoadingContainer'
import { getSettings, getSettingsSection, updateAllSettings, updateSettingsSection, clearErrors } from '../../store/Settings'
import { selectWorkSettings, selectTimetrackingSettings, selectTimeshiftSettings, selectGeneralSettings, selectUISettings } from '../../store/Settings/selectors.js'
import { selectAuthToken } from '../../store/Auth/selectors'


const Settings = ({
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
  const [work, setWork] = useState(workSettings)
  const [timetracking, setTimetracking] = useState(timetrackingSettings)
  const [timeshift, setTimeshift] = useState(timeshiftSettings)
  const [general, setGeneral] = useState(generalSettings)
  const [ui, setUI] = useState(uiSettings)

  const [activeChanges, setActiveChanges] = useState(false)
  const [formErrors, setFormErrors] = useState(null)
  
  useEffect(() => {
    if(token) getSettings(token);

    return () => resetSettingsPage()
  }, [])

  const handleChange = (name, value) => {
    if(!activeChanges) setActiveChanges(true)

    // setSettingsForm({
    //   ...settingsForm,
    //   [name]: value
    // })
  }  

  const saveSettings = (e, sectionName) => {
    e.preventDefault()

    // console.log('updating settings with new data:', settingsForm)
    // updateSettings(token, settingsForm)
  }

  const resetSettingsPage = () => {
    setWork(workSettings)
    setTimetracking(timetrackingSettings)
    setTimeshift(timeshiftSettings)
    setGeneral(generalSettings)
    setUI(uiSettings)
    setActiveChanges(false)
  }
  
  return (
    <StyledSettings className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3">Settings</h3>
        {/* {activeChanges && (
          <div className="header-right">
            <button className="button is-small is-ghost" onClick={resetSettingsPage}>Cancel</button>
            <button className="button is-small is-info" onClick={saveSettings}>Save</button>
          </div>
        )} */}
      </header>

      <div className="columns">

        {errors && <ErrorNotification message={errors} clearErrors={clearErrors} />}
        {loading && <LoadingContainer /> }

        <div className="column">
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
        </div>

        <div className="column">
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
        </div>

        <div className="column">
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
        </div>

        <div className="column">
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
        </div>

        <div className="column">
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
        </div>
      </div>
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