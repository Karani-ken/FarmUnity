import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./MainComponents/HomePage";
import Navbar from "./Components/Navbar";
import Shop from "./Components/Shop";
import Login from "./MainComponents/Login";
import Register from "./MainComponents/Register";
import Cart from "./MainComponents/Cart";
import ProductPage from "./Components/ProductPage";
import AddProduct from "./Components/AddProduct";
import ApplicationForm from "./MainComponents/ApplicationForm";
import Dashboard from "./MainComponents/Dashboard";
import Orders from "./Components/Orders";
import Interactions from "./Components/Interactions";
import PaymentSuccessPage from "./Components/PaymentSuccessPage";
import PaymentFailedPage from "./Components/PaymentFailedPage";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller-registration" element={<ApplicationForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment-success" element={<PaymentSuccessPage/>} />
          <Route path="/payment-failed" element={<PaymentFailedPage/>} />
          <Route path="/interactions" element={<Interactions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
