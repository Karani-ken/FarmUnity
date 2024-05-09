import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Delivery id', width: 90 },
    { field: 'orderid', headerName: 'Order id', width: 90 },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 150,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 150,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Address/Town',
        width: 110,
        editable: true,
    },
    {
        field: 'county',
        headerName: 'County',
        width: 160,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
    },
    {
        field: 'pickup',
        headerName: 'Pick-up Station',
        width: 160,
    },
];

const rows = [
    { id: 1, orderid: 1, customerName: 'Jon Snow', phone: '0712345678', address: "Karatina", county: "Nyeri", status: "pending", pickup: "Bus stage" },
    {
        id: 2,
        orderid: 2,
        customerName: 'Daenerys Targaryen',
        phone: '0723456789',
        address: 'Dragonstone',
        county: 'Dragonstone',
        status: 'delivered',
        pickup: 'Dragonstone Port'
    },
    {
        id: 3,
        orderid: 3,
        customerName: 'Tyrion Lannister',
        phone: '0734567890',
        address: 'Casterly Rock',
        county: 'Westerlands',
        status: 'shipped',
        pickup: 'Casterly Rock Gates'
    },
    {
        id: 4,
        orderid: 4,
        customerName: 'Arya Stark',
        phone: '0745678901',
        address: 'Winterfell',
        county: 'The North',
        status: 'pending',
        pickup: 'Winterfell Market'
    }

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
