import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Mail } from 'react-feather'
import { ErrorText } from '../../components/ErrorText'
import { resetPassword, clearErrors } from '../../store/Auth'

export const ResetPassword = () => {
  const serverErrors = useSelector(state => state.auth.errors);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {


    return () => resetForm();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // submit form data
    if(email.length < 1)
      setFormErrors("email cannot be empty")
    else {
      // submit reset password
      // dispatch(resetPassword)

      // resetForm()
    }
    
    resetForm()
  }
  
  const resetForm = () => {
    setEmail("")
    setFormErrors(null)
    // dispatch(clearErrors)
  }

  return (
    <StyledResetPassword className="box">
      <header className="form-header">
        <h3 className="form-header-text is-size-3">Reset Password</h3>
      </header>
      <form onSubmit={handleSubmit} style={{marginTop:30}}>
        {formErrors && <ErrorText text={formErrors} />}

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input" // is-danger for incorrect input elements
              type="email"
              required
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon is-small is-left">
              <Mail size={20} />
            </span>
          </div>
          {/* <p className="help is-danger">This email is invalid</p> */}
        </div>
      </form>
      <div className="form-action-buttons" style={{marginTop: 50}}>
        <Link to="/login">Back</Link>
      </div>
    </StyledResetPassword>
  )
}

export default ResetPassword

const StyledResetPassword = styled.div`
  margin: 0 auto;
  max-width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 250px;

  .form-header {
    margin-bottom: 5px;
    text-align: center;
  }

  .form-action-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    * {
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }

  @media (min-width: 2000px) {
    max-width: 33%;
  }
  @media (max-width: 1000px) {
    max-width: 66%;
  }
  @media (max-width: 600px) {
    max-width: 88%;
  }
`
