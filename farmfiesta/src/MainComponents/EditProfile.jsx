import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
    address: '',
    profilePic: null,
  });
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const id = decoded.userId; // Replace 'user_id' with the actual user ID
        const response = await axios.get(`http://localhost:4000/auth/profile/${id}`);
        const userProfile = response.data;
        setFormData(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error.response.data);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePic: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = decoded.userId; // Replace 'user_id' with the actual user ID
    try {
      const formDataWithModifiedFields = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          formDataWithModifiedFields.append(key, formData[key]);
        }
      }
      const response = await axios.put(`http://localhost:4000/auth/update-profile/${id}`, formDataWithModifiedFields);
      console.log('Profile updated:', response.data);
      toast.success("Profile Updated")
    } catch (error) {
      console.error('Error updating profile:', error.response.data);
      toast.error("Could not Update Profile")
    }
  };

  return (
    <div className='p-3 m-5'>
      <form onSubmit={handleSubmit} className='shadow-lg p-3'>
        <h2 className='fw-bold text-center'>Update Profile</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="county" className="form-label">County:</label>
          <input type="text" name="county" id="county" value={formData.county} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">Profile Picture:</label>
          <input type="file" name="profilePic" id="profilePic" onChange={handleFileChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
