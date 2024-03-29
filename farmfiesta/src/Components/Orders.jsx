import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../features/Orders/OrdersSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.orders);
  const { orders } = response
  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders when the component mounts
  }, [dispatch]);
  const handlePayment = async (orderId) => {
    try {
      const approvedUrl = "https://www.facebook.com"
      const cancelUrl = "https://www.youtube.com"
      const redirectUrls = {
        approvedUrl,
        cancelUrl
      }
      const response = await axios.post(`/orders/stripe-payment/${orderId}`, redirectUrls)
      const stripeRequestUrl = response.data.stripeSessionUrl;
      console.log(stripeRequestUrl)
      window.location.href = stripeRequestUrl;
    } catch (error) {
      console.log(error)
    }
  }
  const validatePayment = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/orders/validate-payment/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      toast.success("Payment Confirmed")
    } catch (error) {
      console.log(error)
      toast.error("Could not confirm payment")
    }


  }
  return (
    <div>
      <h3>All Orders</h3>
      <div className='table-responsive'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Order Items</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{new Date(order.order_date).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>{/* Display order items here */}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handlePayment(order.order_id)}>Pay</button>
                  <button className="btn btn-success" onClick={()=>validatePayment(order.order_id)}>Confirm Payment</button>
                  <button className="btn btn-outline-danger mx-2">Cancel</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders