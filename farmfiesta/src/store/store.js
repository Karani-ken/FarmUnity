import {configureStore} from '@reduxjs/toolkit'
import cartSlice from '../features/Shopping Cart/CartSlice'
import productSlice from '../features/Products/ProductSlice'
import OrdersSlice from '../features/Orders/OrdersSlice'
const store = configureStore({
    reducer:{
        cart: cartSlice,
        products: productSlice,
        orders: OrdersSlice
    }
})

export default store