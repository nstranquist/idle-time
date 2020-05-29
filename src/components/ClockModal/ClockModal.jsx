import React, { useState, useEffect } from 'react'
import { ErrorText } from '../ErrorText'
// import styled from 'styled-components'


const emptyForm = {
  date: new Date()
}

export const ClockModal = ({
  onSubmit
}) => {
  const[formData, setFormData] = useState(emptyForm)
  const[formErrors, setFormErrors] = useState(null)

  useEffect(() => {

  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const { date } = formData

    // submit form data
    if(!date)
      setFormErrors("date is invalid")
    else {
      // submit form
      // onSubmit(formData)
      console.log('form data:', formData)
      // resetForm()
    }
    
    resetForm()
  }
  
  const resetForm = () => setFormData(emptyForm)

  return (
    <div style={{position: "absolute"}}>
      <form onSubmit={handleSubmit}>
        {formErrors && <ErrorText text={formErrors} />}
        <p className="form-item">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </p>
      </form>
    </div>
  )
}
