import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FormItemStyled } from '../../styles/components'


const emptyBlock = {
  title: "",
  desc: "",
}

const defaultErrorsState = {
  exists: null, // use this to check if exists
  message: null,
  fields: []
}

export const NewBlockForm = ({
  onSubmit,
  onCancel,
}) => {
  const [newBlockData, setFormData] = useState(emptyBlock)
  const [errors, setErrors] = useState(defaultErrorsState)
  const [inputClasses, setInputClasses] = useState("form-input")

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
      ...newBlockData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e = undefined) => {
    if(e)
      e.preventDefault()

    if(!newBlockData)
      createError("data is undefined")
    else if (newBlockData.title.length < 1)
      createError("Title field cannot be empty", "title")
    else {
      console.log('submitting data:', newBlockData)
      if(newBlockData.desc.length < 1)
        onSubmit({
          ...newBlockData,
          desc: undefined,
        })
      else
        onSubmit(newBlockData)
      // resetForm()
    }
  }

  const handleCancel = () => {
    resetForm()
    onCancel()
  }
  
  const resetForm = () => {
    setFormData(emptyBlock)
    setErrors(defaultErrorsState)
  }

  // more robust error alerting, highlights the proper input field that the error relates to
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
    <NewBlockFormStyled
      className="time-block-form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        console.log('event:', e)
        if(e.keyCode === 13) // 'enter' key
          handleSubmit();
        else if(e.keyCode === 27) // 'escape' key
          handleCancel();
      }}
    >
      {newBlockData && (
        <>
          <FormItemStyled className="form-item">
            <input
              autoFocus
              className={inputClasses + " form-h3"}
              type="text"
              name="title"
              value={newBlockData.title}
              onChange={handleChange}
            />
          </FormItemStyled>
          {/* TODO: click '+ add description' to show / focus on this input. And 'X' to close / erase it */}
          <FormItemStyled className="form-item">
            <input
              className="form-input form-p"
              type="text"
              name="desc"
              value={newBlockData.desc}
              onChange={handleChange}
            />
          </FormItemStyled>
        </>
      )}
    </NewBlockFormStyled>
  )
}

const NewBlockFormStyled = styled.form`
  

  .form-input {
    display: block;
    width: 100%;
  }
`
