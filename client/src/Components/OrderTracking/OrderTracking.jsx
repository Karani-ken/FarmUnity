import React, { useState, useEffect } from 'react';
import Stepper from './Stepper';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import RatingModal from '../Rating/RatingModal'; // Import the RatingModal component

const OrderTracking = () => {
    const { orderid } = useParams();
    const [deliveryStatus, setDeliveryStatus] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    const steps = ['initiated', 'confirmed', 'out for delivery', 'delivered'];
    const [companyId, setCompnayId] = useState(null)
    useEffect(() => {
        const fetchDeliveryStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                const response = await axios.get(`http://localhost:4000/deliveries/get-customers/${decoded.userId}`);
                console.log(response.data)
                const delivery = response.data.find(item => item.order_id.toString() === orderid);
                if (delivery) {
                    setCompnayId(delivery.company_id)
                    console.log(companyId)
                    setDeliveryStatus(delivery.status);
                }
            } catch (error) {
                console.error('Error fetching delivery status:', error);
            }
        };

        fetchDeliveryStatus();
    }, [orderid]);

    const currentStep = deliveryStatus ? steps.indexOf(deliveryStatus) : 0;

    const handleRateService = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleRatingSubmit = (rating) => {
        try {

           console.log(rating)
           console.log(companyId)

        } catch (error) {

        }
    };

    return (
        <div className="h-screen">
            <div className='h-1/2 p-2 md:w-1/2 mx-auto my-4 shadow-xl rounded-2xl bg-white'>
                <h3 className="text-teal-600 font-bold">Tracking Order Id: {orderid}</h3>
                <div className='container horizontal my-5'>
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>
                <div className="flex justify-end">
                    {deliveryStatus === 'delivered' ? (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleRateService}
                        >
                            Rate
                        </button>
                    ) : (
                        <button
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                            disabled
                        >
                            Rate
                        </button>
                    )}
                </div>
            </div>
            <RatingModal open={modalOpen} onClose={handleModalClose} onSubmit={handleRatingSubmit} />
        </div>
    );
};

export default OrderTracking;
