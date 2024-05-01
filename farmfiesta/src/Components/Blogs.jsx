import React from 'react'

const Blogs = () => {
    return (

        <div className='p-3 m-2'>
            <h1 className="font-bold text-3xl text-center m-2 p-2">Blogs</h1>
            <button className="btn">Add</button>
            <div className="d-lg-flex justify-around gap-5">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dairy Farming</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit. Pariatur repudiandae adipisci cupiditate ea. Aperiam pariatur sint
                            reiciendis dolorem laudantium in,
                            distinctio dolore quasi aliquid hic animi eligendi doloribus ad reprehenderit.</p>
                    </div>
                    <div className="px-6 py-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            John Doe
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            12/4/2024
                        </span>
                    </div>
                </div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Maize Planting</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit. Pariatur repudiandae adipisci cupiditate ea. Aperiam pariatur sint
                            reiciendis dolorem laudantium in,
                            distinctio dolore quasi aliquid hic animi eligendi doloribus ad reprehenderit.</p>
                    </div>
                    <div className="px-6 py-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            John Doe
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            12/4/2024
                        </span>
                    </div>
                </div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Farm inputs</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit. Pariatur repudiandae adipisci cupiditate ea. Aperiam pariatur sint
                            reiciendis dolorem laudantium in,
                            distinctio dolore quasi aliquid hic animi eligendi doloribus ad reprehenderit.</p>
                    </div>
                    <div className="px-6 py-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            John Doe
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            12/4/2024
                        </span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Blogs