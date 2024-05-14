const express = require('express')
const { createDelivery,
    updateDeliveryStatus,
    getCompanyDeliveries,
    getCustomerDeliveries,
    getDeliveryById,
    deleteDelivery } = require('../Controllers/delivery.controller')

const router = express.Router();
  
router.post('/create', createDelivery);
router.put('/update-status/:id', updateDeliveryStatus);
router.get('/get-customers/:id', getCustomerDeliveries);  
router.get('/get-company/:id', getCompanyDeliveries);
router.get('/get-delivery/:id', getDeliveryById);
router.delete('/delete/:id', deleteDelivery);

module.exports = router