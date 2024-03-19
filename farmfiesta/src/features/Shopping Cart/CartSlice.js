import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
export const selectCart = (state) => state.cart;

export const getTotalCartAmount = (state) => {
  let totalCartAmount = 0;
  for (const item of selectCart(state).cart) {
    totalCartAmount += item.product_price * item.count;
  }
  return totalCartAmount;
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (x) => x.product_id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        //product already exists increase count
        state.cart[existingProductIndex].count += 1;
        toast.success("Updated cart")

      } else {
        state.cart.push({ ...action.payload, count: 1 });
        toast.success("Product was added")
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((x) => x.product_id !== action.payload.product_id);
      toast.success("Product was removed")
    },
    increaseCount: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (x) => x.product_id === action.payload.product_id
      );
      if (existingProductIndex !== -1) {
        //product already exists increase count
        state.cart[existingProductIndex].count += 1;
        toast.success("Updated cart")
      }
    },
    decreaseCount: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (x) => x.product_id === action.payload.product_id
      );
      if (existingProductIndex !== -1) {
        //product already exists increase count
        state.cart[existingProductIndex].count -= 1;
        if (state.cart[existingProductIndex].count === 0) {
          state.cart = state.cart.filter((x) => x.product_id !== action.payload.product_id);
        }
      }
    },       
  }
 
});

export const { addToCart, removeFromCart, increaseCount, decreaseCount} =
  cartSlice.actions;
export default cartSlice.reducer;
