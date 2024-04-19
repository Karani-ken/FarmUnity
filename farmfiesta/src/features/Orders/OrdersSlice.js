import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const OrdersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
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
        },
        fetchOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersSuccess: (state, action) => {
            const { orders } = action.payload
            state.loading = false;
            state.orders = orders  // Update orderItems with fetched orders
        },
        fetchOrdersFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
        fetchPaymentRequest(state) {
            state.loading = true;
            state.error = null;
            toast.info("Initializing payment");
        },
        fetchPaymentSuccess(state, action) {
            state.loading = false;
            toast.success("Payment successfull")
        },
        fetchPaymentFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
            toast.error("Payment failed")
        }

    }
});

// Export actions for external use
export const { createOrderRequest, createOrderSuccess, createOrderFailure,
    fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } = OrdersSlice.actions;

// Export the reducer

// Thunk action to handle asynchronous operation
export const createOrder = (orderItemsData) => async (dispatch) => {
    dispatch(createOrderRequest());
    console.log(orderItemsData)
    try {
        const token = localStorage.getItem('token'); // Get the token from local storage or wherever it's stored
        const response = await axios.post("https://api.fusionafricatech.co.ke/orders/create-order", { orderItemsData }, {
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
//TODO:FETCH ORDERS
export const fetchOrders = () => async (dispatch) => {
    dispatch(fetchOrdersRequest());
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get("https://api.fusionafricatech.co.ke/orders/fetch-all-orders", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(fetchOrdersSuccess(response.data));
    } catch (error) {
        dispatch(fetchOrdersFailure({ error: error.message }));
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


export default OrdersSlice.reducer;