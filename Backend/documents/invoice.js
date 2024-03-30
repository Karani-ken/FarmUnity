module.exports = (invoiceData) => {
    const {items,order_date, order_id,totalAmount,username} = invoiceData
    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            /* Define CSS styles for the invoice */
            body {
                font-family: Arial, sans-serif;
            }
            .invoice-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .invoice-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .invoice-details {
                margin-bottom: 20px;
            }
            .invoice-items {
                border-collapse: collapse;
                width: 100%;
            }
            .invoice-items th, .invoice-items td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            .invoice-total {
                margin-top: 20px;
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="invoice-header">
                <h2>Farm Unity Invoice</h2>
            </div>
            <div class="invoice-details">
                <p><strong>Order ID:</strong> ${order_id}</p>
                <p><strong>Order Date:</strong> ${order_date}</p>
                <p><strong>Customer Name:</strong> ${username}</p>
            </div>
            <table class="invoice-items">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                ${items.map(item => `
                    <tr>
                        <td>${item.product_id}</td>
                        <td>${item.product_name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.product_price}</td>
                        <td>${item.total_amount}</td>
                    </tr>
                `).join('')}
                </tbody>
            </table>
            <div class="invoice-total">
                <p><strong>Total Amount:</strong>Kes ${ totalAmount }</p>
            </div>
        </div>
    </body>
    </html>
    `
}