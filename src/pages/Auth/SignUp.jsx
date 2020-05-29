import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ErrorText } from '../../components/ErrorText'
import { Link } from 'react-router-dom'

const emptySignupForm = {
  username: "",
  password: "",
  confirmPassword: ""
}

const SignUp = ({
  loading,
  errors,
}) => {
  const [formData, setFormData] = useState(emptySignupForm)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    // check local storage for cookies

  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { username, password, confirmPassword } = formData

    // submit form data
    if(password.length < 6)
      setFormErrors("password is not long enough")
    else if (password !== confirmPassword)
      setFormErrors("passwords must match")
    else {
      // sign up user

      
      // restForm()
    }
    
    resetForm()
  }
  
  const resetForm = () => {
    setFormData(emptySignupForm)
    setFormErrors(null)
  }
  
  return (
    <StyledSignup>
      <header>
        <h3>Sign up</h3>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          {formErrors && <ErrorText text={formErrors} />}
          {errors && <ErrorText text={errors} />}
          <p className="form-item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </p>
          <p className="form-item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </p>
          <p className="form-item">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </p>
          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">Sign Up</button>
          </div>
        </form>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </StyledSignup>
  )
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  errors: state.auth.errors,
})

export const ConnectedSignUp = connect(
  mapStateToProps,
  {  }
)(SignUp)

export default ConnectedSignUp

const StyledSignup = styled.div`

`
