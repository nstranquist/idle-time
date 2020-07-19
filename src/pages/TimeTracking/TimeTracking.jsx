import React, { useState, useEffect } from 'react'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Settings } from 'react-feather'
import { ErrorText } from '../../components/ErrorText'
import { AddForm } from './AddForm'
import { TimelogItem } from './LogItem'
import { UnstyledLink } from '../../styles/components/link.styled'
// redux
import { getTimeLogs, addTimeLog, updateTimeLog, removeTimeLog, clearErrors } from '../../store/TimeTracking'
import { selectTimeLogs, selectLoading, selectErrors } from '../../store/TimeTracking/selectors'
import { selectTimetrackingSettings } from '../../store/Settings/selectors'
import { selectAuthToken } from '../../store/Auth/selectors'


// Allow user to generate a pdf or csv report of their time logs
// Allow user to view all of their times logs, including total time, etc.
// Allow "Generate Report", "Sort", "Search", and other options up top
// Create Cards that can be scrolled through to view the other datas

export const TimeTracking = ({
  token,
  timelogs,
  loading,
  errors,
  timetrackingSettings,
  getTimeLogs,
  addTimeLog,
  updateTimeLog,
  removeTimeLog,
  clearErrors
}) => {
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    getTimeLogs(token)
  }, [])

  const handleAddLogDev = () => {
    const newLog = { title: "New Log", desc: "I worked a lot on IdleTime, made good progress with the Settings feature", duration: 115 }
    addTimeLog(token, newLog)
  }

  const handleUpdateLog = (timelog) => console.log('timelog to update:', timelog)

  const handleRemoveLog = (taskId) => removeTimeLog(token, taskId)

  const submitLogForm = (timelogData) => {
    addTimeLog(token, timelogData)
    setShowAddForm(false)
  }

  const handleCancel = () => setShowAddForm(false)

  return (
    <StyledTimetracking className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3">
          <span style={{flex: 1}}>Timetracking</span>
          <UnstyledLink to="/settings">
            <span className="icon header-icon">
              <Settings />
            </span>
          </UnstyledLink>
        </h3>
      </header>

      {showAddForm && <AddForm submitForm={submitLogForm} cancelForm={handleCancel} /> }

      {errors && <ErrorText message={errors} clearErrors={clearErrors} />}

      <TimelogItemStyled className="timelog-item noselect" style={{borderBottom:0}}>
        {!loading
          ? <div className="log-text">{timelogs.length} timelogs were found</div>
          : <div className="is-loading"></div>
        }
        {!showAddForm && <button className="button is-link" disabled={loading} onClick={() => setShowAddForm(true)}>Add Log</button>}
      </TimelogItemStyled>

      <div className="timelogs-container">
        {timelogs && timelogs.length > 0 && timelogs.map(log => <TimelogItem key={log._id} timelog={log} handleRemoveLog={handleRemoveLog} />)}
      </div>
    </StyledTimetracking>
  )
}

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  timelogs: selectTimeLogs(state),
  loading: selectLoading(state),
  errors: selectErrors(state),
  timetrackingSettings: selectTimetrackingSettings(state)
})

export const ConnectedTimeTracking = connect(
  mapStateToProps,
  { getTimeLogs, addTimeLog, updateTimeLog, removeTimeLog, clearErrors }
)(TimeTracking)


export const TimelogItemStyled = styled.div`
  &.timelog-item {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.1);

    .log-text {
      margin: 0;
      padding: 0;

      &.log-duration-text {
        margin-right: 1rem;
      }
    }

    .item-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`
const StyledTimetracking = styled.div`
  height: 100vh;
  overflow-y: auto;

  .section-header {
    
  }
  .header-icon {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #fff;
    transition: background-color .1s ease;

    &:hover {
      background-color: rgba(155,155,155,.12);
      transition: background-color .1s ease;
    }
  }
  .header-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .timelogs-container {

  }
`