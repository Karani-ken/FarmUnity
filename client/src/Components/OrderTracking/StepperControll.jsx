import React from 'react';

const StepperControll = ({ handleNext, handleBack, currentStep, steps }) => {
    return (
        <div className='container flex justify-around mt-4 mb-8'>
            <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="bg-white text-slate-400 uppercase py-2 px-4
                rounded-xl font-semi-bold cursor-pointer border-2 border-slate-300
                hover:bg-slate-700 hover:text-black transition duration-200 ease-in-out"
            >
                Back
            </button>
            <button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="bg-green-500 text-white uppercase py-2 px-4
                rounded-xl font-semi-bold cursor-pointer border-2 border-slate-300
                hover:bg-slate-700 hover:text-slate-300 transition duration-200 ease-in-out"
            >
                Next
            </button>
        </div>
    );
};

export default StepperControll;
