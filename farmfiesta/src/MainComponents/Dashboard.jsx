import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);      
      // Get user profile
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://api.fusionafricatech.co.ke/auth/profile/${decoded.userId}`);
          
          setUserData(response.data);
          console.log(userData)
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Handle error if needed
        }
      };
      fetchUser();
    }
  }, [token]);

  const handleAddProduct = () => {
    navigate('/add-product')
  }
  return (
    <div className='dashboard'>
      <h1 className='fw-bold text-2xl p-4'>Welcome {userData && userData.name}</h1>
      <div className="profile-details">
        <div className="details-container">
          <div className='small-container'>
            <h4 className='fw-semibold p-2 text-xl'>Personal Details</h4>
            <div className="form-control">
              <label>Name</label>
              <p>{userData && userData.name}</p>
            </div>
            <div className="form-control">
              <label>Email</label>
              <p>{userData && userData.email}</p>
            </div>
            <div className="form-control">
              <label>Phone</label>
              <p>+254{userData && userData.phone}</p>
            </div>           
          </div>
          <div className="small-container">
            <h4 className='fw-semibold p-2 text-xl'> Address</h4>
            <div className="form-control">
              <label>County</label>
              <p>{userData && userData?.county}</p>
            </div>
            <div className="form-control">
              <label>Town</label>
              <p>{userData && userData.address}</p>
            </div>           
          </div>
        </div>
        <button className='btn btn-primary mt-2'>Edit</button>
      </div>
      {userData && userData.role === 'farmer' && (
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