import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
//import Products from "./../Assets/Fruits.json";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/Shopping Cart/CartSlice";
import { fetchProducts } from "../../features/Products/ProductSlice";
function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.products)
  const { products } = response;
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  const product_id = parseInt(id, 10);
  const product = products.find((x) => x.product_id === product_id);
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
      </div>
    </div>
  );
}

export default ProductPage;
