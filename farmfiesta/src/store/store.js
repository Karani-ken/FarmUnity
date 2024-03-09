import {configureStore} from '@reduxjs/toolkit'
import cartSlice from '../features/Shopping Cart/CartSlice'

const store = configureStore({
    reducer:{
        cart: cartSlice
    }
})

export default store