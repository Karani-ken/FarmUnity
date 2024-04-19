import React from 'react'

const PaymentFailedPage = () => {
    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="max-w-lg w-full bg-white shadow-md rounded-md p-8">
                <h1 className="text-3xl font-semibold text-red-600 mb-4">Payment Failed</h1>
                <p className="text-lg text-gray-700 mb-6">We're sorry, but there was an issue processing your payment.</p>
                <div className="flex justify-between">
                    <p className="text-lg text-gray-600">Error:</p>
                    <p className="text-lg font-semibold text-red-800">Transaction declined</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p className="text-lg text-gray-600">Amount:</p>
                    <p className="text-lg font-semibold text-gray-800">$100.00</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p className="text-lg text-gray-600">Payment Method:</p>
                    <p className="text-lg font-semibold text-gray-800">Credit Card</p>
                </div>
                <button className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md">Retry Payment</button>
            </div>
        </div>
    )
}

export default PaymentFailedPage