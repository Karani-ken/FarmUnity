import React, { useState, useEffect } from 'react';
import {Box, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        headerName: 'Company id',
        width: 90
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 150,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Status',
        width: 160,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 300,
        renderCell: (cellValues) => {
            const { row } = cellValues;
            return (
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'red', color: 'white' }} 
                    onClick={()=>handleApprove(e,row.id)}                 
                >
                    Delete 
                </Button>
            );
        },
    }
];
const deleteCompany = async (e,user_id) =>{
    e.preventDefault()    
}

export default function CompaniesTable({users}) {


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
