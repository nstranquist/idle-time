import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getTimeLogs, addTimeLog, updateTimeLog, removeTimeLog, clearErrors } from '../../store/TimeTracking'
import { selectTimeLogs, selectLoading, selectErrors } from '../../store/selectors/timetracking'
import { selectAuthToken } from '../../store/selectors/auth'
import { ErrorText } from '../../components/ErrorText'


// Allow user to generate a pdf or csv report of their time logs
// Allow user to view all of their times logs, including total time, etc.
// Allow "Generate Report", "Sort", "Search", and other options up top
// Create Cards that can be scrolled through to view the other datas

export const TimeTracking = ({
  token,
  timelogs,
  loading,
  errors,
  getTimeLogs,
  addTimeLog,
  updateTimeLog,
  removeTimeLog,
  clearErrors
}) => {

  useEffect(() => {
    getTimeLogs(token)
  }, [])

  const handleAddLog = () => {
    const newLog = {
      title: "New Log",
      desc: "I worked a lot on IdleTime, made good progress with the Settings feature",
      duration: 115
    }
    addTimeLog(token, newLog)
  }

  const handleRemoveLog = (id) => {
    removeTimeLog(token, id)
  }

  return (
    <StyledTimetracking className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3">Timetracking</h3>
      </header>

      {errors && <ErrorText message={errors} clearErrors={clearErrors} />}

      <TimelogItem className="timelog-item noselect" style={{borderBottom:0}}>
        <div className="log-text">{timelogs.length} timelogs were found</div>
        <button className="button is-link" onClick={handleAddLog}>Add Log</button>
      </TimelogItem>

      <div className="timelogs-container">
        {timelogs && timelogs.map(log => (
          <TimelogItem className="timelog-item" key={log.id}>
            <div className="item-left">
              <p className="log-text is-size-5" style={{marginBottom:'.2rem'}}>{log.title}</p>
              { log.desc && <div className="log-text">{log.desc}</div> }
            </div>
            <div className="item-right">
              <p className="log-text log-duration-text">{log.duration}</p>
              <button className="button is-small-is-rounded is-outline is-danger is-light" onClick={() => removeTimeLog(token, log.id)}>delete</button>
            </div>
          </TimelogItem>
        ))}
      </div>
    </StyledTimetracking>
  )
}

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  timelogs: selectTimeLogs(state),
  loading: selectLoading(state),
  errors: selectErrors(state),
})

export const ConnectedTimeTracking = connect(
  mapStateToProps,
  { getTimeLogs, addTimeLog, updateTimeLog, removeTimeLog, clearErrors }
)(TimeTracking)

const TimelogItem = styled.div`
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
  .section-header {
    
  }
  .timelogs-container {

  }
`