import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { bulmaColors } from '../../styles/bulma.colors'
import { Clock } from 'react-feather'
import { ClockModal } from '../ClockModal'

// Should contain: Container, Form, Clock Icon / Time, Title Text Input, Desc. Text Input

// Note: needs to separate Time/Date from the Title, Desc, and other data...
//  - because, time will be needed independently anyways to calculate timings, and
//  - clock should be clicked and time changed without necessarily converting to full-out form & inputs
//  - should work independently of the TimeBlockForm

const emptyTimeBlock = {
  title: "",
  desc: "",
  startTime: undefined, // or default to Date.now()
  // duration or endTime?
  duration: 60, // in minutes
  endTime: undefined, // can keep it this way unless used
  // dateActive: false, // if clock icon is clicked and user is selecting the date
}

// const emptyErrorFields = {
//   title: false,
//   desc: false,
//   startTime: false
// }

const defaultErrorsState = {
  exists: null, // use this to check if exists
  message: null,
  fields: []
}

export const TimeBlockForm = ({
  timeData = emptyTimeBlock,
  handleSave, // if user changes any of the TimeBlock data, it should be reflected in the app's state and API
  activeField = "title",
  // serverErrors,  // errors coming from outside of this component
  // timeData: {
  //   title,
  //   desc,
  //   startTime=undefined,
  //   duration,
  //   endTime=undefined,
  // },
  // activeClockId,
}) => {
  // const [timeBlock, setTimeBlock] = useState(emptyTimeBlock)
  const [formData, setFormData] = useState(timeData)
  const [errors, setErrors] = useState(defaultErrorsState)
  const [inputClasses, setInputClasses] = useState("form-input")
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if(errors.exists) {
      // apply to fields
      if(errors.fields.includes("title"))
        setInputClasses("form-input error-input")
    }

    return () => resetForm()
  }, [errors.exists])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e = null) => {
    console.log('in handle submit')

    if(e)
      e.preventDefault()
    
    // submit form data
    if(!formData)
      setErrors("item is not a form")
    else if (formData.title.length < 1)
      createError("Title field cannot be empty", "title")
    else {
      console.log('submitting data:', formData)
      handleSave(formData)
    }
    
    resetForm()
  }
  
  const resetForm = () => {
    setFormData(timeData)
    setErrors(defaultErrorsState)
  }

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

  const handleFormBlur = (e) => {
    if(e.target.type !== "text") {
      // save data and stop editing
      handleSubmit()
    }
  }

  return (
    <TimeBlockFormStyled
      className="time-block-form"
      onBlur={handleFormBlur}
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if(e.keyCode === 13) {
          handleSubmit();
        }
      }}
    >
      <p className="form-item" onClick={(e) => {
        if(!selected) {
          e.target.select()
          setSelected(true)
        }
      }}>
        <input
          autoFocus={activeField === "title"}
          className={inputClasses + " form-h3"}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </p>
      <p className="form-item form-p">
        <input
          autoFocus={activeField === "desc"}
          className="form-input form-p"
          type="text"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
        />
      </p>
    </TimeBlockFormStyled>
  )
}

const TimeBlockFormStyled = styled.form`
  
  .form-item {
    margin-top: 0;

    .form-input {
      color: #363636;
      line-height: 1.125;
      font-family: montserrat, sans-serif;
      font-style: normal;

      &.input-error {
        border-color: rgba(255,0,0,.82);
  
      }
      &.form-h3 {
        font-size: 1.5rem !important;
        font-weight: 600;
      }
      &.form-p {
        font-size: 1rem !important;
        font-weight: 400;
      }
    }
    &.form-p {

      input {
        font-size: 20px;
        line-height: 24px;
        color: #000;
        font-weight: normal;
      }
    }
  }
`