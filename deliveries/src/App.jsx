import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./Components/Navigation/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from "./Components/Authentication/Register";
import Login from "./Components/Authentication/Login";
import Dashboard from "./Components/Dashboards/Dashboard";


export default function App() {
  return (
    <div>
      <Router>
      <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Dashboard/>} />         
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

