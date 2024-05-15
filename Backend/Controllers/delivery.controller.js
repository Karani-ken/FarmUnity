const dbHandler = require('../Database/dbHandler')


//Todo: Create delivery
const createDelivery = async (req, res) => {
    try {
        const { order_id, customer_id, company_id, pickup_station } = req.body;
        if (!order_id || !customer_id || !company_id || !pickup_station) {
            return res.status(400).json("All fields are required");
        }
        const deliveryData = {
            order_id,
            customer_id,
            status: "initiated",
            company_id,
            pickup_station
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
        const { status } = req.body;
        //checking for null or empty fields
        const { id } = req.params
        if (!status || status.trim() === '' || !id) {
            return res.status(400).json({ message: "Status and delivery_id are required" });
        }
        await dbHandler.updateDeliveryStatus(status, id);
        return res.status(200).json({ message: "Delivery status updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
//Todo: Get Customer Deliveries
const getCustomerDeliveries = async (req, res) => {
    try {
        const { id } = req.params; // user id (customer)
        if (!id) {
            return res.status(400).json({ message: "Customer ID is required" });
        }

        // Get deliveries and customer information
        const deliveries = await dbHandler.getCustomerDeliveries(id);
        const customer = await dbHandler.selectUserById(id);

        // Prepare array to store formatted deliveries
        const formattedDeliveries = [];

        // Iterate through deliveries to format each one
        for (const delivery of deliveries) {
            const company = await dbHandler.selectUserById(delivery.company_id);

            // Retrieve order information
            const order = await dbHandler.fetchOrderById(delivery.order_id);
            const orderItems = await dbHandler.orderWithItems(delivery.order_id);

            // Construct formatted delivery object
            const formattedDelivery = {
                delivery_id: delivery.delivery_id,
                order_id: delivery.order_id,
                status: delivery.status,
                company_name: company[0].name,
                customer_name: customer[0].name,
                customer_email: customer[0].email,
                customer_phone: customer[0].phone,
                address: customer[0].address,
                county: customer[0].county,
                pickup_station: delivery.pickup_station,
                orderItems: orderItems // Array of order items
            };

            // Push formatted delivery to array
            formattedDeliveries.push(formattedDelivery);
        }

        // Return formatted deliveries
        return res.status(200).json(formattedDeliveries);
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
        //console.log(deliveries)
        const formattedDeliveries = [];

        // Iterate through deliveries to format each one
        for (const delivery of deliveries) {
            const company = await dbHandler.selectUserById(delivery.company_id);
            const customer = await dbHandler.selectUserById(delivery.customer_id);

            // Retrieve order information
            const order = await dbHandler.fetchOrderById(delivery.order_id);
            const orderItems = await dbHandler.orderWithItems(delivery.order_id);

            // Construct formatted delivery object
            const formattedDelivery = {
                delivery_id: delivery.delivery_id,
                order_id: delivery.order_id,
                status: delivery.status,
                company_name: company[0].name,
                customer_name: customer[0].name,
                customer_email: customer[0].email,
                customer_phone: customer[0].phone,
                address: customer[0].address,
                county: customer[0].county,
                pickup_station: delivery.pickup_station,
                orderItems: orderItems // Array of order items
            };

            // Push formatted delivery to array
            formattedDeliveries.push(formattedDelivery);
        }
        return res.status(200).json(formattedDeliveries);
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
        // console.log(delivery)
        const company = await dbHandler.selectUserById(delivery[0].company_id);
        console.log(company[0])
        const customer = await dbHandler.selectUserById(delivery[0].customer_id);

        // Retrieve order information
        //const order = await dbHandler.fetchOrderById(delivery[0].order_id);
        const orderItems = await dbHandler.orderWithItems(delivery[0].order_id);

        // Construct formatted delivery object
        const formattedDelivery = {
            delivery_id: delivery.delivery_id,
            order_id: delivery.order_id,
            status: delivery.status,
            company_name: company[0].name,
            customer_name: customer[0].name,
            customer_email: customer[0].email,
            customer_phone: customer[0].phone,
            address: customer[0].address,
            county: customer[0].county,
            pickup_station: delivery.pickup_station,
            company_id: company[0].ID,
            orderItems: orderItems// Array of order items

        };
        console.log(formattedDelivery)
        return res.status(200).json(formattedDelivery);
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

