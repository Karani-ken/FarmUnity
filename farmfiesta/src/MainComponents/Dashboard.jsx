import React from 'react'
import {jwtDecode} from 'jwt-decode'
const Dashboard = () => {
    const token = localStorage.getItem('token');
    let username = ''
    if (token) {
        const decodedToken = jwtDecode(token);
        username = decodedToken.name; // assuming 'username' is the field in your JWT containing the username
      }
      
    return (
        <div>
            <h1>{username}</h1>
        </div>
    )
}

export default Dashboard