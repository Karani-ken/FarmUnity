import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../features/Orders/OrdersSlice'
import axios from 'axios'
import { toast } from 'react-toastify';
import {saveAs} from 'file-saver'
const Orders = () => {

  const dispatch = useDispatch();
  const response = useSelector((state) => state.orders);
  const { orders } = response
  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders when the component mounts
  }, [dispatch]);
  const handlePayment = async (orderId) => {
    try {
      const approvedUrl = "https://nnp-farmunity.fusionafricatech.co.ke/payment-success"
      const cancelUrl = "https://nnp-farmunity.fusionafricatech.co.ke/payment-failed"
      const redirectUrls = {
        approvedUrl,
        cancelUrl
      }
      const response = await axios.post(`https://api.fusionafricatech.co.ke/orders/stripe-payment/${orderId}`, redirectUrls)
      const stripeRequestUrl = response.data.stripeSessionUrl;
      console.log(stripeRequestUrl)
      window.location.href = stripeRequestUrl;
    } catch (error) {
      console.log(error)
      toast.error("Could not pay!!")    
    }
  }
  const handleInvoice = async (orderId) => {
    try {
        const response = await axios.get(`https://api.fusionafricatech.co.ke/orders/order-items/${orderId}`, { responseType: 'blob' });
        const pdfBlob = response.data;
        saveAs(pdfBlob, 'invoice.pdf');
    } catch (error) {
        console.error('Error downloading invoice:', error);
        // Handle error appropriately (e.g., show error message to the user)
    }
};
  const validatePayment = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`https://api.fusionafricatech.co.ke/orders/validate-payment/${orderId}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      toast.success("Payment Confirmed")
      window.location.reload();
    } catch (error) {
      console.log(error)
      toast.error("Could not confirm payment")
    }


  }
  return (
    <div className='h-screen overflow-y-scroll'>
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
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>
                <button className="btn btn-primary" onClick={() => handleInvoice(order.order_id)}>Get Invoice</button>
                </td>
                <td>
                  <button className="btn btn-primary" onClick={() => handlePayment(order.order_id)}>Pay</button>
                  <button className="btn btn-success mx-1" onClick={() => validatePayment(order.order_id)}>Confirm Payment</button>
                  <button className="btn btn-outline-danger">Cancel</button>
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