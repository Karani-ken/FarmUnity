import React, { useState } from 'react'
import Counties from './../Assets/Counties.json'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const ApplicationForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer'
  })
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      // For file inputs (e.g., ID photo), get the selected file
      const file = e.target.files[0];

      // Update state with the selected file
      setUserData((prevState) => ({
        ...prevState,
        [name]: file // Store the file object directly in state
      }));
    } else {
      // For other input types, update state with the input value
      setUserData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // Create FormData object

      // Append form data to FormData object
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      formData.append('password', userData.password);
      formData.append('role', userData.role)

      // Send form data to the server using Axios
      const response = await axios.post('https://api.fusionafricatech.co.ke/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json' // Set content type for FormData
        }
      });

      console.log('Registration successful:', response.data);
      toast.success('registration successful')

      setUserData({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'farmer'
      });

      navigate('/login');

    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('An error!!')
    }
  };
  return (
    <div className="text-center">

      <form onSubmit={handleSubmit}
        className="shadow-lg p-lg-5 p-2 text-start"
        style={{ margin: "10%" }}
      >
        <h4 className="fw-bold m-2 text-center" style={{ color: "#000",fontSize:'25px' }}>
          Create Farmers Account
        </h4>
        <div className="form-group">
          <label htmlFor="Name" className="fw-bold">Full Name</label>
          <input
            type="text"
            className="form-control p-2"
            name="name"
            value={userData.name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email" className="fw-bold">Email address</label>
          <input
            type="email"
            className="form-control p-2"
            name="email"
            value={userData.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="Name" className="fw-bold">Phone number</label>
          <input
            type="number"
            className="form-control p-2"
            name="phone"
            value={userData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Name" className="fw-bold">County</label>
          <select name="county" className='form-control'>
            <option> select your County</option>
            {
              Counties?.map((county) => {
                return <option value={county.name}>{county.name}</option>
              })
            }

          </select>

        </div>
        <div className="form-group">
          <label htmlFor="Password" className="fw-bold">Password</label>
          <input
            type="password"
            className="form-control p-2"
            name="password"
            value={userData.password}
            placeholder="Password"
            onChange={handleChange}
          />

        </div>
        <div className="d-lg-flex justify-content-between p-3 m-4 align-items-center">
          <p>
            <Link to="/login" style={{ textDecoration: "none", color: '#39c758' }}>
              Already have an account? Login here
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="btn btn-primary m-3 p-2 w-50"
          style={{ background: "#39c758", border: "none" }}
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default ApplicationForm