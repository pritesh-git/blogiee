import React, { useState } from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import './styles/auth.css'
import Axios from 'axios'
import { BASE_URL } from './config/config.js'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [logData, setLogData] = useState({})
  const [regData, setRegData] = useState({})
  let navigate = useNavigate()
  localStorage.clear()

  const swipeTab = e => {
    const container = document.getElementById('container')
    if (e.target.id === 'signUp') container.classList.add('right-panel-active')

    if (e.target.id === 'signIn')
      container.classList.remove('right-panel-active')
  }
  const handleLogChange = e => {
    var Log_Data = logData
    Log_Data[e.target.name] = e.target.value
    setLogData(Log_Data)
  }
  const handleRegChange = e => {
    var Reg_Data = regData
    Reg_Data[e.target.name] = e.target.value
    setRegData(Reg_Data)
  }

  const handleLogSubmit = e => {
    e.preventDefault()
    Axios.post(`${BASE_URL}login`, logData)
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('user', JSON.stringify(res.data))
          window.location.assign('/Profile')
        } else alert(res.data.data.message)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleRegSubmit = e => {
    e.preventDefault()
    navigate('/Registration', { state: regData })
  }
  return (
    <div>
      <div className="container w-50 p-1" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="/" className="social">
                <FaFacebookF />
              </a>
              <a href="/" className="social">
                <FcGoogle />
              </a>
              <a href="/" className="social">
                <FaLinkedinIn />
              </a>
            </div>
            <input
              type="text"
              placeholder="First Name"
              name="fnm"
              value={regData.fnm}
              onChange={handleRegChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lnm"
              value={regData.lnm}
              onChange={handleRegChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={regData.email}
              onChange={handleRegChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={regData.password}
              onChange={handleRegChange}
              required
            />
            <button className="mt-3" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="/" className="social">
                <FaFacebookF />
              </a>
              <a href="/" className="social">
                <FcGoogle />
              </a>
              <a href="/" className="social">
                <FaLinkedinIn />
              </a>
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={logData.email}
              onChange={handleLogChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={logData.password}
              onChange={handleLogChange}
              required
            />
            <a href="/">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={swipeTab}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={swipeTab}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
