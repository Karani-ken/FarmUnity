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
          console.error('Error fetching user profile:', error);          // Handle error if needed
        }
      };
      fetchUser();
    }
  }, [token]);

  const handleAddProduct = () => {
    navigate('/add-product')
  }
  return (
    <div>
      <div className="shadow-lg text-center p-2 m-2 rounded-lg">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <div className="d-lg-flex justify-center my-4">
          <div className="shadow-lg text-left p-3 bg-emerald-600 m-2 text-white rounded-lg">
            <p className='font-semibold text-center'>Personal Details</p>
            <h3 className="font-semibold text-xl">Name: John Doe</h3>
            <p>phone: +254712345678</p>
            <p>County: Nyeri</p>
          </div>
          <div className="shadow-lg text-left p-3 bg-rose-500 m-2 text-white rounded-lg">
            <h3 className="font-semibold  text-center">My Products Count</h3>
            <h1 className='text-center font-bold text-4xl'>3</h1>
          </div>
          <div className="btn btn-primary h-25 text-center">Edit profile</div>
          <div className="btn btn-secondary h-25 text-center" onClick={handleAddProduct}>Add new Product</div>
        </div>
            <h3 className="text-3xl">Products</h3>
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edit Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className='bg-white'>
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Cabbages</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Available</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Edit</div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>


    </div>
  )
}

export default Dashboard   