import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  increaseCount,
  decreaseCount,
  getTotalCartAmount,
} from "../features/Shopping Cart/CartSlice";
function Cart() {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalAmount = useSelector(getTotalCartAmount);
  const dispatch = useDispatch();
  return (
    <div className="text-center " style={{ margin: "0 5%" }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Ooop! your cart is empty</p>
          <Link to="/shop">
            <button
              className="btn btn-primary"
              style={{ background: "#39C758", border: "none" }}
            >
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => {
            return (
              <div key={item.product_id} className="row shadow-sm m-3">
                <div className="col-lg-3">
                  <img src={item.product_image} alt="" style={{ width: "70%" }} />
                  <h5>{item.product_name}</h5>
                </div>
                <div className="col-lg-3 text-center">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => dispatch(removeFromCart({ product_id: item.product_id }))}
                  >
                    Remove
                  </button>
                </div>
                <div className="col-lg-3">
                  <h6>Count</h6>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={() => dispatch(decreaseCount({ product_id: item.product_id }))}
                    >
                      -
                    </button>
                    <h4>{item.count}</h4>
                    <button
                      className="btn btn-info text-white btn-sm fw-bold"
                      onClick={() => dispatch(increaseCount({ product_id: item.product_id }))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-lg-3">
                  <h6>Amount</h6>
                  <h3>Kes {(item.product_price * item.count).toFixed(2)}</h3>
                </div>
              </div>
            );
          })}
          <div className="d-lg-flex justify-content-end">
            <div className="w-lg-25">
              <div className="card p-3 shadow-lg" style={{ border: "none" }}>
                <h4>Total Amount</h4>
                <p className="fw-bold">KES. {totalAmount.toFixed(2)}</p>
              </div>
              <Link to="/shop">
                <button
                  className="btn btn-primary"
                  style={{ background: "#39C758", border: "none" }}
                >
                  Continue Shopping
                </button>
              </Link>
              <button className="btn btn-success m-2">Place Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
