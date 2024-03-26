const dbHandler = require('../Database/dbHandler')
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_KEY)
//TODO: CREATE ORDER
const createOrder = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // Decode the JWT token to get the user_id
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decodedToken.userId;
    console.log(user_id)
    const { orderItemsData } = req.body;
    try {
        const orderData = {
            status: 'pending',
            user_id
        }
        await dbHandler.createOrder(orderData, orderItemsData)
        res.status(201).json({ message: "Order was created successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
}

// DELETE ORDER
const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        await dbHandler.deleteOrder(orderId);
        res.status(200).json({ message: "Order was deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};


// UPDATE ORDER
const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.order_id;
        const updatedOrderData = req.body;
        await dbHandler.updateOrder(orderId, updatedOrderData);
        res.status(200).json({ message: "Order was updated successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};


//TODO: GET ALL USER ORDERS
// GET ALL USER ORDERS
const getAllUserOrders = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const orders = await dbHandler.fetchAllOrders(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
}

// GET ALL USER UNPAID ORDERS
const getAllUserUnpaidOrders = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const unpaidOrders = await dbHandler.fetchUnpaidOrders(userId);
        res.status(200).json(unpaidOrders);
    } catch (error) {
        res.status(500).json(error);
    }
}

//TODO: stripe payment
const stripePayment = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // Decode the JWT token to get the user_id
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decodedToken.userId;
    let totalOrderAmount = 0;
    const { approvedUrl, cancelUrl } = req.body
    try {
        const order_id = res.params
        const results = await dbHandler.orderWithItems(order_id);
        for (const orderItem of results) {
            totalOrderAmount += orderItem.product_price * orderItem.quantity;
        }
        const sessionLineItems = [{
            price_data: {
                currency: 'kes',
                product_data: {
                    name: 'Farm Unity Payment',
                    description: results.map(items => {
                        return items.product_name
                    })
                },
                unit_amout: totalOrderAmount * 100
            },
            quantity: 1
        }];
        const sessionOptions = {
            success_url: approvedUrl,
            cancel_url: cancelUrl,
            mode: 'payment',
            line_items: sessionLineItems
        };

        const session = await stripe.checkout.sessions.create(sessionOptions);
        let stripeSessionId = session.id;
        const updatedOrder = {
            stripeSessionId,
            user_id,
            order_id
        }
        await dbHandler.updateOrder(updatedOrder);
        res.status(201).json({ message: "Order was updated successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
}
const validatePayment = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // Decode the JWT token to get the user_id
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decodedToken.userId;
    let order_id = req.params
    try {
        const order = await dbHandler.fetchOrderById(order_id);
        const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);
        if (!session.payment_intent) {
            return false;
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)

        if (paymentIntent.status === 'succeeded') {
            const updatedOrder = {
                paymentIntentId: paymentIntent.id,
                paymentStatus: 'Approved',
                user_id,
                order_id
            }
            await dbHandler.updateOrder(updatedOrder)
            return true;
        }
        return false;
    } catch (error) {
        res.status(500).json(error)
    }
}



module.exports = {
    createOrder,
    deleteOrder,
    updateOrder,
    getAllUserOrders ,
    getAllUserUnpaidOrders,
    stripePayment,
    validatePayment
}
