import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { ClockInput } from '../../Inputs'
import { Clock, Plus, Minus } from 'react-feather'
import { bulmaColors } from '../../../styles/bulma.colors'

const emptyDateForm = {
  startTime: moment('YYYY-MM-DD'),
  duration: 60,
  endTime: undefined,
  allDay: false,
}

const defaultErrorsState = {
  exists: null,
  message: null,
  fields: []
}

export const DateForm = ({
  timeData = emptyDateForm, // startTime, duration, endTime
  serverErrors, // errors thrown outside of the component
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(timeData)
  const [errors, setErrors] = useState(defaultErrorsState)
  const [showDuration, setShowDuration] = useState(false)
  const [showAllDay, setShowAllDay] = useState(false)
  const [showEndTime, setShowEndTime] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDateChange = (dateValue, fieldName="startTime") => {
    setFormData({
      ...formData,
      [fieldName]: dateValue
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(formData) {
      console.log('submitting date form data:', formData)
      onSubmit(formData)
      resetForm()
    }
  }

  const addDurationInput = () => {
    setShowDuration(true)
  }

  const resetForm = () => {
    setFormData(timeData)
    setErrors(defaultErrorsState)
    setShowDuration(false)
    onCancel()
  }
  // note: move to errors
  const createError = (message, field=null) => {
    let fields = errors.fields;

    if(field)
      fields.push(field)

    setErrors({
      exists: true,
      message: message,
      fields: fields
    })
  }

  return (
    <DateFormStyled onSubmit={handleSubmit}>
      {/* Should have a Clock Icon, that when clicked, opens by default to the startTime selector,
          but duration and other fields can be selected as well
      */}
      <div className="date-form-item">
        <div className="start-time-input">
          <span className="label" style={{marginBottom:0}}>
            start:
          </span>
          <input
            type="date"
            style={{display:'block'}}
          />
          {/* <ClockInput
            clockData={{
              data: timeData.startTime
            }}
            handleDateChange={handleDateChange}
            errors={errors.fields.includes("startTime")}
          /> */}
        </div>
      </div>
      <div className="date-form-item">
        {showDuration ? (
          <div className="form-duration-input" >
            <label htmlFor="duration">duration: </label>
            <input
              autoFocus
              type="number" // number
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="add-form-item" onClick={() => setShowDuration(true)}>
            <span className="icon">
              <Plus size={18} fillOpacity={.8} />
            </span>
            <span style={{whiteSpace:"nowrap", fontSize: 16,opacity:.9,color:"#000"}}>duration</span>
          </div>
        )}
      </div>
      <div className="date-form-item">
        {showAllDay ? (
          <div className="form-duration-input" >
            <label htmlFor="allDay" style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <span>all day: </span>
              <span className="icon" style={{cursor:'pointer',borderRadius:"50%",border:"1px solid rgba(0,0,0,.12)"}}
                onClick={() => setShowAllDay(false)}>
                <Minus size={18} fillOpacity={.8} />
              </span>
            </label>
            <input
              autoFocus
              type="checkbox" // number
              name="allDay"
              value={formData.allDay}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="add-form-item" onClick={() => setShowAllDay(true)}>
            <span className="icon" style={{marginRight:2}}>
              <Plus size={20} fillOpacity={.8} />
            </span>
            <span style={{whiteSpace:"nowrap", fontSize: 16,opacity:.9,color:"#000"}}>all day</span>
          </div>
        )}
      </div>
      <div className="date-form-item">
        {showEndTime ? (
          <div className="form-duration-input" >
            <label htmlFor="endTime">end time: </label>
            <input
              autoFocus
              type="number" // number
              name="endTime"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="add-form-item" onClick={() => setShowEndTime(true)}>
            <span className="icon" style={{marginRight:2}}>
              <Plus size={20} fillOpacity={.8} />
            </span>
            <span style={{whiteSpace:"nowrap", fontSize: 16,opacity:.9,color:"#000"}}>end time</span>
          </div>
        )}
      </div>
      
      {/* Other inputs here: */}


      <div className="save-button-container" style={{margin:"0 auto",textAlign:"center",marginTop:12}}>
        <button className="button is-info is-small" onClick={onCancel}>Save</button>
      </div>
    </DateFormStyled>
  )
}

const DateFormStyled = styled.form`
  background: #fff;
  color: ${bulmaColors.dark};

  .date-form-item {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .add-form-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${bulmaColors.light};
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 6px;
    border: 1px solid rgba(0,0,0,.03);
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08),0 1px 3px rgba(0,0,0,0.12);

    &:hover {
      border-color: rgba(0,0,0,.3);
    }
  }
  .start-time-input {
    // display: flex;
    // align-items: center;

    .label {
      font-size: 16px;
    }
  }
`