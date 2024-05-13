import React, { useState, useEffect } from 'react';
import {Box, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const columns = [
    { field: 'id', headerName: 'Delivery id', width: 30 },
    { field: 'order_id', headerName: 'Order id', width: 30 },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 150,
        editable: true,
    },
    {
        field: 'customer_phone',
        headerName: 'Phone',
        width: 100,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Address/Town',
        width: 110,
        editable: true,
    },
    {
        field: 'county',
        headerName: 'County',
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
    },
    {
        field: 'pickup_station',
        headerName: 'Pick-up Station',
        width: 160,
    },
    {
        field: 'confirmed',
        headerName: 'Actions',
        width: 130,
        renderCell: (cellValues) => {
            const { row } = cellValues;
            return (
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'blue', color: 'white' }}
                >
                    Confirmed
                </Button>
            );
        },
    },
    {
        field: 'out',
        headerName: 'Actions',
        width: 200,
        renderCell: (cellValues) => {
            const { row } = cellValues;
            return (
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'gray', color: 'white' }}                                
                >
                   out for delivery
                </Button>
            );
        },
    },
    {
        field: 'delivered',
        headerName: 'Actions',
        width: 130,
        renderCell: (cellValues) => {
            const { row } = cellValues;
            return (
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'green', color: 'white' }} 
                                    
                >
                    Delivered
                </Button>
            );
        },
    }
];

export default function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const decoded = token ? jwtDecode(token) : null;

    useEffect(() => {
        const getDeliveries = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/deliveries/get-company/${decoded.userId}`);
                setOrders(response.data.map(order => ({
                    id: order.delivery_id,
                    order_id: order.order_id,
                    customerName: order.customer_name,
                    customer_phone: order.customer_phone,
                    address: order.address,
                    county: order.county,
                    status: order.status,
                    pickup_station: order.pickup_station,
                })));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        getDeliveries();
    }, [decoded.userId]);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={orders}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
