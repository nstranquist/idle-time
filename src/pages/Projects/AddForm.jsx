import React, { useState } from 'react'
// import styled from 'styled-components'
import { ErrorText } from '../../components/ErrorText'

const emptyForm = {
  title: "",
  desc: "",
  billable: false,
  tasks: [], // addable select component
  // optionals:
  priority: null,
  themeColor: null,
}

export const AddForm = ({
  submitForm,
  cancelForm
}) => {
  const [formData, setFormData] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.title.length < 1)
      setFormErrors('title is required')
    // else if () {}
    else {
      submitForm(formData)
    }
  }

  const handleCancel = () => cancelForm()

  const handleFocus = (e) => {
    console.log('event:', e, 'target:', e.target)
    const durationElem = document.getElementById('timelog-duration');
    if(durationElem) durationElem.select();
  }

  return (
    <div className="form-container" style={{borderBottom:"1px solid rgba(0,0,0,.1)",marginBottom:"1.5rem",paddingBottom:"1.5rem"}}>
      {formErrors && <ErrorText message={formErrors} clearErrors={() => setFormErrors(null)} />}
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">Title</label>
          <input autoFocus type="text" className="input" placeholder="Title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="desc" className="label">Description</label>
          <div className="control">
            <textarea name="desc" className="textarea is-small" placeholder="Description" value={formData.desc || ""} onChange={handleChange}></textarea>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control"><button type="submit" className="button is-link">Submit</button></div>
          <div className="control"><button onClick={handleCancel} className="button is-link is-light">Cancel</button></div>
        </div>
      </form>
    </div>
  )
}
