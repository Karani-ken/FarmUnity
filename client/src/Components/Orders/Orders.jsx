import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../features/Orders/OrdersSlice'
import axios from 'axios'
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver'
import Stepper from '../OrderTracking/Stepper';
import StepperControll from '../OrderTracking/StepperControll';
import Card from './Card';
import OrdersTable from './OrdersTable';
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
    <div className='h-screen overflow-y-scroll p-4'>
      <h1 className="text-xl mx-4">Orders Dashboard</h1>
      <div className='md:flex justify-start p-2 m-2'>
        <Card status={"Total"} count={3} bg={"bg-emerald-400"} />
        <Card status={"Active"} count={1} bg={"bg-rose-400"} />
        <Card status={"Delivered"} count={2} bg={"bg-sky-400"} />
      </div>
      <div className="p-2">
        <h3 className="text-2xl font-bold text-center m-2">
          My Orders
        </h3>
        <OrdersTable />
      </div>

    </div>
  )
}

export default Orders