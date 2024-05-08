import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'order id', width: 90 },   
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: true,
    },   
    {
        field: 'orderItems',
        headerName: 'OrderItems',
        width: 160,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 160,
    },
    {
        field: 'pickup',
        headerName: 'Pick-up Station',
        width: 160,
    },
];

const rows = [
    
];

export default function OrdersTable() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
