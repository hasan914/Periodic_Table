import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png'

const Signup = () => {

  const host = 'http://localhost:5000'; 
  const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      console.log("Account created successfully");
    } else {
      console.log("Invalid Details");
    }

  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <>
    
      <div className="container container-signup">

        <div className="signup-page-logo">
          <img src={logo} alt="Logo"/>
          <h1>INTERACTIVE <br/> PERIODIC TABLE</h1>
        </div>


        <form className='signup-form' onSubmit={handleSubmit}>
          <div className="signup-form-input-group">
            {/* <label htmlFor="name" className="form-label">Name</label> */}
            <input type="text" className="form-control" id="name" name='name' placeholder='Name'
            onChange={onChange} value={credentials.name} required/>
            <i className="signup-form-icon fa-solid fa-user"></i>
          </div>
          <div className="signup-form-input-group">
            {/* <label htmlFor="email" className="form-label">Email</label> */}
            <input type="email" className="form-control" id="email" name='email' placeholder='Email'
            onChange={onChange} value={credentials.email} required/>
            <i className="signup-form-icon fa-solid fa-lock"></i>
          </div>
          <div className="signup-form-input-group">
            {/* <label htmlFor="password" className="form-label">Password</label> */}
            <input type="password" className="form-control" id="password" name='password' placeholder='Password'
            onChange={onChange} value={credentials.password} required minLength={8}/>
            <i className="signup-form-icon fa-solid fa-lock"></i>
          </div>
          <div>
            <button type="submit" className="btn signup-button">Sign Up</button>
          </div>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
    
    </>
  )
}

export default Signup