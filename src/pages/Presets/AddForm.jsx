import React, { useState } from 'react'
import styled from 'styled-components'
import { pure } from 'recompose'
import { ErrorText } from '../../components/ErrorText'

const AddFormUI = ({
  defaultCategory,
  submitForm,
  handleCancel,
}) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(defaultCategory) // pass in as prop
  // const [taskId, setTaskId] = useState(taskIdProps)
  const [formErrors, setFormErrors] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category)
      setFormErrors("title and category are required")
    else {
      submitForm(title, category)
    }
  }

  return (
    <div className="form-container" style={{borderBottom:"1px solid rgba(0,0,0,.1)",marginBottom:"1.5rem",paddingBottom:"1.5rem"}}>
      {formErrors && <ErrorText message={formErrors} clearErrors={() => setFormErrors(null)} />}
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">Title</label>
          <input autoFocus type="text" className="input" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="category" className="label">Category</label>
          <div className="select">
            <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="task">Task</option>
              <option value="timeshift">Timeshift</option>
              <option value="schedule">Schedule</option>
            </select>
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

export const AddForm = pure(AddFormUI);
