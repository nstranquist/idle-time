import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MinusButton } from '../IconButtons'
import { AddFormItem } from './AddFormItem'
import { defaultErrorsState, emptyNewTask as emptyTimeBlock } from '../../constants'
import { FormItemStyled } from '../../styles/components'

// Should contain: Container, Form, Clock Icon / Time, Title Text Input, Desc. Text Input

// Note: needs to separate Time/Date from the Title, Desc, and other data...
//  - because, time will be needed independently anyways to calculate timings, and
//  - clock should be clicked and time changed without necessarily converting to full-out form & inputs
//  - should work independently of the TimeBlockForm


export const TimeBlockForm = ({
  timeData = emptyTimeBlock,
  handleSave, // if user changes any of the TimeBlock data, it should be reflected in the app's state and API
  handleCancel,
  activeField = "title",
  // serverErrors,  // errors coming from outside of this component
}) => {
  // const [timeBlock, setTimeBlock] = useState(emptyTimeBlock)
  // const [formData, setFormData] = useState(timeData)

  const [title, setTitle] = useState(timeData.title)
  const [desc, setDesc] = useState(timeData.desc)

  const [errors, setErrors] = useState(defaultErrorsState)
  const [inputClasses, setInputClasses] = useState("form-input")

  const [startingFormData, setStartingFormData] = useState(timeData)
  

  useEffect(() => {
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
    if(e.target.name === 'title')
      setTitle(e.target.value)

    else if(e.target.name === 'desc')
      setDesc(e.target.value)

    if(!(e.target.name === "title" && e.target.value.length < 1))
      handleSave({ title, desc }, false)
  }

  const setSaveDesc = (descValue) => {
    setDesc(descValue)
    handleSave({ title, desc: descValue }, false)
  }

  const handleSubmit = (e = null) => {
    if(e) e.preventDefault()
    
    if (!title || title.length < 1)
      createError("Title field cannot be empty", "title")
    else {
      console.log('submitting data: { title:', title, ", desc:",desc)
      if(desc === undefined) handleSave({ title, desc: ""})
      else handleSave({title, desc})
      resetForm()
    }
  }
  
  const resetForm = () => {
    setTitle("")
    setDesc("")
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
          setTitle("")
          setDesc("")
          handleSave(startingFormData)
          handleCancel();
        }
      }}
    >
      <FormItemStyled className="form-item">
        <input
          autoFocus={activeField === "title"}
          className={inputClasses + " form-h3"}
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </FormItemStyled>
      <FormItemStyled className="form-item">
        {(desc || desc === "") ? (
          <span className="desc-container">
            <MinusButton handleClick={() => setSaveDesc(undefined)} />
            <input
              autoFocus={activeField === "desc"}
              className="form-input form-p is-size-6"
              type="text"
              name="desc"
              value={desc}
              onChange={handleChange}
            />
          </span>
        ) : (
          <AddFormItem labelText="Add Description" handleClick={() => startingFormData.desc ? setSaveDesc(startingFormData.desc) : setSaveDesc("")} />
        )}
      </FormItemStyled>
    </TimeBlockFormStyled>
  )
}

const TimeBlockFormStyled = styled.form`
  padding-right: calc(18px + 3rem); // 6px + 12px + 3rem
  flex: 1;

  .desc-container {
    display: flex;
    align-items: center;

    .form-input {
      margin-left: 6px;
    }
  }
  
  .form-item {

  }

`