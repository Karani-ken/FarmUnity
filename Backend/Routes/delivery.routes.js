const express = require('express')
const { createDelivery,
    updateDeliveryStatus,
    getCompanyDeliveries,
    getCustomerDeliveries,
    getDeliveryById,
    deleteDelivery } = require('../Controllers/delivery.controller')

const router = express.Router();

router.post('/deliveries', createDelivery);
router.put('/deliveries/:delivery_id', updateDeliveryStatus);
router.get('/customers/:customer_id/deliveries', getCustomerDeliveries);
router.get('/companies/:company_id/deliveries', getCompanyDeliveries);
router.get('/deliveries/:delivery_id', getDeliveryById);
router.delete('/deliveries/:delivery_id', deleteDelivery);

module.exports = router