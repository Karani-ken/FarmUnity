import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import Products from "./../Assets/Fruits.json";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/Shopping Cart/CartSlice";
import { fetchProducts } from "../../features/Products/ProductSlice";
import axios from 'axios'
function ProductPage() {
  const { id } = useParams();
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const response = useSelector((state) => state.products)
  let farmer;
  const { products } = response;
  useEffect(() => {
    dispatch(fetchProducts())
    const getUsers = async () => {
      const response = await axios.get(`http://localhost:4000/auth/get-users`)
      setUsers(response.data)
    }
    getUsers()
  }, [dispatch])
  const product_id = parseInt(id, 10);
  const product = products.find((x) => x.product_id === product_id);
  if(product){
     farmer = users.find(u => u.ID === product?.user_id)
  }  

  if (!product) {
    return (
      <div>
        <p>Product not found</p>
      </div>
    );
  }
  return (
    <div className="row shadow-lg p-5" style={{ margin: "3% 5%" }}>
      <div className="col-lg-6 text-center">
        <img src={product.product_image} alt="" style={{ width: '80%' }} />
        <h2>{product.product_name}</h2>
      </div>
      <div className="col-lg-6">
        <p className="fw-bold" style={{ fontSize: "20px" }}>
          Price: <small style={{ color: '#39C758' }}>KES.{product.product_price}</small>
        </p>
        <h4>Description</h4>
        <p style={{ fontSize: "20px" }}>
          {product.product_description}
          <small className="fw-semibold" style={{ fontSize: "20px" }}>{product.description}</small>
        </p>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="btn btn-primary mx-2"
          style={{ background: "#39C758", border: "none" }}
        >
          Add to Cart
        </button>
        <div className="p-3 my-2 shadow-lg rounded-lg">
          <h1 className="font-bold text-2xl text-emerald-500">Farmer Details</h1>
            <p>Name: {farmer?.name}</p>
            <p>Phone: +254{farmer?.phone}</p>
            <p>Address: {farmer.address ? farmer.address : 'N/A' }</p>
            <p>County: {farmer.county ? farmer.county : 'N/A' }</p>
        </div>
      </div>

    </div>
  );
}

export default ProductPage;
