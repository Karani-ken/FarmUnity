import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode'
import { fetchProducts } from "../features/Products/ProductSlice";
import axios from 'axios'
import { toast } from 'react-toastify'


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const [myProducts, setMyProducts] = useState([])
  const [sales, setSales] = useState([])
  const response = useSelector((state) => state.products)
  const [tableData, setTableData] = useState([])
  const { products } = response;
  const [totalAmount, setTotalAmount] = useState(0);
  // console.log(products)
  useEffect(() => {
    dispatch(fetchProducts())
    const fetchMyProducts = async () => {
      const response = await axios.get(`http://localhost:4000/products/my-products/${decoded.userId}`)
      //console.log(response.data)      
      setMyProducts(response.data)
    }
    const filterProducts = () => {
      const distinctProducts = products.filter(product => product.user_id === decoded.userId)
      setTableData(distinctProducts)
      //console.log(setTableData)
    }
    const getMySales = async () => {
      const response = await axios.get(`http://localhost:4000/orders/my-sales/${decoded.userId}`)
      if (response.data) {
        const salesData = response.data;
        let totalAmount = 0;
        salesData.forEach(sale => {
          totalAmount += sale.total_amount_sold
        })
        setSales(response.data)
        setTotalAmount(totalAmount)

      }
    }
    filterProducts()
    fetchMyProducts()
    getMySales()
  }, [token, dispatch, decoded.userId]);

  const handleAddProduct = () => {
    navigate('/add-product')
  }
  const handleEditProfile = () => {
    navigate('/edit-profile')
  }
  const makeUnavailable = async (product_id) => {
    try {
      const status = "not available"
      const statusData = {
        status
      }
      await axios.put(`https://api.fusionafricatech.co.ke/products/update-status/${product_id}`, statusData)
      toast.success("Product status updated")
    } catch (error) {
      console.log(error)
      toast.error("Could not update")
    }

  }
  const makeAvailable = async (product_id) => {
    try {
      const status = "available"
      const statusData = {
        status
      }
      await axios.put(`https://api.fusionafricatech.co.ke/products/update-status/${product_id}`, statusData)
      toast.success("Product status updated")
    } catch (error) {
      console.log(error)
      toast.error("Could not update")
    }
  }
  const deleteProduct = async (product_id) => {
    try {
      await axios.delete(`https://api.fusionafricatech.co.ke/products/delete/${product_id}`)
      toast.success("Product was deleted")
    } catch (error) {
      console.log(error)
      toast.error("Could not delete")
    }
  }
  return (
    <div>
      <div className="shadow-lg text-center p-2 m-2 rounded-lg">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <div className="d-lg-flex justify-center my-4">
          <div className="shadow-lg text-left p-3 bg-emerald-600 m-2 text-white rounded-lg">
            <p className='font-semibold text-center'>Personal Details</p>
            <h3 className="font-semibold text-xl">Name:{decoded.name}</h3>
            <p>Role: {decoded.role}</p>
            <p>Email: {decoded.email}</p>
          </div>
          <div className="shadow-lg text-left p-3 bg-rose-500 m-2 text-white rounded-lg">
            <h3 className="font-semibold  text-center">My Products Count</h3>
            <h1 className='text-center font-bold text-4xl'>{myProducts.length}</h1>
          </div>
          <div className="shadow-lg text-left p-3 bg-slate-500 m-2 text-white rounded-lg">
            <h3 className="font-semibold  text-center">Total Products sold</h3>
            <h1 className='text-center font-bold text-4xl'>{sales.length}</h1>
          </div>
          <div className="shadow-lg text-left p-3 bg-sky-500 m-2 text-white rounded-lg">
            <h3 className="font-semibold  text-center">Total earnings</h3>
            <h1 className='text-center font-bold text-4xl'>
             Kes.{totalAmount} 
            </h1>
          </div>
          <button className="btn btn-primary h-25 m-2 text-center" onClick={handleEditProfile}>Edit profile</button> <br />
          <button className="btn btn-primary h-25 m-2 text-center" onClick={handleAddProduct}>Add new Product</button>
        </div>
        <h3 className="text-3xl">Manage Products</h3>
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200 p-3">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData && tableData.map(item => {
                return (
                  <tr className='bg-white text-left' key={item.product_id}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {item.product_name}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {item.product_status}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <button className='btn btn-success m-1' onClick={() => makeUnavailable(item.product_id)}>Not Available</button>
                      <button className='btn btn-success m-1' onClick={() => makeAvailable(item.product_id)}>Make Available</button>
                      <button className="btn btn-danger m-1" onClick={() => deleteProduct(item.product_id)}>Delete</button>

                    </td>
                  </tr>
                )
              })}


            </tbody>
          </table>
        </div>

      </div>


    </div>
  )
}

export default Dashboard   