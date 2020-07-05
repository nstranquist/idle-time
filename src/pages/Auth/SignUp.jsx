import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff, CheckCircle, User } from 'react-feather'
import { ErrorText } from '../../components/ErrorText'
import { bulmaColors } from '../../styles/bulma.colors'
import { selectAuthErrors, selectAuthLoading } from '../../store/selectors/auth'
import { signup, resetSignupSuccess, clearErrors } from '../../store/Auth'

const emptySignupForm = {
  name: "Kati",
  email: "gabbardkk@gmail.com",
  password: "sugarbear3",
  confirmPassword: "sugarbear3"
}

const SignUp = ({
  signupSuccess,
  loading,
  errors,
  signup,
  clearErrors,
  resetSignupSuccess,
}) => {
  const [formData, setFormData] = useState(emptySignupForm)
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    // check local storage for cookies

    return () => {
      resetForm()
      clearErrors();
      if(signupSuccess)
        resetSignupSuccess()
    };
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, email, password, confirmPassword } = formData

    // submit form data
    if(password.length < 6)
      setFormErrors("password is not long enough")
    else if (password !== confirmPassword)
      setFormErrors("passwords must match")
    else {
      // sign up user
      console.log('submitting data to signup:', name, email, password)
      signup(name, email, password);
  
      // resetForm()
    }
  }

  const resetForm = () => {
    setFormData(emptySignupForm)
    setFormErrors(null)
  }
  
  if(signupSuccess) {
    return (
      <StyledSignup className="box">
        <header className="form-header">
          <h3 className="form-header-text is-size-2">
            <span className="icon is-large">
              <CheckCircle size={32} color={bulmaColors.success} />
            </span>
            Success!
          </h3>
        </header>
        <div style={{flex: 1, display:'flex', height: 200, minHeight: 200, justifyContent: 'center', alignItems: 'center'}}>
          <p style={{textAlign:'center'}}>
            Please <Link to="/login">Login</Link> to begin!
          </p>
        </div>
      </StyledSignup>
    )
  }
  return (
    <StyledSignup className="box">
      <header className="form-header">
        <h3 className="form-header-text is-size-3">Sign Up</h3>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          {formErrors ? <ErrorText message={formErrors} />
          : errors && <ErrorText message={errors} />}

          <div className="field">
            <label className="label" htmlFor="name">Name</label>
            <div className="control has-icons-left has-icons-right">
              <input
                autoFocus
                className="input" // is-danger for incorrect input elements
                type="text"
                required
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <User size={20} />
              </span>
            </div>
            {/* <p className="help is-danger">This email is invalid</p> */}
          </div>
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

            <div style={{height:10, backgroundColor: 'transparent'}} />

            {/* <p className="help is-danger">This password is invalid</p> */}
            <div className="control has-icons-left has-icons-right">
              <input
                className="input" // is-danger for incorrect input elements
                type={showPassword ? "text" : "password"}
                required
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <Lock size={20} />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox noselect" htmlFor="termsOfService">
                <input type="checkbox" name="termsOfService" style={{marginRight:5}} />
                I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="submit-btn-container" style={{textAlign:'center',marginBottom: 10, marginTop: 30}}>
            {loading ? (
              <button disabled className="button is-rounded is-info is-loading"></button>
            ) : (
              <button type="submit" className="button is-rounded is-info">Sign Up</button>
            )}
          </div>
        </form>
        <div className="form-action-buttons">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </StyledSignup>
  )
}

const mapStateToProps = (state) => ({
  // token: selectAuthToken(state), // select token to see if it's still there??-
  signupSuccess: state.auth.signupSuccess,
  loading: selectAuthLoading(state),
  errors: selectAuthErrors(state),
})

export const ConnectedSignUp = connect(
  mapStateToProps,
  { signup, resetSignupSuccess, clearErrors }
)(SignUp)

export default ConnectedSignUp

const StyledSignup = styled.div`
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
