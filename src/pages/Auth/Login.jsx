import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, LogIn,
} from 'react-feather';
import { ErrorText, ErrorNotification } from '../../components/ErrorText';
import {
  onLoginSuccess, onLoginFailure, clearErrors, setLoginLoading,
} from '../../store/Auth';
// import { getTasks } from '../../store/Tasks'
import { setSettings } from '../../store/Settings';
// import { setNewUser, setPaidMember } from '../../store/UI' // good place to have these?
import { BASE_URL } from '../../utils/api';

const emptyLoginForm = {
  email: '',
  password: '',
};

// Note: Would be cool to have a top bar with "IdleTime" written on it
const Login = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const signedIn = useSelector((state) => state.auth.signedIn);
  const loading = useSelector((state) => state.auth.loading);
  const errors = useSelector((state) => state.auth.errors);

  const [formData, setFormData] = useState(emptyLoginForm);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  useEffect(() => {
    // check local storage for login creds, setRememberMe
    const rememberMe = localStorage.getItem('idleTimeRememberLogin');
    if (rememberMe) {
      const storedEmail = localStorage.getItem('idleTimeEmail');
      const storedPassword = localStorage.getItem('idleTimePassword');

      if (storedEmail && storedPassword) { setFormData({ email: storedEmail, password: storedPassword }); }
    }

    return () => {
      handleSavedData(formData.email, formData.password);
      resetForm();
      dispatch(clearErrors());
    };
  }, []);

  const handleSavedData = (email, password) => {
    // called on unmount
    if (rememberMe) {
      // set the local data
      localStorage.setItem('idleTimeRememberLogin', false);
      localStorage.setItem('idleTimeEmail', email);
      localStorage.setItem('idleTimePassword', password);
    } else {
      localStorage.setItem('idleTimeRememberLogin', true);
      localStorage.removeItem('idleTimeEmail');
      localStorage.removeItem('idleTimePassword');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loading) {
      setFormErrors(null);

      const { email, password } = formData;

      // submit form data
      if (email.length < 1 || password.length < 1) setFormErrors('email and/or password cannot be empty');
      else if (password.length < 6) setFormErrors('password must be greater than 6 characters');
      else {
        handleLogin(email, password);
        setFormData(emptyLoginForm);
      }
    }
  };

  const handleLogin = async (email, password) => {
    dispatch(setLoginLoading());
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}&password=${password}`,
    })
      .then(async (res) => ({ data: await res.json(), status: res.status }))
      .then((object) => {
        const { data, status } = object;
        console.log('response data:', object);
        if ((status >= 200 && status < 300) || data.ok ) {
          console.log('success! data:', data)
          const { userData } = data.data;
          const { userSettings } = data.data;
          const { userStatus } = data.data;
          const userToken = data.data.token;

          if (userData && userToken) {
            dispatch(onLoginSuccess(userToken, userData));

            if (userSettings) {
              dispatch(setSettings(userSettings));
            }
            if (userStatus) {
              if (userStatus.is_new) {
                // launch the new user tutorial, and then update the user to is_new = false;
                console.log('welcome, new user');
              }
              if (userStatus.is_member) {
                console.log('welcome, idle time member');
              }
            }
          } else dispatch(onLoginFailure('server error: user data not returned from server'));
        } else {
          dispatch(onLoginFailure(`${status} error: ${data.message}`));
        }
      })
      .catch((err) => dispatch(onLoginFailure(err.message || 'error logging in from server')));
  };

  const resetForm = () => {
    setFormData(emptyLoginForm);
    setFormErrors(null);
    setRememberMe(false);
  };

  return (
    <StyledLogin className="box">
      <header className="form-header">
        <h3 className="form-header-text is-size-3">Login</h3>
      </header>
      <div>
        <form onSubmit={(e) => (loading ? undefined : handleSubmit(e))}>
          {formErrors ? <ErrorText message={formErrors} clearErrors={() => setFormErrors(null)} />
            : errors && <ErrorNotification message={errors} clearErrors={() => dispatch(clearErrors())} />}
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
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
                type={showPassword ? 'text' : 'password'}
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
              <span
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.keyCode === 29 && setShowPassword(!showPassword)}
                className="icon is-small is-right"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', zIndex: 2000, pointerEvents: 'initial' }}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>
            {/* <p className="help is-danger">This password is invalid</p> */}
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox noselect" htmlFor="rememberMe" onClick={() => !loading && setRememberMe(!rememberMe)}>
                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={() => undefined} style={{ marginRight: 5 }} />
                Remember login?
              </label>
            </div>
          </div>

          {/* can use 'is-loading' className for when it's loading */}
          <div className="" style={{ textAlign: 'center', marginBottom: 10, marginTop: 30 }}>
            {!loading ? (
              <button type="submit" className="button is-rounded is-success">
                <span className="icon is-small">
                  <LogIn size={20} />
                </span>
                <span>Login</span>
              </button>
            ) : (
              <div disabled className="is-loading" />
            )}

          </div>
        </form>
        <div className="form-action-buttons">
          <Link to="/signup">Sign Up</Link>
          <Link to="/reset-password">Forgot Password</Link>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;

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
`;
