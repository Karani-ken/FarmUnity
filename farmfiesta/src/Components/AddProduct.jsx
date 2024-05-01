import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const initialState = {
        product_name: '',
        product_description: '',
        product_price: '',
        product_image: null,
    };

    const [productData, setProductData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            setProductData((prevState) => ({
                ...prevState,
                [name]: file
            }));
        } else {
            setProductData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_name', productData.product_name);
        formData.append('product_description', productData.product_description);
        formData.append('product_price', productData.product_price);
        formData.append('product_image', productData.product_image);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/products/addproduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Product was added successfully", response.data);
            toast.success("Product was added");

            // Reset form fields to initial state after successful submission
            setProductData(initialState);
        } catch (error) {    
            console.error("Error adding product", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='m-5'>
                <fieldset>
                    <legend>Add Product</legend>
                    <div className='form-group'>
                        <label htmlFor="product-name" className="fw-bold">Product name</label>
                        <input
                            type="text"
                            name='product_name'
                            className="form-control p-2"
                            value={productData.product_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_description" className="fw-bold">Product Description</label>
                        <input
                            type="text"
                            name='product_description'
                            className="form-control p-2"
                            value={productData.product_description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="price" className="fw-bold">Product price</label>
                        <input
                            type="number"
                            name="product_price"
                            className="form-control p-2"
                            value={productData.product_price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image" className="fw-bold">Product image</label>
                        <input
                            type="file"
                            name="product_image"
                            className="form-control p-2"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary mt-3 w-100" />
                        <input type="reset" value="Cancel" className="btn btn-outline-secondary mt-3 w-100" />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default AddProduct;
