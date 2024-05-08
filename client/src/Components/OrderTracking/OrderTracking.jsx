import React, { useState } from 'react';
import Stepper from './Stepper';
import StepperControll from './StepperControll';

const OrderTracking = () => {
    const steps = ['placed', 'awaiting delivery', 'out for delivery', 'delivered', 'complete'];
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="h-screen">
            <div className='h-1/2 p-2 md:w-1/2 mx-auto my-4 shadow-xl rounded-2xl bg-white'>
                <h3 className="text-teal-600 font-bold">Tracking Order Id: XY23J5</h3>
                <div className='contaner horizontal my-5'>
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>

                <StepperControll
                    handleNext={handleNext}
                    handleBack={handleBack}
                    currentStep={currentStep}
                    steps={steps}
                />
            </div>
        </div>

    );
};

export default OrderTracking;
