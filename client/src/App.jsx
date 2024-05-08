
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./MainComponents/HomePage";
import Navbar from "./Components/Navigation/Navbar";
import Shop from "./Components/Market/Shop";
import Login from "./MainComponents/Login";
import Register from "./MainComponents/Register";
import Cart from "./MainComponents/Cart";
import ProductPage from "./Components/Products/ProductPage";
import AddProduct from "./Components/Products/AddProduct";
import ApplicationForm from "./MainComponents/ApplicationForm";
import Dashboard from "./MainComponents/Dashboard";
import Orders from "./Components/Orders/Orders";
import Interactions from "./Components/Interactions/Interactions";
import PaymentSuccessPage from "./Components/Payments/PaymentSuccessPage";
import PaymentFailedPage from "./Components/Payments/PaymentFailedPage";
import Footer from "./Components/Footer";
import EditProfile from "./MainComponents/EditProfile";
import CreatePost from "./Components/Blogs/CreatePost";
import OrderTracking from "./Components/OrderTracking/OrderTracking";
function App() {
  const handleClick = () => {
    window.open('https://bit.ly/i-mkulima', '_blank');
  };
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/seller-registration' element={<ApplicationForm />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/edit-profile' element={<EditProfile/>} />
          <Route path='/payment-success' element={<PaymentSuccessPage />} />
          <Route path='/payment-failed' element={<PaymentFailedPage />} />
          <Route path='/interactions' element={<Interactions />} />
          <Route path="/order-tracking" element={<OrderTracking/>}/>
        </Routes>
      </Router>
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          onClick={handleClick}>
          Chat with Mkulima assistant
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
