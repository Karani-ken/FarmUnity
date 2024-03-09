import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify'
function Register() {
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:'',
    role:'client'
  })
  const handleChange = (e)=>{
    setUserData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', userData);
      console.log("registration successfull",response.data);
      toast.success("Registration successful")
      setUserData({
        name: '',
        email: '',
        password: '',
        role: 'client'
      });
    } catch (error) {
      console.log("register failed", error)    
      toast.error("failed!!");
    }
  }
  return (
    <div className="text-center" style={{ margin: "0 5%", height: "80vh" }}>
      <h4 className="fw-bold" style={{ color: "#6A6666" }}>
        Create Account
      </h4>
      <form onSubmit={handleSubmit}
        className="shadow-lg p-lg-5 p-2 text-start"
        style={{ margin: "0 10%", height: "70vh" }}
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
            <Link to="/login" style={{ textDecoration: "none",color:'#39c758' }}>
              Already have an account? Login here
            </Link>
          </p>
          
          <button
            type="submit"
            className="btn btn-primary m-3 p-2 w-50"
            style={{ background: "#39c758", border: "none" }}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
