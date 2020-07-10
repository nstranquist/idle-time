import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ErrorNotification } from '../../components/ErrorText'
import { getSettings, updateSettings, clearErrors } from '../../store/Settings'
import { selectShowTime, selectTimeshiftActive, selectAlarmsActive } from '../../store/selectors/settings'
import { selectAuthToken } from '../../store/selectors/auth'


const Settings = ({
  token,
  showTime,
  timeshiftActive,
  alarmsActive,
  loading,
  errors,
  getSettings,
  updateSettings,
  clearErrors
}) => {
  const [settings, setSettings] = useState({ showTime, timeshiftActive, alarmsActive })
  const [activeChanges, setActiveChanges] = useState(false)
  
  useEffect(() => {
    getSettings(token);

    return () => resetSettingsPage()
  }, [])

  useEffect(() => {
    console.log('settings data in redux changed, updating settings.')
    resetSettingsPage()
  }, [showTime, timeshiftActive, alarmsActive]) // I like having 'showTime' here, can remove it from the main page later so user isn't tempted to click it

  const handleChange = (name, value) => {
    if(!activeChanges) setActiveChanges(true)

    setSettings({
      ...settings,
      [name]: value
    })
  }  

  const saveSettings = (e=undefined) => {
    if(e)
      e.preventDefault()

    console.log('updating settings with new data:', settings)
    updateSettings(token, settings)
  }

  const resetSettingsPage = () => {
    setSettings({ showTime, timeshiftActive, alarmsActive })
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

      {errors && <ErrorNotification message={errors} clearErrors={clearErrors} />}

      <form className="form settings-form" onSubmit={saveSettings}>
        <div className="field settings-form-item show-time">
          {/* Note: Replace with Bulma Toggle */}
          <p className="item-text">Show Time: {settings.showTime ? "yes" : "no"}</p>
          {/* <label htmlFor="showTime">Show Time: </label>
          <input id="switchRoundedSuccess" type="checkbox" name="showTime" className="switch is-rtl is-rounded is-success" checked={"checked"} /> */}
        </div>
        <div className="field settings-form-item timeshift-active">
          <p className="item-text">Timeshift Active: {settings.timeshiftActive ? "yes" : "no"}</p>
        </div>
        <div className="field settings-form-item alarms-active">
          <p className="item-text">Alarms Active: {settings.alarmsActive ? "yes" : "no"}</p>
        </div>
        {activeChanges && (
          <div className="header-right">
            <button className="button is-small is-ghost" onClick={resetSettingsPage}>Cancel</button>
            <button className="button is-small is-info" type="submit" onClick={saveSettings}>Save</button>
          </div>
        )}
      </form>
    </StyledSettings>
  )
}

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  showTime: selectShowTime(state),
  timeshiftActive: selectTimeshiftActive(state),
  loading: state.settings.loading,
  errors: state.settings.errors,
  alarmsActive: selectAlarmsActive(state),
})

export const ConnectedSettings = connect(
  mapStateToProps,
  { getSettings, updateSettings, clearErrors }
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