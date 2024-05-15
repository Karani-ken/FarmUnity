import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const DeliveryForm = () => {
    const navigate = useNavigate()
    const { orderid } = useParams();
    const [companies, setCompanies] = useState([]);
    const [deliveryDetails, setDeliveryDetails] = useState({
        company_id: '',
        pickup_station: ''
    });
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/auth/get-users');
                const filterCompanies = response.data.filter(c => c.role === "deliverer");
                if (filterCompanies) {
                    console.log(filterCompanies);
                    setCompanies(filterCompanies);
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        getUsers();
    }, []);
    const editProfile = () =>{
        navigate('/edit-profile')
    }

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
            };
            console.log(DeliveryData);
            await axios.post('http://localhost:4000/deliveries/create', DeliveryData);
            toast.success("Delivery Initiated!!");
        } catch (error) {
            console.error('Error submitting delivery:', error);
            toast.error("Could not submit");
        }
    };

    return (
        <div className=" p-4 items-center h-screen">
            <p className='text-center bg-red-700 font-bold text-white p-3'>Before initiating Delivery please make sure to Edit your Profile to set the address,contacts details and county!!</p>
            <button className='bg-emerald-600 p-2 font-semibold text-white m-2 rounded-sm'
                onClick={editProfile}>Edit Profile</button>
            <div className="flex justify-center m-3">
                <Box sx={{ maxWidth: 400 }} className="p-8 shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="company-id-label">Company</InputLabel>
                                    <Select
                                        labelId="company-id-label"
                                        id="company-id-select"
                                        value={deliveryDetails.company_id}
                                        name="company_id"
                                        onChange={handleChange}
                                    >
                                        {companies.map(company => (
                                            <MenuItem key={company.ID} value={company.ID}>
                                                {company.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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

        </div>
    );
};

export default DeliveryForm;
