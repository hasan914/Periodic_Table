import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'

const Navbar = () => {

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <>

    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo"/>
      </div>
      <div className="logout-container">
        <button onClick={handleLogout} className="btn logout-button">Logout</button>
      </div>
    </nav>
    
    </>
  )
}

export default Navbar