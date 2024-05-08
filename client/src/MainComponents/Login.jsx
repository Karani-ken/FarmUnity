import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from "axios"
function Login() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({    
    email:'',
    password:''
  })
  const handleChange = (e)=>{
    setUserData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit =async (e)=>{
    e.preventDefault();
   try {
    const response = await axios.post('https://api.fusionafricatech.co.ke/auth/login', userData)
    const token = response.data.token;
    localStorage.setItem('token', token);  
    toast.success("Login successfull")
    navigate('/')

   } catch (error) {
    console.error(error)
    toast.error("failed!!")
    
   }
  }
  return (
    <div className="text-center" style={{ margin: "0 5%", height: "80vh" }}>
      <h4 className="fw-bold" style={{ color: "#6A6666" }}>
        Login
      </h4>
      <form onSubmit={handleSubmit}
        className="shadow-lg p-lg-5 p-2 text-start"
        style={{ margin: "0 10%", height: "70vh" }}
      >
        <div className="form-group">
          <label htmlFor="Email" className="fw-bold">Email address</label>
          <input
            type="email"
            className="form-control p-2"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
            value={userData.email}
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
            placeholder="Password"
            onChange={handleChange}
            value={userData.password}
          />
        </div>
        <div className="d-lg-flex justify-content-between p-3 m-4 align-items-center">
          <p>
            <Link to="/register" style={{ textDecoration: "none",color:'#39c758' }}>
              not yet a member? Create Account here.
            </Link>
          </p>
          <button
            type="submit"
            className="btn btn-primary m-3 p-2 w-50"
            style={{ background: "#39c758", border: "none" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
