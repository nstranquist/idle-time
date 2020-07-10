import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'react-feather'
import { ErrorText, ErrorNotification } from '../../components/ErrorText'
import { selectAuthErrors, selectAuthLoading, selectIsSignedIn, selectAuthToken } from '../../store/selectors/auth'
import { login, clearErrors, } from '../../store/Auth'
import { getTasks } from '../../store/Tasks'

const emptyLoginForm = {
  email: "",
  password: ""
}

// Note: Would be cool to have a top bar with "IdleTime" written on it

const Login = ({
  token,
  signedIn,
  loading,
  errors,
  login,
  clearErrors,
  getTasks,
}) => {
  const [formData, setFormData] = useState(emptyLoginForm)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    // check local storage for login creds, setRememberMe
    const rememberMe = localStorage.getItem('idleTimeRememberLogin')
    if(rememberMe) {
      const storedEmail = localStorage.getItem('idleTimeEmail')
      const storedPassword = localStorage.getItem('idleTimePassword')

      if(storedEmail && storedPassword)
        setFormData({ email: storedEmail, password: storedPassword })
    }

    return () => {
      handleSavedData(formData.email, formData.password)
      resetForm()
      clearErrors();
    }
  }, [])

  useEffect(() => {
    if(signedIn && token) {
      // dispatch redux actions to get user data
      getTasks();
      //getUserData();
      //getUserSettings();
    }
  }, [signedIn, token])

  const handleSavedData = (email, password) => {
    // called on unmount
    if(rememberMe) {
      // set the local data
      localStorage.setItem('idleTimeRememberLogin', false)
      localStorage.setItem('idleTimeEmail', email)
      localStorage.setItem('idleTimePassword', password)
    }
    else {
      localStorage.setItem('idleTimeRememberLogin', true)
      localStorage.removeItem('idleTimeEmail')
      localStorage.removeItem('idleTimePassword')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    if(!loading) {
      setFormErrors(null)
      
      const { email, password } = formData
      
      // submit form data
      if(email.length < 1 || password.length < 1)
        setFormErrors("email and/or password cannot be empty")
      else if(password.length < 6)
        setFormErrors("password must be greater than 6 characters")
      else {
        // submit login data
        console.log('submitting login with data:', email, password)
        login(email, password)
        setFormData(emptyLoginForm)
      }
    }
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
          {formErrors ? <ErrorText message={formErrors} clearErrors={() => setFormErrors(null)} />
          : errors && <ErrorNotification message={errors} clearErrors={clearErrors} />}
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                autoFocus
                className="input" // is-danger for incorrect input elements
                type="email"
                required
                disabled={loading}
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
                disabled={loading}
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
              <label className="checkbox noselect" htmlFor="rememberMe" onClick={() => !loading && setRememberMe(!rememberMe)}>
                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={() => undefined} style={{marginRight:5}} />
                Remember login?
              </label>
            </div>
          </div>

          {/* can use 'is-loading' className for when it's loading */}
          <div className="" style={{textAlign:'center',marginBottom:10,marginTop:30}}>
            <button type="submit" disabled={loading} className="button is-rounded is-success">
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
  token: selectAuthToken(state),
  signedIn: selectIsSignedIn(state),
  errors: selectAuthErrors(state),
  loading: selectAuthLoading(state),
})

const ConnectedLogin = connect(
  mapStateToProps,
  { login, clearErrors, getTasks, } // add more actions here
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