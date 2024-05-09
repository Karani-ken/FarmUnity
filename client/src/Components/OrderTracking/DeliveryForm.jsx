import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
const DeliveryForm = () => {
    const { orderid } = useParams();
    const [deliveryDetails, setDeliveryDetails] = useState({       
        company_id: '',
        pickup_station: ''
    });
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const customer_id = decoded.userId;
            const order_id = orderid;
            
            const DeliveryData = {
                order_id,
                customer_id,              
                company_id: deliveryDetails.company_id,
                pickup_station: deliveryDetails.pickup_station
            }
            console.log(DeliveryData)
            await axios.post('http://localhost:4000/deliveries/create',DeliveryData)
            toast.success("Delivery Initiated!!")
        } catch (error) {
            console.log(error)
            toast.error("Could not submit")
        }
       /* setDeliveryDetails({
            status: '',
            company_id: '',
            pickup_station: ''
        });*/
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Box sx={{ maxWidth: 400 }} className="p-8 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>                       
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="company_id"
                                label="Company ID"
                                variant="outlined"
                                value={deliveryDetails.company_id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="pickup_station"
                                label="Pickup Station"
                                variant="outlined"
                                value={deliveryDetails.pickup_station}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </div>
    );
};

export default DeliveryForm;
