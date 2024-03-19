import {configureStore} from '@reduxjs/toolkit'
import cartSlice from '../features/Shopping Cart/CartSlice'
import productSlice from '../features/Products/ProductSlice'
const store = configureStore({
    reducer:{
        cart: cartSlice,
        products: productSlice
    }
})

export default store