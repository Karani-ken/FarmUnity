import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./Components/Navigation/Navbar"
import DeliveriesDashboard from "./Components/Dashboards/DeliveriesDashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from "./Components/Authentication/Register";
import Login from "./Components/Authentication/Login";


export default function App() {
  return (
    <div>
      <Router>
      <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" exact element={<DeliveriesDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

