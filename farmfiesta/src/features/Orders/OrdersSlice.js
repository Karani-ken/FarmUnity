import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios"

const OrdersSlice = createSlice({
    name:'orders',
    initialState:{
        products:[],
        totalAmount:'',        
    },
    reducers:{
        setProducts:(state, action)=>{
            const {products} = action.payload;
            state.products=products
        },
        setTotalAmount:(state, action)=>{
            totalAmount = action.payload;
            state.totalAmount = totalAmount;
        }
    }
})