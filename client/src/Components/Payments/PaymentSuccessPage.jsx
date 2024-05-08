import React from 'react'

const PaymentSuccessPage = () => {
    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="max-w-lg w-full bg-white shadow-md rounded-md p-8">
                <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful</h1>
                <p className="text-lg text-gray-700 mb-6">Thank you for your payment. Your transaction was successful.</p>
                <div className="flex justify-between">
                    <p className="text-lg text-gray-600">Transaction ID:</p>
                    <p className="text-lg font-semibold text-gray-800">ABC123XYZ</p>
                </div>                
                <div className="flex justify-between mt-2">
                    <p className="text-lg text-gray-600">Payment Method:</p>
                    <p className="text-lg font-semibold text-gray-800">Credit Card</p>
                </div>
                <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md">Continue Shopping</button>
            </div>
        </div>
    )
}

export default PaymentSuccessPage