
const express = require('express');

const {
    createOrder,
    deleteOrder,
    updateOrder,
    getAllUserOrders ,
    getAllUserUnpaidOrders,
    stripePayment,
    validatePayment,
    orderItems,
    getFarmerSales
} = require('../Controllers/orders.controller');

const router = express.Router();

// Create a new order
router.post('/create-order', createOrder);

// Delete an existing order
router.delete('/delete-order/:orderId', deleteOrder);

// Update an existing order
router.put('/update-order/:orderId', updateOrder);

// Fetch all orders
router.get('/fetch-all-orders', getAllUserOrders);

// Fetch unpaid orders for a specific user
router.get('/fetch-unpaid-orders', getAllUserUnpaidOrders);   

// Process payment using Stripe
router.post('/stripe-payment/:orderId', stripePayment);

// Validate payment status   
router.post('/validate-payment/:orderId', validatePayment);
//get  order items and invoice
router.get('/order-items/:orderId', orderItems )
//get all farmer sales
router.get('/my-sales/:id',getFarmerSales);



module.exports = router;       
