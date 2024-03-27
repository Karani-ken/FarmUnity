
const express = require('express');

const {
    createOrder,
    deleteOrder,
    updateOrder,
    getAllUserOrders ,
    getAllUserUnpaidOrders,
    stripePayment,
    validatePayment
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
router.get('/fetch-unpaid-orders/:userId', getAllUserUnpaidOrders);   

// Process payment using Stripe
router.post('/stripe-payment/:orderId', stripePayment);

// Validate payment status   
router.post('/validate-payment/:orderId', validatePayment);

module.exports = router;       
