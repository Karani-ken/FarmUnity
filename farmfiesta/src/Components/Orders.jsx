import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../features/Orders/OrdersSlice'
const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders?.orders);

  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders when the component mounts
  }, [dispatch]);

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
            {orders && orders?.length >= 0 ?
              orders?.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.status}</td>
                  <td></td>
                  <td>
                    <button className="btn btn-primary">Pay</button>
                    <button className="btn btn-outline-danger mx-2">Cancel</button>
                  </td>
                </tr>
              )) : (
                <p>No orders yet!!</p>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders