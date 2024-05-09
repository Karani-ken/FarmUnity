import React, { useState, useEffect } from 'react';
import Stepper from './Stepper';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const OrderTracking = () => {
    const { orderid } = useParams();
    const [deliveries, setDeliveries] = useState([])
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);
    const steps = ['initiated', 'confirmed', 'out for delivery', 'delivered', 'complete'];
    const [currentStep, setCurrentStep] = useState(0);


    useEffect(() => {
        const fetchDeliveries = async () => {
            const response = await axios.get(`http://localhost:4000/deliveries/get-customers/${decoded.userId}`)
            console.log(response.data)
            setDeliveries(response.data)
        }

        fetchDeliveries()
        //set step based on delivery status
        const getStatus = async () => {
            const delivery = deliveries?.find(item => item.order_id.toString() === orderid)
            if (delivery) {
                console.log(delivery)
                if (delivery && currentStep < steps.length - 1 && steps[currentStep] !== delivery.status) {
                    //const indexOfStatus = steps.findIndex(delivery.status)
                    setCurrentStep(currentStep + 1);
                }
            }

        }
        getStatus()
    }, [])


    return (
        <div className="h-screen">
            <div className='h-1/2 p-2 md:w-1/2 mx-auto my-4 shadow-xl rounded-2xl bg-white'>
                <h3 className="text-teal-600 font-bold">Tracking Order Id: {orderid}</h3>
                <div className='contaner horizontal my-5'>
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>

            </div>
        </div>

    );
};

export default OrderTracking;
