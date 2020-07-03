import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Mail, AlertTriangle, Lock, Eye, EyeOff, LogIn } from 'react-feather'
import { ErrorText } from '../../components/ErrorText'
import { selectAuthErrors, selectAuthLoading, selectIsSignedIn } from '../../store/selectors/auth'
import { login } from '../../store/Auth'

const emptyLoginForm = {
  email: "",
  password: ""
}

const Login = ({
  signedIn,
  loading,
  errors,
  login,
}) => {
  const [formData, setFormData] = useState(emptyLoginForm)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    // check local storage for login creds, setRememberMe
    
    return () => resetForm()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { email, password } = formData
    
    // submit form data
    if(email.length < 1 || password.length < 1)
      setFormErrors("email and/or password cannot be empty")
    else {
      // submit login data
      // login(email, password)
      // resetForm()
    }
    
    resetForm()
  }

  const resetForm = () => {
    setFormData(emptyLoginForm)
    setFormErrors(null)
    setRememberMe(false)
  }

  return (
    <StyledLogin className="box">
      <header className="form-header">
        <h3 className="form-header-text is-size-3">Login</h3>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          {formErrors && <ErrorText text={formErrors} />}
          {errors && <ErrorText text={errors} />}
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input" // is-danger for incorrect input elements
                type="email"
                required
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <Mail size={20} />
              </span>
            </div>
            {/* <p className="help is-danger">This email is invalid</p> */}
          </div>
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input" // is-danger for incorrect input elements
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <Lock size={20} />
              </span>
              <span className="icon is-small is-right" onClick={() => setShowPassword(!showPassword)}
                style={{cursor: 'pointer',zIndex: 2000, pointerEvents: 'initial'}}>
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>
            {/* <p className="help is-danger">This password is invalid</p> */}
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox noselect" htmlFor="rememberMe" onClick={() => setRememberMe(!rememberMe)}>
                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={() => undefined} style={{marginRight:5}} />
                Remember login?
              </label>
            </div>
          </div>

          {/* can use 'is-loading' className for when it's loading */}
          <div className="" style={{textAlign:'center',marginBottom:10,marginTop:30}}>
            <button type="submit" className="button is-rounded is-success">
              <span className="icon is-small">
                <LogIn size={20} />
              </span>
              <span>Login</span>
            </button>
          </div>
        </form>
        <div className="form-action-buttons">
          <Link to="/signup">Sign Up</Link>
          <Link to="/reset-password">Forgot Password</Link>
        </div>
      </div>
    </StyledLogin>
  )
}

const mapStateToProps = (state) => ({
  isSignedIn: selectIsSignedIn(state),
  errors: selectAuthErrors(state),
  loading: selectAuthLoading(state),
})

const ConnectedLogin = connect(
  mapStateToProps,
  { login }
)(Login)

export {
  ConnectedLogin,
  ConnectedLogin as default
}

const StyledLogin = styled.div`
  margin: 0 auto;
  max-width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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