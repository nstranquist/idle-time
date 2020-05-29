import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ErrorText } from '../../components/ErrorText'
import { Link } from 'react-router-dom'

const emptyLoginForm = {
  username: "",
  password: ""
}

const Login = ({
  auth: {
    signedIn,
    loading,
    errors
  }
}) => {
  const [formData, setFormData] = useState(emptyLoginForm)
  const [rememberMe, setRememberMe] = useState(false)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    // check local storage for login creds, setRememberMe
    
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { username, password } = formData
    
    // submit form data
    if(username.length < 1 || password.length < 1)
      setFormErrors("username and/or password cannot be empty")
    else {
      // submit login data

      // resetForm()
    }
    
    resetForm()
  }
  
  const resetForm = () => {
    setFormData(emptyLoginForm)
    // setRememberMe(false)
    setFormErrors(null)
  }

  return (
    <StyledLogin>
      <header>
        <h3>Login</h3>
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
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember Login?</label>
          </p>
          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">Login</button>
          </div>
        </form>
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </div>
    </StyledLogin>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const ConnectedLogin = connect(
  mapStateToProps,
  {  }
)(Login)

export {
  ConnectedLogin,
  ConnectedLogin as default
}

const StyledLogin = styled.div`

  .form-item {
    
  }
`