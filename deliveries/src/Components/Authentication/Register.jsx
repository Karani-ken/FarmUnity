import * as React from 'react';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import {Link }from 'react-router-dom'

// Styled Box component with border and shadow
const StyledBox = styled(Box)({
    border: '1px solid #e0e0e0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
});

export default function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const companyData = {
            companyName: formData.get('companyName'),
            companyEmail: formData.get('companyEmail'),
            password: formData.get('password')
        };
        console.log(companyData);
    };

    return (
        <Grid container justifyContent="center" sx={{ marginTop: '1rem' }}>
            <Grid item xs={12} sm={10} md={6}>

                <StyledBox
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant='h4' sx={{ fontSize: '24px', fontWeight: 'bold',textAlign:"center" }}>Create Account</Typography>
                    <div>
                        <TextField
                            required
                            id="companyName"
                            name="companyName"
                            label="Company Name"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="companyEmail"
                            name="companyEmail"
                            type="email"
                            label="Company Email"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                    <Link to="/login" className='text-sm  ml-3 underline ' style={{color:"blue"}}>sign in</Link>
                </StyledBox>
            </Grid>
        </Grid>
    );
}
