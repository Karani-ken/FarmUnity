import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Profiles = () => {
    const [users, setUsers] = useState([])
    const userThumbnail = `https://www.svgrepo.com/show/105517/user-icon.svg`
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.fusionafricatech.co.ke/auth/get-users');
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle error if needed
            }
        };
    
        fetchData(); // Call the async function
    }, []);
    
    return (
        <div className='profiles-page text-center'>

            <h1 className='fw-bold text-2xl p-2'>Farmers Profiles</h1>
            <div className='flex gap-4 flex-wrap justify-center p-4'>
            {users && users?.map((user) => {
                if (user.role === 'farmer') {
                    return (
                        <div className="user-profile-card shadow-lg" key={user.ID}>
                            <div className="img-card flex justify-center p-2">
                                <img src={user.profilePic ? user.profilePic : userThumbnail} alt="" style={{ height: '100px', width: '100px', borderRadius: '100%' }} />
                            </div>
                            <hr className='bg-slate-600 mx-2' />
                            <div className="details-card text-left p-2">
                                <h1> <b>Name</b>: {user.name}</h1>
                                <p><b>{user.role}</b></p>
                                <p><b>Location:</b> Nyeri</p>
                                <p><b>Phone: </b>+254{user?.phone}</p>
                                <h3 className='fw-bold'>Products</h3>
                                <ul>
                                    <li>- Potatoes</li>
                                    <li>- Cabbages</li>
                                </ul>
                            </div>
                        </div>
                    )
                }

            })}

            </div>
           
        </div>
    )
}

export default Profiles