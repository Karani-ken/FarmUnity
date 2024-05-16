const dbHandler = require('../Database/dbHandler')
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_KEY)
const pdf = require('html-pdf')
const pdfTemplate = require('../documents/invoice');
const invoice = require('../documents/invoice');
//TODO: CREATE ORDER 
//sample test data
/**{
    "orderItemsData": [
        {
            "product_id": 1,
            "product_name": "Product 1",
            "product_image": "product1.jpg",
            "product_price": 10.99,
            "quantity": 2
        },
        {
            "product_id": 2,
            "product_name": "Product 2",
            "product_image": "product2.jpg",
            "product_price": 15.99,
            "quantity": 1
        }
    ]
}
 */
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
        res.status(200).json({ orders });
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

    try {
        const order_id = req.params.orderId;
        const order = await dbHandler.fetchOrderById(order_id)

        if (order[0].status === "Approved") {
            return res.status(500).json("Order is already paid for")
        }
        const user_id = order[0].user_id;

        let totalOrderAmount = 0;
        const { approvedUrl, cancelUrl } = req.body
        const results = await dbHandler.orderWithItems(order_id);
        for (const orderItem of results) {
            totalOrderAmount += orderItem.product_price * orderItem.quantity;
        }
        const description = results.map(product => `${product.product_name} (${product.product_price} KES)`).join(', ');
        const sessionLineItems = [{
            price_data: {
                currency: 'kes',
                product_data: {
                    name: 'Farm Unity Payment',
                    description: description
                },
                unit_amount: totalOrderAmount * 100
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
        let stripeSessionUrl = session.url;

        let status = 'waiting confirmation';
        const updatedOrder = {
            stripeSessionId,
            status,
            user_id,
            order_id
        }

        await dbHandler.updateOrder(updatedOrder);
        res.status(201).json({ stripeSessionUrl })
    } catch (error) {
        res.status(500).json(error)
    }
}
const validatePayment = async (req, res) => {
    const order_id = req.params.orderId;
    const token = req.headers.authorization.split(' ')[1];
    // Decode the JWT token to get the user_id
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decodedToken.userId;
    console.log(user_id)

    try {
        const order = await dbHandler.fetchOrderById(order_id);
        console.log(order)
        const session_id = order[0].stripeSessionId; // Retrieve session ID from the order object
        if (!session_id) {
            res.status(400).json({ error: "Session ID not found for the order" });
            return;
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log(session)
        if (!session.payment_intent) {
            res.status(400).json({ error: "Payment session not found" });
            return;
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        console.log(paymentIntent.id);

        if (paymentIntent.status === 'succeeded') {
            const updatedOrder = {
                paymentIntentId: paymentIntent.id,
                status: 'Approved',
                user_id,
                order_id
            }
            await dbHandler.confirmPayment(updatedOrder);
            console.log('Payment confirmed');
            res.status(200).json({ message: "Payment confirmed" });
            return;
        }
        res.status(400).json({ error: "Payment not succeeded" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
//return orderItems 
const orderItems = async (req, res) => {
    const order_id = req.params.orderId
    const results = await dbHandler.orderWithItems(order_id);
    const user_id = results[0].user_id
    const user = await dbHandler.selectUserById(user_id);
    const username = user[0].name;
    try {
        const orderProductDetails = results.map(orderItem => ({
            product_id: orderItem.product_id,
            product_name: orderItem.product_name,
            product_image: orderItem.product_image,
            product_price: orderItem.product_price,
            quantity: orderItem.quantity,
            total_amount: orderItem.product_price * orderItem.quantity
        }))
        const totalAmount = orderProductDetails.reduce((acc, curr) => acc + curr.total_amount, 0);

        const invoice = {
            order_id,
            order_date: new Date().toLocaleDateString(), // Assuming current date as order date
            items: orderProductDetails,
            totalAmount,
            username
        };

        const pdfOptions = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm'
        };
        const pdfFilePath = `${__dirname}/invoice.pdf`;
        pdf.create(pdfTemplate(invoice), pdfOptions)
            .toFile(pdfFilePath, (err, _) => {
                if (err) {
                    console.error('Error creating PDF:', err);
                    res.status(500).json({ error: 'Error creating PDF' });
                } else {
                    res.status(200).sendFile(pdfFilePath);
                }
            });


    } catch (error) {
        console.error('Error fetching order items:', error);
        res.status(500).json({ error: 'Error fetching order items' + error });
    }
}
//get farmer sales
const getFarmerSales = async (req, res) => {
    try {
        const {id} = req.params
        const response = await dbHandler.getFarmerSales(id);

        if(response){
            return res.status(200).json(response)
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}






module.exports = {
    createOrder,
    deleteOrder,
    updateOrder,
    getAllUserOrders,
    getAllUserUnpaidOrders,
    stripePayment,
    validatePayment,
    orderItems,
    getFarmerSales

}
