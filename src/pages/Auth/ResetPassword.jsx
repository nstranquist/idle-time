import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ErrorText } from '../../components/ErrorText'

export const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [formErrors, setFormErrors] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // submit form data
    if(email.length < 1)
      setFormErrors("email cannot be empty")
    else {
      // submit reset password


      // resetForm()
    }
    
    resetForm()
  }
  
  const resetForm = () => {
    setEmail("")
    setFormErrors(null)
  }

  return (
    <StyledResetPassword>
      <header>
        <h3>Reset Password</h3>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          {formErrors && <ErrorText text={formErrors} />}
          <p className="form-item">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </p>
        </form>
        <div>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </StyledResetPassword>
  )
}

export default ResetPassword

const StyledResetPassword = styled.div`

`
