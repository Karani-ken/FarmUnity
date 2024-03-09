import React, { useState } from 'react'
import Counties from './../Assets/Counties.json'
import { Link } from 'react-router-dom'
const ApplicationForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    IdPhoto: '',
    password: '',

  })
  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <div className="text-center" style={{ margin: "0 5%", height: "80vh" }}>
      <h4 className="fw-bold" style={{ color: "#6A6666" }}>
        Create Seller Account
      </h4>
      <form
        className="shadow-lg p-lg-5 p-2 text-start"
        style={{ margin: "0 10%" }}
      >
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
            name="number"
            value={userData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Id" className="fw-bold">ID number</label>
          <input
            type="number"
            className="form-control p-2"
            name="idNumber"
            value={userData.idNumber}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idPhoto" className="fw-bold">ID Photo</label>
          <input
            type="file"
            className="form-control p-2"
            name="idPhoto"
            value={userData.IdPhoto}
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