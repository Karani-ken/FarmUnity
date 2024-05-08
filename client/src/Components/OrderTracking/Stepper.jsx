import React from 'react';

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className='mx-4 p-4 flex justify-between items-center'>
           
            {steps.map((step, index) => (
                <div key={index} className='w-full flex items-center'>
                    <div className={`relative flex flex-col items-center ${index <= currentStep ? 'text-white' : 'text-teal-600'}`}>
                        <div className={`rounded-full transition duration-500 ease-in-out border-2 ${index <= currentStep ? 'bg-green-500 border-green-500' : 'border-gray-300'} h-12 w-12 flex items-center justify-center py-3`}>
                            {index + 1}
                        </div>
                        <div className='absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase'>
                            {step}
                        </div>
                    </div>
                    {index !== steps.length - 1 && (
                        <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${index < currentStep ? 'border-green-500' : 'border-gray-300'}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
