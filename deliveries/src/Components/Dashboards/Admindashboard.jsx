import React, { useState, useEffect } from 'react'
import CompaniesTable from '../Tables/CompaniesTable'
import { jwtDecode } from 'jwt-decode'
import { Card, Box, CardContent, Typography } from '@mui/material'
import axios from 'axios'

const card = (title, count) => (
  <React.Fragment>
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant='h1' sx={{ fontSize: 20, fontWeight: 500, color: "#fff" }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant='h1' sx={{ fontSize: 20, fontWeight: 500, color: "#fff" }} color="text.secondary" gutterBottom>
        {count}
      </Typography>

    </CardContent>
  </React.Fragment>
);
const Admindashboard = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/auth/get-users`);
        console.log(response.data);

        // Filter users based on role
        const filteredUsers = response.data
          .filter(user => user.role === 'deliverer')
          .map(user => ({
            id: user.ID,
            companyName: user.name,
            role: user.role
          }));

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className='h-screen p-3 overflow-y-scroll'>
      <h3 className='text-center p-2 font-bold text-2xl'>Admin Dashboard</h3>
      <Box className="shadow-md  block p-3  md:flex  ">
        <Card>
          <div className='bg-sky-500 m-2 rounded-lg '>
            {/* Card content */}
            {card("Total Companies", users.length)}
          </div>
        </Card>
      </Box>
      <CompaniesTable users={users} />
    </div>
  )
}

export default Admindashboard