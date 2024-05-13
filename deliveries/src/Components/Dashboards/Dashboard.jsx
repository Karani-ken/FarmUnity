import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import DeliveriesDashboard from './DeliveriesDashboard';
import Admindashboard from './Admindashboard';
import Login from '../Authentication/Login';
const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState('')
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [token])
  return (
    <div>
      {isAuthenticated && decoded.role === "deliverer" ? <DeliveriesDashboard /> :
        isAuthenticated && decoded.role === "admin" ? <Admindashboard /> :
          <p>Restricted access</p>}

    </div>
  )
}

export default Dashboard