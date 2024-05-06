const dbHandler = require('../Database/dbHandler')


//Todo: Create delivery
const createDelivery = async (req, res) => {
    try {
        const { order_id, customer_id, status, company_id, pickup_station } = req.body;
        if(!order_id || !customer_id ||!status ||!company_id || !pickup_station) {
            return res.status(400).json("All fields are required");
        }
        await dbHandler.insertDelivery(deliveryData);
        //send Email on successful delivery placement
        return res.status(201).json({ message: "Delivery was created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

//Todo: Update delivery status
const updateDeliveryStatus = async (req, res) => {
    try {
        const { status, delivery_id } = req.body;
        //checking for null or empty fields
        if (!status || status.trim() === '' || !delivery_id) {
            return res.status(400).json({ message: "Status and delivery_id are required" });
        }
        await dbHandler.updateDeliveryStatus(status, delivery_id);
        return res.status(200).json({ message: "Delivery status updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
//Todo: Get Customer Deliveries
const getCustomerDeliveries = async (req, res) => {
    try {
        const { id } = req.params;//user id (customer)
        if (!id) {
            return res.status(400).json({ message: "Customer ID is required" });
        }
        const deliveries = await dbHandler.getCustomerDeliveries(id);
        return res.status(200).json(deliveries);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
//Todo: Get Company Deliveries
const getCompanyDeliveries = async (req, res) => {
    try {
        const { id } = req.params; //user id (company)
        if (!id) {
            return res.status(400).json({ message: "Company ID is required" });
        }
        const deliveries = await dbHandler.getCompanyDeliveries(id);
        return res.status(200).json(deliveries);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
//Todo: Get Delivery by Id
const getDeliveryById = async (req, res) => {
    try {
        const { id } = req.params; //delivery id

        if (!id) {
            return res.status(400).json({ message: "Delivery ID is required" });
        }
        const delivery = await dbHandler.getDeliveryById(id);
        return res.status(200).json(delivery);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
//Todo: delete delivery
const deleteDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Delivery ID is required" });
        }
        await dbHandler.deleteCancelledDelivery(delivery_id);
        return res.status(200).json({ message: "Delivery deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

module.exports = {
    createDelivery,
    updateDeliveryStatus,
    getCompanyDeliveries,
    getCustomerDeliveries,
    getDeliveryById,
    deleteDelivery
}

