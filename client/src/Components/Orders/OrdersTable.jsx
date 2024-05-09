
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function OrdersTable({ orders }) {
    const navigate = useNavigate();
    const [deliveries, setDeliveries] = useState([])
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);
    useEffect(() => {
        const fetchDeliveries = async () => {
            const response = await axios.get(`http://localhost:4000/deliveries/get-customers/${decoded.userId}`)
            console.log(response.data)
            setDeliveries(response.data)
        }
        fetchDeliveries()
    }, [])
    const columns = [
        { field: 'order_id', headerName: 'Order ID', width: 150 },
        { field: 'order_date', headerName: 'Date', width: 200 },
        {
            field: 'invoice',
            headerName: 'Invoice',
            width: 300,
            renderCell: (cellValues) => {
                const { row } = cellValues;
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleInvoice(row.order_id)}
                    >
                        Get Invoice
                    </Button>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (cellValues) => {
                const { row } = cellValues;
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePayment(row.order_id)}
                    >
                        Pay
                    </Button>
                );
            },
        },
        {
            field: 'delivery',
            headerName: 'Delivery',
            width: 300,
            renderCell: (cellValues) => {
                const { row } = cellValues;
                const deliveryInitated = deliveries.filter(delivery => delivery.order_id === row.order_id)
                return (
                    <>
                        {deliveryInitated.length > 0 ? (

                            <Button
                                variant="contained"
                                color="primary"  
                                onClick={()=> handleOrderTracking(row.order_id)}                              
                            >
                               Track Delivery
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleDelivery(row.order_id)}
                            >
                                Initiate Delivery
                            </Button>
                        )}
                    </>
                );
            }
        },
    ];
    const handlePayment = async (orderId) => {
        try {
            const approvedUrl = "https://nnp-farmunity.fusionafricatech.co.ke/payment-success";
            const cancelUrl = "https://nnp-farmunity.fusionafricatech.co.ke/payment-failed";
            const redirectUrls = {
                approvedUrl,
                cancelUrl
            };
            const response = await axios.post(`http://localhost:4000/orders/stripe-payment/${orderId}`, redirectUrls);
            const stripeRequestUrl = response.data.stripeSessionUrl;
            window.location.href = stripeRequestUrl;
        } catch (error) {
            console.log(error);
            toast.error("Could not pay!!");
        }
    };

    const handleOrderTracking = async (orderId) =>{
        navigate(`/order-tracking/${orderId}`)
    }
    const handleInvoice = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:4000/orders/order-items/${orderId}`, { responseType: 'blob' });
            const pdfBlob = response.data;
            saveAs(pdfBlob, 'invoice.pdf');
        } catch (error) {
            console.error('Error downloading invoice:', error);
            toast.error("Could not get invoice");
        }
    };

    const handleDelivery = async (orderid) => {
        navigate(`/initiate-delivery/${orderid}`)
    };

    const rows = orders.map(order => ({
        id: order.order_id,
        order_id: order.order_id,
        order_date: new Date(order.order_date).toLocaleDateString(),
    }));

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
