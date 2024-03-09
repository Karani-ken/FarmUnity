import React from "react";
import { useParams } from "react-router-dom";
import Products from "./../Assets/Fruits.json";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Shopping Cart/CartSlice";
function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch(); 
  const productId = parseInt(id, 10);
  const product = Products.find((x) => x.id === productId);
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
        <img src={product.image} alt="" style={{  width:'80%'}} />
        <h2>{product.name}</h2>
      </div>
      <div className="col-lg-6">
        <p className="fw-bold" style={{ fontSize: "20px" }}>
          Price: <small style={{color:'#39C758'}}>${product.price}</small>
        </p>
        <p className="fw-bold" style={{ fontSize: "20px" }}>
          Quantity: 0
        </p>
        <p className="fw-bold" style={{ fontSize: "20px" }}>
          Description:{" "}
          <small className="fw-semibold" style={{ fontSize: "20px" }}>{product.description}</small>
        </p>

        <button
                onClick={()=> dispatch(addToCart(product))}
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
