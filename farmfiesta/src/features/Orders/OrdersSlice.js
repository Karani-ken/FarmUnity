import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const OrdersSlice = createSlice({
    name: 'orders',
    initialState: {
        orderItems: [],
        loading: false, // Add loading state
        error: null // Add error state
    },
    reducers: {
        createOrderRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createOrderSuccess(state, action) {
            state.loading = false;
            // Optionally update state with payload if needed
            toast.success("Order placed successfully"); // Display a success message
        },
        createOrderFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error; // Update error state with payload
            toast.error("Failed to create order"); // Display an error message
        }
    }
});

// Export actions for external use
export const { createOrderRequest, createOrderSuccess, createOrderFailure } = OrdersSlice.actions;

// Export the reducer
export default OrdersSlice.reducer;

// Thunk action to handle asynchronous operation
// Thunk action to handle asynchronous operation
export const createOrder = (orderItemsData) => async (dispatch) => {
    dispatch(createOrderRequest());
    console.log(orderItemsData)
    try {
        const token = localStorage.getItem('token'); // Get the token from local storage or wherever it's stored
        const response = await axios.post("/orders/create-order", { orderItemsData }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(createOrderSuccess(response.data));
        toast.success("Order placed successfully");
    } catch (error) {
        dispatch(createOrderFailure({ error: error.message }));
        toast.error("failed to place order");
    }
};

// Redux Thunk action creator to create order and handle asynchronous operations
export const placeOrder = () => async (dispatch, getState) => {
    try {
        const cartItems = getState().cart.cart;
        console.log(cartItems)
        const orderItemsData = cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.count,
            product_image: item.product_image,
            product_price: item.product_price,
            product_name: item.product_name
        }));
        dispatch(createOrder(orderItemsData));
    } catch (error) {
        console.log(error)
    }
};
