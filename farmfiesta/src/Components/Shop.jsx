import React from "react";
import Products from "./../Assets/Fruits.json";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/Shopping Cart/CartSlice";
function Shop() {
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  const handleProductSelect = (product) =>{
    navigate(`/product/${product.id}`)
  }
  return (
    <div className="text-center" style={{ margin: "0 10%" }}>
      <h1 className="fw-bold" style={{ color: "#6A6666" }}>
        Shop
      </h1>
      <div className="d-flex flex-wrap justify-content-around">
        {Products.map((product) => (
          <div key={product.id} className="card m-2 shadow" style={{ width: "18rem",border:'none' }}>
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
              style={{height:'50%'}}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Price: <b>${product.price}</b></p>
              <button
                onClick={() => handleProductSelect(product)}
                className="btn btn-primary m-2"
                style={{ background: "#39C758", border: "none" }}
              >
                View Product
              </button>
              <button
                onClick={()=> dispatch(addToCart(product))}
                className="btn btn-primary mx-2"
                style={{ background: "#39C758", border: "none" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
