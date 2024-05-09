import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../features/Orders/OrdersSlice';
import Card from './Card';
import OrdersTable from './OrdersTable';

const Orders = () => {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.orders);
  const { orders } = response;

  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders when the component mounts
  }, [dispatch]); 

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
        <OrdersTable 
          orders={orders}          
        />
      </div>
    </div>
  );
};

export default Orders;
