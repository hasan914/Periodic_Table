import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png'

const Login = () => {

  const host = 'http://localhost:5000'; 
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      console.log("Logged in successfully");
      navigate("/");
    } else {
      console.log("Invalid Credentials");
    }

  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <>
    
      <div className="container container-login">

        <div className="login-page-logo">
          <img src={logo} alt="Logo"/>
          <h1>INTERACTIVE <br/> PERIODIC TABLE</h1>
        </div>

        <form className='login-form' onSubmit={handleSubmit}>
          <div className="login-form-input-group">
            {/* <label htmlFor="email" className="form-label">Email</label> */}
            <input type="email" className="form-control" name='email' id="email" placeholder='Email'
            onChange={onChange} value={credentials.email}/>
            <i className="login-form-icon fa-solid fa-user"></i>
          </div>
          <div className="login-form-input-group">
            {/* <label htmlFor="password" className="form-label">Password</label> */}
            <input type="password" className="form-control" name='password' id="password" placeholder='Password'
            onChange={onChange} value={credentials.password}/>
            <i className="login-form-icon fa-solid fa-lock"></i>
          </div>
          <div>
            <button type="submit" className="btn login-button">Login</button>
          </div>
        </form>

        <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>

      </div>
    
    </>
  )
}

export default Login