import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState('')
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }
  return (
    <div>
      <nav className='p-3 bg-emerald-500 text-white justify-around flex flex-wrap'>
        <h1 className='font-bold text-2xl p-2'>Farm Unity Deliveries</h1>
        <ul className='flex justify-evenly'>
          <li className='m-2 font-semibold'>
            <Link to="/">Dashboard</Link>
          </li>
          <li className='m-2 font-semibold'>
            <li className='m-2 font-semibold'>
              {isAuthenticated ?
                <button onClick={handleLogout}>Sign out</button> :
                <Link to="/login">Sign in</Link>
              }
            </li>


          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Homepage