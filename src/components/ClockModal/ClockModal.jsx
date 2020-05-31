import React, { useState } from 'react'
import { ErrorText } from '../ErrorText'
import styled from 'styled-components'


const emptyClockForm = {
  date: new Date(),
  // hours: 0,
  // minutes: 5,
  // duration: "0:05",
  // timeframe: "D",
}

export const ClockModal = ({
  clockData = emptyClockForm,
  onSubmit
}) => {
  const[formData, setFormData] = useState(clockData)
  const[formErrors, setFormErrors] = useState(null)

  const formatDate = (date) => {
    // returns formatted date `YYYY-MM-DD`
    let formattedDate = "2020-06-11"

    return formattedDate
  }

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
      onSubmit(date)
      console.log('form data:', formData)
      resetForm()
    }
  }
  
  const resetForm = () => {
    setFormData(clockData)
    setFormErrors(null)
  }

  return (
    <ClockModalStyled>
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
        <div className="submit-btn-container">
          <button type="submit" className="submit-btn">Save</button>
        </div>
      </form>
    </ClockModalStyled>
  )
}

const ClockModalStyled = styled.div`
  position: absolute;
  left: 0;
  bottom: -100px;
  height: 100px;
  padding-left: 8;
  padding-right: 8;
  z-index: 1009;
  background: #fff;
  border: 1px solid rgba(0,0,0,.07);


`