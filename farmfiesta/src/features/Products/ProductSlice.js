import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import axios from "axios"

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            const { products, currentPage, pageSize, totalPages } = action.payload;
            state.products = products;
            state.currentPage = currentPage;
            state.pageSize = pageSize;
            state.totalPages = totalPages;
        }
    }
})
export const { setProducts } = productSlice.actions;
export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await axios.get("https://api.fusionafricatech.co.ke/products/get-products");
        dispatch(setProducts(response.data));
    } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("could not get products")
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        await axios.delete(`https://api.fusionafricatech.co.ke/products/delete/${productId}`)
        dispatch(fetchProducts())
        toast.success('prodcut was deleted')
    } catch (error) {
        console.error('Could not delete product', error)
        toast.error("could not delete!!!")
    }
}

export const updateProduct = (productId, updatedProduct) => async (dispatch) => {
    try {
        await axios.put(`https://api.fusionafricatech.co.ke/products/update-product/${productId}`, updatedProduct);
        dispatch(fetchProducts())
        toast.success('prodcut was updated')
    } catch (error) {
        console.error('Could not update product', error)
        toast.error("could not update!!!")
    }
}
export default productSlice.reducer