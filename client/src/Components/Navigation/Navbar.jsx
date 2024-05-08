import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Logo from '../../Assets/Image/farmunitylogo.png'
const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const token = localStorage.getItem('token');
  const decoded = token ?  jwtDecode(token): null;

  useEffect(() => {
    if (token) {
      setIsloggedIn(true);
    } else {
      setIsloggedIn(false)
    }
  }, [token])
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsloggedIn(false)
    navigate('/login')
  }
  return (
    <div className='navbar'>
      <header>

        <img src={Logo} alt="" className='logo' />
        <nav>
          <ul>
            <li><Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Home</Link></li>
            <li className="dropdown">Market place
              <ul className="dropdown-content">
                <li><Link to='/cart'>Cart</Link></li>
                <li><Link to='/shop'>Shop</Link></li>
              </ul>
            </li>
            <li><Link to='/interactions'>Interactions</Link></li>
            {isLoggedIn && decoded?.role === "farmer" && (
              <li><Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}>
                Dashboard
              </Link></li>)}
            {isLoggedIn ? (
              <>
                <li>
                  <button className='btn btn-secondary' onClick={handleLogOut}>Log out</button>
                </li>

                <li><Link to='/orders' style={{ textDecoration: 'none', color: 'black' }}>Orders</Link></li>
              </>


            ) : (
              <li className="dropdown">
                Sign up
                <ul className="dropdown-content">
                  <li><Link to='/seller-registration'>Farmer</Link></li>
                  <li><Link to='/register'>Customer</Link></li>
                </ul>
              </li>

            )}




          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navbar