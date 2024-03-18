import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (token) {
      setIsloggedIn(true);
      const decoded = jwtDecode(token);
      setUserData(decoded);
    } else {
      setIsloggedIn(false)
      setUserData(null);
    }
  }, [token])
  const handleAddProduct = () => {
    navigate('/add-product')
  }
  return (
    <div className='dashboard'>
      <h1>Welcome {userData && userData.name}</h1>
      <div className="profile-details">
        <div className="details-container">
          <div className='small-container'>
            <h4>Personal Details</h4>
            <div className="form-control">
              <label>Name</label>
              <p>John Doe</p>
            </div>
            <div className="form-control">
              <label>Email</label>
              <p>example@gamil.com</p>
            </div>
            <div className="form-control">
              <label>Phone</label>
              <p>+254712345678</p>
            </div>
            <div className="form-control">
              <label>Id No.</label>
              <p>39589924</p>
            </div>
          </div>
          <div className="small-container">
            <h4>Address</h4>
            <div className="form-control">
              <label>County</label>
              <p>Nyeri</p>
            </div>
            <div className="form-control">
              <label>Town</label>
              <p>Karatina</p>
            </div>
            <div className="form-control">
              <label>Postal code</label>
              <p>771, Karatina</p>
            </div>
          </div>
        </div>
        <button className='btn btn-primary mt-2'>Edit</button>
      </div>
      {userData && userData.role === 'farmer'&& (
      <div className="profile-details">
        <h3>Products</h3>
        <div className="details-container">
          <div className="small-container">
            <h4>My products</h4>
            <div className="form-control">
              <ul>
                <li>Potatoes</li>
                <li>Cabbages</li>
                <li>Carrots</li>
              </ul>
              <button className='btn btn-success' onClick={handleAddProduct}>Add Product</button>
            </div>
          </div>
          <div className="small-container">
            <h4>Manage products</h4>
            <div className="form-control">
              <label>Potatoes</label>
              <div className="product-card">
                <ul>
                  <li>Quatity: 30sacks</li>
                  <li>Price: 3000 kes per sack</li>
                </ul>
                <button className='btn btn-primary'>Manage</button>
              </div>
            </div>
            <div className="form-control">
              <label>Cabbages</label>
              <div className="product-card">
                <ul>
                  <li>Quatity: 900 pieces</li>
                  <li>Price: 30 kes per piece</li>
                </ul>
                <button className='btn btn-primary'>Manage</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}


    </div>
  )
}

export default Dashboard   