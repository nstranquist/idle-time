import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Plus, Minus } from 'react-feather'
import { ErrorText } from '../../ErrorText'
import { bulmaColors } from '../../../styles/bulma.colors'
import { boxShadows } from '../../../styles/shadows.style'
import { emptyDateForm, defaultErrorsState } from '../../../constants'


export const DateForm = ({
  timeData = emptyDateForm, // startTime, duration, endTime
  serverErrors, // errors thrown outside of the component
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    ...emptyDateForm,
    ...timeData
  })

  const durationRef = React.createRef();
  const allDayRef = React.createRef();
  const startTimeRef = React.createRef();

  const [errors, setErrors] = useState(null)
  const [showStartTime, setShowStartTime] = useState(false)
  const [showAllDay, setShowAllDay] = useState(false)

  useEffect(() => {
    if(durationRef.current)
      durationRef.current.select();
  }, [])

  const handleChange = (e) => {
    if(errors) setErrors(null)

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

  const handleAllDayToggle = () => {
      setFormData({
        ...formData,
        allDay: showAllDay ? false : true,
      })
      setShowAllDay(!showAllDay)

      if(allDayRef.current)
        allDayRef.current.focus();
  }

  const handleStartToggle = () => {
    setFormData({
      ...formData,
      startTime: showStartTime ? undefined : moment('MM-DD-YYYY'),
    })
    setShowStartTime(!showStartTime)

    if(startTimeRef.current)
      startTimeRef.current.focus();
  }

  const handleSubmit = (e = undefined) => {
    if(e)
      e.preventDefault()

    if(formData.duration < 1 || formData.duration > 1440) {
      setErrors("Duration is out of range. Can be 1 to 1440")
    }
    else {
      console.log('submitting date form data:', formData)
      onSubmit(formData)
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData(timeData)
    setErrors(defaultErrorsState)
    onCancel()
  }
  
  // note: move to errors
  // const createError = (message, field=null) => {
  //   let fields = errors.fields;

  //   if(field)
  //     fields.push(field)

  //   setErrors({
  //     exists: true,
  //     message: message,
  //     fields: fields
  //   })
  // }

  return (
    <DateFormStyled onSubmit={handleSubmit}>
      {/* Should have a Clock Icon, that when clicked, opens by default to the startTime selector,
          but duration and other fields can be selected as well
      */}
      {errors && <ErrorText message={errors} />}
      <div className="form-item date-form-item" style={{marginTop: errors ? 0 : 'initial', paddingTop: errors ? 0 : 'initial'}}>
        <div className="form-field" >
          <label htmlFor="duration">duration:</label>
          <input
            autoFocus
            ref={durationRef}
            type="number"
            name="duration"
            min={5}
            max={1440} // total minutes in a day (60 * 24)
            className="form-input form-number-input"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-item date-form-item">
        {showStartTime ? (
          <div className="form-field">
            <label htmlFor="startTime">start time:</label>
            <input
              type="date"
              ref={startTimeRef}
              name="startTime"
              style={{display:'block'}}
              className="form-input form-date-input"
              value={formData.date}
              onChange={handleDateChange}
            />
          </div>
        ) : (
          <div className="add-form-item" onClick={handleStartToggle}>
            <span className="icon" style={{marginRight:2}}>
              <Plus size={20} fillOpacity={.8} />
            </span>
            <span className="add-form-field-label">start time</span>
          </div>
        )}
      </div>
      <div className="form-item date-form-item">
        {showAllDay ? (
          <div className="form-field form-field-checkbox" >
            <div className="checkbox-group" onClick={() => {
              setFormData({
                ...formData,
                allDay: !formData.allDay
              })
            }}>
              <label htmlFor="allDay" className="checkbox-label">all day:</label>
              <input
                ref={allDayRef}
                className="checkbox-input"
                type="checkbox" // number
                name="allDay"
                checked={formData.allDay}
              />
            </div>
            <span className="icon minus-icon" onClick={handleAllDayToggle}>
              <Minus size={20} fillOpacity={.85} />
            </span>
          </div>
        ) : (
          <div className="add-form-item" onClick={handleAllDayToggle}>
            <span className="icon" style={{marginRight:2}}>
              <Plus size={20} fillOpacity={.8} />
            </span>
            <span className="add-form-field-label">all day</span>
          </div>
        )}
      </div>

      <div className="save-button-container">
        <button className="button save-button is-info" onClick={handleSubmit}>Save</button>
      </div>
    </DateFormStyled>
  )
}

const DateFormStyled = styled.form`
  background: #fff;
  color: ${bulmaColors.dark};

  .form-item {
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 4px;
  }
  .form-input {
    font-size: 16px;
    font-family: sans-serif;
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
    border-radius: 6px;
    border: 1px solid rgba(0,0,0,.03);
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08),0 1px 3px rgba(0,0,0,0.12);

    &:hover {
      border-color: rgba(0,0,0,.3);
    }
  }
  .form-item-label {
    font-size: 16px;
    margin-bottom: 4px;
  }
  .form-field-checkbox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    .checkbox-group {
      box-shadow: ${boxShadows.shadow1};
      border: 1px solid rgba(44,44,44,.26);
      border-radius: 4px;
      padding: 4px 12px;
    }
  }
  .save-button-container {
    margin: 0 auto;
    text-align: center;
    margin-top: 12px;
  }
  .add-form-field-label {
    white-space: nowrap;
    font-size: 16px;
    opacity: .9;
    color: #000;
  }
  .minus-icon {
    box-shadow: ${boxShadows.shadow1};
  }
`