import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FormItemStyled } from '../../styles/components'

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
  handleCancel,
  activeField = "title",
  // serverErrors,  // errors coming from outside of this component
}) => {
  // const [timeBlock, setTimeBlock] = useState(emptyTimeBlock)
  const [formData, setFormData] = useState(timeData)
  const [errors, setErrors] = useState(defaultErrorsState)
  const [inputClasses, setInputClasses] = useState("form-input")
  const [selected, setSelected] = useState(false)

  const [startingFormData, setStartingFormData] = useState(timeData)
  

  useEffect(() => {
    if(!startingFormData)
      startingFormData = timeData

    if(errors.exists) {
      // apply to fields
      if(errors.fields.includes("title"))
        setInputClasses("form-input error-input")
    }

    return () => resetForm()
  }, [errors.exists])

  // useEffect(() => {
    // this.element.focus() the active field
  // }, [activeField])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if(e.target.name === "title" && e.target.value.length < 1)
      console.log('title is empty, not saving data yet')
    else
      handleSave({
        ...formData,
        [e.target.name]: e.target.value
      }, false)
  }

  const handleSubmit = (e = null) => {
    console.log('in handle submit')

    if(e)
      e.preventDefault()
    
    // submit form data
    if(!formData)
      createError("item is not a form")
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
        if(e.keyCode === 13)
          handleSubmit();
        if(e.keyCode === 27) {
          // if(startingFormData) {
            setFormData(startingFormData)
            handleSave(startingFormData)
            handleCancel();
          // }
        }
      }}
    >
      <FormItemStyled className="form-item">
        <input
          autoFocus={activeField === "title"}
          className={inputClasses + " form-h3"}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormItemStyled>
      <FormItemStyled className="form-item">
        <input
          autoFocus={activeField === "desc"}
          className="form-input form-p is-size-6"
          type="text"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
        />
      </FormItemStyled>
    </TimeBlockFormStyled>
  )
}

const TimeBlockFormStyled = styled.form`
  
  
`